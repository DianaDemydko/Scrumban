import React from 'react';
import { toast } from 'react-toastify';
import { checkToken } from '../Helpers';
import '../../GridStyles/StyleForGrid.css';

const apiAddUrl = "/api/Defect/addDefect";
const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;

export class DefectAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            state: stateOption[0].name,
            priority: priorityOption[0].name,
            severity: severityOption[0].name,
            storyId: "",
            status: statusOption[0].name,
            storyOptions: [],
            users: [],
            userId: "",
            user: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSeverityChange = this.onSeverityChange.bind(this);
        this.onStoryIdChange = this.onStoryIdChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.getAllStories = this.getAllStories.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.onOwnerChange = this.onOwnerChange.bind(this);
    }
    fetchUsers() {

        fetch('/api/users/getUsers', {

            meethod: "get",

            headers: {

                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

            }

        })

            .then(function (response) {

                if (response.status == 200) {

                    return response.json()

                }

                else if (response.status == 401) {

                    alert("Not Authorized")

                    window.location.replace("/login");

                }

                else {

                    alert("ERROR ! " + response.status)

                }

            })

            .then(data => this.setState({ users: data }))

    }
    componentDidMount() {
        this.getAllStories();
        this.fetchUsers();
    }
    getAllStories() {
        fetch('api/Story/GetStories', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        return response.json()
                        break
                }
            })
            .then(data => { this.setState({ storyOptions: data }) });
    }
    onOwnerChange(e) {
        if (e.target.value === 'None') {
            this.setState({ userId: null});
        } else {
            this.setState({ userId: e.target.value });
        }
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    onStateChange(e) {
        this.setState({ state: e.target.value });
    }
    onPriorityChange(e) {
        this.setState({ priority: e.target.value });
    }
    onSeverityChange(e) {
        this.setState({ severity: e.target.value });
    }
    onStoryIdChange(e) {
        this.setState({ storyId: e.target.value });
    }
    onStatusChange(e) {
        this.setState({ status: e.target.value });
    }

    onAddDefect(defect) {
        if (defect) {
            checkToken()
            var data = JSON.stringify({
                "name": defect.name,
                "description": defect.description,
                "state": defect.state,
                "priority": defect.priority,
                "severity": defect.severity,
                "storyId": defect.storyId,
                "status": defect.status,
                "userId": defect.userId
            });

            var moveToComponentVar = this.props.moveToComponent;

            fetch(apiAddUrl, {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
                },
                body: data
            })
                .then(function (response) {
                    let responseStatus = response.status
                    switch (responseStatus) {
                        case 200:
                            toast.success("Defect was created!");
                            moveToComponentVar("defects");
                            break
                        case 400:
                            toast.error("Incorrect data !");
                            break
                        case 401:
                            toast.warn("You are not authorized. Please login!");
                            moveToComponentVar("login");
                            break
                        case 403:
                            toast.error("You have not permission !");
                            break
                        default:
                            toast.error("Something wrong!!");
                            this.loadData("");
                            break
                    }
                })
        }
    }
   
    onSubmit(e) {
        e.preventDefault();
        var defectDescription = this.state.description.trim();
        var defectName = this.state.name.trim();
        var defectState = this.state.state.trim();
        var defectStatus = this.state.status.trim();
        var defectPriority = this.state.priority.trim();
        var defectSeverity = this.state.severity.trim();
        var defectStoryId = this.state.storyId.trim();
        var userId = this.state.userId;
        let defect = { name: defectName, description: defectDescription, state: defectState, priority: defectPriority, severity: defectSeverity, storyId: defectStoryId, status: defectStatus, userId: userId };
        this.onAddDefect(defect);
        this.setState({ name: "", description: "", state: "", priority: "", severity: "", storyId: "", status: "", userId: "" });

    }

    render() {
        return (
            <div className="addComponentBackground">
                <label style={{ 'fontSize': '40px' }} className="create-title"> New Defect </label>
                <div />
                <div className="addContent">
                    <label class="col-2 mr-10">Name: </label>
                    <input type="text"
                        className="inputAdd"
                        placeholder="Name..."
                        onChange={this.onNameChange}
                        id="name"
                        autoComplete="false" />
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Description: </label>
                    <textarea rows="3"
                        type="text"
                        placeholder="Description..."
                        onChange={this.onDescriptionChange}
                        className="inputAdd"
                        id="description" />
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">State: </label>
                    <select onChange={this.onStateChange} class="btn btn-light dropdown-toggle m-0 w-25" id="state" placeholder="State..." defaultValue={stateOption[0].name}>
                        {stateOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Owner: </label>
                    <select onChange={this.onOwnerChange} class="btn btn-light dropdown-toggle m-0 w-25" id="state" placeholder="Owner...">
                        <option>None</option>
                        {this.state.users.map((item) => <option value={item.id}>{`${item.firstName}  ${item.surname}`}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Priority:</label>
                    <select onChange={this.onPriorityChange} class="btn btn-light dropdown-toggle m-0 w-25" id="priority" placeholder="Priority..." defaultValue={priorityOption[0].name}>
                        {priorityOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Severity:</label>
                    <select onChange={this.onSeverityChange} class="btn btn-light dropdown-toggle m-0 w-25" id="severity" placeholder="Severity..." defaultValue={severityOption[0].name}>
                        {severityOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Story: </label>
                    <select onChange={this.onStoryIdChange} class="btn btn-light dropdown-toggle m-0 w-25" id="severity" placeholder="Story...">
                        <option>None</option>
                        {this.state.storyOptions.map((item) => <option value={item.story_id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Status: </label>
                    <select onChange={this.onStatusChange} class="btn btn-light dropdown-toggle m-0 w-25" id="status" placeholder="Status..." defaultValue={statusOption[0].name}>
                        {statusOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '50%' }}>Save</button>
                    <button type="submit" onClick={() => this.props.moveToComponent("defects")} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '40%' }}>Cancel</button>
                </div>


            </div>
        );
    }
}