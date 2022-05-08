import React from 'react';
import { RichText } from '../components/Editors';
import { Block } from '../BlocksContainer/types';

export const SUBTITLE: Block<string> = {
  Icon: () => <div>Subtitle</div>,
  initialValue: '<h2>This is your subtitle</h2/>',
  convertString: (html: string) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    const text = div.innerText;
    return `<h2>${text}</h2>`;
  },
  View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])
};
