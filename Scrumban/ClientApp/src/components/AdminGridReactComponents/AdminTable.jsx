import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../../GridStyles/StyleForGrid.css';
import { AdminRow } from './AdminRow.jsx';
import { checkToken } from '../Helpers'
import Spinner from 'react-bootstrap/Spinner'

export class AdminTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        };
        this.onEditUser = this.onEditUser.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    onEditUser() {
        this.loadData();
    }
    loadData() {
        this.setState({ loading: true });
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
            }).then(data => {
                this.setState({ users: data, loading: false  });
            })
    }


    render() {
        return <div>
            <div className="grid-panel">
                <div className="grid-name">Users</div>
            </div>
            <hr></hr>
            {this.state.loading ? (
                <div style={{ 'margin-left': '50%', 'margin-top': '15%' }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            )
                :
                <div className="tablePosition table-wrapper">
                    <table class="table" style={{ 'table-layout': 'fixed' }} >
                        <thead>
                            <tr>
                                <th className="col">First Name</th>
                                <th class="col">Surname</th>
                                <th class="col">Email</th>
                                <th class="col">Role</th>
                                <th class="col">Team</th>
                                <th class="col" />
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.users.map(user => {
                                if (this.props.currentUser.id != user.id) {
                                    return (< AdminRow key={user.id} user={user} editUser={this.onEditUser} loadData={this.loadData} />)
                                }
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            }
                <div />

        </div>;

    }

}



