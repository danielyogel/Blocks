import React from 'react';
import { useEditor, EditorContent, PureEditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Menu from './Menu';

type Params = {
  value: string | null;
  onChange: (value: string) => void;
  height: 'h-32' | 'h-72' | 'h-auto';
  readOnly?: boolean;
  placeholder?: string;
  uploader: (file: File) => Promise<string>;
};

export function RichTextEditor({ value, onChange, height, readOnly = false, placeholder, uploader }: Params) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder, emptyNodeClass: 'is-editor-empty text-gray' }),
      Underline,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Link.configure({ openOnClick: true, linkOnPaste: true })
    ],
    editorProps: { attributes: { class: 'focus:outline-none' } },
    onUpdate: v => onChange(v.editor.getHTML()),
    content: `${value === null ? '' : value}`,
    editable: readOnly ? false : true
  });

  const [wasInit, setWasInit] = React.useState(false);

  React.useEffect(() => {
    if (!wasInit && editor) {
      editor.chain().focus('end').run();
      setWasInit(true);
    }
  });

  if (!editor) {
    return null;
  }

  if (readOnly) {
    return (
      <div className='h-20 overflow-y-auto'>
        <EditorContent editor={editor} disabled={true} readOnly />
      </div>
    );
  }

  return (
    <div className='w-full group '>
      <div className='h-8 flex justify-start items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in'>
        <Menu editor={editor} uploader={uploader} />
      </div>

      <div
        className={`${height} overflow-y-auto cursor-pointer`}
        onClick={() => {
          editor.chain().focus().run();
        }}
      >
        <EditorContent editor={editor} placeholder='Enter Text.....' />
      </div>
    </div>
  );
}
