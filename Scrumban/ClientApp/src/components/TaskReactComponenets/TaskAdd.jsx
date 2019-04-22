import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { checkToken } from '../Helpers'

const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)

// consts of urls
const addTaskUrl = "/api/TaskGrid/addTaskDetailed";
const addTaskDetailedUrl = "/api/TaskGrid/addTask";

const cancelUrl = "/tasks";
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;

const getStoriesUrl = "/api/story/getstories"
const getUsersUrl = "/api/users/getUsers"

export class TaskAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            startDate: null,
            finishDate: null,
            priority: priorityTable[0].name,
            taskState: stateTable[0].name,
            userId: null,
            storyId: null,
            stories: [],
            users: []
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onFinishDateChange = this.onFinishDateChange.bind(this);
        this.onUserChanged = this.onUserChanged.bind(this);
        this.onStoryChanged = this.onStoryChanged.bind(this);
        this.onUserChanged = this.onUserChanged.bind(this);
        this.onStoryChanged = this.onStoryChanged.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this)
    }

    fetchStories() {
        fetch(getStoriesUrl, {
            meethod: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function(response){
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
            .then(data => this.setState({stories: data}))
    }

    fetchUsers() {
        fetch(getUsersUrl, {
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
        this.fetchStories()
        this.fetchUsers()
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

    onUserChanged(e) {
        var userId = null;
        if (e.target.value != "Nobody") {
            var userId = this.state.users.find(x => (x.firstName + " " + x.surname) == e.target.value).id
        }
        this.setState({ userId: userId });
    }

    onStoryChanged(e) {
        var storyId = null;
        if (e.target.value != "Independent") {
            var storyId = this.state.stories.find(x => x.name == e.target.value).story_id
        }
        this.setState({ storyId: storyId });
    }

    onAdd(task) {
        if (task) {
            checkToken()

            var data = JSON.stringify({
                "userId": sessionStorage.getItem("userId"),
                "description": "description",
                "operation": "Created",
                "tasK": {
                    "name": task.name,
                    "description": task.description,
                    "startDate": task.startDate,
                    "finishDate": task.finishDate,
                    "priorityId": task.priorityId,
                    "taskStateId": task.taskStateId,
                    "userId": task.userId,
                    "storyId": task.storyId
                }
            });
            var moveToComponentVar = this.props.moveToComponent;
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
                        moveToComponentVar("tasks")
                    }
                    else if (response.status == 400) {
                        alert("ERROR! Incorrect data !")
                    }
                    else if (response.status == 401) {
                        var answer = window.confirm("You are not authorized. Move to Login page ?")
                        if (answer == true) {
                            moveToComponentVar("login")
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

    onSubmit() {
        let task = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startDate,
            finishDate: this.state.finishDate,
            priorityId: priorityTable.find(x => x.name === this.state.priority).id,
            taskStateId: stateTable.find(x => x.name === this.state.taskState).id,
            userId: this.state.userId,
            storyId: this.state.storyId
        };
        // send on server
        this.onAdd(task);
        // back to tasks
        this.props.moveToComponent("tasks")
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
                <div className="form-group">
                    <div className="col-4">
                        <label for="userAssign">Assign to</label>
                        <select class="form-control form-control-sm" id="userAssign" onChange={this.onUserChanged} placeholder="">
                            <option>Nobody</option>
                            {this.state.users.map((item) => <option>{item.firstName} {item.surname}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-4">
                        <label for="story">Story</label>
                        <select class="form-control form-control-sm" id="story" onChange={this.onStoryChanged} placeholder="">
                            <option>Independent</option>
                            {this.state.stories.map((item) => <option>{item.name}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit" onClick={this.onSubmit} className="btn btn-outline-info button-fixed">Submit</button>
                <button type="submit" onClick={() => this.props.moveToComponent("tasks")} className="btn btn-outline-danger button-fixed">Cancel</button>
            </div>
        );
    }
}