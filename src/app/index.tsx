import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom'

import { HomeContainer } from './routes/Home/HomeContainer';
import { USE_HASH_ROUTING } from '@app/stores';


class Root extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
}

const routes = <Switch>
  <Route path="/" component={HomeContainer} />
</Switch>;


// render react DOM
export const App = hot(({ history }) => (
  <Root>
    {USE_HASH_ROUTING &&
      <HashRouter history={history}>

        {routes}
      </HashRouter>}

    {!USE_HASH_ROUTING &&
      <Router history={history}>

        {routes}
      </Router>}

  </Root>
));
