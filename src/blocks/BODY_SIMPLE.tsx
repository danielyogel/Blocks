import { Block } from '../interfaces';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<h3>${text}<h3/>`;

type HTML = string;

export const BODY_SIMPLE: Block<HTML> = {
  Icon: () => <div>Body</div>,
  initialValue: parse('This is your body'),
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
          Body
        </div>
        <div>{RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])(params)}</div>
      </div>
    );
  }
};
