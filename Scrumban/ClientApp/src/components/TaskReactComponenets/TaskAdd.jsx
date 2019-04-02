import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)

// consts of urls
const addTaskUrl = "/api/TaskGrid/addTask";
const cancelUrl = "/tasks";
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;

export class TaskAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            startDate: "",
            finishDate: "",
            priority: priorityTable[0].name,
            taskState: stateTable[0].name
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onFinishDateChange = this.onFinishDateChange.bind(this);

    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }

    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }

    onStartDateChange(date) {
        this.setState({ startDate: date });
    }

    onFinishDateChange(date) {
        this.setState({ finishDate: date });
    }


    onPriorityChanged(e){
        this.setState({ priority: e.target.value });
    }

    onStateChanged(e) {
        this.setState({ taskState: e.target.value });
    }

    onAdd(task) {
        if (task) {
            var data = JSON.stringify({
                "name": task.name,
                "description": task.description,
                "startDate": task.startDate,
                "finishDate": task.finishDate,
                "priorityId": task.priorityId,
                "taskStateId": task.taskStateId
            });
            var xhr = new XMLHttpRequest();

            xhr.open("post", addTaskUrl, true);
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

        let task = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate,
            finishDate: this.state.finishDate,
            priorityId: priorityTable.find(x => x.name === this.state.priority).id,
            taskStateId: stateTable.find(x => x.name === this.state.taskState).id
        };
        this.onAdd(task);
        this.setState({ name: "", description: "", startDate: "", finishDate: "", priorityId: "", taskStateId: "" });
        window.location.replace("/tasks");
    }

    render() {
        return (
            <div>
                <h2>Add task</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="">
                            <label for="description">Description</label>
                            <textarea rows="3" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="task description" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="description">Start Date</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.onStartDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-7">
                            <label for="description">Finish Date</label>
                            <DatePicker
                                selected={this.state.finishDate}
                                onChange={this.onFinishDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="">
                            <label for="priority">Priority</label>
                            <select class="form-control" onChange={this.onPriorityChanged} id="priority" placeholder="task priority" defaultValue={priorityTable[0].name}>
                                {priorityTable.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="">
                            <label for="taskState">State</label>
                            <select class="form-control" onChange={this.onStateChanged} id="taskState" placeholder="task state" defaultValue={stateTable[0].name}>
                                {stateTable.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    
                        <button type="submit" className="btn btn-primary button-fixed">Submit</button>
                    

                    <Link to={cancelUrl}>
                        <button type="submit" className="btn btn-danger  button-fixed">Cancel</button>
                    </Link>
                </form>
                
            </div>
        );
    }
}