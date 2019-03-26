import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskPrint } from './TaskPrint';
import { TaskEdit } from './TaskEdit';
//import '../../index.css';

// const
const apiUrlGet = "/api/TaskGrid/getTasks";
const apiUrlDelete = "/api/TaskGrid";

const styleObj = {
    //border: '1px solid red'
}

class Task extends React.Component {

    constructor(props) {
        super(props);
        // state : true - print
        // state : false - edit 
        this.state = { data: props.task, states: true };

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onEditTask = this.onEditTask.bind(this);
        this.onChangedTask = this.onChangedTask.bind(this);
        this.onChangedEditTask = this.onChangedEditTask.bind(this);
    }

    onRemoveTask() {
        this.props.onRemove(this.state.data.id);
    }

    onChangedTask() {
        var elem = this.state.data;
        this.props.onChanged(elem);
    }

    onChangedEditTask(item) {
        this.setState({ data: item });
        this.onChangedTask();
    }

    onEditTask() {
        this.setState({ states: this.state.states === true ? false : true });
    }

    render() {
        const isEdit = this.state.states;
        return <tbody>
            {isEdit ?
                (<TaskPrint item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} />)
                : (<TaskEdit item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} changed={this.onChangedEditTask}/>)
            }
        </tbody>;
    }
}

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onAdded = this.onAdded.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    // Load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiUrlGet, true);
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
        this.setState({tasks : this.state.tasks.push(item)});
    }

    onChanged(item) {
        var arr = this.state.tasks;
        var index = arr.indexOf(x => x.id = item.id);
        arr[index] = item;
        this.setState({ tasks: arr});
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
            <h2>Tasks</h2>
            <div>
                <table className="table table-hover table-fixed">
                    <thead className="bg-light">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>State</th>
                        <th></th>
                    </thead>
                    {this.state.tasks.map(function (task) { return <Task key={task.id} task={task} onRemove={remove} onChanged={changed}/> })}
                </table>
                <div>
                    <Link to='/add'><button className="btn btn-outline-primary button-fixed">Add</button></Link>
                </div>
            </div>
        </div>;
    }
}