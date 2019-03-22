import React from 'react';
import { EditSprint } from '../EditSprint';

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
        this.props.onDeletingSprintElement(event)
    }

    render()
    {
        return (
            <React.Fragment>
            <tr key={this.state.sprint.sprint_id}>
                <td>{this.state.sprint.name}</td>
                <td>{this.state.sprint.description}</td>
                <td>{this.state.sprint.startDate}</td>
                <td>{this.state.sprint.endDate}</td>
                <td>{this.state.sprint.status}</td>
                <td>
                    <button type="button" class="btn btn-success" id={this.state.sprint.sprint_id} onClick={this.onEnableEditMode} >Edit</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id={this.state.sprint.sprint_id} onClick={this.onDeletingSprintElement} >Delete</button>
                </td>
                </tr>
                {this.state.isEditMode ? <EditSprint sprint={this.state.sprint} onUpdatingSprintElement={this.onUpdatingSprintElement} onCancelEditMode={this.onCancelEditMode} /> : null}
            </React.Fragment>
        )
    }
}