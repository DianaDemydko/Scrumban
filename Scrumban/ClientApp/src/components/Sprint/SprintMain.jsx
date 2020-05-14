import React from 'react';
import { SprintTable } from './SprintTable';

import './DatePicker.css'

export class SprintMain extends React.Component {

    constructor(props) {
        super(props)
        this.state =
            {
                teams: []
            }
    }
    componentDidMount() {
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }
 
  render() {
      return (
          <div>
              <SprintTable moveToComponent={this.props.moveToComponent} teams={this.state.teams} />
         </div>
    );
  }
}
