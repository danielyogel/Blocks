import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './lib';

configure({ enforceActions: 'never' });
