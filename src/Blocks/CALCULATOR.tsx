import { Block } from '../BlocksContainer/types';
import { RichText } from '../components/Editors';

export const CALCULATOR: Block<number> = {
  Icon: () => <div>CALCULATOR</div>,
  initialValue: 3,
  convertString: null,
  View: (params: { content: number; onChange: (content: number) => void }) => {
    return <div>{params.content}</div>;
  }
};
