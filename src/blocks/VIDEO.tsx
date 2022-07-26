import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

const parse = (text: string) => text;

export const VIDEO: Block<string> = {
  Icon: () => <div>Video</div>,
  initialValue: '',
  _fromString: parse,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
