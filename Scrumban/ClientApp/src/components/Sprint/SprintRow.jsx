import React from 'react';
import { SprintEditForm } from './EditForm/SprintEditForm';
import moment from 'moment';

export class SprintRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sprint: { ...props.sprint },
            isEditMode: false
        }

        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)
        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onCancelEditMode = this.onCancelEditMode.bind(this)
        this.onEnableEditMode = this.onEnableEditMode.bind(this)
    }

    onCancelEditMode()
    {
        this.setState({ isEditMode: false })
    }

    onEnableEditMode()
    {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    onUpdatingSprintElement(sprint)
    {
        this.props.onUpdatingSprintElement(sprint)
        this.setState({ sprint: sprint })
    }

    onDeletingSprintElement(event)
    {
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
                        alert("Deleting element went wrong!")
                        break
                    case 200:
                        this.props.onDeletingSprintElement(sprint_id)
                        break
                }
            }.bind(this))
            .catch(() => alert("Unexpected error occured."))
    }

    render()
    {
        return (
            <React.Fragment>
            <tr key={this.state.sprint.sprint_id}>
                <td>{this.state.sprint.name}</td>
                    <td>{this.state.sprint.description}</td>
                    <td>{moment(this.state.sprint.startDate).format("MM-DD-YYYY")}</td>
                    <td>{moment(this.state.sprint.endDate).format("MM-DD-YYYY")}</td>
                <td>{this.state.sprint.sprintStatus}</td>
                <td>
                    <button type="button" class="btn btn-success" id={this.state.sprint.sprint_id} onClick={this.onEnableEditMode} >Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id={this.state.sprint.sprint_id} onClick={this.onDeletingSprintElement} >Delete</button>
                </td>
                </tr>
                {this.state.isEditMode ? <SprintEditForm sprint={this.state.sprint} statuses={this.props.statuses} onUpdatingSprintElement={this.onUpdatingSprintElement} onCancelEditMode={this.onCancelEditMode} /> : null}
            </React.Fragment>
        )
    }
}