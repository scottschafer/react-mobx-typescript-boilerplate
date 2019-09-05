import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { App } from '@app/index';
import { createRootStore } from '@app/stores';
import { createBrowserHistory } from 'history';
import { createAPIs } from '@app/apis/createAPIs';


// prepare MobX stores and apis
const history = createBrowserHistory();
const apis = createAPIs();
const rootStore = createRootStore((history as any) as History, apis);


// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
