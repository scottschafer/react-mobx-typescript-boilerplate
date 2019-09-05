import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RootStore } from '@app/stores/RootStore';

import style from './WidgetEditorContainer.less';
import { ROUTES } from '../../../../constants/routes';
import { Link } from 'react-router-dom';

@inject('rootStore')
@observer
export class WidgetEditorContainer extends React.Component<any> {

  constructor(props: any, context: any) {
    super(props, context);
  }

  get rootStore(): RootStore {
    return this.props['rootStore'] as RootStore;
  }

  render() {

    return (
      <>
        <h1 className='' style={style}>Editor</h1>
        <h2> TODO: display editor UI, call additional APIs etc</h2>

        <Link to={ROUTES.list}>Done</Link>

      </>
    );
  }
}
