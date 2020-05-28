import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

export class EditAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.usertoEdit.firstName,
            lastname: this.props.usertoEdit.surname,
            emil: this.props.usertoEdit.email,
            roleID: this.props.usertoEdit.roleid, 
            roles: [],
            teams: [],
            teamId: ''
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onLastNameChanged = this.onLastNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTeamChange = this.onTeamChange.bind(this);
    }
    componentDidMount() {
        fetch('api/users/getRoles')
            .then(res => res.json())
            .then(json => {
                this.setState({ roles: json })
            });
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }
    onTeamChange(e) {
        this.setState({ teamId: e.target.value });
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
        this.setState({ roleID: e.target.value });
    }

  async onSubmit() {
        await fetch('/api/users/Edit', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.usertoEdit.id,
                firstName: this.state.firstname,
                surname: this.state.lastname,
                email: this.state.emil,
                roleid: this.state.roleID,
                teamId: this.state.teamId
            })
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    toast.success("Updated successfuly!");
            }
        });
      this.props.onEditUser();
      this.props.onStateUpdating(false);
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
                    <input type="text" class="form-control" onChange={e => this.onEmailChanged(e)} defaultValue={this.state.emil} />
                </div>
            </td>
            <td>
                <div>
                    <label for="priority">Role</label>
                    <div />
                    <select class="btn btn-light dropdown-toggle m-0" name="role" onChange={e => this.onRoleChange(e)} defaultValue={this.props.usertoEdit.role.name}>
                        {this.state.roles.map(role => (
                            <option value={role.id}> {role.name}</option>))}
                    </select>
                </div>
            </td>
            <td>
                <div>
                    <label for="priority">Team</label>
                    <div />
                    <select class="btn btn-light dropdown-toggle m-0" name="role" onChange={e => this.onTeamChange(e)} defaultValue={this.props.usertoEdit.team != null ? this.props.usertoEdit.team.name : "None"}>
                        <option>None</option>
                        {this.state.teams.map(team => {
                           return( <option value={team.teamID} > {team.name}</option>)
                        })
                        }
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