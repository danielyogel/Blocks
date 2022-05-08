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
    { kind: 'TITLE' as const, content: '', id: nanoid() },
    { kind: 'SUBTITLE' as const, content: '', id: nanoid() },
    { kind: 'BODY' as const, content: '', id: nanoid() },
    { kind: 'IMAGE' as const, content: '', id: nanoid() },
    { kind: 'VIDEO' as const, content: '', id: nanoid() },
    { kind: 'GELLERY' as const, content: '', id: nanoid() },
    { kind: 'DATA' as const, content: '', id: nanoid() },
    { kind: 'EMBED_CODE' as const, content: '', id: nanoid() },
    { kind: 'AUTHORS' as const, content: '', id: nanoid() },
    { kind: 'ABSTRACT' as const, content: '', id: nanoid() },
    { kind: 'FOOTER' as const, content: '', id: nanoid() }
  ]);

  return (
    <div className='p-4'>
      <Editor value={state} onChange={setState} />
    </div>
  );
};
