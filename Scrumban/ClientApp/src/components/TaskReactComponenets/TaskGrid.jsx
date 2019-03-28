import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskPrint } from './TaskPrint';
import { TaskEdit } from './TaskEdit';
//import '../../index.css';

const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;
const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")

// const
const apiUrlGet = "/api/TaskGrid/getTasks";
const apiUrlDelete = "/api/TaskGrid";

const styleObj = {
    //border: '1px solid red'
}

class Task extends React.Component {

    constructor(props) {
        super(props);
        // states : true - print
        // states : false - edit 
        this.state = {
            data: props.task,
            states: true // states : true - print, false - edit
        };

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onEditTask = this.onEditTask.bind(this);
        this.onChangedTask = this.onChangedTask.bind(this);
    }

    onRemoveTask() {
        this.props.onRemove(this.state.data.id);
    }

    onChangedTask(item) {
        //console.log(item);
        //this.setState({ data: item });
        //var elem = this.state.data;
        this.props.onChanged(item);
    }

    onEditTask() {
        this.setState({ states: this.state.states === true ? false : true });
    }
    // render row
    render() {
        const isEdit = this.state.states;
        return <tbody>
            {isEdit ?
                (<TaskPrint item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} />)
                : (<TaskEdit item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} changed={this.onChangedTask} />)
            }
        </tbody>;
    }
}

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            sortByTitle: icon_up,
            sortByDescription: icon_up,
            sortByPriority: icon_up,
            sortByState: icon_up
        };

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onAdded = this.onAdded.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.sort = this.sort.bind(this);
    }

    // Load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiUrlGet + "?$orderby=Name desc", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ tasks: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onAdded(item) {
        this.setState({ tasks: this.state.tasks.push(item) });
    }

    onChanged(item) {
        var arr = this.state.tasks;
        var index = arr.indexOf(x => x.id === item.id);
        console.log(index);
        arr[index] = item; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(arr[index]);
        console.log(arr);
        this.setState({ tasks: arr });
    }

    sortDown(param) {
        var arr = this.state.tasks.sort(function (a, b) {
            if (a[param] > b[param]) {
                return 1;
            }
            if (a[param] < b[param]) {
                return -1;
            }
            return 0;
        });
        return arr;
    }

    sortUp(param) {
        var arr = this.state.tasks.sort(function (a, b) {
            if (a[param] < b[param]) {
                return 1;
            }
            if (a[param] > b[param]) {
                return -1;
            }
            return 0;
        });
        return arr;
    }

    sortIncludeDown(param1, param2) {
        var arr = this.state.tasks.sort(function (a, b) {
            if (a[param1][param2] > b[param1][param2]) {
                return 1;
            }
            if (a[param1][param2] < b[param1][param2]) {
                return -1;
            }
            return 0;
        });
        return arr;
    }

    sortIncludeUp(param1, param2) {
        var arr = this.state.tasks.sort(function (a, b) {
            if (a[param1][param2] < b[param1][param2]) {
                return 1;
            }
            if (a[param1][param2] > b[param1][param2]) {
                return -1;
            }
            return 0;
        });
        return arr;
    }

    sort(param1, param2) {
        if (param2 == null) {
            if (param1 == "title") {
                param1 = "name"
                if (this.state.sortByTitle == icon_up) {
                    var arr = this.sortDown(param1)
                    this.setState({ tasks: arr, sortByTitle: icon_down });
                }
                else {
                    var arr = this.sortUp(param1)
                    this.setState({ tasks: arr, sortByTitle: icon_up });
                }
            }
            else if (param1 == "description") {
                if (this.state.sortByDescription == icon_up) {
                    var arr = this.sortDown(param1)
                    this.setState({ tasks: arr, sortByDescription: icon_down });
                }
                else {
                    var arr = this.sortUp(param1)
                    this.setState({ tasks: arr, sortByDescription: icon_up });
                }
            }
        }
        else {
            if (param1 == "priority") {
                if (this.state.sortByPriority == icon_up) {
                    var arr = this.sortIncludeDown(param1, param2)
                    this.setState({ tasks: arr, sortByPriority: icon_down });
                }
                else {
                    var arr = this.sortIncludeUp(param1, param2)
                    this.setState({ tasks: arr, sortByPriority: icon_up });
                }
            }
            else if (param1 == "taskState") {
                if (this.state.sortByState == icon_up) {
                    var arr = this.sortIncludeDown(param1, param2)
                    this.setState({ tasks: arr, sortByState: icon_down });
                }
                else {
                    var arr = this.sortIncludeUp(param1, param2)
                    this.setState({ tasks: arr, sortByState: icon_up });
                }
            }
            
        }
    }

    onRemoveTask(id) {
        var url = apiUrlDelete + "/" + id;

        var xhr = new XMLHttpRequest();
        xhr.open("delete", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status == 200) {
                this.loadData();
            }
        }.bind(this);
        xhr.send();
    }

    render() {
        var remove = this.onRemoveTask;
        var changed = this.onChanged;
        return <div>
            <h2>Tasks</h2><br/>
            <div>
                {/* render filter form */}
                <form>
                    <div className="row">
                        <div class="form-group col-3">
                            <label for="inputTitle">Title</label>
                            <input type="email" class="form-control" id="inputTitle" aria-describedby="emailHelp" placeholder="Search"/>
                            
                        </div>
                        <div class="form-group col-3">
                            <label for="exampleInputDescription">Description</label>
                            <input type="password" class="form-control" id="exampleInputDescription" placeholder="Search"/>
                        </div>
                        <div className="col-2">
                            <label for="priority">Priority</label>
                            <select class="form-control" id="priority" placeholder="task priority">
                                {priorityTable.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="col-2">
                            <label for="state">State</label>
                            <select class="form-control" id="state" placeholder="task state">
                                {stateTable.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="col-1">
                            <br/>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <br />

                {/* render grid */}
                <table className="table table-hover table-fixed">
                    <thead className="bg-light">
                        <th >
                            <span>Title</span>
                            <ion-icon src={this.state.sortByTitle} onClick={() => this.sort("title", null)} />
                        </th>
                        <th>
                            <span>Description</span>
                            <ion-icon src={this.state.sortByDescription} onClick={() => this.sort("description", null)} />
                        </th>
                        <th>
                            <span>Priority</span>
                            <ion-icon src={this.state.sortByPriority} onClick={() => this.sort("priority", "id")} />
                        </th>
                        <th>
                            <span>State</span>
                            <ion-icon src={this.state.sortByState} onClick={() => this.sort("taskState", "id")} />
                        </th>
                        <th></th>
                    </thead>
                    {this.state.tasks.map(function (task) { return <Task key={task.id} task={task} onRemove={remove} onChanged={changed} /> })}
                </table>
                <div>
                    <Link to='/add'><button className="btn btn-outline-primary button-fixed">Add</button></Link>
                </div>
            </div>
        </div>;
    }
}
