import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './blocksContainer';

configure({ enforceActions: 'never' });
