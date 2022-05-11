import type { Block } from '../blocksContainer/types';
import { RichText } from '../components/Editors';

const parse = (text: string) => text;

export const VIDEO: Block<string> = {
  Icon: () => <div>Video</div>,
  initialValue: '',
  parse: parse,
  stringify: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
