import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export { Init as InitEditor } from './blocks-container';
export * from './blocks';
export { RichText, RichTextJSON } from './components/Editors';
export type { Block } from './interfaces';

configure({ enforceActions: 'never' });
