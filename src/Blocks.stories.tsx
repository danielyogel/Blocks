import React from 'react';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE, EMBED_CODE, BODY_SIMPLE } from './blocks';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

const Editor = InitEditor({
  blocks: { TITLE, ABSTRACT, BODY: BODY_SIMPLE, IMAGE, EMBED_CODE }
});

const BLOCKS_TO_LINK = [
  [
    { kind: 'BODY' as const, content: 'new link 1', id: 'adsf34', disabled: false },
    {
      kind: 'IMAGE' as const,
      content: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Pinta_Island_Tortoise_Lonesome_George_2008.jpg',
      id: 'fdfdf3',
      disabled: false
    }
  ],
  [
    { kind: 'BODY' as const, content: 'new link 2', id: 'gffgas', disabled: false },
    {
      kind: 'IMAGE' as const,
      content: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Pinta_Island_Tortoise_Lonesome_George_2008.jpg',
      id: 'asdasd23',
      disabled: false
    }
  ]
];

export const Demo = () => {
  type State = Parameters<typeof Editor>['0']['value'];
  const [selectBlock, setSelectedBlock] = React.useState<null | string>(null);

  const [state, setState] = React.useState<State>([
    {
      id: nanoid(),
      content: TITLE._fromString('disabled title'),
      disabled: true,
      kind: 'TITLE',
      links: [
        [
          { kind: 'BODY', content: 'first link', id: 'sadfdfd', disabled: false },
          {
            kind: 'IMAGE',
            content: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Pinta_Island_Tortoise_Lonesome_George_2008.jpg',
            id: 'sad',
            disabled: false
          }
        ],
        [
          { kind: 'BODY', content: 'first link', id: 'sadfdfd', disabled: false },
          {
            kind: 'IMAGE',
            content: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Pinta_Island_Tortoise_Lonesome_George_2008.jpg',
            id: 'sad',
            disabled: false
          }
        ]
      ]
    },
    {
      id: nanoid(),
      content: BODY_SIMPLE._fromString('body'),
      disabled: false,
      kind: 'BODY',
      links: [
        [
          { kind: 'ABSTRACT', content: '', id: 'dsdsdsds', disabled: false },
          { kind: 'ABSTRACT', content: 'sd', id: 'zxfeddfdsd', disabled: false }
        ]
      ]
    }
  ]);

  const [isViewMode, setViewMode] = React.useState(false);

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <div className='mb-5'>
        <button onClick={() => setViewMode(!isViewMode)} className={classNames('p-4 rounded', { 'bg-danger': isViewMode })}>
          View Only
        </button>
      </div>

      {selectBlock && (
        <div className='bg-gray flex flex-wrap' onClick={() => setSelectedBlock(null)}>
          {BLOCKS_TO_LINK.map(l => {
            return (
              <div
                className='m-1 border cursor-pointer'
                onClick={() => {
                  setState(s => s.map(n => (n.id === selectBlock ? { ...n, links: [l] } : n)));
                  setSelectedBlock(null);
                }}
              >
                {l[0].content}
              </div>
            );
          })}
        </div>
      )}

      <div>
        <Editor
          value={state}
          onChange={setState}
          viewMode={isViewMode}
          linkRequest={async id => {
            setSelectedBlock(id);
          }}
          renderLink={link => {
            return (
              <div className='w-20'>
                {link.map(n => {
                  return <div key={n.id}>{n.kind === 'IMAGE' ? <img src={n.content} alt='' /> : <span>{n.content}</span>}</div>;
                })}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
