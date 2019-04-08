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
            startDate: null,
            finishDate: null,
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

            fetch(addTaskUrl, {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
                },
                body: data
                })
                .then(function (response) {
                    if (response.status == 200) {
                        window.location.replace("/tasks");
                    }
                    else if (response.status == 401) {
                        var answer = window.confirm("You are not authorized. Move to Login page ?")
                        if (answer == true) {
                            window.location.replace("/login")
                        }
                    }
                    else if (response.status == 403) {
                        alert("ERROR! You have not permission !")
                    }
                    else {
                        alert("ERROR! Status code: " + response.status)
                    }
                })
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
                <div className="form-group col-12">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" class="form-control form-control-sm" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false"/>

                    </div>
                </div>
                <div className="form-group col-12">
                    <div>
                        <label for="description">Description</label>
                        <textarea rows="3" class="form-control form-control-sm" onChange={this.onDescriptionChanged} id="description" placeholder="task description"/>
                    </div>
                </div>
                <div className="form-group col-4">
                    <div>
                        <label for="description">Start Date</label><br />
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.onStartDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                            className="datePickerStyle btn btn-sm btn-outline-secondary"
                        />
                    </div>
                </div>
                <div className="form-group col-4">
                    <div >
                        <label for="finishDate">Finish Date</label><br />
                        <DatePicker
                            selected={this.state.finishDate}
                            onChange={this.onFinishDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                            id="finishDate"
                            className="datePickerStyle btn btn-sm btn-outline-secondary"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-4">
                        <label for="priorityName">Priority</label>
                        <select class="form-control form-control-sm" id="priorityName" onChange={this.onPriorityChanged} placeholder="task priority">
                            {priorityTable.map((item) => <option>{item.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-4">
                        <label for="taskStateName">State</label>
                        <select class="form-control form-control-sm" id="taskStateName" onChange={this.onStateChanged} placeholder="task state">
                            {stateTable.map((item) => <option>{item.name}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit" onClick={this.onSubmit} className="btn btn-outline-info button-fixed">Submit</button>
                <Link to={cancelUrl}>
                    <button type="submit" className="btn btn-outline-danger button-fixed">Cancel</button>
                </Link>
            </div>
        );
    }
}