import React from 'react';
import { SprintRow } from './CreateForm/SprintRow'

export class FetchSprintData extends React.Component
{
   
    constructor(props) {
        super(props)
        this.state = { sprints: [], loading: true, isEditing: false }

        this.fetchSprintData = this.fetchSprintData.bind(this)
        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)
        this.fetchSprintData()
    }

    fetchSprintData() {
        this.setState({ loading: true })
        fetch('api/Sprint/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ sprints: data, loading: false });
            })
    }

    onUpdatingSprintElement(sprint) {
        fetch('api/Sprint/Edit',
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sprint),
            method: 'put'
        })
        .then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 400:
                    alert("Editing element went wrong!")
                    break
                case 200:
                    this.setState(
                        {
                            sprints: this.state.sprints.map(item => item.sprint_id == sprint.sprint_id ? sprint : item)
                        })
                    break
            }
        }.bind(this))
        .catch(() => alert("Unexpected error occured"))
    }

    onDeletingSprintElement(event) {
        let sprint_id = event.target.id
        
        fetch('api/Sprint/Delete',
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sprint_id),
                method: 'delete'
            })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        alert("De400leting element went wrong!")
                        break
                    case 200:
                        this.setState(
                            {
                                sprints: this.state.sprints.filter(item => { return item.sprint_id != sprint_id })
                            })
                        break
                }
            }.bind(this))
            .catch(() => alert("Unexpected error occured"))
    }

    renderSprintsTable(sprints) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sprints.map(sprint =>
                        <SprintRow sprint={sprint} onUpdatingSprintElement={this.onUpdatingSprintElement} onDeletingSprintElement={this.onDeletingSprintElement} />
                        )
                    }
                </tbody>
            </table>
            )
    }

    render() {
            let content = this.state.loading ? (
                <p>Loading...</p>
            )
            : this.renderSprintsTable(this.state.sprints);

        return (
            <div>
                <h1>Sprints</h1>
                <button type="button" class="btn btn-primary" onClick={this.fetchSprintData} >Load Sprint Table</button>
                {content}
            </div>
        );
    }
}
