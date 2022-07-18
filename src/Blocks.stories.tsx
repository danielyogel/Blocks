import React from 'react';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE, EMBED_CODE } from './blocks';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

const Editor = InitEditor({
  blocks: { TITLE, AUTHORS, ABSTRACT, BODY, IMAGE, EMBED_CODE }
});

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const [state, setState] = React.useState<State>([{ id: nanoid(), content: TITLE._fromString('disabled title'), disabled: true, kind: 'TITLE' }]);

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
