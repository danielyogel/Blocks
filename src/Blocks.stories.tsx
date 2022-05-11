import React from 'react';
import { nanoid } from 'nanoid';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE } from './blocks';
import { parsedApiPDf } from './parsers/fixtures';
import { parsePdf } from './parsers';
import { isLeft } from 'fp-ts/lib/Either';

const res = parsePdf(parsedApiPDf);

if (isLeft(res)) {
  throw new Error(res.left.message, res.left);
}

const Editor = InitEditor({
  blocks: { TITLE, AUTHORS, ABSTRACT, BODY, IMAGE }
});

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const [state, setState] = React.useState<State>(res.right);

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <Editor value={state} onChange={setState} />
    </div>
  );
};
