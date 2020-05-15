import React, { Component } from 'react';

const emptyAvatar = require('../../PanelReactComponents/user.png');

export class ProfilePagePrint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            role: props.role,
            picture: props.picture,
            pictureUrl: props.pictureUrl,
            isChanged: false, // true if onSave was clicked
        };

        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.onPrintOrEdit("false")
    }

    render() {
        return <div>
            <br />
            <div className="row justify-content-center">
                <h2>My Profile</h2>
            </div>
            <br />

            <div className="row justify-content-around">

                <div className="col-4">
                    <div className="row">
                        <img src={this.props.pictureUrl != null ? this.props.pictureUrl : emptyAvatar} alt="Image" className="profile-image" />
                    </div>
                </div>
                
                <div className="col-6">
                    <div className="row justify-content-start">
                        <div className="col-4"> First Name: </div>
                        <div className="col-6"> {this.props.user.firstName} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Surname: </div>
                        <div className="col-6"> {this.props.user.surname} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Email (Login): </div>
                        <div className="col-6"> {this.props.user.email} </div>
                    </div>
                    <div className="row justify-content-start">
                        <div className="col-4"> Credentials: </div>
                        <div className="col-6"> {this.props.role.name} </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <p>
                    <button onClick={this.onClick} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                </p>
            </div>
        </div>
    }
}