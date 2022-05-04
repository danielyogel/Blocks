import { NodeValue } from '..';
import { assertNever } from '../utils';

export function blocksToHTML(blocks: Array<NodeValue>) {
  return blocks
    .map(function covertBlock(block: NodeValue) {
      switch (block.kind) {
        case 'ABSTRACT':
          return block.content;
        case 'AUTHORS':
          return block.content;
        case 'BODY':
          return block.content;
        case 'DATA':
          return block.content;
        case 'EMBED_CODE':
          return block.content;
        case 'GALLERY':
          return block.content;
        case 'IMAGE':
          return `<img src="${block.content}"/>`;
        case 'SUBTITLE':
          return block.content;
        case 'TITLE':
          return block.content;
        case 'VIDEO':
          return block.content;

        default:
          return assertNever(block.kind);
      }
    })
    .join('');
}
