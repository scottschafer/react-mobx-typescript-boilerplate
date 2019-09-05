import { WidgetAPI } from './WidgetAPI';
import WidgetModel from '@app/models/WidgetModel';

export class WidgetHttpAPI implements WidgetAPI {

  load(): Promise<Array<WidgetModel>> {
    return new Promise<Array<WidgetModel>>((resolve, reject) => {
      // simulate the API returning a bunch of widgets
      window.setTimeout(() => {
        const words = ['rigfap',
          'churbit',
          'napsate',
          'reatloid',
          'foutray',
          'moku',
          'wolide',
          'lofam',
          'pagbo',
          'plizzle'];

        const getRandomWord = () => {
          let result = words[Math.floor(Math.random() * words.length)];
          result = result[0].toUpperCase() + result.substr(1);
          return result;
        }
        const result: Array<WidgetModel> = [];
        for (let i = 0; i < 100; i++) {
          const name = `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`;
          const numWidgets = Math.floor(1 + Math.random() * 10);
          result.push(new WidgetModel(name, numWidgets));
        }
        resolve(result);
      }, 500);
    });
  }
}