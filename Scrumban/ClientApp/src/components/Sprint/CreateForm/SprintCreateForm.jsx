import React from 'react';
import DatePicker from 'react-datepicker';

import './SprintCreateForm.css'; 


export class SprintCreateForm extends React.Component {
    constructor(props) {
        super(props)

        this.state =
        {
            statuses: [],
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            sprintStatus: 'Not Started'
            }
        this.state.endDate.setMonth(this.state.startDate.getMonth() + 1)

        this.addNewSprint = this.addNewSprint.bind(this)

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
        this.onStartDateChanged = this.onStartDateChanged.bind(this)
        this.onEndDateChanged = this.onEndDateChanged.bind(this)
        this.onStatusChanged = this.onStatusChanged.bind(this)
        this.fetchSprintStatuses = this.fetchSprintStatuses.bind(this)
    }

    componentDidMount() {
        this.fetchSprintStatuses()
    }

    fetchSprintStatuses() {
        fetch('api/Sprint/GetStatuses')
            .then(response => response.json())
            .then(data => {
                this.setState({ statuses: data });
            })
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
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        alert("Creating element went wrong!")
                        break
                    case 200:
                        this.props.moveToComponent("sprints");
                        break
                }
            }.bind(this))
        
       
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
            <div id="sprint-create-form-container">
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
                        <label>Status:*</label>
                        <select class="form-control" onChange={this.onStatusChanged}>
                            {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                        </select>
                    </div>
                    
                    <br />
                </form>
                    <div id="create-form-buttons">
                    <button type="button" class="btn btn-sm btn-outline-dark" id="create-button" onClick={this.addNewSprint.bind(this)}>Create Sprint</button>
                    <button type="button" class="btn btn-sm btn-outline-dark" id="create-form-cancel-button" onClick={() => this.props.moveToComponent("sprints")} >Cancel</button>
                    </div>
            </div>
        )
    }
}