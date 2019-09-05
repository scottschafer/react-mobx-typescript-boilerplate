import { RootStore } from './RootStore';
import { APIs } from '../apis/api';

export function createRootStore(history: History, apis: APIs) {
  const rootStore = new RootStore(history, apis);
  return {
    'rootStore': rootStore
  };
}
