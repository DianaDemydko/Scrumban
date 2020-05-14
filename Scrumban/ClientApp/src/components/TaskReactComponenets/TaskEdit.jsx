import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";

import { checkToken } from '../Helpers'



const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)

const updateTaskUrl = "/api/TaskGrid/editTask";

const updateTaskDetailedUrl = "/api/TaskGrid/editTaskDetailed";





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

            programmerId: this.props.item.programmerId,



            userId: this.props.item.userId,

            storyId: this.props.item.storyId,



        };



        this.onNameChanged = this.onNameChanged.bind(this);

        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);

        this.onPriorityChanged = this.onPriorityChanged.bind(this);

        this.onStateChanged = this.onStateChanged.bind(this);

        this.onUserChanged = this.onUserChanged.bind(this);

        this.onStoryChanged = this.onStoryChanged.bind(this);



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

            priorityId: this.props.priorities.find(x => x.name === e.target.value).id

        });

    }



    onStateChanged(e) {

        this.setState({

            taskStateName: e.target.value,

            taskStateId: this.props.states.find(x => x.name === e.target.value).id

        });

    }

    onUserChanged(e) {

        if (e.target.value === "None") {

            this.setState({ userId: null});

        }

        else {

            this.setState({

                userId: this.props.users.find(x => (x.firstName + " " + x.surname) === e.target.value).id

            });

        }



    }

    onStoryChanged(e) {

        if (e.target.value === "None") {

            this.setState({ storyId: null });

        }

        else {

            this.setState({

                storyId: this.props.stories.find(x => x.name === e.target.value).story_id

            });

        }

    }



    onUpdate(task) {

        var data = JSON.stringify({

            "userId": sessionStorage.getItem("userId"),

            "description": "description",

            "operation": "Updated",

            "task": {

                "id": task.id,

                "name": task.name,

                "description": task.description,

                "startDate": task.startDate,

                "finishDate": task.finishDate,



                "priorityId": task.priorityId,

                "priority": task.priority,



                "taskStateId": task.taskStateId,

                "taskState": task.taskState,



                "userId": task.userId,

                "storyId": task.storyId

            }

        });



        if (task) {

            checkToken()



            fetch(updateTaskDetailedUrl, {

                method: "post",

                headers: {

                    "Content-Type": "application/json",

                    'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

                },

                body: data

            })

                .then(function (response) {

                    if (response.status == 200) {
                        toast.success("Updated successfuly");
                        return "Ok";

                    }

                    else if (response.status == 401) {

                        var answer = window.confirm("You are not authorized. Move to Login page ?");

                        if (answer == true) {

                            window.location.replace("/login");

                        }

                    }

                    else if (response.status == 403) {

                        alert("ERROR! You have not permission !")

                    }

                    else {

                        alert("ERROR! Status code: " + response.status)

                    }

                })

                .then(data => {

                    if (data == "Ok") {

                        this.props.changed(data)

                        //this.props.moveToComponent("tasks")

                    }

                })

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

            userId: this.state.userId,

            storyId: this.state.storyId

        };

        this.onUpdate(task);

        this.props.edit();

    }



    render() {

        var story_name;

        var user_name;

        if (this.props.item.story != null) {

            story_name = this.props.stories.find(x => x.story_id === this.props.item.story.story_id).name

        }

        if (this.props.item.user != null) {

            var user = this.props.users.find(x => x.id === this.props.item.user.id)

            user_name = user.firstName + " " + user.surname

        }



        return <tr>

            <td>
                    <div>

                        <label for="name">Name</label>

                        <input type="text" class="form-control form-control-sm" onChange={this.onNameChanged} id="name" placeholder="task name" autoComplete="false" defaultValue={this.props.item.name} />

                    </div>
            </td>
            <td>
                    <div>

                        <label for="description">Description</label>

                        <textarea rows="3" class="form-control form-control-sm" onChange={this.onDescriptionChanged} id="description" placeholder="task description" defaultValue={this.props.item.description} />

                    </div>

                </td>

                <td>

                    <div>

                        <label for="startDate">Start Date</label><br />

                        <DatePicker

                            selected={this.state.startDate}

                            onChange={this.onStartDateChange}

                            dateFormat="MMMM d, yyyy"

                            timeCaption="time"

                            id="startDate"

                            className="form-control"

                        />

                    </div>

                </td>

                <td>

                    <div >

                        <label for="finishDate">Finish Date</label><br />

                        <DatePicker

                            selected={this.state.finishDate}

                            onChange={this.onFinishDateChange}

                            dateFormat="MMMM d, yyyy"

                            timeCaption="time"

                            id="finishDate"

                            className="form-control"

                        />

                    </div>

                </td>

                <td>

                    <div>

                        <label for="priorityName">Priority</label>

                    <select class="form-control form-control-sm m-0"  id="priorityName" onChange={this.onPriorityChanged} placeholder="task priority" defaultValue={this.props.item.priority.name}>

                            {this.props.priorities.map((item) => <option>{item.name}</option>)}

                        </select>

                    </div>

                </td>

                <td>

                    <div>

                        <label for="taskStateName">State</label>

                    <select class="form-control form-control-sm m-0"  id="taskStateName" onChange={this.onStateChanged} placeholder="task state" defaultValue={this.props.item.taskState.name}>

                            {this.props.states.map((item) => <option>{item.name}</option>)}

                        </select>

                    </div>

                </td>

                <td>

                    <div>

                        <label for="userAssign">Owner</label>

                    <select class="form-control form-control-sm m-0"  id="userAssign" onChange={this.onUserChanged} placeholder="" defaultValue={user_name} >

                            <option>None</option>

                            {this.props.users.map((item) => <option>{item.firstName} {item.surname}</option>)}

                        </select>

                    </div>

                </td>

                <td>

                    <div>

                        <label for="userAssign">Story</label>

                        <select class="form-control form-control-sm m-0" id="userAssign" onChange={this.onStoryChanged} placeholder="" defaultValue={story_name}>

                            <option>None</option>

                            {this.props.stories.map((item) => <option>{item.name}</option>)}

                        </select>

                    </div>

                </td>
            <td colSpan="2">
                <div>

                    <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark w-100 m-1">Save</button> 


                    <button type="submit" onClick={this.props.edit} className="btn btn-sm btn-outline-dark w-100 m-1">Cancel</button>

                </div>

            </td>

        </tr>;

    }

}