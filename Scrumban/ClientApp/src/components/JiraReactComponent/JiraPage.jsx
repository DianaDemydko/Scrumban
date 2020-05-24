import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from "react-bootstrap";
import { toast } from 'react-toastify';
import img from '../JiraReactComponent/info.png';

export class JiraPage extends React.Component {
    state = {
        username: "",
        password: "",
        project: "",
        url: "",
        errors: []
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.projectChanged = this.projectChanged.bind(this);
        this.urlChanged = this.urlChanged.bind(this);
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
    urlChanged(e) {
        this.setState({ url: e.target.value })
    }

    handleSubmit(e) {
        toast.warn("Wait please!")
        e.preventDefault();
        fetch('/jira', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                project: this.state.project,
                url: this.state.url
            })

        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    toast.success("Synchronization was successful!!!");
                    this.props.moveToComponent("kanbanBoard");
                    break
                case 404:
                    toast.error("Incorrect Email or Token!");
                    break
                default:
                    toast.error("Something wrong!!");
                    break
            }
        }.bind(this))
    }

    render() {
        return (
            <div className="Login">
                <br />
                <div className="row justify-content-center" style={{ 'margin-left': '73px' }}>
                    <h2>Sync to Jira server</h2>
                </div>
                <br />
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>URL to Enviroment</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        onChange={e => this.urlChanged(e)}
                    />
                </FormGroup>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Project Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        onChange={e => this.projectChanged(e)}
                    />
                </FormGroup>
                <FormGroup controlId="username" bsSize="large">
                    <ControlLabel>Email in Jira</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.username}
                        onChange={e => this.usernameChanged(e)}
                    />
                    </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Token API in Jira</ControlLabel>
                    <div className="dropdown" style={{ 'margin': '15px' }}>
                        <span ><img src={img} width="15" height="15" /> </span>
                        <div className="dropdown-content">
                            <label>To generate an API token, click <a href="https://id.atlassian.com/manage/api-tokens#" target="_blank">here</a> and create a new one.</label>
                        </div>
                    </div>
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

