import React, { Component } from 'react';
import "../../../index.css"

const apiUrlGetUser = "/api/users/getUserAccount";
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

        if (email == "") {
            message = "Input email (login) !"
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
        

        if (password == "") {
            isValid = true
            message = ""
        }
        else if (password.length < 5) {
            message = "be at least 8 characters !"
        }
        else if (password.length < 5) {
            message = "be at least one letter !"
        }
        else if (password.length < 5) {
            message = "be at least one capital letter !"
        }
        if (password.length < 5) {
            message = "be at least one number !"
        }
        else {
            isValid = true
        }
        this.setState({ password: password, newPasswordValid: isValid, newPasswordValidMessage: message })
        //this.onPasswordConfirmChanged(null)
    }

    onPasswordConfirmChanged(e, newPassword = null) {
        var passwordConfirm = (e == null ? this.state.passwordConfirm : e.target.value)
        var message = ""
        var isValid = false
        if (passwordConfirm == "" && this.state.password !== "") {
            message = "confirm password !"
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
                    alert(response.status)
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
                alert(response.status)
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data == true)
                    { this.onUpdate() }
                else
                    { alert("Old password is not correct") }
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
                    <br />
                    <div className="row justify-content-center">
                        <label for="file-upload" className="btn btn-outline-info"> Upload Picture </label>
                        <input id="file-upload" type="file" onChange={this.onFileChanged} hidden/>
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