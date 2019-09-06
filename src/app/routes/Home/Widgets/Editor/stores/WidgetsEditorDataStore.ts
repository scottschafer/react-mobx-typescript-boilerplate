import { observable, action, reaction } from 'mobx';
import { WidgetModel } from '@app/models/WidgetModel';
import { MakeWritable } from '@app/utils/makeWriteable';
import { BaseStore } from '@app/stores/BaseStore';
import { ROUTES } from '@app/constants/routes';

export type WidgetEditorDataStoreState = 'idle' | 'loading' | 'saving';

export class WidgetEditorDataStore extends BaseStore {

  // observable and computed properties
  @observable readonly state: WidgetEditorDataStoreState = 'idle';
  @observable readonly widgets: Array<WidgetModel> = [];
  @observable readonly widgetMessage: string = 'Hello from widgetland';

  // actions
  @action setState(value: WidgetEditorDataStoreState) {
    this.asWriteable.state = value;
  }

  @action setWidgets(value: Array<WidgetModel>) {
    this.asWriteable.widgets = value;
  }

  @action adjustSprocketCount(byValue: number = 1) {
    this.widgets.forEach(widget => {
      widget.setProperties({ numSprockets: (widget.numSprockets + byValue) });
    });
  }

  protected init() {
    // setup business rules
    this.autoLoadWidgetForEditing();
  }

  private autoLoadWidgetForEditing() {
    reaction(() => ({
      pathname: this.rootStore.routerStore.location.pathname
    }),
      () => {
        this.setState('loading');
        if (this.rootStore.routerStore.location.pathname === ROUTES.list) {
          this.rootStore.apis.widgetAPI.load().then(widgets => {
            this.setWidgets(widgets);
            this.setState('idle');
          });
        }
      }, { fireImmediately: true });
  }

  // internal cast to writeable object
  private get asWriteable(): MakeWritable<WidgetEditorDataStore> {
    return (this as MakeWritable<WidgetEditorDataStore>);
  }
}

export default WidgetEditorDataStore;
