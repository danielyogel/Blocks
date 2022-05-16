import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './blocksContainer';
export * from './blocks';

configure({ enforceActions: 'never' });
