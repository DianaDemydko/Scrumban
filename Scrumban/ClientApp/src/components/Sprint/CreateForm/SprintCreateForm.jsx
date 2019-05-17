import React from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';


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
                        toast.error("Something wrong!")
                        break
                    case 200:
                        toast.success("Sprint was created in database !");
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
            <div className="addComponentBackground">
                <label style={{ 'fontSize': '40px' }} >Add sprint</label>
                <div />
                <div className="addContent">
                    <label class="col-2">Name</label>
                        <input type="text"
                            class="inputAdd"
                            placeholder="Name"
                            id="name"
                            required
                            onChange={this.onNameChanged}
                        />
                    </div>
                <div className="addContent">
                    <label class="col-2" >Description</label>
                        <textarea type="text"
                        rows="5"
                        className="inputAdd"
                            placeholder="Description"
                            id="description"
                            required
                            onChange={this.onDescriptionChanged}
                        />
                    </div>


                <div className="addContent">
                    <label class="col-2">Start Date</label>
                        <DatePicker

                            className="datePickerStyle btn btn-sm btn-outline-secondary"
                            todayButton={"Today"}
                            selected={this.state.startDate}
                            onChange={this.onStartDateChanged}
                            minDate={new Date()}
                            maxDate={this.state.endDate}
                            />
                    </div>

                <div className="addContent">
                    <label class="col-2">End Date</label>
                        <DatePicker
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                            todayButton={"Today"}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChanged}
                            minDate={this.state.startDate}
                        />
                    </div>

                <div className="addContent">
                    <label class="col-2">Status</label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" onChange={this.onStatusChanged}>
                            {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                        </select>
                    </div>
                    
                <div className="addContent">
                    <button type="submit" class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }} onClick={this.addNewSprint.bind(this)}>Submit</button>
                    <button type="submit" class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }} onClick={() => this.props.moveToComponent("sprints")} >Cancel</button>
                    </div>
            </div>
        )
    }
}