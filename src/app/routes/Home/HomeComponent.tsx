import * as React from 'react';
import { Route } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { WidgetsListContainer } from '@app/routes/Home/Widgets/List/WidgetsListContainer';
import { WidgetEditorContainer } from './Widgets/Editor/WidgetEditorContainer';
import { Link } from 'react-router-dom';

// The contents of the home page (not shown in subpages)
export class HomeComponent extends React.Component {
  render() {
    return (
      <Link to={ROUTES.list}>View widgets</Link>
    );
  }
}