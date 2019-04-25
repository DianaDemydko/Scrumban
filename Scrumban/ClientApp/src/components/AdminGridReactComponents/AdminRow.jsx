import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../../GridStyles/StyleForGrid.css';
import { AdminPrint } from './AdminPrint.jsx';
import { EditAdmin } from './EditAdmin.jsx';


export class AdminRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onDeleteStatusChanged = this.onDeleteStatusChanged.bind(this);
    }
    onStateChanged(editState) {
        this.setState({ edit: editState });
    }
    onDeleteStatusChanged(deleteStatus) {
        if (deleteStatus == true) {
            this.props.deleteItem(this.props.user);
        }
    }

    render() {
        return (this.state.edit ? <EditAdmin usertoEdit={this.props.user} onStateUpdating={this.onStateChanged} onEditUser={this.props.editUser}/> :
            <AdminPrint onStateUpdating={this.onStateChanged} user={this.props.user} DeleteStatusChanged={this.onDeleteStatusChanged} />);
    }
}