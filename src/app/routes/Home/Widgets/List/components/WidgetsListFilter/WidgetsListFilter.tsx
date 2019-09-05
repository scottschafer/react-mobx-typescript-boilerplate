import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, computed, action, runInAction } from 'mobx';
import style from './WidgetsListFilter.less';

interface WidgetsListFilterProps {
  readonly filterName: string;
  readonly filterMinSprockets: number;

  readonly onChangeFilterName: (value: string) => void;
  readonly onChangeFilterMinSprockets: (value: number) => void;
}


@observer
export class WidgetsListFilter extends React.Component<WidgetsListFilterProps> {

  private handleFilterNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChangeFilterName(event.target.value);
  }

  private handleFilterMinSprocketChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChangeFilterMinSprockets(parseInt(event.target.value, 10));
  }

  render() {

    return (

      <div className='WidgetsListFilter' style={style}>
        <h3>Filters</h3>
        <form>
          <label>
            Name:
            <input type="text"
              value={this.props.filterName}
              onChange={e => this.handleFilterNameChange(e)} />
          </label>
          <label>
            # min sprockets:
            <input type="text"
              value={this.props.filterMinSprockets ? this.props.filterMinSprockets : ''}
              onChange={e => this.handleFilterMinSprocketChange(e)} />
          </label>
        </form>
      </div>
    );
  }

}
