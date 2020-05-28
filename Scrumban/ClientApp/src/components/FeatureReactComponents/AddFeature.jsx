import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import '../../GridStyles/StyleForGrid.css';
import { checkToken } from '../Helpers'
import { toast } from 'react-toastify';


export class AddFeature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            priorityID: 1,
            stateID: 1,
            start: new Date(),
            priorities: [],
            states: [],
            users: [],
            userId: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescrioptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.onOwnerChange = this.onOwnerChange.bind(this);
}
async fetchUsers() {

   await fetch('/api/users/getUsers', {

        meethod: "get",

        headers: {

            'Content-Type': 'application/json',

            'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

        }

    })

        .then(function (response) {

            if (response.status == 200) {

                return response.json()

            }

            else if (response.status == 401) {

                alert("Not Authorized")

                window.location.replace("/login");

            }

            else {

                alert("ERROR ! " + response.status)

            }

        })

        .then(data => this.setState({ users: data }))

}
    componentDidMount() {
        fetch('api/FeatureData/GetPriorities')
            .then(res => res.json())
            .then(json => {
                this.setState({ priorities: json })
            });
        fetch('api/FeatureData/GetStates')
            .then(res => res.json())
            .then(json => {
                this.setState({ states: json })
            });
        this.fetchUsers();
    }

    onOwnerChange(e) {
        if (e.target.value === 'None') {
            this.setState({ userId: null });
        } else {
            this.setState({ userId: e.target.value });
        }
    }

    handleClick(e) {
        if (this.state.name != '' && this.state.description != '') {
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
                    stateid: this.state.stateID,
                    userId: this.state.userId
                })
            }).then(function (response) {
                if (response.status == 200) {
                    toast.success("Feature was created!");
                    this.props.moveToComponent("feature");
                }
                else if (response.status == 401) {
                    toast.warn("You are not authorized. Login please !");
                    this.props.moveToComponent("login");
                }
                else if (response.status == 403) {
                    toast.error("You have not permission  !");
                }
                else {
                    toast.error("Something wrong  !");
                }
            }.bind(this))
        } else {
            toast.warn("Name and Description cannot be empty!");
        }
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
                <label style={{ 'fontSize': '40px' }} className="create-title" >New Feature</label>
                <div />
                <div className = "addContent">
                    <label class="col-2  mr-10"> Name: </label>
                    <input className="inputAdd" placeholder="Name..." type="text" name="name" onChange={e => this.onNameChanged(e)} vale={this.state.name} />
                    <div/>
                </div>
                <div className="addContent">
                    <label class="col-2  mr-10"> Description: </label>
                    <textarea className="inputAdd" placeholder="Description..." type="text" name="description" onChange={e => this.onDescriptionChanged(e)} />
                    <div />
                </div>
                <div className="addContent">
                    <label class="col-2  mr-10"> State: </label>
                <select class="btn btn-light dropdown-toggle m-0 w-25" name="state" onChange={e => this.onStateChanged(e)} >
                    {this.state.states.map(state => (
                        <option> {state.name}</option>))}

                    </select>
                    </div>
                <div className="addContent">
                    <label class="col-2 mr-10">Owner: </label>
                    <select onChange={this.onOwnerChange} class="btn btn-light dropdown-toggle m-0 w-25" id="state" placeholder="Owner...">
                        <option>None</option>
                        {this.state.users.map((item) => <option value={item.id}>{`${item.firstName}  ${item.surname}`}</option>)}
                    </select>
                </div>
                <div className="addContent">
                    <label class="col-2  mr-10"> Priority: </label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" name="prioriry" onChange={e => this.onPriorityChanged(e)} >
                      {this.state.priorities.map(priority => (
                        <option> { priority.name }</option>))}
                    </select>
                </div>
                <div />
                <div className="addContent">
                    <label class="col-2  mr-10" >Start Date: </label>
                    <DatePicker className="datePickerStyle btn btn-sm btn-outline-secondary" selected={this.state.start} onChange={this.onStartDateChanged} dateFormat="yyyy/MM/dd" />
                    <div />
                </div>
                <div className="addContent">
                    <button class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width':'50%' }} onClick={this.handleClick} > Save </button>
                    <button class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '40%' }} onClick={() => this.props.moveToComponent("feature")} > Cancel </button>
                    </div>


                </div>
                

        );
    }
}