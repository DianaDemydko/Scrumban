import React, { Component } from 'react';
import buildQuery from 'odata-query'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const data = require('../../GlobalData.json'); // json file with const tables (priority, state)
// consts of stable tables
//const priorityTable = data.priority;
//const stateTable = data.taskState;

export class TaskFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            startData: "",
            finishData: "",

            priorityId: "",
            priorityName: "",

            taskStateId: "",
            taskStateName: "",

            storyId: "",
            programmerId: ""
        }
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onSetFilter = this.onSetFilter.bind(this);
        this.onCancelFilter = this.onCancelFilter.bind(this);
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
        this.setState({ priorityName: e.target.value == "All" ? "" : e.target.value });
    }

    onStateChanged(e) {
        this.setState({ taskStateName: e.target.value == "All" ? "" : e.target.value });
    }

    onSetFilter() {
        var filter = []
        if (this.state.name != "") {
            filter.push({ "tolower(Name)": {contains : this.state.name.toLowerCase() } })
        }
        if (this.state.description != "") {
            filter.push({ "tolower(Description)": { contains: this.state.description.toLowerCase() } })
        }
        if (this.state.startDate != null) {
            filter.push({ startDate: { gt: this.state.startDate } })
        }
        if (this.state.finishDate != null) {
            filter.push({ endDate: { lt: this.state.finishDate } })
        }
        if (this.state.priorityName != "") {
            filter.push({ "tolower(Priority/Name)": { contains: this.state.priorityName.toLowerCase() } })
        }
        if (this.state.taskStateName != "") {
            filter.push({ "tolower(TaskState/Name)": { contains: this.state.taskStateName.toLowerCase() } })
        }
        var query = buildQuery({ filter });
        this.props.changeFilter(query);
    }

    onCancelFilter() {
        this.setState({
            name: "",
            description: "",
            startData: "",
            finishData: "",
            priorityId: "",
            priorityName: "",
            taskStateId: "",
            taskStateName: "",
            storyId: "",
            programmerId: ""
        })
        this.props.changeFilter("");
    }

    // render row
    render() {
        return <table className="table table-responsive-x1 table-fixed">
            <thead>
                <th className="col-1">
                    <label for="inputTitle">Title</label>
                </th>
                <th className="col-3">
                    <label for="exampleInputDescription">Description</label>
                </th>
                <th className="col-1">
                    <label for="">Start Date</label>
                </th>
                <th className="col-1">
                    <label for="">FinishDate</label>
                </th>
                <th className="col-1">
                    <label for="priority">Priority</label>
                </th>
                <th className="col-1">
                    <label for="state">State</label><br />
                </th>
                <th className="col-1">{/* For button Edit   */}</th>
                <th className="col-1">{/* For button Delete */}</th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="form-group">
                            <input type="text" class="form-control form-control-sm" onChange={this.onNameChanged} id="inputTitle" aria-describedby="emailHelp" placeholder="Search" value={this.state.name} autocomplete="off" />
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input type="text" class="form-control form-control-sm" onChange={this.onDescriptionChanged} id="exampleInputDescription" placeholder="Search" value={this.state.description} autocomplete="off" />
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.onStartDateChange}
                                dateFormat="MMMM d"
                                timeCaption="time"
                                className="datePickerStyle btn btn-sm btn-outline-secondary"
                            />
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="form-group">
                                <DatePicker
                                    selected={this.state.finishDate}
                                    onChange={this.onFinishDateChange}
                                    dateFormat="MMMM d"
                                    timeCaption="time"
                                    className="datePickerStyle btn btn-sm btn-outline-secondary"
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <select class="form-control form-control-sm" onChange={this.onPriorityChanged} id="priority" placeholder="task priority" value={this.state.priorityName}>
                                <option>All</option>
                                {this.props.priorities.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </td>
                    <td>
                        <div>
                            <select class="form-control form-control-sm" onChange={this.onStateChanged} id="state" placeholder="task state" value={this.state.taskStateName}>
                                <option>All</option>
                                {this.props.states.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    </td>
                    <td>
                        <button type="submit" onClick={this.onSetFilter} class="btn btn-sm btn-outline-info button-fixed"> Filter </button>
                    </td>
                    <td>
                        <button type="submit" onClick={this.onCancelFilter} class="btn btn-sm btn-outline-info button-fixed"> Cancel </button>
                    </td>
                </tr>
            </tbody>
        </table>;
    }
}