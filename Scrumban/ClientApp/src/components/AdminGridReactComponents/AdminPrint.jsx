import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';

export class AdminPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            firstDescriptionWord: '',
            editState: false,
        }
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
    }
    onEditButtonClick() {
        this.props.onStateUpdating(true);
    }
    onDeleteClick() {
        fetch('api/users/' + this.state.user.id, {
            method: 'get',
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    toast.success('User was deleted');
                    break
            }
            }.bind(this))
        this.props.loadData();
    }
    componentWillReceiveProps(newProps) {
        this.setState({ user: newProps.user });
    }   
    render() {
        return (
            <tr id='AdminOutputForm'>
                <td class="col">{this.state.user.firstName}</td>
                <td class="col">{this.state.user.surname}</td>
                <td class="col">{this.state.user.email}</td>
                <td class="col">{this.state.user.role.name}</td>
                <td class="col">{this.state.user.team != null ? this.state.user.team.name : "None"}</td>
                <td>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" onClick={e => this.onDeleteClick(e)}>Delete</button>
                </td>
            </tr>);
    }
}