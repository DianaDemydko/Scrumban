import React from 'react';
import { DatePickerForm } from './CreateForm/DatePickerForm';

export class EditSprint extends React.Component {
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
                        temp.startDate = temp.startDate
                        temp.endDate = temp.endDate
                        this.props.onUpdatingSprintElement(temp)
                        break
                }
            }.bind(this))
            .catch(() => alert("Unexpected error occured."))
    }

    render() {
        return (
            <tr className="current-row">
                <td colSpan="7">
                    <form>
                        <div className="form-group">
                            <div className="col-md-7">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="Sprint name" defaultValue={this.state.sprint.name} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-7">
                                <label for="description">Description</label>
                                <textarea rows="3" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="Sprint description" defaultValue={this.state.sprint.description} />
                            </div>
                        </div>
                        <DatePickerForm onStartDateChanged={this.onStartDateChanged} onEndDateChanged={this.onEndDateChanged} startDate={this.state.sprint.startDate} endDate={this.state.sprint.endDate} />
                        <div className="form-group">
                            <div className="col-md-7">
                                <label for="status">Status</label>
                                <select class="form-control" id="status" onChange={this.onStatusChanged} defaultValue={this.state.sprint.sprintStatus}>
                                    {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                                </select>
                            </div>
                        </div>
                    </form>
                    <button className="btn btn-primary button-fixed" id={this.state.sprint.sprint_id} onClick={this.onUpdatingSprint} >Save</button>
                    <div/>
                    <button className="btn btn-danger button-fixed" id={this.state.sprint.sprint_id} onClick={this.props.onCancelEditMode}>Cancel</button>
                </td>
            </tr>
        )
    }
}