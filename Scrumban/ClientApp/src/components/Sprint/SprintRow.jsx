import React from 'react';
import { SprintEditForm } from './EditForm/SprintEditForm';
import moment from 'moment';
import { toast } from 'react-toastify';

export class SprintRow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sprint: { ...props.sprint },
            isEditMode: false,
            teams: this.props.teams
        }

        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)
        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onCancelEditMode = this.onCancelEditMode.bind(this)
        this.onEnableEditMode = this.onEnableEditMode.bind(this)
        this.fetchTeams = this.fetchTeams.bind(this);
    }

fetchTeams() {
    fetch('api/team/getTeams')
        .then(res => res.json())
        .then(json => {
            this.setState({ teams: json })
        });
}

    onCancelEditMode()
    {
        this.setState({ isEditMode: false })
    }
    componentDidMount() {
        this.fetchTeams();
    }

    onEnableEditMode()
    {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    onUpdatingSprintElement(sprint)
    {
        this.props.onUpdatingSprintElement(sprint)
        this.setState({ sprint: sprint, isEditMode: false })
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
                        toast.error("Deleting element went wrong!")
                        break
                    case 200:
                        this.props.onDeletingSprintElement(sprint_id)
                        toast.success("Sprint was deleted!");
                        break
                }
            }.bind(this))
            .catch(() => alert("Unexpected error occured."))
    }

    render()
    {
        return (
            <React.Fragment>
                {this.state.isEditMode ? <SprintEditForm sprint={this.state.sprint} statuses={this.props.statuses} onUpdatingSprintElement={this.onUpdatingSprintElement} onCancelEditMode={this.onCancelEditMode} teams={this.props.teams}/> : 
            <tr key={this.state.sprint.sprint_id}>
                <td>{this.state.sprint.name}</td>
                        <td>{this.state.sprint.description}</td>
                    <td>{moment(this.state.sprint.startDate).format("MM-DD-YYYY")}</td>
                    <td>{moment(this.state.sprint.endDate).format("MM-DD-YYYY")}</td>
                        <td>{this.state.sprint.sprintStatus}</td>
                        <td>{this.state.sprint.teamId != null ?
                            this.state.sprint.team
                            : "None"
                        }</td>
                        <td>
                        {this.props.currentUser.roleId != 1 ?
                            (
                               
                                    <button type="button" class="btn btn-sm btn-outline-dark w-100 m-1" id={this.state.sprint.sprint_id} onClick={this.onEnableEditMode} >Edit</button>
                      
                             ) : null}
                        </td>
                        <td>
                            {this.props.currentUser.roleId != 1 ?
                                (
                        <button type="button" class="btn btn-sm btn-outline-dark w-100 m-1" id={this.state.sprint.sprint_id} onClick={this.onDeletingSprintElement} >Delete</button>

                                ) : null}
                        </td>
                    </tr>
                 }
            </React.Fragment>
        )
    }
}