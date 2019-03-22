import React from 'react';
import { FetchSprintData } from './FetchSprint';
import { SprintForm } from './CreateForm/SprintForm';

export class SprintMain extends React.Component {
 
  render() {
    

      return (
          <div>
              <SprintForm />

              <FetchSprintData />
         </div>
    );
  }
}
