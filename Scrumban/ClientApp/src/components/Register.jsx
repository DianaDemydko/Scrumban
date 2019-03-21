
import React, { Component } from "react";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from "react-bootstrap";
import "./Register.css";
import { RouteComponentProps } from 'react-router';


export class UserData {
    userId: number = 0;
    firstname: string = "";
    surname: string = "";
    email: string = "";
    password: string = "";
    confirmpassword: string = "";
}


export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            title: "", loading: true, firstname: "",
            surname:  "",
            email:  "",
            password: "",
            confirmpassword: "",
            newUser: new UserData
        };

        var userid = this.props.match.params["userid"];

        // This will set state for Edit employee
        if (userid > 0) {
            fetch('Details/' + userid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, userData: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = { title: "Create", loading: false, userData: new UserData };
        }

        // This binding is necessary to make "this" work in the callback
        //this.handleSave = this.handleSave.bind(this);
        //this.handleCancel = this.handleCancel.bind(this);
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {

      
        

        event.preventDefault();
        const data = new FormData(event.target);
        fetch('Create', {
            method: 'POST',
            body: data,

        }).then((response) => response.json())

        //this.setState({ isLoading: true });

        //this.setState({ newUser: "test" });

        //this.setState({ isLoading: false });
    }





    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="firstname" bsSize="large">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="surname" bsSize="large">
                    <ControlLabel>Surname</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.surname}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}

                    loadingText="Signing up…"
                >Signup</Button>
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}
