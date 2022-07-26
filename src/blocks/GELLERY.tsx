import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

export const GELLERY: Block<string> = {
  Icon: () => <div>Gallery</div>,
  initialValue: '',
  _fromString: s => s,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText([])
};
