import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';

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
        this.setState({ editState: !this.state.editState });
        this.props.onStateUpdating(this.state.editState);
    }
    onDeleteClick() {
        fetch('api/users/', {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id})
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    break
            }
        }.bind(this))

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
                <td>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" onClick={e => this.onDeleteClick(e)}>Delete</button>
                </td>
            </tr>);
    }
}