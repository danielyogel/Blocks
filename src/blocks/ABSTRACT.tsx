import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

const _parse = (text: string) => `<h3>${text}<h3/>`;

type HTML = string;

export const ABSTRACT: Block<HTML> = {
  Icon: () => <div>Abstract</div>,
  initialValue: _parse(''),
  _fromString: _parse,
  _toString(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  },
  View(params) {
    return (
      <div>
        <div className='font-bold text-xs mb-1' style={{ fontSize: '10px' }}>
          Abstract
        </div>
        <div>{RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'], 'Abstract...')(params)}</div>
      </div>
    );
  }
};
