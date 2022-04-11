import React, { useRef } from 'react';
import { Editor } from '@tiptap/react';
import { camelCase, fileToBase64 } from '../../utils/functionalProgramming';
import { assertNever } from '../../utils/functionalProgramming';

const Exts = [
  {
    name: 'Bold',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}
          d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"
        />
      </svg>
    )
  },
  {
    name: 'Italic',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" />
      </svg>
    )
  },
  {
    name: 'Underline',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" />
      </svg>
    )
  },
  {
    name: 'Strike',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" />
      </svg>
    )
  },
  {
    name: 'Highlight',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z" />
      </svg>
    )
  },
  {
    name: 'image',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, 0.5)`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      </svg>
    )
  },
  {
    name: 'setTextAlign',
    direction: 'left',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
      </svg>
    )
  },
  {
    name: 'setTextAlign',
    direction: 'center',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
      </svg>
    )
  },
  {
    name: 'setTextAlign',
    direction: 'right',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" />
      </svg>
    )
  },
  {
    name: 'setTextAlign',
    direction: 'justify',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" />
      </svg>
    )
  },
  {
    name: 'Heading',
    level: 1,
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0H24V24H0z" />
        <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" />
      </svg>
    )
  },
  {
    name: 'Heading',
    level: 2,
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0H24V24H0z" />
        <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" />
      </svg>
    )
  },
  {
    name: 'Heading',
    level: 3,
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0H24V24H0z" />
        <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" />
      </svg>
    )
  },
  {
    name: 'Heading',
    level: 4,
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0H24V24H0z" />
        <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z" />
      </svg>
    )
  },
  {
    name: 'Paragraph',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" />
      </svg>
    )
  },
  {
    name: 'bulletList',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
      </svg>
    )
  },
  {
    name: 'orderedList',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
      </svg>
    )
  },
  {
    name: 'link',
    Icon: ({ isActive }: { isActive: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" fill={`rgba(0, 0, 0, ${isActive ? '1' : '0.5'})`}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
      </svg>
    )
  },
  {
    name: 'undo',
    Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
      </svg>
    )
  },
  {
    name: 'redo',
    Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M16 7h-5a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h5V1l6 5-6 5V7z" />
      </svg>
    )
  }
] as const;

export default function Menu({ editor, uploader }: { editor: Editor; uploader: (file: File) => Promise<string> }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
          <button onClick={action} className="mr-3 w-4" key={index}>
            <ext.Icon isActive={isActive} />
          </button>
        );
      })}
      <input
        type="file"
        id="fileInputRichText123"
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
    </>
  );
}
