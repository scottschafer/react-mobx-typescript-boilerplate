import { History } from 'history';
import { computed } from 'mobx';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';

export const USE_HASH_ROUTING = false;

export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get pathname(): string {
    return this.location.pathname;
  }
}

export default RouterStore;
