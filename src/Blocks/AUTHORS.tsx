import type { Block } from '../bbb';
import { RichText } from '../components/Editors';

const parse = (text: string) => `<h3>${text}<h3/>`;

export const AUTHORS: Block<{ email: string; first: string; last: string; middle: string[]; suffix: string }[]> = {
  Icon: () => <div>Authors</div>,
  initialValue: [],
  parse: () => [], // TODO
  stringify(authors) {
    return JSON.stringify(authors);
  },
  View: params => {
    return (
      <div>
        <div className='font-bold' style={{ fontSize: '10px' }}>
          Authors
        </div>

        <div className='flex mt-2'>
          {params.content.map((a, i) => {
            return (
              <div
                key={i}
                className='rounded-full bg-primary px-5 py-1 mr-2 last:mr-9 text-white text-sm opacity-90 hover:opacity-100 transition-opacity duration-200 truncate'
              >
                {a.first + ' ' + a.last}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
