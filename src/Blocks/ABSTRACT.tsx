import { RichText } from '../BlocksContainer/Editors';

export const ABSTRACT = {
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
