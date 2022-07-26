import { Block } from '../interfaces';

export const AUTHORS: Block<{ email: string; first: string; last: string; middle: string[]; suffix: string }[]> = {
  Icon: () => <div>Authors</div>,
  initialValue: [{ email: 'asd@asd.asd', first: 'firset', last: 'last', middle: [''], suffix: 'suffix' }],
  _fromString: () => [], // TODO
  _toString(authors) {
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
