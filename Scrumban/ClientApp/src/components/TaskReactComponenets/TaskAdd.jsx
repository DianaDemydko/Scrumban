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

            .then(data => this.setState({ stories: data }))

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



    onPriorityChanged(e) {

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
        

    }



    render() {

        return (

            <div className="addComponentBackground">



                <h2 style={{ 'fontSize': '40px' }} className="create-title">New Task</h2>



                <div className="addContent">

                    <label for="name" className="col-2 mr-10">Name: </label>

                    <input type="text" className="inputAdd" onChange={this.onNameChanged} id="name" placeholder="Name..." autoComplete="false" />

                </div>



                <div className="addContent">

                    <label for="description" className="col-2 mr-10">Description: </label>

                    <textarea rows="3" className="inputAdd" onChange={this.onDescriptionChanged} id="description" placeholder="Description..." />

                </div>



                <div className="addContent">

                    <label for="description" className="col-2 mr-10">Start Date: </label>

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



                <div className="addContent">

                    <label for="finishDate" className="col-2 mr-10">Finish Date: </label>

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
                        className="datePickerStyle btn btn-sm btn-outline-secondary"

                    />

                </div>



                <div className="addContent">

                    <label for="priorityName" className="col-2 mr-10">Priority: </label>

                    <select style={{ 'margin-top': '0px' }} className="btn btn-light dropdown-toggle w-25" id="priorityName" onChange={this.onPriorityChanged} placeholder="task priority">

                        {priorityTable.map((item) => <option>{item.name}</option>)}

                    </select>

                </div>

                <div className="addContent">

                    <label for="taskStateName" className="col-2 mr-10">State: </label>

                    <select style={{ 'margin-top': '0px' }} class="btn btn-light dropdown-toggle w-25" id="taskStateName" onChange={this.onStateChanged} placeholder="task state">

                        {stateTable.map((item) => <option>{item.name}</option>)}

                    </select>

                </div>

                <div className="addContent">

                    <label for="userAssign" className="col-2 mr-10">Owner: </label>

                    <select style={{ 'margin-top': '0px' }} class="btn btn-light dropdown-toggle w-25" id="userAssign" onChange={this.onUserChanged} placeholder="">

                        <option>None</option>

                        {this.state.users.map((item) => <option>{item.firstName} {item.surname}</option>)}

                    </select>

                </div>

                <div className="addContent">

                    <label for="story" className="col-2 mr-10">Story: </label>

                    <select style={{ 'margin-top': '0px' }} class="btn btn-light dropdown-toggle w-25" id="story" onChange={this.onStoryChanged} placeholder="">

                        <option>None</option>

                        {this.state.stories.map((item) => <option>{item.name}</option>)}

                    </select>

                </div>

                <div className="addContent">

                    <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '50%' }}>Save</button>

                    <button type="submit" onClick={() => this.props.moveToComponent("tasks")} className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '40%' }}>Cancel</button>

                </div>

            </div>

        );

    }

}