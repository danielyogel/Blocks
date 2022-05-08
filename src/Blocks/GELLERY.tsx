import { RichText } from '../components/Editors';

export const GELLERY = {
  Icon: () => <div>Gallery</div>,
  initialValue: '',
  convertString: (html: string) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    const text = div.innerText;
    return `<div>${text}</div>`;
  },
  View: RichText([])
};
