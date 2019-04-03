
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


export class Register extends React.Component {
    state = {

        title: "",
        loading: true,
        firstname: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
        //fields: {},
        errors: []
    };
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstnameChanged = this.firstnameChanged.bind(this);
        this.surnameChanged = this.surnameChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.confirmpasswordChanged = this.confirmpasswordChanged.bind(this);
    }
    handleValidation() {
        //let fields = this.state.fields;
        let errors = [];
        let formIsValid = true;
        var i = 0;
        //FirstName
        if (this.state.firstname == "") {
            formIsValid = false;
            //errors["firstname"] = "Cannot be empty";
            errors[i] = " Field 'First name' cannot be empty! ";
            i++;
        }

        if (this.state.firstname !== "undefined") {
            if (!this.state.firstname.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors[i] = " Field 'First name' may have only letters! ";
                i++;
            }
        }
        //Surname
        if (this.state.surname == "") {
            formIsValid = false;
            errors[i] = " Field 'Surname' cannot be empty! ";
            i++;
        }

        if (this.state.surname !== "undefined") {
            if (!this.state.surname.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors[i] = " Field 'Surname' may have only letters! ";
                i++;
            }
        }
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
        //Password & Confirmpassword
        if (this.state.password == "" && this.state.confirmpassword == "") {
            formIsValid = false;
            errors[i] = " Field 'Password or Confirm Password' cannot be empty! ";
            i++;
        }

        //if (this.state.password != this.state.confirmpassword) {
        //    formIsValid = false;
            
        //    errors[i] = " Fields 'Password' and 'Confirm Password' must be identical! ";
        //    i++;
        //}
        this.setState({ errors: errors });
        return formIsValid;
    }
  
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
        e.preventDefault();
        if (this.handleValidation()) {
            fetch('api/users/Create', {
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

            }).then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        alert("Registration went wrong. Please check all fields!")
                        break
                    case 200:
                        alert("Registration was successful:-)")
                        break
                }
            }.bind(this))
                .catch(() => alert("Unexpected error occured."))

            window.location.replace("./login");
        } else
        {
            var erText = "";
            this.state.errors.map(item => erText += item.toString()+"\n");
            alert(erText);
        }
        
    }

    render() {
        return (
            <div className="Signup">
                <FormGroup controlId="firstname" bsSize="large">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.firstname}
                        onChange={e => this.firstnameChanged(e)}
                    />
                </FormGroup>
                <span style={{ color: "red" }}>{this.state.errors["firsname"]}</span>
                <FormGroup controlId="surname" bsSize="large">
                    <ControlLabel>Surname</ControlLabel>
                    <FormControl
                        
                        type="text"
                        value={this.state.surname}
                        onChange={e => this.surnameChanged(e)}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        
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
                    //type="submit"
                    isLoading={this.state.isLoading}
                    onClick={this.handleSubmit}
                    loadingText="Signing up…"
                    className="btn btn-primary"
                >Signup</Button>
            </div>
        );
    }

}
