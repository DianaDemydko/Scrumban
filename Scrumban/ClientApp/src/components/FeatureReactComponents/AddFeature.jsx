
import React, { Component } from 'react';
import Feature from './FeatureTable';
import { Link } from 'react-router-dom';

export class AddFeature extends React.Component {
    state = {
        name: '',
        description: '',
        priority: 0

    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.descrioptionChanged = this.descriptionChanged.bind(this);
        this.priorityChanged = this.priorityChanged.bind(this);
    }

    handleClick(e) {
        fetch('api/SampleData/', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: this.state.name, description: this.state.description, priority: this.state.priority })
        });
        window.location = "/feature";
    }
    nameChanged(e) {
        this.setState({ name: e.target.value });
    }
    descriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    priorityChanged(e) {
        this.setState({ priority: e.target.value });
    }

    render() {
        return (
            <div >
                <label> Name: </label>
                <input type="text" name="name" onChange={e => this.nameChanged(e)} vale={this.state.name} />
                <div />
                <label> Description: </label>
                <input type="text" name="description" onChange={e => this.descriptionChanged(e)} />
                <div />
                {/* <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" name ="owners">Ownres</button>*/}
                <div />
                <label> Priority</label>
                <select class="btn btn-light dropdown-toggle" name="prioriry" onChange={e => this.priorityChanged(e)} >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <div />
                {/* <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" name = "state">States</button>*/}
                <div />
                
                    <button class="btn btn-dark" onClick={this.handleClick} > Submit </button>
            

            </div>

        );
    }
}