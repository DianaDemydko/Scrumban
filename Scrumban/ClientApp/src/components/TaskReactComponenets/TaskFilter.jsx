import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskPrint } from './TaskPrint';
import { TaskEdit } from './TaskEdit';
import buildQuery from 'odata-query'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const data = require('../../GlobalData.json'); // json file with const tables (priority, state)
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.taskState;
// const
const apiUrlGet = "/api/TaskGrid/getTasks";
const apiUrlDelete = "/api/TaskGrid";

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
        this.setState({ priorityName: e.target.value });
    }

    onStateChanged(e) {
        this.setState({ taskStateName: e.target.value });
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

    // render row
    render() {
        return <div>
            <div className="row bg-light">
                <div class="form-group col-1">
                    <label for="inputTitle">Title</label><br />
                    <input type="text" class="form-control form-control-sm" onChange={this.onNameChanged} id="inputTitle" aria-describedby="emailHelp" placeholder="Search" autocomplete="off"/>
                </div>
                <div class="form-group col-2">
                    <label for="exampleInputDescription">Description</label><br />
                    <input type="text" class="form-control form-control-sm" onChange={this.onDescriptionChanged} id="exampleInputDescription" placeholder="Search" autocomplete="off"/>
                </div>
                <div className="form-group col-4">
                    <label for="">Start Date</label><br />
                        <DatePicker
                            selected={this.state.startDate} 
                            onChange={this.onStartDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            dateFormat="MMMM d"
                            timeCaption="time"
                            className="datePickerStyle btn btn-sm btn-outline-secondary"

                        />
                </div>
                <div className="form-group col-4">
                        <label for="">FinishDate</label><br />
                        <DatePicker
                            selected={this.state.finishDate}
                            onChange={this.onFinishDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d"
                            timeCaption="time"
                            className="datePickerStyle btn btn-sm btn-outline-secondary"

                        />
                </div>
                <div className="col-2">
                    <label for="priority">Priority</label><br />
                    <select class="form-control form-control-sm" onChange={this.onPriorityChanged} id="priority" placeholder="task priority">
                        {priorityTable.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="col-2">
                    <label for="state">State</label><br />
                    <select class="form-control form-control-sm" onChange={this.onStateChanged} id="state" placeholder="task state">
                        {stateTable.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div className="col-1">
                    <label for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label><br />
                    <button type="submit" onClick={this.onSetFilter} class="btn btn-sm btn-outline-info"> Filter </button>
                </div>
                <br/>
            </div>
        </div>;
    }
}