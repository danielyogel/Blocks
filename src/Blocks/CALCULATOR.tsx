import type { Block } from '../blocksContainer/types';

export const CALCULATOR: Block<number> = {
  Icon: () => <div>CALCULATOR</div>,
  initialValue: 3,
  parse: Number,
  stringify: String,
  View: (params: { content: number; onChange: (content: number) => void }) => {
    return <div>{params.content}</div>;
  }
};
