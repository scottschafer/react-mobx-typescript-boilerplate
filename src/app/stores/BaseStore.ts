import { RootStore } from './RootStore';

export class BaseStore {
  private static allBaseStores: Array<BaseStore> = [];
  protected readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    BaseStore.allBaseStores.push(this);
  }

  public static initAll() {
    BaseStore.allBaseStores.forEach(store => store.init());
  }

  protected init() {
  }
}