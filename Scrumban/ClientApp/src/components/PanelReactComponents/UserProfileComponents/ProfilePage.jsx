import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
const apiUrlGetUser = "/api/users/getUserAccount";
const apiUrlEditUser = "/api/users/Edit";

export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            role: "",
            picture: null,
            pictureUrl: "",
            isChanged: false, // true if onSave was clicked
        };

        this.onLoad = this.onLoad.bind(this);
        this.onSave = this.onSave.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChanged = this.onFileChanged.bind(this);
    }

    onLoad() {
        var send = JSON.stringify({
            login: "a@a.com",
            password: "1234"
        });

        fetch(apiUrlGetUser, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: send
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
        })
            .then((data) => this.setState({ user: data, role: data.role, pictureUrl: data.picture.image }) )
    }

    componentDidMount() {
        //this.onLoad()
        this.setState({ user: this.props.user, role: this.props.user.role, pictureUrl: this.props.user.picture.image })
    }

    onSave() {
        var userJson = JSON.stringify({
            "id": this.state.user.id,
            "firstName": this.state.user.firstName,
            "surname": this.state.user.surname,
            "email": this.state.user.email,
            "password": "1234",
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
        .then(data => this.props.updateUser(data)) //this.setState({ user: data, role: data.role, pictureUrl: data.picture.image, isChanged: true }))
    }

    onFileChanged(e) {
        var file = e.target.files[0]
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

    uploadFile() {
        //var arrayBufferView = new Uint8Array(this.state.picture);
        //var blob = new Blob([arrayBufferView], { type: "image/jpg" });
        //var urlCreator = window.URL || window.webkitURL;
        //var imageUrl = urlCreator.createObjectURL(blob);
        //this.setState({ pictureBinary:  new Uint8Array(this.state.pictureBinary) })
    }

    render() {

        return <div style={{ "background-color": "#fff" }}>
            <div className="row justify-content-center">
                <h2>Profile Page</h2>
            </div>

            <div className="row justify-content-around">

                <div className="col-4">
                    <div className="row">
                        <div>{this.state.picture ? this.state.picture.name : ""}</div>
                        <img src={this.state.pictureUrl} alt="Image" width="100%" />
                    </div>
                    <div className="row">
                        <input type="file" onChange={this.onFileChanged} />
                    </div>
                </div>
                

                <div className="col-6">
                    <div className="row justify-content-start">
                        <div className="col-4"> First Name </div>
                        <div className="col-6"> {this.state.user.firstName} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Surname </div>
                        <div className="col-6"> {this.state.user.surname} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Email </div>
                        <div className="col-6"> {this.state.user.email} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Credentials </div>
                        <div className="col-6"> {this.state.role.name} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Credentials </div>
                        <div className="col-6"> {this.state.isChanged.toString()} </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <p>
                    <button onClick={this.onSave} className="btn btn-outline-info">Save</button>
                </p>
            </div>


        </div>
    }
}