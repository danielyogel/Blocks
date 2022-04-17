import React from 'react';
import { SemanticBlocks, NodeValue } from '../index';
import '../index.css';

const INITIAL_STATE: Array<NodeValue> = [];

export const Demo = () => {
  const [state, setState] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    console.info(state);
  }, [state]);

  return (
    <div className='p-20'>
      <SemanticBlocks value={state} onChange={setState} />
    </div>
  );
};
