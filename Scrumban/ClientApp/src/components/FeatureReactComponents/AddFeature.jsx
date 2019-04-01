
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

export class AddFeature extends React.Component {
   

    constructor(props) {
        super(props);
        this.state = {
            name: 'Default Name',
            description: 'Default Description',
            priority: 1,
            date: new Date(),

        };
        this.handleClick = this.handleClick.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescrioptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    handleClick(e) {
        fetch('api/SampleData/', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.name, description: this.state.description,
                priority: this.state.priority, time: this.state.date
            })
        });
        window.location = "/feature";
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onPriorityChanged(e) {
        this.setState({ priority: e.target.value });
    }
    onDateChanged(newDate) {
        this.setState({ date: newDate });
    }

    render() {
        return (
            <div >
                <label> Name: </label>
                <input type="text" name="name" onChange={e => this.onNameChanged(e)} vale={this.state.name} />
                <div />
                <label> Description: </label>
                <input type="text" name="description" onChange={e => this.onDescriptionChanged(e)} />
                <div />
                {/* <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" name ="owners">Ownres</button>*/}
                <div />
                <label> Priority</label>
                <select class="btn btn-light dropdown-toggle" name="prioriry" onChange={e => this.onPriorityChanged(e)} >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <div />
                {/* <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" name = "state">States</button>*/}
                <label >Statrt Date</label>
                <DatePicker onChange={this.onDateChanged} dateFormat="yyyy/MM/dd"/>
                <div />
                    <button class="btn btn-dark" onClick={this.handleClick} > Submit </button>
            

            </div>

        );
    }
}