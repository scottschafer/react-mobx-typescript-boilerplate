import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { RootStore } from '@app/stores/RootStore';
import WidgetsListDataStore from './stores/WidgetsListDataStore';
import WidgetsListViewStore from './stores/WidgetsListViewStore';

import style from './WidgetsListContainer.less';
import { WidgetsListFilter } from './components/WidgetsListFilter/WidgetsListFilter';
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator';
import { WidgetsList } from './components/WidgetsList/WidgetsList';

@inject('rootStore')
@observer
export class WidgetsListContainer extends React.Component {

  get rootStore(): RootStore {
    return this.props['rootStore'] as RootStore;
  }

  get dataStore(): WidgetsListDataStore {
    return this.rootStore.widgetsListDataStore;
  }

  get viewStore(): WidgetsListViewStore {
    return this.rootStore.widgetsListViewStore;
  }

  readonly handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.viewStore.setFilterName(e.target.value);
  }

  readonly handleFilterMinSprocketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = parseInt(e.target.value, 10);
    this.viewStore.setFilterMinSprockets(isNaN(newVal) ? 0 : newVal);
  }

  render() {
    return (
      <div style={style}>
        <h1>Widgets</h1>

        {(this.dataStore.state === 'loading') &&
          <LoadingIndicator></LoadingIndicator>}

        {(this.dataStore.state === 'idle') &&
          <div>
            {/* filters */}
            <WidgetsListFilter
              filterName={this.viewStore.filterName}
              filterMinSprockets={this.viewStore.filterMinSprockets}
              onChangeFilterName={value => this.viewStore.setFilterName(value)}
              onChangeFilterMinSprockets={value => this.viewStore.setFilterMinSprockets(value)} />

            <br />

            <p>
              <button onClick={() => this.dataStore.adjustSprocketCount(1)}>Add a sprocket to each widget</button>
            </p>


            <WidgetsList
              widgets={this.viewStore.filteredWidgets}>
            </WidgetsList>
          </div>}

      </div>
    );
  }
}
