import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './blocks-container';
export * from './blocks';

configure({ enforceActions: 'never' });
