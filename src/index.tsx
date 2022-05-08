import { configure } from 'mobx';
import './index.css';
import './proseMirror.css';

export * from './BlocksContainer';

configure({ enforceActions: 'never' });
