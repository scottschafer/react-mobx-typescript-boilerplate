import { APIs } from './api';
import { WidgetHttpAPI } from './widgets/WidgetHttpAPI';

export function createAPIs(): APIs {
  return new APIs(
    new WidgetHttpAPI
  )
}
