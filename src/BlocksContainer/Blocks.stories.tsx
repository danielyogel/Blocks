import React from 'react';
import { nanoid } from 'nanoid';
import { InitEditor } from '../index';
import '../index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, GELLERY, IMAGE, SUBTITLE } from '../Blocks';

const Editor = InitEditor({
  blocks: { TITLE, BODY, IMAGE, SUBTITLE, GELLERY, AUTHORS, ABSTRACT }
});

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];

  const [state, setState] = React.useState<State>([{ kind: 'TITLE' as const, content: 'This is a title', id: nanoid() }]);

  return (
    <div className='p-4'>
      <Editor value={state} onChange={setState} />
    </div>
  );
};
