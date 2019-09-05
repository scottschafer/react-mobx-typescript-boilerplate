import { WidgetModel } from '@app/models/WidgetModel';

export interface WidgetAPI {
  load(): Promise<Array<WidgetModel>>;
}