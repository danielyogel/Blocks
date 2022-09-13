import React from 'react';
import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<h1>${text}<h1/>`;

export const TITLE: Block<string> = {
  Icon: () => <div>Title</div>,
  initialValue: '<h1><h1/>',
  _fromString: parse,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'], 'Title...')
};
