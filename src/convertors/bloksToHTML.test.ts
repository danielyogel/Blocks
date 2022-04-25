import { assert, describe, it } from 'vitest';
import { blocksToHTML } from './blocksToHTML';

describe('blocksToHTML', () => {
  it('converts TITLE KIND', () => {
    expect(
      blocksToHTML([
        { kind: 'TITLE', content: '<h1>title</h1>', id: '' },
        { kind: 'IMAGE', content: 'www.google.com', id: '' }
      ])
    ).toBe('<h1>title</h1><img src="www.google.com"/>');
  });
});
