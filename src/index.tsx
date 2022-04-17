import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './SemanticBlocks';

configure({ enforceActions: 'never' });
