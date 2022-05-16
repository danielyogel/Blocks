import type { Block } from '../bbb';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<code>${text}<code/>`;

export const EMBED_CODE: Block<string> = {
  Icon: () => <div>Embed Code</div>,
  initialValue: '',
  parse: parse,
  stringify: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
