import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import '../../GridStyles/StyleForGrid.css';
import { checkToken } from '../Helpers'


export class AddFeature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Default Name',
            description: 'Default Description',
            priorityID: 1,
            stateID: 1,
            start: new Date(),
            priorities: [],
            states: []

        };
        this.handleClick = this.handleClick.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescrioptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    componentDidMount() {
        fetch('api/FeatureData/getPriorities')
            .then(res => res.json())
            .then(json => {
                this.setState({ priorities: json })
            });
        fetch('api/FeatureData/getStates')
            .then(res => res.json())
            .then(json => {
                this.setState({ states: json })
            });
    }

    handleClick(e) {
        checkToken()
        fetch('api/FeatureData/', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                name: this.state.name, description: this.state.description,
                priorityid: this.state.priorityID, time: this.state.start,
                stateid: this.state.stateID
            })
        }).then(function (response) {
            if (response.status == 200) {
                this.props.moveToComponent("feature");
            }
            else if (response.status == 401) {
                var answer = window.confirm("You are not authorized. Move to Login page ?");
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
    
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onPriorityChanged(e) {
        var i = this.state.priorities.find(x => x.name === e.target.value).id;
        this.setState({ priorityID: i });
    }
    onStateChanged(e) {
        var i = this.state.states.find(x => x.name === e.target.value).id;
        this.setState({ stateID: i });
    }
    onStartDateChanged(newDate) {
        this.setState({ start: newDate });
    }

   

    render() {
        return (
            <div className="addComponentBackground" >
                <label style={{ 'fontSize': '40px' }} > Create New Feature</label>
                <div />
                <div className = "addContent">
                <label class = "col-2"> Name: </label>
                <input className="inputAdd" type="text" name="name" onChange={e => this.onNameChanged(e)} vale={this.state.name} />
<div/>
                </div>
                
                <div className="addContent">
                    <label class="col-2"> Description: </label>
                    <textarea className="inputAdd" type="text" name="description" onChange={e => this.onDescriptionChanged(e)} />
                    <div />
                </div>
                
                <div className="addContent">
                    <label class="col-2"> State: </label>
                <select class="btn btn-light dropdown-toggle m-0" name="state" onChange={e => this.onStateChanged(e)} >
                    {this.state.states.map(state => (
                        <option> {state.name}</option>))}

                    </select>
                    </div>
                {/* <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" name ="owners">Ownres</button>*/}
                <div />
                <div className="addContent">
                    <label class="col-2"> Priority: </label>
                <select class="btn btn-light dropdown-toggle m-0" name="prioriry" onChange={e => this.onPriorityChanged(e)} >
                    {this.state.priorities.map(priority => (
                        <option> { priority.name }</option>))}
           
                    </select>
                </div>
                <div />
                <div className="addContent">
                    <label class="col-2" >Start Date: </label>
                    <DatePicker selected={this.state.start} onChange={this.onStartDateChanged} dateFormat="yyyy/MM/dd" />
                    <div />
                </div>
                
                <div className="addContent">
                    <button class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width':'15%' }} onClick={this.handleClick} > Submit </button>
                
                    <button class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }} onClick={() => this.props.moveToComponent("feature")} > Cancel </button>
                    </div>


                </div>
                

        );
    }
}