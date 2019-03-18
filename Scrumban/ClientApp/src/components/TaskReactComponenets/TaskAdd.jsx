import React, { Component } from 'react';
const addTaskUri = "/api/sampleData/";

export class TaskAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", description: "", priorityId: 2, taskStateId: 1 };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateCHanged = this.onStateCHanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }

    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }

    onPriorityChanged(e){
        this.setState({ priorityId: e.target.value });
    }

    onStateCHanged(e) {
        this.setState({ taskStateId: e.target.value });
    }

    onAdd(task) {
        if (task) {
            var data = JSON.stringify({ "name": task.name, "description": task.description });
            var xhr = new XMLHttpRequest();

            xhr.open("post", addTaskUri, true);
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
        var taskPriorityId = this.state.priorityId;
        var taskTaskStateId = this.state.taskStateId;
        //if (!taskName) {
        //    return;
        //}
        let task = { name: taskName, description: taskDescription, priorityId : 1, taskStateId : 1 };
        this.onAdd(task);
        this.setState({ name: "", description: "", priorityId: 2, taskStateId: 1 });
        this.props.history.push('/tasks');
    }

    render() {
        return (
            <div>
                <h2>Add task</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="description">Description</label>
                            <textarea rows="3" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="task description" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="priorityId">Priority</label>
                            <input type="text" class="form-control" id="priorityId" placeholder="task priority" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="taskStateId">State</label>
                            <input type="text" class="form-control" id="taskStateId" placeholder="task state" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );

    }
}