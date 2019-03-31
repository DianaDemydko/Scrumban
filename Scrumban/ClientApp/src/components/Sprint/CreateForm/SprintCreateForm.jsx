import React from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

import './SprintCreateForm.css'; 

const successCreateUrl = "/Sprints";
const cancelUrl = "/Sprints";


export class SprintCreateForm extends React.Component {
    constructor(props) {
        super(props)

        this.state =
        {
            statuses: this.props.location.state.statuses,
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            sprintStatus: this.props.location.state.statuses[0].sprintStatus
            }
        this.state.endDate.setMonth(this.state.startDate.getMonth() + 1)

        this.addNewSprint = this.addNewSprint.bind(this)

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
        this.onStartDateChanged = this.onStartDateChanged.bind(this)
        this.onEndDateChanged = this.onEndDateChanged.bind(this)
        this.onStatusChanged = this.onStatusChanged.bind(this)
    }

    addNewSprint() {

        fetch('api/Sprint/Create',
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                        name: this.state.name,
                        description: this.state.description,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        sprintStatus: this.state.sprintStatus
                      })
                    
            })
        window.location.replace(successCreateUrl)
    }

    onStartDateChanged(startDate)
    {
        this.setState({ startDate: startDate })
    }

    onEndDateChanged(endDate)
    {
        this.setState({ endDate: endDate })
    }

    onNameChanged(event)
    {
        this.setState({ name: event.target.value })
    }

    onDescriptionChanged(event)
    {
        this.setState({ description: event.target.value })
    }

    onStatusChanged(event)
    {
        this.setState({ sprintStatus: event.target.value })
    }

    render() {
        return (
            <div>
                <h1>Create Sprint Form</h1>
                <form id="sprint-create-form">
                    <div class="form-group">
                        <label>Name:*</label>
                        <input type="text"
                            class="form-control"
                            placeholder="Name"
                            id="name"
                            required
                            onChange={this.onNameChanged}
                        />
                    </div>
                    
                    <div class="form-group">
                        <label>Description:*</label>
                        <textarea type="text"
                            rows="5"
                            class="form-control"
                            placeholder="Description"
                            id="description"
                            required
                            onChange={this.onDescriptionChanged}
                        />
                    </div>


                    <div class="form-group">
                        <label>Start Date:*</label>
                        <br />
                        <DatePicker
                            className="form-control"
                            todayButton={"Today"}
                            selected={this.state.startDate}
                            onChange={this.onStartDateChanged}
                            minDate={new Date()}
                            maxDate={this.state.endDate}
                            />
                    </div>

                    <div class="form-group">
                        <label>End Date:*</label>
                        <br />
                        <DatePicker
                            className="form-control"
                            todayButton={"Today"}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChanged}
                            minDate={this.state.startDate}
                        />
                    </div>

                    <div class="form-group">
                        <label>End Date:*</label>
                        <select class="form-control" onChange={this.onStatusChanged}>
                            {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                        </select>
                    </div>
                    
                    <br />
                </form>
                    <div>
                        <button type="button" class="btn btn-primary" id="create-button" onClick={this.addNewSprint.bind(this)}>Create Sprint</button>
                        <Link to={cancelUrl}>
                            <button type="button" class="btn btn-danger" id="create-form-cancel-button" >Cancel</button>
                        </Link>
                    </div>
            </div>
        )
    }
}