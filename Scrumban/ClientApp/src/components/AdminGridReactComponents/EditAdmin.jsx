import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class EditAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.usertoEdit.firstName,
            lastname: this.props.usertoEdit.surname,
            emil: this.props.usertoEdit.email,
            roleID: this.props.usertoEdit.roleid, 
            roles:[]
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        fetch('api/users/getRoles')
            .then(res => res.json())
            .then(json => {
                this.setState({ roles: json })
            });
    }

    onNameChanged(e) {
        this.setState({ firstname: e.target.value });
    }
    onLastNameChanged(e) {
        this.setState({ lastname: e.target.value });
    }
    onEmailChanged(e) {
        this.setState({ emil: e.target.value });
    }
    onRoleChange(e) {
        var i = this.state.roles.find(x => x.name === e.target.value).id;
        this.setState({ roleID: i });
    }

    onSubmit() {
        fetch('/api/users/Edit', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.usertoEdit.id, firstName: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                roleid: this.state.roleID,
            })
        });
        this.props.onEditUser();
    }
    onCancel() {
        this.props.onStateUpdating(false);
    }

    render() {

        return <tr>
            <td>
                <div>
                    <label for="name">First Name</label>
                    <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.state.firstname} />
                </div>
            </td>
            <td>
                <div>
                    <label for="description">Surname</label>
                    <input type="text" class="form-control" onChange={e => this.onLastNameChanged(e)} defaultValue={this.state.lastname} />
                </div>
            </td>
            <td>
                <div>
                    <label for="state">Email</label>
                    <input type="text" class="form-control" onChange={e => this.onEmailChanged(e)} defaultValue={this.state.lastname} />
                </div>
            </td>
            <td>
                <div>
                    <label for="priority">Role</label>
                    <div />
                    <select class="btn btn-light dropdown-toggle m-0" name="role" onChange={e => this.onRoleChange(e)}>
                        {this.state.roles.map(role => (
                            <option> {role.name}</option>))}
                    </select>
                </div>
            </td>
            <td>

                <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.onSubmit} >Save</button>
                <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.onCancel} >Cancel</button>
            </td>
        </tr>;

    }
}