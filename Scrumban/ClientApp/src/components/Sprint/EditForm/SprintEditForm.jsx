import React from 'react';
import DatePicker from 'react-datepicker';

import { toast } from 'react-toastify'; 

export class SprintEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sprint: { ...props.sprint },
            statuses: this.props.statuses
        }

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
        this.onStartDateChanged = this.onStartDateChanged.bind(this)
        this.onEndDateChanged = this.onEndDateChanged.bind(this)
        this.onStatusChanged = this.onStatusChanged.bind(this)


        this.onUpdatingSprint = this.onUpdatingSprint.bind(this);
        this.onTeamChanged = this.onTeamChanged.bind(this);
    }

    onTeamChanged(e) {
        debugger
        let sprint = { ...this.state.sprint }
        var teamId = e.target.value;
        var teamName = e.target.selectedOptions[0].text;
        if (e.target.value === "None") {
            teamId = null;
        }
        sprint.teamId = teamId;
        sprint.team = teamName;
        this.setState({ sprint: sprint })
    }

    onStartDateChanged(startDate) {
        let sprint = { ...this.state.sprint }
        sprint.startDate = startDate
        this.setState({ sprint: sprint })
    }

    onEndDateChanged(endDate) {
        let sprint = { ...this.state.sprint }
        sprint.endDate = endDate
        this.setState({ sprint: sprint })
    }

    onNameChanged(event) {
        let sprint = { ...this.state.sprint }
        sprint.name = event.target.value
        this.setState({ sprint: sprint })
    }

    onDescriptionChanged(event) {
        let sprint = { ...this.state.sprint }
        sprint.description = event.target.value
        this.setState({ sprint: sprint })
    }

    onStatusChanged(event)
    {
        let sprint = { ...this.state.sprint }
        sprint.sprintStatus = event.target.value
        this.setState({ sprint: sprint })
    }

    onUpdatingSprint()
    {
        fetch('api/Sprint/Edit',
            {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.sprint),
                method: 'put'
            })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        toast.error("Updaiting element went wrong!")
                        break
                    case 200:
                        let temp = { ...this.state.sprint }
                        this.props.onUpdatingSprintElement(temp)

                        toast.success("Updated successfuly");
                        break
                }
            }.bind(this))
            .catch((e) => alert(e + "Unexpected error occured."))
    }

    render() {
        return (
            <tr >
                <td>
                       <div>
                            <label>Name</label>
                            <input type="text"
                                class="form-control"
                                placeholder="Name"
                                required
                                onChange={this.onNameChanged}
                                value={this.state.sprint.name}
                            />
                    </div>
                </td>
            <td>
                  <div>
                            <label>Description</label>
                            <textarea type="text"
                                rows="4"
                                class="form-control"
                                placeholder="Description"
                                required
                                onChange={this.onDescriptionChanged}
                                value={this.state.sprint.description}
                            />
                    </div>
                </td>
                <td>
                   <div>
                            <label>Start Date</label>
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.sprint.startDate}
                                onChange={this.onStartDateChanged}
                                minDate={new Date()}
                                maxDate={this.state.endDate}
                            />
                    </div>
                </td>
                <td>
                        <div >
                            <label>End Date</label>
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.sprint.endDate}
                                onChange={this.onEndDateChanged}
                                minDate={this.state.sprint.startDate}
                            />
                    </div>
                </td>
                <td>
                    <div >
                            <label>Status</label>
                        <select class="btn btn-light dropdown-toggle w-100 m-0" onChange={this.onStatusChanged} defaultValue={this.state.sprint.sprintStatus}>
                                {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                            </select>
                    </div>
                </td> 
                <td>
                    <div >
                        <label>Team</label>
                        <select class="btn btn-light dropdown-toggle w-100 m-0" onChange={this.onTeamChanged}>
                            <option>None</option>
                            {this.props.teams.map(team => {
                                if (team.teamID === this.state.sprint.teamId) {
                                    return <option value={team.teamID} selected>{team.name}</option>
                                } else {
                                    return <option value={team.teamID}>{team.name}</option>
                                }
                            }
                                )}
                        </select>
                    </div>
                </td> 
                <td>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.onUpdatingSprint} >Save</button>
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit"  onClick={this.props.onCancelEditMode} >Cancel</button>
                </td>
            </tr>
        )
    }
}