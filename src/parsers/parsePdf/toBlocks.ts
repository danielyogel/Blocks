import { z } from 'zod';
import { nanoid } from 'nanoid';
import { groupBy, isLeft, isRight, left, mapValues, right } from '../../utils';
import { parsedApiPDf } from './fixtures';
import { ABSTRACT, TITLE } from '../../blocks';
import { Content } from '@tiptap/react';
import { TIPTAP_JSON } from './ARTICLE_BLOCKS_SCHEMA';

export const _InputSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({ email: z.string(), first: z.string(), last: z.string(), middle: z.array(z.string()), suffix: z.string() })),
  pdf_parse: z.object({
    bib_entries: z.record(z.object({ other_ids: z.object({ DOI: z.array(z.string()).optional() }) })),
    abstract: z.array(z.object({ text: z.string() })),
    body_text: z.array(
      z.object({
        section: z.string(),
        text: z.string(),
        cite_spans: z.array(
          z.object({
            end: z.number(),
            start: z.number(),
            ref_id: z.string().or(z.null()),
            text: z.string()
          })
        )
      })
    )
  })
});

export function pdfToBlocks(input: unknown) {
  const validatedInput = _InputSchema.safeParse(input);

  if (!validatedInput.success) {
    return left(validatedInput.error);
  } else {
    return right([
      { kind: 'TITLE' as const, content: TITLE.parse(validatedInput.data.title), id: nanoid() },
      { kind: 'AUTHORS' as const, content: validatedInput.data.authors, id: nanoid() },
      {
        kind: 'ABSTRACT' as const,
        content: ABSTRACT.parse(validatedInput.data.pdf_parse.abstract.map(i => i.text).join('\n')),
        id: nanoid()
      },
      { kind: 'BODY' as const, content: convertSectionToTiptapContent(validatedInput.data.pdf_parse), id: nanoid() }
    ]);
  }
}

const convertSectionToTiptapContent = (pdf_parse: z.TypeOf<typeof _InputSchema>['pdf_parse']) => {
  const grouped = Object.entries(groupBy(pdf_parse.body_text, i => i.section));
  const JsonContent: Content = {
    type: 'doc',
    content: grouped.flatMap(([title, items]) => [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: title }]
      },
      ...items.map(i => ({
        type: 'paragraph',
        content: transformCitesToLinks(
          i,
          mapValues(pdf_parse.bib_entries, v => v.other_ids?.DOI?.[0] ?? null)
        )
      }))
    ])
  };

  return JsonContent;
};

type RESULT = z.TypeOf<typeof TIPTAP_JSON>['content'][1]['content'];

export function transformCitesToLinks(
  item: z.TypeOf<typeof _InputSchema>['pdf_parse']['body_text'][number],
  idInfo: Record<string, string | null>
): RESULT {
  const RES: RESULT = [];

  item.cite_spans.forEach((cite, index) => {
    const nextCite = item.cite_spans[index + 1];
    const ITEM_TEXT = item.text;

    const isLastCite = index + 1 === item.cite_spans.length;
    const isFirstCite = index === 0;

    if (isFirstCite && cite.start !== 0) {
      RES.push({ text: ITEM_TEXT.slice(0, cite.start), type: 'text' });
    }

    RES.push({
      text: ITEM_TEXT.slice(cite.start, cite.end),
      type: 'text',
      marks: [
        {
          type: 'link',
          attrs: { href: idInfo[cite.ref_id || ''] ? 'https://www.doi.org/' + idInfo[cite.ref_id || ''] : null, target: '_blank' }
        }
      ]
    });

    if (isLastCite && cite.end < ITEM_TEXT.length) {
      RES.push({ text: item.text.slice(cite.end), type: 'text' });
    }

    if (nextCite && nextCite.start > cite.end) {
      RES.push({ text: item.text.slice(cite.end, nextCite.start), type: 'text' });
    }
  });

  return RES;
}
