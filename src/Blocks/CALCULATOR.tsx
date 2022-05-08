import { RichText } from '../BlocksContainer/Editors';

export const CALCULATOR = {
  Icon: () => <div>CALCULATOR</div>,
  initialValue: '',
  convertString: null,
  View: (params: { content: number; onChange: (content: number) => void }) => {
    return <div>{params.content}</div>;
  }
};
