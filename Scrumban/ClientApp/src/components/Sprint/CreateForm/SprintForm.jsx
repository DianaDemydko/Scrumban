import React from 'react';
import { DatePickerForm } from './DatePickerForm';

export class SprintForm extends React.Component {
    constructor(props) {
        super(props)

        this.state =
        {
            statuses: this.props.location.state.statuses,
            name: "",
            description: "",
            startDate: null,
            endDate: null,
            sprintStatus: this.props.location.state.statuses[0].sprintStatus
        }

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
                <h1>From SprintForm</h1>
                <form>
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label>Name:*</label>
                            <input type="text" class="form-control"
                                placeholder="Name"
                                id="name"
                                required
                                onChange={this.onNameChanged} />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="input-group mb-3">
                            <label>Description:*</label>
                            <textarea type="text" rows="3" class="form-control"
                                placeholder="Description"
                                id="description"
                                required
                                onChange={this.onDescriptionChanged} />
                            </div>
                    </div>
                    
                    <DatePickerForm onStartDateChanged={this.onStartDateChanged} onEndDateChanged={this.onEndDateChanged} />

                    <div>
                        <select class="form-control" onChange={this.onStatusChanged}>
                            {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                        </select>
                    </div>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={this.addNewSprint.bind(this)}>Create Sprint</button>
                </form>
            </div>
        )
    }
}