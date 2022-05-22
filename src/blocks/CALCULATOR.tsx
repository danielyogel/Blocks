import { Block } from '../interfaces/Block';

export const CALCULATOR: Block<number> = {
  Icon: () => <div>CALCULATOR</div>,
  initialValue: 3,
  _fromString: Number,
  _toString: String,
  View: (params: { content: number; onChange: (content: number) => void }) => {
    return <div>{params.content}</div>;
  }
};
