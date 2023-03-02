import { RichText } from '../components/Editors';
import { Block } from '../interfaces';

const _parse = (text: string) => `<h3>${text}<h3/>`;

type HTML = string;

export const PUBLICATION_DATE: Block<HTML> = {
  Icon: () => <span className='text-center'>Publication Date</span>,
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
          Publication Date
        </div>
        <div className='text-2xl'>{RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'], 'Date...')(params)}</div>
      </div>
    );
  }
};
