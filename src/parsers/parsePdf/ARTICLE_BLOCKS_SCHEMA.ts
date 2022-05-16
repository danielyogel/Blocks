import { z } from 'zod';
import { left, right } from '../../utils';
import { _InputSchema } from './toBlocks';

export const TIPTAP_JSON = z.object({
  type: z.literal('doc'),
  content: z.array(
    z.union([
      z.object({
        type: z.literal('heading'),
        attrs: z.object({ level: z.literal(2) }),
        content: z.array(
          z.object({
            type: z.literal('text'),
            text: z.string()
          })
        )
      }),
      z.object({
        type: z.literal('paragraph'),
        content: z.array(
          z.object({
            type: z.literal('text'),
            text: z.string(),
            marks: z
              .tuple([z.object({ type: z.literal('link'), attrs: z.object({ href: z.string().nullable(), target: z.literal('_blank') }) })])
              .optional()
          })
        )
      })
    ])
  )
});

export const Result_Schema = (input: unknown) => {
  const res = z
    .tuple([
      z.object({
        kind: z.literal('TITLE'),
        content: z.string(),
        id: z.string()
      }),
      z.object({
        kind: z.literal('AUTHORS'),
        content: _InputSchema.shape.authors,
        id: z.string()
      }),
      z.object({
        kind: z.literal('ABSTRACT'),
        content: z.string(),
        id: z.string()
      }),
      z.object({
        kind: z.literal('BODY'),
        id: z.string(),
        content: TIPTAP_JSON
      })
    ])
    .safeParse(input);

  if (!res.success) {
    return left(res.error);
  } else {
    return right(res.data);
  }
};
