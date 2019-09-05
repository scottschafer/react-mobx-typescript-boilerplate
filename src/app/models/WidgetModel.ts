import { observable, runInAction, action } from 'mobx';
import { MakeWritableOptional } from '@app/utils/makeWriteable';

export class WidgetModel {
  readonly id: number;
  @observable readonly text: string;
  @observable readonly numSprockets: number;

  constructor(text: string, numSprockets: number) {
    this.id = WidgetModel.generateId();
    this.setProperties({ text: text, numSprockets: numSprockets });
  }

  @action setProperties(newProperties: MakeWritableOptional<WidgetModel>) {
    Object.keys(newProperties).forEach(prop => {
      this[prop] = newProperties[prop];
    });
  }

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }
}

export default WidgetModel;
