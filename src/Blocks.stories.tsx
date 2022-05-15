import React from 'react';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE } from './blocks';
import { parsedApiPDf } from './parsers/parsePdf/fixtures';
import { pdfToBlocks } from './parsers/parsePdf/toBlocks';
import { isLeft } from 'fp-ts/lib/Either';
import classNames from 'classnames';

const res = pdfToBlocks(parsedApiPDf);

if (isLeft(res)) {
  throw new Error(res.left.message, res.left);
}

const Editor = InitEditor({
  blocks: { TITLE, AUTHORS, ABSTRACT, BODY, IMAGE }
});

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const [state, setState] = React.useState<State>(res.right);

  const [isViewMode, setViewMode] = React.useState(false);

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <div className='mb-5'>
        <button onClick={() => setViewMode(!isViewMode)} className={classNames('p-4 rounded', { 'bg-danger': isViewMode })}>
          View Only
        </button>
      </div>

      <div>
        <Editor value={state} onChange={setState} viewMode={isViewMode} />
      </div>
    </div>
  );
};
