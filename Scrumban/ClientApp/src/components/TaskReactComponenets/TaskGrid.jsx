import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskRow } from './TaskRow';
import { TaskFilter } from './TaskFilter';

const data = require('../../GlobalData.json'); // json file with const tables (priority, state)
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;
const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")
// const
const apiUrlGet = "/api/TaskGrid/getTasks";
const apiUrlDelete = "/api/TaskGrid";

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            sortByTitle: icon_up,
            sortByDescription: icon_up,
            sortByPriority: icon_up,
            sortByState: icon_up,
            filter: null
        };

        this.loadData = this.loadData.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onAdded = this.onAdded.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.sort = this.sort.bind(this);
        this.startFiltration = this.startFiltration.bind(this);
    }

    // Load data
    loadData(filter) {
        fetch(apiUrlGet + filter)
            .then(response => response.json())
            .then(data => { this.setState({ tasks: data, filter : filter }) });
    }

    componentDidMount() {
        this.loadData("");
    }

    onAdded(item) {
        this.setState({ tasks: this.state.tasks.push(item) });
    }

    onChanged(item) {
        var arr = this.state.tasks;
        var index = arr.findIndex(x => x.id === item.id);

        arr[index].name = item.name;
        arr[index].description = item.description;
        arr[index].startDate = item.startDate;
        arr[index].finishDate = item.finishDate;
        arr[index].priority = item.priority;
        arr[index].priorityId = item.priorityId;
        arr[index].taskState = item.taskState;
        arr[index].taskStateId = item.taskStateId;
        //arr[index] = item;
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
                this.loadData(this.state.filter);
            }
        }.bind(this);
        xhr.send();
    }

    startFiltration(filtParam) {
        this.loadData(filtParam);
        this.setState({filter : filtParam})
    }

    render() {
        var remove = this.onRemoveTask;
        var changed = this.onChanged;

        return <div>
            <br />
                <h2>Tasks</h2>
            <br />
            <div className=" p-1">
                
                {/* render filter form */}
                <TaskFilter changeFilter={this.startFiltration}/>
                <br />
                <br />

                {/* render grid */}
                <table className="table table-hover table-responsive-x1 table-fixed">
                    <thead className="bg-light">
                        <th style={{ width: '20%' }}>
                            <span>Title</span>
                            <ion-icon src={this.state.sortByTitle} onClick={() => this.sort("title", null)} />
                        </th>
                        <th style={{ width: '20%' }}>
                            <span>Description</span>
                            <ion-icon src={this.state.sortByDescription} onClick={() => this.sort("description", null)} />
                        </th>
                        <th>
                            <span>Start Date</span>
                        </th>
                        <th>
                            <span>Finish Date</span>
                        </th>
                        <th style={{ width: '10%' }}>    
                            <span>Priority</span>
                            <ion-icon src={this.state.sortByPriority} onClick={() => this.sort("priority", "id")} />
                        </th>
                        <th style={{ width: '10%' }}>
                            <span>State</span>
                            <ion-icon src={this.state.sortByState} onClick={() => this.sort("taskState", "id")} />
                        </th>
                        <th style={{ width: '7%' }}>{/* For button Edit   */}</th>
                        <th style={{ width: '7%' }}>{/* For button Delete */}</th>
                    </thead>
                    {this.state.tasks.map(function (task) { return <TaskRow key={task.id} task={task} onRemove={remove} onChanged={changed} /> })}
                </table>
                <div>
                    <Link to='/addTask'><button className="btn btn-sm btn-outline-info button-fixed">Add</button></Link>
                </div>
            </div>
        </div>;
    }
}
