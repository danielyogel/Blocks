import React from 'react';
import { Block, InitEditor } from '../index';
import '../index.css';
import { TITLE } from '../SubBlocks/TITLE';

const INITIAL_STATE = [{ kind: 'TITLE' as const, content: '', id: 'adasdasd' }];

const Editor = InitEditor({ blocks: { TITLE } });

export const Demo = () => {
  const [state, setState] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    console.info(state);
  }, [state]);

  return (
    <div className='p-4'>
      <Editor value={state} onChange={setState} />
    </div>
  );
};
