
import React, { Component } from "react";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from "react-bootstrap";
import "./Register.css";
import "../../index.css"
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';

export class Register extends React.Component {
    state = {

        title: "",
        loading: true,

        firstname: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",

        //validation
        firstnameValid: false,
        firstnameValidMessage: "",

        surnameValid: false,
        surnameValidMessage: "",

        emailValid: false,
        emailValidMessage: "",

        passwordValid: false,
        passwordValidMessage: "",

        confirmpasswordValid: false,
        confirmpasswordValidMessage: "",

        //fields: {},
        picture: null,
        pictureUrl: null,
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
        this.onFileChanged = this.onFileChanged.bind(this);
    }

    componentDidMount() {
        this.onFileChanged()
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
        var firstName = e.target.value
        var message = ""
        var isValid = false

        if (firstName == "") {
            message = "Input first name !"
        }
        else {
            isValid = true
            message = ""
        }
        this.setState({ firstname: firstName, firstnameValid: isValid, firstnameValidMessage: message })
    }

    surnameChanged(e) {
        var surname = e.target.value
        var message = ""
        var isValid = false

        if (surname == "") {
            message = "Input surname !"
        }
        else {
            isValid = true
            message = ""
        }
        this.setState({ surname: surname, surnameValid: isValid, surnameValidMessage: message })
    }

    emailChanged(e) {
        var email = e.target.value
        var message = ""
        var isValid = false

        var regex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        if (email == "") {
            message = "Input email (login) !"
        }
        else if (regex.test(email) === false) {
            message = "incorrect email !"
        }
        else {
            isValid = true
            message = ""
        }
        this.setState({ email: email, emailValid: isValid, emailValidMessage: message })
    }
    passwordChanged(e) {
        var password = e.target.value
        var message = ""
        var isValid = false
        var confirmIsValid = false

        var regex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")

        if (password == "") {
            isValid = true
            confirmIsValid = true
            message = ""
        }
        else if (password.length < 5) {
            message = "be at least 5 characters !"
        }
        else if (regex.test(password) === false) {
            message = "be at least one small letter, one capital letter and one number!"
        }
        else {
            isValid = true
        }
        this.setState({ password: password, passwordValid: isValid, confirmpasswordValid: confirmIsValid, passwordValidMessage: message })
    }

    confirmpasswordChanged(e) {
        var passwordConfirm = (e == null ? this.state.passwordconfirm : e.target.value)
        var message = ""
        var isValid = false
        if (passwordConfirm == "" && this.state.password !== "") {
            message = "confirm password !"
        }
        else if (this.state.password == "") {
            isValid = true
        }
        else if (passwordConfirm !== this.state.password) {
            message = "password is not confirmed"
        }
        else if (this.state.newPasswordValid === false) {
            isValid = false
            message = this.state.newPasswordValidMessage
        }
        else {
            isValid = true
            message = ""
        }
        this.setState({ comfirmpassword: passwordConfirm, confirmpasswordValid: isValid, confirmpasswordValidMessage: message })
        //this.setState({ comfirmpassword: e.target.value });
    }

    handleSubmit(e) {
        if (this.state.firstnameValid === false ||
            this.state.surnameValid === false ||
            this.state.emailValid === false ||
            this.state.passwordValid === false ||
            this.state.confirmpasswordValid === false
        ) {
            toast.error("Invalid data");
            return;
        }

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
                    roleId: 1,
                    picture: {
                        "image":this.state.pictureUrl
                    }
                })

            }).then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        toast.error("Registration went wrong. Please check all fields!");
                        break
                    case 200:
                        toast.success("Registration was successful:-)");
                        break
                }
            }.bind(this))
                .catch(() => toast.error("Something wrong!!!"))
            this.props.moveToComponent("login")
            //window.location.replace("./login");
        } else
        {
            var erText = "";
            this.state.errors.map(item => erText += item.toString()+"\n");
            alert(erText);
        }
        
    }

    onFileChanged(e = null) {
        var file = (e == null ? new File([""], "incognito.jpg") : e.target.files[0])
        var reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ picture: file, pictureUrl: reader.result })
        }
        reader.readAsDataURL(file);

        var reader2 = new FileReader()
        reader2.onloadend = () => {
            this.setState({ picture: file, pictureBinary: reader2.result })
        }
        reader2.readAsArrayBuffer(file);
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
                        className={this.state.firstnameValid ? "" : "is-invalid"}
                    />
                    <small className="valid-error">{this.state.firstnameValidMessage}</small>
                </FormGroup>
                <span style={{ color: "red" }}>{this.state.errors["firsname"]}</span>
                <FormGroup controlId="surname" bsSize="large">
                    <ControlLabel>Surname</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.surname}
                        onChange={e => this.surnameChanged(e)}
                        className={this.state.surnameValid ? "" : "is-invalid"}
                    />
                    <small className="valid-error">{this.state.surnameValidMessage}</small>
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        value={this.state.email}
                        onChange={e => this.emailChanged(e)}
                        className={this.state.emailValid ? "" : "is-invalid"}
                    />
                    <small className="valid-error">{this.state.emailValidMessage}</small>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={e => this.passwordChanged(e)}
                        type="password"
                        className={this.state.passwordValid ? "" : "is-invalid"}
                    />
                    <small className="valid-error">{this.state.passwordValidMessage}</small>
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={e => this.confirmpasswordChanged(e)}
                        type="password"
                        className={this.state.confirmpasswordValid ? "" : "is-invalid"}
                    />
                    <small className="valid-error">{this.state.confirmpasswordValidMessage}</small>
                </FormGroup>

                {/*}
                <div className="row">
                    <img src={this.state.pictureUrl} alt="Image" className="profile-image"/>
                </div>
                <div className="row">
                    <label for="file-upload" className="btn btn-outline-info" > Upload Picture </label>
                    <input type="file" id="file-upload" onChange={this.onFileChanged} hidden/>
                </div>
                */}

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
