import React, { Component } from 'react';
import "../../../index.css"

const apiUrlEditUser = "/api/users/Edit";
const apiUrlCheckUser = "/api/users/Check";

export class ProfilePageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.user.firstName,
            surname: props.user.surname,
            email: props.user.email,
            oldPassword: "",
            password: "",
            passwordConfirm: "",
            role: props.role,
            picture: props.picture,
            pictureUrl: props.pictureUrl,

            //validation
            firstNameValid: true,
            firstNameValidMessage: "",

            surnameValid: true,
            surnameValidMessage: "",

            emailValid: true,
            emailValidMessage: "",

            oldPasswordValid: false,
            oldPasswordValidMessage: "input password !",

            newPasswordValid: true,
            newPasswordValidMessage: "",

            confirmNewPasswordValid: true,
            confirmNewPasswordValidMessage: "",
            
            isChanged: false, // true if onSave was clicked
        };

        this.onClick = this.onClick.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onFirstNameChanged = this.onFirstNameChanged.bind(this)
        this.onSurnameChanged = this.onSurnameChanged.bind(this)
        this.onEmailChanged = this.onEmailChanged.bind(this)
        this.onPasswordChanged = this.onPasswordChanged.bind(this)
        this.onOldPasswordChanged = this.onOldPasswordChanged.bind(this)
        this.onPasswordConfirmChanged = this.onPasswordConfirmChanged.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
    }

    onFirstNameChanged(e) {
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

        this.setState({ firstName: firstName, firstNameValid: isValid, firstNameValidMessage: message })
    }

    onSurnameChanged(e) {
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

    onEmailChanged(e) {
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

    onOldPasswordChanged(e) {
        var pass = e.target.value
        var message = ""
        var isValid = false
        if (pass == "") {
            message = "input password !"
        }
        else {
            isValid = true
        }
        this.setState({ oldPassword: e.target.value, oldPasswordValid : isValid, oldPasswordValidMessage: message })
    }

    onPasswordChanged(e) {
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
        this.setState({ password: password, newPasswordValid: isValid, confirmNewPasswordValid: confirmIsValid, newPasswordValidMessage: message })
        //this.onPasswordConfirmChanged(null)
    }

    onPasswordConfirmChanged(e, newPassword = null) {
        var passwordConfirm = (e == null ? this.state.passwordConfirm : e.target.value)
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
        this.setState({ passwordConfirm: passwordConfirm, confirmNewPasswordValid: isValid, confirmNewPasswordValidMessage: message })
    }

    onFileChanged(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ picture: file, pictureUrl: reader.result })
        }
        reader.readAsDataURL(file);
    }

    onUpdate() {
        var userJson = JSON.stringify({
            "id": this.props.user.id,
            "firstName": this.state.firstName,
            "surname": this.state.surname,
            "email": this.state.email,
            "password": this.state.password == "" ? this.state.oldPassword : this.state.password,
            "roleId": this.props.user.roleId,
            "role": {
                "id": this.props.user.role.roleId,
                "name": this.props.user.role.name
            },
            "pictureId": this.props.user.pictureId,
            "picture": {
                "id": this.props.user.picture.id,
                "image": this.state.pictureUrl
            }
        })

        fetch(apiUrlEditUser, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: userJson
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    alert(response.status);
                }
            })
            .then(data => {
                this.props.updateUser(data)
                this.props.onPrintOrEdit("true")
            })
    }

    onSave() {
        if (this.state.firstNameValid === false ||
            this.state.surnameValid === false ||
            this.state.emailValid === false ||
            this.state.oldPasswordValid === false ||
            this.state.newPasswordValid === false ||
            this.state.confirmNewPasswordValid === false
            ) {
            alert("Invalid data")
            return;
        }

        var checkUser = JSON.stringify({
            "email": this.props.user.email,
            "password": this.state.oldPassword
        })

        fetch(apiUrlCheckUser, {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: checkUser
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
                else if (response.status == 401) {
                    alert("You are not authenticated !  " + response.status)
                }
                else if (response.status == 403) {
                    alert("You are not authorizated !  " + response.status)
                }
                else{
                    alert("ERROR : " + response.status)
                }
            })
            .then(data => {
                if (data == true)
                    { this.onUpdate() }
                else
                    { alert("Current password is not correct") }
            })
    }

    onClick() {
        this.onSave()
    }

    render() {
        return <div>
            <br />
            <div className="row justify-content-center">
                <h2>Profile Page</h2>
                {this.state.user}
            </div>
            <br />

            <div className="row justify-content-around">
                <div className="col-4">
                    <div className="row">
                        <img src={this.state.pictureUrl} alt="Image" className="profile-image" />
                    </div>
                    <div className="row justify-content-center">
                        <small>.png, .jpg, .jpeg, .img</small>
                    </div>
                    <div className="row justify-content-center">
                        <label for="file-upload" className="btn btn-outline-info"> Upload Picture </label>
                        <input id="file-upload" type="file" onChange={this.onFileChanged} hidden accept=".png, .jpg, .jpeg, .img"/>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row justify-content-start form-group">
                        <label className="col-4" for="nameId">FirstName</label>
                        <div className="col-6">
                            <div>
                                <input className={"form-control " + (this.state.firstNameValid ? "" : " is-invalid")} type="text" id="nameId" onChange={this.onFirstNameChanged} placeholder="first name" defaultValue={this.props.user.firstName} />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.firstNameValid ?
                                ("")
                                : (<small>{this.state.firstNameValidMessage}</small>)
                            }
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start form-group">
                        <label className="col-4" for="surnameId">Surname:</label>
                        <div className="col-6">
                            <div>
                                <input className={"form-control" + (this.state.surnameValid ? "" : " is-invalid")} type="text" id="surnameId" onChange={this.onSurnameChanged} placeholder="surname" defaultValue={this.props.user.surname} />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.surnameValid ?
                                ("")
                                : (<small>{this.state.surnameValidMessage}</small>)
                            }
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start form-group">
                        <label className="col-4" for="emailId">Email:</label>
                        <div className="col-6">
                            <div>
                                <input className={"form-control" + (this.state.emailValid ? "" : " is-invalid")} type="text" id="emailId" onChange={this.onEmailChanged} placeholder="email" defaultValue={this.props.user.email} />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.emailValid ?
                                ("")
                                : (<small>{this.state.emailValidMessage}</small>)
                            }
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-start form-group">
                        <div className="col-4"><label for="oldPasswordId">Password:</label></div>
                        <div className="col-6">
                            <div>
                                <input className={"form-control" + (this.state.oldPasswordValid == true ? ("") : (" is-invalid"))} type="password" id="oldPasswordId" onChange={this.onOldPasswordChanged} autoComplete='off' />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.oldPasswordValid ?
                                ("")
                                : (<small>{this.state.oldPasswordValidMessage}</small>)
                            }
                            </div>
                        </div>
                    </div>                                                              
                    <div className="row justify-content-start form-group">                                                 
                        <label className="col-4" for="passwordId">New Password:</label>   
                        <div className="col-6">
                            <div>
                                <input className={"form-control" + (this.state.newPasswordValid ? "" : " is-invalid")} type="password" id="passwordId" onChange={this.onPasswordChanged} />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.newPasswordValid ?
                                ("")
                                : (<small>{this.state.newPasswordValidMessage}</small>)
                            }
                            </div>
                        </div> 
                    </div>                                                                                                 
                    <div className="row justify-content-start form-group">                                                 
                        <label className="col-4" for="ConfirmPasswordId">Confirm New Password:</label> 
                        <div className="col-6">    
                            <div>
                                <input className={"form-control" + (this.state.confirmNewPasswordValid ? "" : " is-invalid")} type="password" id="ConfirmPasswordId" onChange={this.onPasswordConfirmChanged} />
                            </div>
                            <div className="valid-error">
                            {
                                this.state.confirmNewPasswordValid ?
                                ("")
                                : (<small>{this.state.confirmNewPasswordValidMessage}</small>)
                            }
                            </div>
                        </div> 
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Credentials: </div>
                        <div className="col-6">
                            <div> {this.props.role.name} </div>
                        </div>
                    </div>

                    <br />
                    <br />
                    <div className="row">
                            <button onClick={this.onClick} className="btn btn-outline-info button-fixed">Save</button>
                            <button onClick={() => this.props.onPrintOrEdit("true")} className="btn btn-outline-info button-fixed">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    }
}