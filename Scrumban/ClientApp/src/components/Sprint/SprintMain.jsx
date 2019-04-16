import React from 'react';
import { SprintTable } from './SprintTable';

import './DatePicker.css'

export class SprintMain extends React.Component {
 
  render() {
      return (
          <div>
              <SprintTable moveToComponent2={this.props.moveToComponent2} />
         </div>
    );
  }
}
