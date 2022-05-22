import { Block } from '../interfaces/Block';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<div>${text}<div/>`;

export const DATA: Block<string> = {
  Icon: () => <div>Data</div>,
  initialValue: parse(''),
  _fromString: parse,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
