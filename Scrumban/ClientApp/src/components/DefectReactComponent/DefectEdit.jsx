import React, { Component } from 'react';
const apiEditUrl = "/api/DefectData/editDefect";

const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;


export class DefectEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: this.props.item.name, description: this.props.item.description, state: this.props.item.state, priority: this.props.item.priority, severity: this.props.item.severity, storyId: this.props.item.storyId, status: this.props.item.status };

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
        if (defect) {
            var data = JSON.stringify({ "defectId": defect.defectId, "name": defect.name, "description": defect.description, "state": defect.state, "priority": defect.priority, "severity": defect.severity, "storyId": defect.storyId, "status": defect.status });
            var xhr = new XMLHttpRequest();

            xhr.open("post", apiEditUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {

                }
            }.bind(this);
            xhr.send(data);
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
    }

    render() {
        return <tr>
            <td >
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>Name</label>

                            <input type="text"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.onNameChange}
                                class="form-control"
                                id="name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>Description</label>
                            <input type="text"
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.onDescriptionChange}
                                class="form-control"
                                id="description" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>State</label>
                            <select onChange={this.onStateChange} class="form-control" id="state" defaultValue={this.props.item.state}>
                                {stateOption.map((item) => <option>{item.name}</option>)}
                            </select>

                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>Priority</label>
                            <select onChange={this.onPriorityChange} class="form-control" id="priority" defaultValue={this.props.item.priority}>
                                {priorityOption.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>Severity</label>
                            <select onChange={this.onSeverityChange} class="form-control" id="severity" defaultValue={this.props.item.severity}>
                                {severityOption.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>StoryId</label>
                            <input type="text"
                                placeholder="StoryId"
                                value={this.state.storyId}
                                onChange={this.onStoryIdChange}
                                class="form-control"
                                id="storyId" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label>Status</label>
                            <select onChange={this.onStatusChange} class="form-control" id="status" defaultValue={this.props.item.status}>
                                {statusOption.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                </form>
            </td>
            <td>
                <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Save</button>
                <button type="submit" onClick={this.props.editDefect} className="btn btn-primary">Cancel</button>
            </td>
        </tr>;
    }
}