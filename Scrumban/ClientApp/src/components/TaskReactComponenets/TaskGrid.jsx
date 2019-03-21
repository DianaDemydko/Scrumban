import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskPrint } from './TaskPrint';
import { TaskEdit } from './TaskEdit';
//import '../../index.css';

// const
const apiUrlGet = "/api/SampleData/getTasks";
const apiUrlDelete = "/api/SampleData";

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
    }

    onRemoveTask() {
        this.props.onRemove(this.state.data.id);
    }

    onEditTask() {
        this.setState({ states: this.state.states === true ? false : true });
    }

    render() {
        const isEdit = this.state.states;
        return <tbody>
            {isEdit ?
                (<TaskPrint item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} />)
                : (<TaskEdit item={this.state.data} edit={this.onEditTask} delete={this.onRemoveTask} />)
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
        return <div>
            <h2>Tasks</h2>
            <div>
                <table className="table table-fixed">
                    <thead className="bg-light">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>State</th>
                        <th></th>
                    </thead>
                    {this.state.tasks.map(function (task) { return <Task key={task.id} task={task} onRemove={remove}/> })}
                </table>
                <div>
                    <Link to='/add'><button className="btn btn-primary button-fixed">Add</button></Link>
                </div>
                
            </div>
        </div>;
    }
}