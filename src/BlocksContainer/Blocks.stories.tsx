import React from 'react';
import { nanoid } from 'nanoid';
import { InitEditor } from '../index';
import '../index.css';
import { FOOTER, TITLE, ABSTRACT, AUTHORS, BODY, DATA, EMBED_CODE, GELLERY, IMAGE, SUBTITLE, VIDEO } from '../Blocks';

const Editor = InitEditor({
  blocks: { TITLE, BODY, IMAGE, SUBTITLE, VIDEO, GELLERY, DATA, EMBED_CODE, AUTHORS, ABSTRACT, FOOTER }
});

export const Demo = () => {
  const [state, setState] = React.useState([
    { kind: 'TITLE' as const, content: 'TITLE', id: nanoid() },
    { kind: 'SUBTITLE' as const, content: 'SUBTITLE', id: nanoid() },
    { kind: 'BODY' as const, content: 'BODY', id: nanoid() },
    { kind: 'IMAGE' as const, content: 'IMAGE', id: nanoid() },
    { kind: 'VIDEO' as const, content: 'VIDEO', id: nanoid() },
    { kind: 'GELLERY' as const, content: '', id: nanoid() },
    { kind: 'DATA' as const, content: 'DATA', id: nanoid() },
    { kind: 'EMBED_CODE' as const, content: 'EMBED_CODE', id: nanoid() },
    { kind: 'AUTHORS' as const, content: 'AUTHORS', id: nanoid() },
    { kind: 'ABSTRACT' as const, content: 'ABSTRACT', id: nanoid() },
    { kind: 'FOOTER' as const, content: 'FOOTER', id: nanoid() }
  ]);

  return (
    <div className='p-4'>
      <Editor value={state} onChange={setState} />
    </div>
  );
};
