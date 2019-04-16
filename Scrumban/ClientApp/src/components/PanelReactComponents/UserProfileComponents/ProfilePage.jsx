import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import "./ProfilePage.css"
import { ProfilePagePrint } from './ProfilePagePrint'
import { ProfilePageEdit } from './ProfilePageEdit'


export class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            role: "",
            picture: null,
            pictureUrl: "",
            isChanged: false, // true if onSave was clicked
            printOrEdit: "true", // true - print, false - edit
        };
        
        this.onPrintOrEdit = this.onPrintOrEdit.bind(this);
    }

    componentDidMount() {
        this.setState({ user: this.props.user, role: this.props.user.role, pictureUrl: this.props.user.picture.image })
    }

    onPrintOrEdit(param) {
        this.setState({printOrEdit : param})
    }

    render() {

        return <div style={{ "background-color": "#fff" }}>
            {
            this.state.printOrEdit == "true" ? 
                (<ProfilePagePrint
                    user={this.state.user}
                    role={this.state.role}
                    picture={this.state.picture}
                    pictureUrl={this.state.pictureUrl}
                    onPrintOrEdit={this.onPrintOrEdit}
                />)
                :
                (<ProfilePageEdit
                    user={this.state.user}
                    role={this.state.role}
                    picture={this.state.picture}
                    pictureUrl={this.state.pictureUrl}
                    onPrintOrEdit={this.onPrintOrEdit}
                    updateUser={this.props.updateUser}
                />)
            }
        </div>
    }
}
//audit log