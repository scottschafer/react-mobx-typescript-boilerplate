import * as React from 'react';
import { observer } from 'mobx-react';
import style from './LoadingIndicator.less';

const spinnerImage = require('@assets/images/loading_circle128.gif');

interface LoadingIndicatorProps {
  readonly label?: string;
}

@observer
export class LoadingIndicator extends React.Component<LoadingIndicatorProps> {

  constructor(props: LoadingIndicatorProps) {
    super(props);
  }

  render() {

    return (
      <h2
        className='LoadingIndicator'
        style={style}
        role='alert'
        aria-busy='true'>
        <img src={spinnerImage}></img>

        <span>
          {this.props.label ? this.props.label : 'Loading...'}
        </span>
      </h2>
    );
  }
}
