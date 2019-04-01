import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
const updateTaskUrl = "/api/TaskGrid/editTask";

// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;

export class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            description: this.props.item.description,
            startDate: this.props.item.startDate,
            finishDate: this.props.item.finishDate,

            priorityId: this.props.item.priority.id,
            priorityName: this.props.item.priority.name,

            taskStateId: this.props.item.taskState.id,
            taskStateName: this.props.item.taskState.name,

            storyId: this.props.item.storyId,
            programmerId: this.props.item.programmerId
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
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

    onPriorityChanged(e) {
        this.setState({
            priorityName: e.target.value,
            priorityId: priorityTable.find(x => x.name === e.target.value).id
        });
    }

    onStateChanged(e) {
        this.setState({
            taskStateName: e.target.value,
            taskStateId: stateTable.find(x => x.name === e.target.value).id
        });
    }

    onUpdate(task) {
        if (task) {
            var data = JSON.stringify({
                "id": task.id,
                "name": task.name,
                "description": task.description,
                "startDate": task.startDate,
                "finishDate": task.finishDate,

                "priorityId": task.priorityId,
                "taskStateId": task.taskStateId,

                "programmerId": null,
                "storyId": null
            });
            var xhr = new XMLHttpRequest();

            xhr.open("post", updateTaskUrl, true);
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
        var task = {
            id: this.props.item.id,
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate,
            finishDate: this.state.finishDate,
            priorityId: this.state.priorityId,
            priority: {
                id: this.state.priorityId,
                name: this.state.priorityName
            },
            taskStateId: this.state.taskStateId,
            taskState: {
                id: this.state.taskStateId,
                name: this.state.taskStateName
            },
            programmerId: null,
            storyId: null
        };
        this.onUpdate(task);
        this.props.edit();
        this.props.changed(task);
    }

    render() {
        return <tr className="current-row">
            <td colSpan="4">
            <form>
                <div className="form-group ">
                    <div className="col-md-7">
                        <label for="name">Name</label>
                            <input type="text" class="form-control form-control-sm" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false" defaultValue={this.props.item.name}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="description">Description</label>
                            <textarea rows="3" class="form-control form-control-sm" onChange={this.onDescriptionChanged} id="description" placeholder="task description" defaultValue={this.props.item.description}/>
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
                                className="datePickerStyle btn btn-sm btn-outline-secondary"
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
                                className="datePickerStyle btn btn-sm btn-outline-secondary"
                            />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="priorityName">Priority</label>
                            <select class="form-control form-control-sm" id="priorityName" onChange={this.onPriorityChanged} placeholder="task priority" defaultValue={this.props.item.priority.name}>
                            {priorityTable.map((item) => <option>{item.name}</option> )}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-7">
                        <label for="taskStateName">State</label>
                            <select class="form-control form-control-sm" id="taskStateName" onChange={this.onStateChanged} placeholder="task state" defaultValue={this.props.item.taskState.name}>
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