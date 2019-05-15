import React from 'react';
import { checkToken } from '../Helpers';
import { toast } from 'react-toastify';

const apiEditUrl = "/api/DefectData/editDefect";
const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;


export class DefectEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            description: this.props.item.description,
            state: this.props.item.state,
            priority: this.props.item.priority,
            severity: this.props.item.severity,
            storyId: this.props.item.storyId,
            status: this.props.item.status
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSeverityChange = this.onSeverityChange.bind(this);
        this.onStoryIdChange = this.onStoryIdChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onUpdate(defect) {

        var data = JSON.stringify({
            "defectId": defect.defectId,
            "name": defect.name,
            "description": defect.description,
            "state": defect.state,
            "priority": defect.priority,
            "severity": defect.severity,
            "storyId": defect.storyId,
            "status": defect.status
        });
        var loadDataVar = this.props.loadData;

        if (defect) {
            checkToken()
            fetch(apiEditUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
                },
                body: data
            })
                .then(function (response) {
                    let responseStatus = response.status
                    switch (responseStatus) {
                        case 200:
                            toast.success("Defect was updated !");
                            loadDataVar("");
                            break
                        case 401:
                            toast.warn("You are not authorized. Please login!");
                            window.location.replace("");
                            break
                        case 403:
                            toast.error("You have not permission  !");
                            break
                        default:
                            toast.error("Something wrong  !");
                            break
                    }
                })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        var defectDescription = this.state.description;
        var defectName = this.state.name;
        var defectState = stateOption.find(x => x.name === this.state.state).name;
        var defectStatus = statusOption.find(x => x.name === this.state.status).name;
        var defectPriority = priorityOption.find(x => x.name === this.state.priority).name;
        var defectSeverity = severityOption.find(x => x.name === this.state.severity).name;
        var defectStoryId = this.state.storyId;
        let defect = { defectId: this.props.item.defectId, name: defectName, description: defectDescription, state: defectState, priority: defectPriority, severity: defectSeverity, storyId: defectStoryId, status: defectStatus };
        this.onUpdate(defect);

        this.setState({ name: "", description: "", state: "", priority: "", severity: "", storyId: "", status: "" });
        this.props.editDefect();

       
        var callBackDefect = { defectId: this.props.item.defectId, name: defectName, description: defectDescription, state: defectState, priority: defectPriority, severity: defectSeverity, storyId: defectStoryId, status: defectStatus };
        this.props.changed(callBackDefect);
    }

    render() {
        return <tr>
            <td>
                <div>
                    <label for="name">Name</label>
                    <input type="text"
                        placeholder="defect name"
                        defaultValue={this.props.item.name}
                        onChange={this.onNameChange}
                        class="form-control"
                        id="name"
                        autoComplete="false"/>
                </div>
            </td>
            
            <td>
                <div>
                        <label for="description">Description</label>
                        <textarea rows="3"
                        type="text"
                        placeholder="defect description"
                        defaultValue={this.props.item.description}
                        onChange={this.onDescriptionChange}
                        class="form-control"
                        id="description" />
                </div>
            </td>

            <td>
                <div>
                        <label for="state">State</label>
                    <select onChange={this.onStateChange} class="btn btn-light dropdown-toggle m-0" id="state" defaultValue={this.props.item.state}>
                            {stateOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
            </td>
            <td> 
                <div>
                        <label for="priority">Priority</label>
                    <select onChange={this.onPriorityChange} class="btn btn-light dropdown-toggle m-0" id="priority" defaultValue={this.props.item.priority}>
                            {priorityOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
            </td>
            <td>  
                <div>
                        <label for="severity">Severity</label>
                    <select onChange={this.onSeverityChange} class="btn btn-light dropdown-toggle m-0" id="severity" defaultValue={this.props.item.severity}>
                            {severityOption.map((item) => <option>{item.name}</option>)}
                    </select> 
                </div>
            </td>
            <td>
                <div>
                        <label for="storyId">StoryId</label>
                        <input type="text"
                        placeholder="StoryId"
                        defaultValue={this.props.item.storyId}
                        onChange={this.onStoryIdChange}
                        class="form-control"
                        id="storyId" />
                </div>
            </td>
            <td>
                <div>
                        <label for="status">Status</label>
                    <select onChange={this.onStatusChange} class="btn btn-light dropdown-toggle m-0" id="status" defaultValue={this.props.item.status}>
                            {statusOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
            </td>
            <td>

                <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark w-100 m-1">Save</button>
                <button type="submit" onClick={this.props.editDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Cancel</button>
            </td>
            </tr>;
    }
}