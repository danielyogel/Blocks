import type { Block } from '../bbb';
import { RichText } from '../components/Editors';

export const GELLERY: Block<string> = {
  Icon: () => <div>Gallery</div>,
  initialValue: '',
  parse: s => s,
  stringify: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
