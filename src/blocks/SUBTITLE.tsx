import React from 'react';
import { RichText } from '../components/Editors';
import { Block } from '../interfaces';

const parse = (text: string) => `<h2>${text}<h2/>`;

export const SUBTITLE: Block<string> = {
  Icon: () => <div>Subtitle</div>,
  initialValue: parse(''),
  _fromString: parse,
  _toString: html => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'], 'Subtitle...')
};
