import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './bbb';
export * from './blocks';

configure({ enforceActions: 'never' });
