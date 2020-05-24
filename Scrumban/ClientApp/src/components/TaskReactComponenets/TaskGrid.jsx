import React, { Component } from 'react';

import { TaskRow } from './TaskRow';
import { toast } from 'react-toastify';
import { TaskFilter } from './TaskFilter';
import Spinner from 'react-bootstrap/Spinner'

import { checkToken } from '../Helpers'
import { Pagination } from '../DefectReactComponent/Pagination.jsx'

// consts of stable tables

const icon_up = require("./sort-arrow-up.svg")

const icon_down = require("./sort-arrow-down.svg")

// const

const apiUrlGet = "/api/TaskGrid/getTasks";

const apiUrlGetStates = "/api/TaskGrid/getStates";

const apiUrlGetPriorities = "/api/TaskGrid/getPriorities";

const apiUrlDelete = "/api/TaskGrid";

const getStoriesUrl = "/api/story/getstories"

const getUsersUrl = "/api/users/getUsers"



export class TaskGrid extends React.Component {



    constructor(props) {

        super(props);

        this.state = {



            tasks: [],

            priorities: [],

            states: [],

            users: [],

            stories: [],



            sortByTitle: icon_down,

            sortByDescription: icon_down,

            sortByStartDate: icon_down,

            sortByFinishDate: icon_down,

            sortByPriority: icon_down,

            sortByState: icon_down,

            sortByUser: icon_down,

            sortByStory: icon_down,
            showFilters: false,



            filter: "",
            pageOfItems: [],
            loading: true


        };

        this.showFilters = this.showFilters.bind(this);


        this.loadData = this.loadData.bind(this);

        this.fetchStates = this.fetchStates.bind(this);

        this.fetchPriorities = this.fetchPriorities.bind(this);

        this.fetchStories = this.fetchStories.bind(this);

        this.fetchUsers = this.fetchUsers.bind(this);





        this.onRemoveTask = this.onRemoveTask.bind(this);

        this.onChanged = this.onChanged.bind(this);

        this.sort = this.sort.bind(this);

        this.startFiltration = this.startFiltration.bind(this);
        this.onChangePage = this.onChangePage.bind(this);

    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({
            pageOfItems: pageOfItems
        });

    }

    showFilters(param) {
        this.setState({ showFilters: param });
    }
    // Load data

    loadData(filter) {

        checkToken()

        this.setState({ loading: true });

        fetch(apiUrlGet + filter, {

            headers: {

                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

            }

        }).then(function (response) {

            if (response.status == 200) {

                var res = response.json()

                return res;

            }

            }).then(data => {
                if (data.length > 0) {
                    this.setState({

                        tasks: data,

                        filter: filter,
                        loading: false

                    })
                } else {
                    this.setState({

                        tasks: [],

                        filter: filter,
                        loading: false,
                        pageOfItems: []

                    })
                }
            }

        )

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

        this.loadData(this.state.filter);

        this.fetchStates();

        this.fetchPriorities();

        this.fetchStories();

        this.fetchUsers();

    }



    onChanged(newTask) {

        this.loadData(this.state.filter)

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

            case "user": this.state.sortByUser == icon_up ?

                (sort_order = "asc", this.setState({ sortByUser: icon_down }))

                : (sort_order = "desc", this.setState({ sortByUser: icon_up }));

                break;

            case "story": this.state.sortByStory == icon_up ?

                (sort_order = "asc", this.setState({ sortByStory: icon_down }))

                : (sort_order = "desc", this.setState({ sortByStory: icon_up }));

                break;

            default:

                break;

        }

        var filter = "?$orderby=" + param1 + (param2 == null ? "" : "/" + param2) + " " + sort_order;

        this.loadData(filter)

    }



    onRemoveTask(id) {
        
        var url = apiUrlDelete + "/" + id

        fetch(url, {

            method: "delete",

            headers: {

                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

            }

        })

            .then(function (response) {

                if (response.status == 200) {


                    toast.success("Task was deleted!");

                    this.loadData(this.state.filter.toString());

                }

                else if (response.status == 401) {

                    var answer = window.confirm("You are not authorized. Move to Login page ?")

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

            }.bind(this))

    }



    startFiltration(filtParam) {

        this.loadData(filtParam);

    }



    render() {

        var remove = this.onRemoveTask

        var changed = this.onChanged

        var states = this.state.states

        var priorities = this.state.priorities

        var users = this.state.users

        var stories = this.state.stories

        var moveToComponentVar = this.props.moveToComponent



        return <div>

            <div className="grid-panel">
                <div className="grid-name">Tasks</div>
                <div className="grid-buttons">
                    <button onClick={() => this.props.moveToComponent("taskAdd")} className="btn add-new btn-panel-table">Create New</button>
                    <button onClick={() => { this.showFilters(true) }} className="btn btn-panel-table add-filters">Apply Filters</button>
                </div>
            </div>
            <hr></hr>
            {this.state.showFilters ? <TaskFilter changeFilter={this.startFiltration} states={this.state.states} priorities={this.state.priorities} hideFilters={this.showFilters} /> : null}
            {this.state.loading ? (
                <div style={{'margin-left':'50%', 'margin-top': '15%'}}>
                    <Spinner animation="border" variant="warning" />
                </div>
            ) :
                <div>
            <div className="tablePosition table-wrapper">
                <table className="table" style={{ 'table-layout': 'fixed' }}>

                    <thead>

                <th className="col-1">

                    <span>Name</span>

                    <ion-icon src={this.state.sortByTitle} onClick={() => this.sort("name", null)} />

                </th>

                <th className="col-1" min-width="100px">

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

                <th className="col-1">

                    <span>Owner</span>

                </th>

                <th className="col-1">

                    <span>Story</span>

                    <ion-icon src={this.state.sortByState} onClick={() => this.sort("story", "name")} />

                </th>

                <th className="col-1">{/* For button Edit   */}</th>

            </thead>
            {(this.state.pageOfItems.length > 0)//pageOfItems
                ? this.state.pageOfItems.map((task) => {

                    return <TaskRow key={task.id}

                        task={task} onRemove={remove}

                        onChanged={changed}

                        moveToComponent={moveToComponentVar}

                        states={states}

                        priorities={priorities}

                        users={users}

                        stories={stories}

                    />

                }) : (<tbody>
                    <td>
                        No results
                            </td>
                </tbody>)}

                </table>
            </div >
            <div>
                <Pagination items={this.state.tasks} onChangePage={this.onChangePage} />
            </div>
        </div >
            }
        </div>;

    }

}