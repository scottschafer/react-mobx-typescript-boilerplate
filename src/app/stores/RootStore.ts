import { configure } from 'mobx';

import RouterStore from "./RouterStore";
import { BaseStore } from '@app/stores/BaseStore';
import { APIs } from '@app/apis/api';

import { WidgetsListDataStore, WidgetsListViewStore } from '@app/routes/Home/Widgets/List';
import { WidgetEditorDataStore, WidgetEditorViewStore } from '@app/routes/Home/Widgets/Editor';

export class RootStore {
  // root store
  public readonly routerStore: RouterStore;

  // application stores
  public readonly widgetsListDataStore: WidgetsListDataStore;
  public readonly widgetsListViewStore: WidgetsListViewStore;

  public readonly widgetEditorDataStore: WidgetEditorDataStore;
  public readonly widgetEditorViewStore: WidgetEditorViewStore;

  constructor(history: History, public readonly apis: APIs) {
    this.routerStore = new RouterStore(<any>history);

    // create application stores
    this.widgetsListDataStore = new WidgetsListDataStore(this);
    this.widgetsListViewStore = new WidgetsListViewStore(this);

    // after stores are created, turn on strict mode
    BaseStore.initAll();
    configure({ enforceActions: 'always' });
  }
}
