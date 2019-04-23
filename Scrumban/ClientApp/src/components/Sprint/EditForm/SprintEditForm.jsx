import React from 'react';
import DatePicker from 'react-datepicker';

import './SprintEditForm.css'; 

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


        this.onUpdatingSprint = this.onUpdatingSprint.bind(this)
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
                        alert("Updaiting element went wrong!")
                        break
                    case 200:
                        let temp = { ...this.state.sprint }
                        this.props.onUpdatingSprintElement(temp)
                        break
                }
            }.bind(this))
            .catch((e) => alert(e+"Unexpected error occured."))
    }

    render() {
        return (
            <tr className="current-row">
                <td colSpan="7">
                    <form id="sprint-edit-form">
                        <div class="form-group" id="edit-name">
                            <label>Name:*</label>
                            <input type="text"
                                class="form-control"
                                placeholder="Name"
                                required
                                onChange={this.onNameChanged}
                                value={this.state.sprint.name}
                            />
                        </div>

                        <div class="form-group" id="edit-description">
                            <label>Description:*</label>
                            <textarea type="text"
                                rows="4"
                                class="form-control"
                                placeholder="Description"
                                required
                                onChange={this.onDescriptionChanged}
                                value={this.state.sprint.description}
                            />
                        </div>

                        <div class="form-group" id="edit-start-date">
                            <label>Start Date:*</label>
                            <br />
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.sprint.startDate}
                                onChange={this.onStartDateChanged}
                                minDate={new Date()}
                                maxDate={this.state.endDate}
                            />
                        </div>

                        <div class="form-group" id="edit-end-date">
                            <label>End Date:*</label>
                            <br />
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.sprint.endDate}
                                onChange={this.onEndDateChanged}
                                minDate={this.state.sprint.startDate}
                            />
                        </div>

                        <div class="form-group" id="edit-status">
                            <label>End Date:*</label>
                            <select class="form-control" onChange={this.onStatusChanged} defaultValue={this.state.sprint.sprintStatus}>
                                {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                            </select>
                        </div>
                        
                    </form>
                    <div id="edit-form-buttons">
                        <button className="btn btn-sm btn-outline-dark m-1" onClick={this.onUpdatingSprint} >Save</button>
                        <button className="btn btn-sm btn-outline-dark m-1" id='edit-form-cancel-button' onClick={this.props.onCancelEditMode} >Cancel</button>
                    </div>
                </td>
            </tr>
        )
    }
}