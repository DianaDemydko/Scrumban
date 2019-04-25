import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../../GridStyles/StyleForGrid.css';
import { AdminRow } from './AdminRow.jsx';
import { checkToken } from '../Helpers'

export class AdminTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.onEditUser = this.onEditUser.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    onEditUser() {
        this.loadData();
    }
    loadData() {
        checkToken()
        fetch('api/users/getUsers', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json()
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
            })
            .then(data =>
                this.setState({ users: data })
            );
    }


    render() {
        return <div>
            <label style={{ 'fontSize': '40px' }}> Users </label>
            <div className="tablePosition">
                <table class="table table-striped" style={{ 'table-layout': 'fixed' }} >
                    <thead>
                        <tr>
                            <th className="col">First Name</th>
                            <th class="col">Surname</th>
                            <th class="col">Email</th>
                            <th class="col">Role</th>
                            <th class="col"/>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.users.map(user => (
                            <AdminRow key={user.id} user={user} editUser={this.onEditUser} />)
                        )}
                    </tbody>
                </table>
            </div>
            <div />
        </div>;

    }

}



