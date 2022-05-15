import React, { useRef } from 'react';
import { Editor, BubbleMenu } from '@tiptap/react';
import { camelCase, fileToBase64 } from '../../utils/functionalProgramming';
import { assertNever } from '../../utils/functionalProgramming';
import { Exts } from './Exts';

type Params = {
  editor: Editor;
  uploader: (file: File) => Promise<string>;
  allowedExtentions: Array<typeof Exts[number]['name']>;
};

export default function Menu({ editor, uploader, allowedExtentions }: Params) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='bg-white px-2 py-2 rounded-sm shadow-gray-dark shadow'>
      {Exts.map((ext, index) => {
        const { action, isActive } = (() => {
          switch (ext.name) {
            case 'link':
              return {
                action: () => {
                  const url = window.prompt('Enter link:', editor.getAttributes('link').href);
                  if (url === null) return;
                  if (url === '') return editor.chain().focus().extendMarkRange('link').unsetLink().run();
                  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                },
                isActive: editor.isActive('link')
              };
            case 'image':
              return {
                action: () => {
                  fileInputRef?.current?.click();
                },
                isActive: editor.isActive('link')
              };
            case 'Bold':
            case 'Highlight':
            case 'Strike':
            case 'Italic':
            case 'Underline':
              return { action: () => editor.chain().focus()[`toggle${ext.name}` as const]().run(), isActive: editor.isActive(camelCase(ext.name)) };
            case 'Heading':
              return {
                action: () => editor.chain().focus()[`toggle${ext.name}` as const]({ level: ext.level }).run(),
                isActive: editor.isActive(camelCase(ext.name), { level: ext.level })
              };
            case 'Paragraph':
              return { action: () => editor.chain().focus()[`set${ext.name}` as const]().run(), isActive: editor.isActive(camelCase(ext.name)) };
            case 'bulletList':
              return { action: () => editor.chain().focus()['toggleBulletList']().run(), isActive: editor.isActive(camelCase(ext.name)) };
            case 'orderedList':
              return { action: () => editor.chain().focus()['toggleOrderedList']().run(), isActive: editor.isActive(camelCase(ext.name)) };
            case 'undo':
            case 'redo':
              return { action: () => editor.chain().focus()[ext.name]().run(), isActive: editor.isActive(camelCase(ext.name)) };
            case 'setTextAlign':
              return {
                action: () => editor.chain().focus().setTextAlign(ext.direction).run(),
                isActive: editor.isActive({ textAlign: ext.direction })
              };
            default:
              return assertNever(ext);
          }
        })();
        return (
          <button onClick={action} className='mr-3 w-4' key={index}>
            <ext.Icon isActive={isActive} />
          </button>
        );
      })}
      <input
        type='file'
        id='fileInputRichText123'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={async e => {
          e.stopPropagation();
          const file = e.target.files?.[0];
          if (!file) {
            return null;
          }

          try {
            const src = await uploader(file);

            editor.chain().focus().setImage({ src }).run();
          } catch (e) {
            console.error(e);
            alert('Image Upload Failed');
          }
        }}
      />
    </BubbleMenu>
  );
}
