
import * as React from 'react';
import { Switch, Route } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { WidgetsListContainer } from '@app/routes/Home/Widgets/List/WidgetsListContainer';
import { WidgetEditorContainer } from './Widgets/Editor/WidgetEditorContainer';
import { HomeComponent } from './HomeComponent';

export class HomeContainer extends React.Component<any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <>
        <Route path='/' exact component={HomeComponent} />
        <Route path={ROUTES.list} component={WidgetsListContainer} />
        <Route exact path={ROUTES.editor + '/:id'} component={WidgetEditorContainer} />
      </>
    );
  }
}