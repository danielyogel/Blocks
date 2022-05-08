import React from 'react';
import { RichText } from '../components/Editors';

export const BODY = {
  Icon: () => <div>Body</div>,
  initialValue: '<p>This is your body</p>',
  convertString: (html: string) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    const text = div.innerText;
    return `<div>${text}</div>`;
  },
  View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight', 'bulletList', 'image', 'link', 'setTextAlign', 'orderedList'])
};
