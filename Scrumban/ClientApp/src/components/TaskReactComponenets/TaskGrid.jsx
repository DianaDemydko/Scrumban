import React, { Component } from 'react';

//export class TaskGrid extends React.Component{
//    render() {
//        return (<div>
//            <p>Hell</p>
//        </div>);
//    }
//}

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.task };
    }

    render() {
        return <tr>
            <td>{this.state.data.id}</td>
            <td>{this.state.data.name}</td>
            <td>{this.state.data.priorityId}</td>
            <td>{this.state.data.stateId}</td>
        </tr>;
    }
}

export class TaskGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
    }

    // Load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "/api/SampleData/", true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ tasks: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return <div>
            <h2>List</h2>
            <div>
                <table>
                    <thead>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Priority</td>
                        <td>State</td>
                    </thead>
                    <tbody>
                        {this.state.tasks.map(function (task) { return <Task key={task.id} task={task} /> })}
                    </tbody>
                </table>
                
            </div>
        </div>;
    }
}