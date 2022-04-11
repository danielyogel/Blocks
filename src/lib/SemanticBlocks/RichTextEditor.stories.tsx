import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SemanticBlocks, NodeValue } from './index';

export default {
  component: SemanticBlocks,
  title: 'Components/controls/SemanticBlocks'
} as Meta<React.ComponentProps<typeof SemanticBlocks>>;

const INITIAL_STATE: Array<NodeValue> = [];

export const withState = () => {
  const [state, setState] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className='p-20'>
      <SemanticBlocks value={state} onChange={setState} />
    </div>
  );
};
