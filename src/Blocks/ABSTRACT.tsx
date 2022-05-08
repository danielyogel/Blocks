import { Block } from '../BlocksContainer/types';
import { RichText } from '../components/Editors';

export const ABSTRACT: Block<string> = {
  Icon: () => <div>Abstract</div>,
  initialValue: '',
  convertString: (html: string) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    const text = div.innerText;
    return `<div>${text}</div>`;
  },
  View: RichText([])
};
