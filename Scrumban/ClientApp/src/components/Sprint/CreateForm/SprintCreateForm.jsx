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
            sprintStatus: 'Not Started',
            teams: [],
            teamId: ""
            }
        this.state.endDate.setMonth(this.state.startDate.getMonth() + 1)

        this.addNewSprint = this.addNewSprint.bind(this)

        this.onNameChanged = this.onNameChanged.bind(this)
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
        this.onStartDateChanged = this.onStartDateChanged.bind(this)
        this.onEndDateChanged = this.onEndDateChanged.bind(this)
        this.onStatusChanged = this.onStatusChanged.bind(this)
        this.fetchSprintStatuses = this.fetchSprintStatuses.bind(this)
        this.fetchTeams = this.fetchTeams.bind(this)
        this.onTeamChanged = this.onTeamChanged.bind(this)
    }
    fetchTeams() {
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }

    componentDidMount() {
        this.fetchSprintStatuses();
        this.fetchTeams();
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
                        sprintStatus: this.state.sprintStatus,
                        teamId: this.state.teamId
                      })
                    
            })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        toast.error("Something wrong!")
                        break
                    case 200:
                        toast.success("Sprint was created!");
                        this.props.moveToComponent("sprints");
                        break
                }
            }.bind(this))
        
       
    }

    onStartDateChanged(startDate)
    {
        this.setState({ startDate: startDate })
    }

    onTeamChanged(e) {
        var teamId = e.target.value;
        if (e.target.value === "None") {
            teamId = null;
        }
        this.setState({ teamId: teamId })
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
                <label style={{ 'fontSize': '40px' }} className="create-title" >New Sprint</label>
                <div />
                <div className="addContent">
                    <label class="col-2 mr-10">Name: </label>
                        <input type="text"
                            class="inputAdd"
                            placeholder="Name..."
                            id="name"
                            required
                            onChange={this.onNameChanged}
                        />
                    </div>
                <div className="addContent">
                    <label class="col-2 mr-10" >Description: </label>
                        <textarea type="text"
                        rows="5"
                        className="inputAdd"
                            placeholder="Description..."
                            id="description"
                            required
                            onChange={this.onDescriptionChanged}
                        />
                    </div>


                <div className="addContent">
                    <label class="col-2 mr-10">Start Date: </label>
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
                    <label class="col-2 mr-10">End Date: </label>
                        <DatePicker
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                            todayButton={"Today"}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChanged}
                            minDate={this.state.startDate}
                        />
                    </div>

                <div className="addContent">
                    <label class="col-2 mr-10">Status: </label>
                    <select style={{ 'margin-top': '0px', 'width': '40%' }} class="btn btn-light dropdown-toggle" onChange={this.onStatusChanged}>
                            {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                        </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Team: </label>
                    <select style={{ 'margin-top': '0px', 'width': '40%' }} class="btn btn-light dropdown-toggle" onChange={this.onTeamChanged}>
                        <option>None</option>
                        {this.state.teams.map(team => <option value={team.teamID}>{team.name}</option>)}
                    </select>
                </div>
                    
                <div className="addContent">
                    <button type="submit" className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '50%' }} onClick={this.addNewSprint.bind(this)}>Save</button>
                    <button type="submit" className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '40%' }} onClick={() => this.props.moveToComponent("sprints")} >Cancel</button>
                    </div>
            </div>
        )
    }
}