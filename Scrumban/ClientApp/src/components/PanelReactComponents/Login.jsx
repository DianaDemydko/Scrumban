
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Route } from 'react-router';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            
            password: "",
            isAuth: false,
            user: null,
            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
    }
    handleValidation() {
        //let fields = this.state.fields;
        let errors = [];
        let formIsValid = true;
        var i = 0;

        //Email
        if (this.state.email == "") {
            formIsValid = false;
            errors[i] = " Field 'Email' cannot be empty! ";
            i++;
        }

        if (this.state.email !== "undefined") {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors[i] = "Field 'Email' is not valid";
                i++;
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    emailChanged(e) {
        this.setState({ email: e.target.value });
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        //if (this.handleValidation()) {
        if (true) {
            //fetch('api/users/Check', {
            //    method: 'post',
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify({
            //        email: this.state.email,
            //        password: this.state.password

            //    })
            //}).then((resp) => resp.json())
            //    .then(data => {
            //        this.setState({ isAuth: data });
            //    })

            //fetch('api/users/GetUserAccount', {
            //    method: 'post',
            //    headers: { "Content-Type": "application/json" },
            //    body: JSON.stringify({
            //        email: this.state.email,
            //        password: this.state.password
            //    })
            //}).then((resp) => resp.json()).then(data => { this.setState({ user: data }) });

            //this.props.parentOnLoginStatusCallBack(true, this.state.user);
            //window.location.replace("/Sprints");

            fetch('api/users/token', {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    grant_type: 'password',
                    login: this.state.email,
                    password: this.state.password
                })
            }).then((response) => response.json())
                .then((response) => {
                    sessionStorage.setItem("tokenKey", response.access_token)
                    alert(sessionStorage.getItem("tokenKey"))
                    window.history.back()
                });
        }
        else {

            alert("Authorization failed. Invalid email or password:-(")
        }
    }

    render() {
        return (
            <div className="Login">
                
                      
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.emailChanged}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.passwordChanged}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="button"
                            onClick={this.handleSubmit}
                            className="btn btn-primary"
                         >
                            Login
                        </Button>
            </div>
        );
    }
}