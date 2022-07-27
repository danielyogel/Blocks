import React from 'react';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE, EMBED_CODE, BODY_SIMPLE } from './blocks';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

const Editor = InitEditor({
  blocks: { TITLE, AUTHORS, ABSTRACT, BODY: BODY_SIMPLE, IMAGE, EMBED_CODE }
});

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const [state, setState] = React.useState<State>([
    {
      id: nanoid(),
      content: TITLE._fromString('disabled title'),
      disabled: true,
      kind: 'TITLE',
      links: [
        [
          { kind: 'ABSTRACT', content: '', id: 'sad', disabled: false },
          { kind: 'ABSTRACT', content: 'sd', id: 'sad', disabled: false }
        ]
      ]
    },
    {
      id: nanoid(),
      content: BODY_SIMPLE._fromString('body'),
      disabled: false,
      kind: 'BODY',
      links: [
        [
          { kind: 'ABSTRACT', content: '', id: 'sad', disabled: false },
          { kind: 'ABSTRACT', content: 'sd', id: 'sad', disabled: false }
        ]
      ]
    }
  ]);

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
