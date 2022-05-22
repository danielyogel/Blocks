import { Block } from '../interfaces/Block';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<h3>${text}<h3/>`;

type HTML = string;

export const ABSTRACT: Block<HTML> = {
  Icon: () => <div>Abstract</div>,
  initialValue: parse('This is your abstract'),
  _fromString: parse,
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
        <div>{RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])(params)}</div>
      </div>
    );
  }
};
