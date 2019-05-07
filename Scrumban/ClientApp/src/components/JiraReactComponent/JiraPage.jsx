import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from "react-bootstrap";
import { toast } from 'react-toastify';

export class JiraPage extends React.Component {
    state = {
        username: "",
        password: "",
        project: "",

        errors: []
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.projectChanged = this.projectChanged.bind(this);
    }

    componentDidMount() {
        //this.onFileChanged()
    }

    usernameChanged(e) {
        this.setState({ username: e.target.value })
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value })
    }
    projectChanged(e) {
        this.setState({ project: e.target.value })
    }
    

    handleSubmit(e) {
        e.preventDefault();
            fetch('/jira', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    project: this.state.project
                })

            }).then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        toast.success("Synchronization was successful!!!");
                        break
                    case 404:
                        toast.error("Incorrect login or password!");
                        break
                    default:
                        toast.error("Something wrong!!");
                        break

                }
            }.bind(this))
            this.props.moveToComponent("jira")
            //window.location.replace("./login");
        }

    render() {
        return (
            <div className="Login">
                <br />
                <div className="row justify-content-center">
                    <h2>Sync to Jira server</h2>
                </div>
                <br />
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Login</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.username}
                        onChange={e => this.usernameChanged(e)}
                    />
                    </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={e => this.passwordChanged(e)}
                        type="password"
                    />
                    </FormGroup>
                <Button
                    block
                    bsSize="large"
                    onClick={this.handleSubmit}
                    className="btn btn-primary"
                >Sync</Button>
            </div>
        );
    }

}

