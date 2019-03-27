
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


//export class UserData {
//    userId: number = 0;
//    firstname: string = "";
//    surname: string = "";
//    email: string = "";
//    password: string = "";
//    confirmpassword: string = "";
//}


export class Register extends React.Component {
    state = {

        title: "",
        loading: true,
        firstname: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
    };
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstnameChanged = this.firstnameChanged.bind(this);
        this.surnameChanged = this.surnameChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.confirmpasswordChanged = this.confirmpasswordChanged.bind(this);
        //var userid = this.props.match.params["userid"];

        // This will set state for Edit employee
        //if (userid > 0) {
        //    fetch('Details/' + userid)
        //        .then(response => response.json())
        //        .then(data => {
        //            this.setState({ title: "Edit", loading: false, userData: data });
        //        });
        //}

        //// This will set state for Add employee
        //else {
        //    this.state = { title: "Create", loading: false, userData: new UserData };
        //}

        // This binding is necessary to make "this" work in the callback
        //this.handleSave = this.handleSave.bind(this);
        //this.handleCancel = this.handleCancel.bind(this);
    }

    //validateForm() {
    //    return (
    //        this.state.email.length > 0 &&
    //        this.state.password.length > 0 &&
    //        this.state.password === this.state.confirmpassword
    //    );
    //}



    //handleChange = event => {
    //    this.setState({
    //        [event.target.id]: event.target.value
    //    });
    //}

    firstnameChanged(e) {
        this.setState({ firstname: e.target.value });
    }
    surnameChanged(e) {
        this.setState({ surname: e.target.value });
    }
    emailChanged(e) {
        this.setState({ email: e.target.value });
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value });
    }
    confirmpasswordChanged(e) {
        this.setState({ comfirmpassword: e.target.value });
    }

    handleSubmit(e) {
        fetch('api/users', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                password: this.state.password,
                pictureId: 0,
                roleId: 0
            })

        })
    }

    //handleSubmit = async event => {




    //    event.preventDefault();
    //    const data = new FormData(event.target);
    //    fetch('Create', {
    //        method: 'POST',
    //        body: data,

    //    }).then((response) => response.json())

    //    //this.setState({ isLoading: true });

    //    //this.setState({ newUser: "test" });

    //    //this.setState({ isLoading: false });
    //}





    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="firstname" bsSize="large">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.firstname}
                        onChange={e => this.firstnameChanged(e)}
                    />
                </FormGroup>
                <FormGroup controlId="surname" bsSize="large">
                    <ControlLabel>Surname</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.surname}
                        onChange={e => this.surnameChanged(e)}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={e => this.emailChanged(e)}
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
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={e => this.confirmpasswordChanged(e)}
                        type="password"
                    />
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    //disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}

                    loadingText="Signing up…"
                >Signup</Button>
            </form>
        );
    }

    //render() {
    //    return (
    //        <div className="Signup">
    //            {this.state.newUser === null
    //                ? this.renderForm()
    //                : this.renderConfirmationForm()}
    //        </div>
    //    );
    //}
}
