import * as React from 'react';
import { observer } from 'mobx-react';
import style from './WidgetsList.less';
import WidgetModel from '@app/models/WidgetModel';
import { Link } from 'react-router-dom';

interface WidgetsListProps {
  readonly widgets: Array<WidgetModel>;
}


@observer
export class WidgetsList extends React.Component<WidgetsListProps> {


  render() {

    return (
      <>
        <h4 id='widgetGridLabel'>Widgets:</h4>
        <table role='grid'
          aria-labelledby='widgetGridLabel'
          aria-rowcount={this.props.widgets.length}
          aria-columncount={3}
        >
          <tr data-fixed='true'>
            <th>Name</th>
            <th># Sprockets</th>
          </tr>

          {
            this.props.widgets.map((widget, i) =>
              <tr key={widget.id} aria-rowindex={i + 1}>
                <td aria-coindex='1'>{widget.text}</td>
                <td aria-coindex='2'>{widget.numSprockets}</td>
                <td aria-coindex='3'>
                  <Link to={`/editor/${widget.id}`} aria-label='Edit widget'>Edit</Link>
                </td>
              </tr>)
          }

        </table>
      </>
    );
  }

}
