import { z } from 'zod';
import { nanoid } from 'nanoid';
import { groupBy, isLeft, isRight, left, right } from '../../utils';
import { parsedApiPDf } from './fixtures';
import { ABSTRACT, TITLE } from '../../blocks';
import { Content } from '@tiptap/react';

export const _InputSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({ email: z.string(), first: z.string(), last: z.string(), middle: z.array(z.string()), suffix: z.string() })),
  pdf_parse: z.object({
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
      { kind: 'BODY' as const, content: convertSectionToTiptapcontent(validatedInput.data.pdf_parse.body_text), id: nanoid() }
    ]);
  }
}

const convertSectionToTiptapcontent = (bodyText: z.TypeOf<typeof _InputSchema>['pdf_parse']['body_text']) => {
  const grouped = Object.entries(groupBy(bodyText, i => i.section));
  const JsonContent: Content = {
    type: 'doc',
    content: grouped.flatMap(([title, items]) => [
      { type: 'paragraph', content: [{ type: 'text', text: title }] },
      ...items.map(i => ({ type: 'paragraph', content: [{ type: 'text', text: i.text }] }))
    ])
  };

  return JsonContent;
};
