import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var apiUrl = "/api/SampleData";

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.task };

        this.onRemoveTask = this.onRemoveTask.bind(this);
    }

    onRemoveTask() {
        this.props.onRemove(this.state.data.id);
    }

    render() {
        return <tr>
            <td>{this.state.data.id}</td>     
            <td>{this.state.data.name}</td>
            <td>{this.state.data.description}</td>
            <td>{this.state.data.priority.name}</td>
            <td>{this.state.data.taskState.name}</td>
            <td>
                <button type="submit" className="btn btn-primary">Edit</button>
                <button type="submit" onClick={this.onRemoveTask} className="btn btn-danger">Delete</button>
            </td>
        </tr>;
    }
}

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };

        this.onRemoveTask = this.onRemoveTask.bind(this);
    }

    // Load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ tasks: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onRemoveTask(id) {
        var url = apiUrl + "/" + id;

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
        return <div>
            <h2>Tasks</h2>
            <div>
                <table className="table table-hover">
                    <thead className="bg-light">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>State</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.state.tasks.map(function (task) { return <Task key={task.id} task={task} onRemove={remove} /> })}
                    </tbody>
                </table>
                <div>
                    <Link to='/add'><button className="btn btn-primary">Add</button></Link>
                </div>
                
            </div>
        </div>;
    }
}