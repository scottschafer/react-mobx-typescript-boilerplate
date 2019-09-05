import { observable, action, reaction, computed } from 'mobx';
import { WidgetModel } from '@app/models/WidgetModel';
import { MakeWritable } from '@app/utils/makeWriteable';
import { BaseStore } from '@app/stores/BaseStore';


export class WidgetsListViewStore extends BaseStore {

  // observable and computed properties
  @observable readonly filterName: string = '';
  @observable readonly filterMinSprockets: number = 0;

  @computed get filteredWidgets(): Array<WidgetModel> {
    return this.rootStore.widgetsListDataStore.widgets.filter(widget => {
      if (this.filterName && !widget.text.toLocaleLowerCase().includes(this.filterName.toLocaleLowerCase())) {
        return false;
      }
      if (this.filterMinSprockets && widget.numSprockets < this.filterMinSprockets) {
        return false;
      }
      return true;
    });
  }

  // actions
  @action setFilterName(value: string) {
    this.asWriteable.filterName = value;
  }

  @action setFilterMinSprockets(value: number) {
    this.asWriteable.filterMinSprockets = value;
  }

  protected init() {
    // setup business rules
  }



  // internal cast to writeable object
  private get asWriteable(): MakeWritable<WidgetsListViewStore> {
    return (this as MakeWritable<WidgetsListViewStore>);
  }
}

export default WidgetsListViewStore;
