import { z } from 'zod';
import { nanoid } from 'nanoid';
import { isLeft, isRight, left, right } from '../utils';
import { parsedApiPDf } from './fixtures';
import { ABSTRACT, TITLE } from '../Blocks';

const _Schema = z.object({
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

export type SchemaType = z.TypeOf<typeof _Schema>;

export function parsePdf(input: unknown) {
  const result = _Schema.safeParse(input);

  if (!result.success) {
    return left(result.error);
  } else {
    return right([
      { kind: 'TITLE' as const, content: TITLE.parse(result.data.title), id: nanoid() },
      { kind: 'AUTHORS' as const, content: result.data.authors, id: nanoid() },
      {
        kind: 'ABSTRACT' as const,
        content: ABSTRACT.parse(result.data.pdf_parse.abstract.map(i => i.text).join('\n')),
        id: nanoid()
      },
      { kind: 'BODY' as const, content: result.data.pdf_parse.body_text, id: nanoid() }
    ]);
  }
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('parses "parsedApiPdf', () => {
    const result = parsePdf(parsedApiPDf);
    if (isLeft(result)) console.log(JSON.stringify(result.left, null, 4));
    expect(isRight(result)).toBe(true);
  });
}
