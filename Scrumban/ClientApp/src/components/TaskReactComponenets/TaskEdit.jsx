import React, { Component } from 'react';
const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
const updateTaskUri = "/api/TaskGrid/editTask";

// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;

export class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: this.props.item.name, description: this.props.item.description, priority: this.props.item.priority.name, taskState: this.props.item.taskState.name };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }

    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }

    onPriorityChanged(e) {
        this.setState({ priority: e.target.value });
    }

    onStateChanged(e) {
        this.setState({ taskState: e.target.value });
    }

    onUpdate(task) {
        if (task) {
            var data = JSON.stringify({ "id" : task.id, "name": task.name, "description": task.description, "priorityId" : task.priorityId, "taskStateId" : task.taskStateId });
            var xhr = new XMLHttpRequest();

            xhr.open("post", updateTaskUri, true);
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
        var taskName = this.state.name;
        var taskDescription = this.state.description;
        var taskPriorityId = priorityTable.find(x => x.name === this.state.priority).id;
        var taskTaskStateId = stateTable.find(x => x.name === this.state.taskState).id;
        let task = { id: this.props.item.id , name: taskName, description: taskDescription, priorityId: taskPriorityId, taskStateId: taskTaskStateId };
        this.onUpdate(task);
        this.setState({ name: "", description: "", priority: "", taskState: "" });
        this.props.edit();

        var priority = { id: taskPriorityId, name: this.state.priority };
        var state = { id: taskTaskStateId, name: this.state.taskState };
        var callBackTask = { id: this.props.item.id, name: this.state.name, description: this.state.description, priority: priority, taskState: state };
        this.props.changed(callBackTask);
        
    }

    render() {
        return <tr className="current-row">
            <td colSpan="4">
            <form>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false" defaultValue={this.props.item.name}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="description">Description</label>
                        <textarea rows="3" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="task description" defaultValue={this.props.item.description}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="priority">Priority</label>
                        <select class="form-control" id="priority" onChange={this.onPriorityChanged} placeholder="task priority" defaultValue={this.props.item.priority.name}>
                            {priorityTable.map((item) => <option>{item.name}</option> )}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="taskState">State</label>
                        <select class="form-control" id="taskState" onChange={this.onStateChanged} placeholder="task state" defaultValue={this.props.item.taskState.name}>
                            {stateTable.map((item) => <option>{item.name}</option>)}
                        </select>
                    </div>
                </div>
            </form>
            </td>
            <td>
                <button type="submit" onClick={this.onSubmit} className="btn btn-outline-danger button-fixed">Save</button>
                <button type="submit" onClick={this.props.edit} className="btn btn-danger button-fixed">Cancel</button>
            </td>
        </tr>;
    }
}