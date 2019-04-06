import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskRow } from './TaskRow';
import { TaskFilter } from './TaskFilter';

const data = require('../../GlobalData.json'); // json file with const tables (priority, state)
// consts of stable tables
const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")
// const
const apiUrlGet = "/api/TaskGrid/getTasks";
const apiUrlGetStates = "/api/TaskGrid/getStates";
const apiUrlGetPriorities = "/api/TaskGrid/getPriorities";
const apiUrlDelete = "/api/TaskGrid";

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            tasks: [],
            priorities: [],
            states: [],

            sortByTitle: icon_down,
            sortByDescription: icon_down,
            sortByStartDate: icon_down,
            sortByFinishDate: icon_down,
            sortByPriority: icon_down,
            sortByState: icon_down,

            filter: null
        };

        this.loadData = this.loadData.bind(this);
        this.fetchStates = this.fetchStates.bind(this);
        this.fetchPriorities = this.fetchPriorities.bind(this);

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onAdded = this.onAdded.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.sort = this.sort.bind(this);
        this.startFiltration = this.startFiltration.bind(this);
    }

    // Load data
    loadData(filter) {
        fetch(apiUrlGet + filter, {
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
                    alert(response.status + "Get tasks error")
                }
            })
            .then(data => {
                this.setState({
                    tasks: data,
                    filter: filter
                })
            });
        this.fetchStates();
        this.fetchPriorities();
    }

    fetchStates() {
        fetch(apiUrlGetStates)
            .then(response => response.json())
            .then(data => {
                this.setState({ states: data })
            });
    }

    fetchPriorities() {
        fetch(apiUrlGetPriorities)
            .then(response => response.json())
            .then(data => {
                this.setState({ priorities: data })
            });
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

        this.setState({ tasks: arr });
    }

    sort(param1, param2) {
        var sort_order = "asc";
        switch (param1) {
            case "name": this.state.sortByTitle == icon_up ?
                (sort_order = "asc", this.setState({ sortByTitle: icon_down }))
                : (sort_order = "desc", this.setState({ sortByTitle: icon_up }));
                break;
            case "description": this.state.sortByDescription == icon_up ?
                (sort_order = "asc", this.setState({ sortByDescription: icon_down }))
                : (sort_order = "desc", this.setState({ sortByDescription: icon_up }));
                break;

            case "startDate": this.state.sortByStartDate == icon_up ?
                (sort_order = "asc", this.setState({ sortByStartDate: icon_down }))
                : (sort_order = "desc", this.setState({ sortByStartDate: icon_up }));
                break;
            case "finishDate": this.state.sortByFinishDate == icon_up ?
                (sort_order = "asc", this.setState({ sortByFinishDate: icon_down }))
                : (sort_order = "desc", this.setState({ sortByFinishDate: icon_up }));
                break;
            case "priority": this.state.sortByPriority == icon_up ?
                (sort_order = "asc", this.setState({ sortByPriority: icon_down }))
                : (sort_order = "desc", this.setState({ sortByPriority: icon_up }));
                break;
            case "taskState": this.state.sortByState == icon_up ?
                (sort_order = "asc", this.setState({ sortByState: icon_down }))
                : (sort_order = "desc", this.setState({ sortByState: icon_up }));
                break;
            default:
                break;
        }
        var filter = "?$orderby=" + param1 + (param2 == null ? "" : "/" + param2) + " " + sort_order;
        this.loadData(filter)
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
        this.setState({ filter: filtParam })
    }

    render() {
        var remove = this.onRemoveTask
        var changed = this.onChanged
        var states = this.state.states
        var priorities = this.state.priorities

        return <div>
            <br />
            <h2>Tasks</h2>
            <br />
            <div className=" p-1">

                {/* render filter form */}
                <TaskFilter changeFilter={this.startFiltration} states={this.state.states} priorities={this.state.priorities} />
                <br />
                <br />

                {/* render grid */}
                <table className="table table-hover table-responsive-x1 table-fixed">
                    <thead className="bg-light">
                        <th className="col-1">
                            <span>Title</span>
                            <ion-icon src={this.state.sortByTitle} onClick={() => this.sort("name", null)} />
                        </th>
                        <th className="col-3">
                            <span>Description</span>
                            <ion-icon src={this.state.sortByDescription} onClick={() => this.sort("description", null)} />
                        </th>
                        <th className="col-1">
                            <span>Start Date</span>
                            <ion-icon src={this.state.sortByStartDate} onClick={() => this.sort("startDate", null)} />
                        </th>
                        <th className="col-1">
                            <span>Finish Date</span>
                            <ion-icon src={this.state.sortByFinishDate} onClick={() => this.sort("finishDate", null)} />
                        </th>
                        <th className="col-1">
                            <span>Priority</span>
                            <ion-icon src={this.state.sortByPriority} onClick={() => this.sort("priority", "id")} />
                        </th>
                        <th className="col-1">
                            <span>State</span>
                            <ion-icon src={this.state.sortByState} onClick={() => this.sort("taskState", "id")} />
                        </th>
                        <th className="col-1">{/* For button Edit   */}</th>
                        <th className="col-1">{/* For button Delete */}</th>
                    </thead>
                    {this.state.tasks.map(function (task) { return <TaskRow key={task.id} task={task} onRemove={remove} onChanged={changed} states={states} priorities={priorities} /> })}
                </table>
                <div>
                    <Link to='/addTask'><button className="btn btn-sm btn-outline-info button-fixed">Add</button></Link>
                </div>
            </div>
        </div>;
    }
}