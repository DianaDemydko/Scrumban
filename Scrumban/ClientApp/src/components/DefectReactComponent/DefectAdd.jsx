import React, { Component } from 'react';
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';

const apiAddUrl = "/api/DefectData/addDefect";
const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;



export class DefectAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", description: "", state: stateOption[0].name, priority: priorityOption[0].name, severity: severityOption[0].name, storyId: "", status: statusOption[0].name };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSeverityChange = this.onSeverityChange.bind(this);
        this.onStoryIdChange = this.onStoryIdChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
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

    //add
    onAddDefect(defect) {
        if (defect) {

            var data = JSON.stringify({ "name": defect.name, "description": defect.description, "state": defect.state, "priority": defect.priority, "severity": defect.severity, "storyId": defect.storyId, "status": defect.status });
            var xhr = new XMLHttpRequest();

            xhr.open("post", apiAddUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    toast.success("Defect was created in database !");
                    this.props.moveToComponent("defects");
                }
                else {
                    toast.error("Something wrong !");
                    return
                }
            }.bind(this);
            xhr.send(data);
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
        let defect = { name: defectName, description: defectDescription, state: defectState, priority: defectPriority, severity: defectSeverity, storyId: defectStoryId, status: defectStatus };
        this.onAddDefect(defect);
        this.setState({ name: "", description: "", state: "", priority: "", severity: "", storyId: "", status: "" });

        //window.location.replace("/defects");
    }

    render() {
        return (
            <div className="addComponentBackground">
                <label style={{ 'fontSize': '40px' }}> Create New Defect </label>
                <div />
                <div className="addContent">
                    <label class="col-2">Name</label>
                    <input type="text"
                        className="inputAdd"
                        placeholder="defect name"
                        onChange={this.onNameChange}
                        id="name"
                        autoComplete="false" />
                </div>
                <div className="addContent">
                    <label class="col-2">Description</label>
                    <textarea rows="3"
                        type="text"
                        placeholder="defect description"
                        onChange={this.onDescriptionChange}
                        className="inputAdd"
                        id="description" />
                </div>
                <div className="addContent">
                    <label class="col-2">State</label>
                    <select onChange={this.onStateChange} class="btn btn-light dropdown-toggle m-0 w-25" id="state" placeholder="state" defaultValue={stateOption[0].name}>
                        {stateOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2">Priority</label>
                    <select onChange={this.onPriorityChange} class="btn btn-light dropdown-toggle m-0 w-25" id="priority" placeholder="priority" defaultValue={priorityOption[0].name}>
                        {priorityOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2">Severity</label>
                    <select onChange={this.onSeverityChange} class="btn btn-light dropdown-toggle m-0 w-25" id="severity" placeholder="severity" defaultValue={severityOption[0].name}>
                        {severityOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2">Story Id</label>
                    <input type="text"
                        placeholder="Story Id"
                        onChange={this.onStoryIdChange}
                        className="inputAdd"
                        id="storyId" />
                </div>
                <div className="addContent">
                    <label class="col-2">Status</label>
                    <select onChange={this.onStatusChange} class="btn btn-light dropdown-toggle m-0 w-25" id="status" placeholder="status" defaultValue={statusOption[0].name}>
                        {statusOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }}>Add</button>
                    <button type="submit" onClick={() => this.props.moveToComponent("defects")} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }}>Cancel</button>
                </div>


            </div>
        );
    }
}