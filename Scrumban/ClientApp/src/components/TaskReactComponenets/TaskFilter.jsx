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
        this.props.hideFilters(false);
    }

    // render row
    render() {
        return <div className='filterContainer' style={{ marginLeft: '20px', marginRight: '20px' }}>
            <div className= "row filter-row-5">
                <div className="col-sm">
                    <label for="inputTitle">Name</label>
                </div>
                <div className="col-sm ">
                    <label for="exampleInputDescription">Description</label>
                </div>
                <div className="col-sm">
                    <label for="">Start Date</label>
                </div>
                <div className="col-sm">
                    <label for="">FinishDate</label>
                </div>
                <div className="col-sm">
                    <label for="priority">Priority</label>
                </div>
                <div className="col-sm">
                    <label for="state">State</label><br />
                </div>
                <div className="col-sm">{/* For button Edit   */}</div>
                <div className="col-sm">{/* For button Delete */}</div>
            </div>
            <div className= "row filter-row-10">
                
                    
                <div className="col-sm">
                    <input type="text" className="input" onChange={this.onNameChanged} id="inputTitle" placeholder=" Search" value={this.state.name} autocomplete="off" />
                        </div>
                    
                <div className="col-sm">
                    <input type="text" className="input" onChange={this.onDescriptionChanged} id="exampleInputDescription" placeholder=" Search" value={this.state.description} autocomplete="off" />
                        </div>
                    
                <div className="col-sm" >
                            <DatePicker
                                className="input"
                                selected={this.state.startDate}
                                onChange={this.onStartDateChange}
                                dateFormat="MMMM d"
                                timeCaption="time"
                                className="datePickerStyle btn btn-sm btn-outline-secondary"
                            />
                        </div>
                   
                <div className="col-sm">
                            <div >
                                <DatePicker
                                    className="input"
                                    selected={this.state.finishDate}
                                    onChange={this.onFinishDateChange}
                                    dateFormat="MMMM d"
                                    timeCaption="time"
                                    className="datePickerStyle btn btn-sm btn-outline-secondary"
                                />
                            </div>
                        </div>
                    
                <div className="col-sm">
                    <select className="btn btn-light dropdown-toggle w-100 m-0" onChange={this.onPriorityChanged} id="priority" placeholder="task priority" value={this.state.priorityName}>
                                <option>All</option>
                                {this.props.priorities.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    
                <div className="col-sm">
                    <select className="btn btn-light dropdown-toggle w-100 m-0" onChange={this.onStateChanged} id="state" placeholder="task state" value={this.state.taskStateName}>
                                <option>All</option>
                                {this.props.states.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                <div className="col-sm" >  
                    <button type="submit" onClick={this.onSetFilter} className="btn apply-filters w-100 m-1"> Filter </button>
                </div>  
                <div className="col-sm">
                    <button type="submit" onClick={this.onCancelFilter} className="btn cancel-filter w-100 m-1"> Cancel </button>
                </div>
               
            </div>
        </div>;
    }
}