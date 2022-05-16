import React from 'react';
import type { Block } from '../blocks-container';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<h1>${text}<h1/>`;

export const TITLE: Block<string> = {
  Icon: () => <div>Title</div>,
  initialValue: '<h1>This is your title<h1/>',
  parse: parse,
  stringify: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])
};
