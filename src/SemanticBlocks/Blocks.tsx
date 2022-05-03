import React from 'react';
import { BaseModal } from '../components';
import { RichText } from './Editors';

export const Blocks = [
  {
    kind: 'TITLE',
    Icon: () => <div>Title</div>,
    initialValue: '<h1>This is your title<h1/>',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<h1>${text}</h1>`;
    },
    View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])
  },
  {
    kind: 'SUBTITLE',
    Icon: () => <div>Subtitle</div>,
    initialValue: '<h2>This is your subtitle</h2/>',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<h2>${text}</h2>`;
    },
    View: RichText(['Bold', 'Italic', 'Strike', 'Underline', 'redo', 'undo', 'Highlight'])
  },
  {
    kind: 'BODY',
    Icon: () => <div>Body</div>,
    initialValue: '<p>This is your body</p>',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([
      'Bold',
      'Italic',
      'Strike',
      'Underline',
      'redo',
      'undo',
      'Highlight',
      'bulletList',
      'image',
      'link',
      'setTextAlign',
      'orderedList'
    ])
  },
  {
    kind: 'IMAGE',
    Icon: () => <div>Image</div>,
    initialValue: '',
    convertString: null,
    View: (params: { content: string; onChange: (content: string) => void }) => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <div>
          <div onClick={() => setIsOpen(true)} className='w-9/12 max-w-6xl'>
            <img
              src={params.content || 'https://res.cloudinary.com/dgft70etn/image/upload/v1650810106/ImageUploads/e9ezl1KHOn32q3sU2wTyP_blob.jpg'}
              alt={params.content}
              className='w-full object-contain'
            />
          </div>
          <div>
            <BaseModal
              desktopMaxWidth='lg'
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              renderContent={onClose => {
                if (window.top) {
                  window.top.onmessage = (e: MessageEvent<any>) => {
                    if (e.data.file) {
                      params.onChange(e.data.file.url);
                      onClose();
                    }
                  };
                } else {
                  window.onmessage = (e: MessageEvent<any>) => {
                    if (e.data.file) {
                      params.onChange(e.data.file.url);
                      onClose();
                    }
                  };
                }
                return (
                  <iframe
                    src='https://tebra-media-center-3the2xxjta-uc.a.run.app/'
                    frameBorder='0'
                    className='h-full w-full bg-black absolute top-0 left-0 right-0 bottom-0'
                  ></iframe>
                );
              }}
            />
          </div>
        </div>
      );
    }
  },
  {
    kind: 'VIDEO',
    Icon: () => <div>Video</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  },
  {
    kind: 'GALLERY',
    Icon: () => <div>Gallery</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  },
  {
    kind: 'EMBED_CODE',
    Icon: () => <div>Embed Code</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  },
  {
    kind: 'ABSTRACT',
    Icon: () => <div>Abstract</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  },
  {
    kind: 'DATA',
    Icon: () => <div>Data</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  },
  {
    kind: 'AUTHORS',
    Icon: () => <div>Authors</div>,
    initialValue: '',
    convertString: (html: string) => {
      var div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return `<div>${text}</div>`;
    },
    View: RichText([])
  }
] as const;
