import React from 'react';
import { InitEditor } from './index';
import './index.css';
import { TITLE, ABSTRACT, AUTHORS, BODY, IMAGE, EMBED_CODE, BODY_SIMPLE } from './blocks';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useDebounce } from 'ahooks';
import { AnimatePresence, motion } from 'framer-motion';

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
          { kind: 'BODY', content: 'Second link', id: 'sadfdfd', disabled: false },
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
  const [focusesed, setFocuses] = React.useState<null | State[number]>(null);
  const isFocusedDebounced = useDebounce(focusesed, { wait: 400 });

  return (
    <div className='p-4 max-w-2xl mx-auto'>
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
        {isFocusedDebounced && (
          <div className='fixed top-1 right-1 text-danger'>
            <AnimatePresence>
              {isFocusedDebounced && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setFocuses(isFocusedDebounced)}
                  onMouseLeave={() => setFocuses(null)}
                >
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 fixed w-64 right-3 top-3'>
                    {isFocusedDebounced.links.map((link, i) => {
                      return (
                        <div key={i}>
                          <div className='w-full relative'>
                            {link.map(n => {
                              return (
                                <div key={n.id}>
                                  {n.kind === 'IMAGE' ? (
                                    <img src={n.content} alt='' />
                                  ) : (
                                    <span className='absolute top-10 left-10 text-white'>{n.content}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            ,
          </div>
        )}
      </div>

      <div>
        <Editor
          value={state}
          onChange={setState}
          viewMode={isViewMode}
          singularMode={false}
          linkRequest={async id => {
            setSelectedBlock(id);
          }}
          onBlockFocus={setFocuses}
          newBlockRequest={(kind, next) => {
            if (kind === 'ABSTRACT') {
              setTimeout(() => {
                const n = { kind: 'ABSTRACT' as const, content: 'from outside', id: nanoid(), disabled: false, links: [] };
                next(n);
              }, 1000);
            } else {
              next();
            }
          }}
        />
      </div>
    </div>
  );
};
