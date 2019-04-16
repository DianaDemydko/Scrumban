import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Panel } from './PanelReactComponents/Panel'
import { Body } from './PanelReactComponents/Body'


export class Layout extends Component {
    displayName = Layout.name

    constructor(props) {
        super(props);

        this.state = {
            renderedComponentName: "login", // name of current active component
            panelLoginStatus: false,
            user: null,
            childRefresh: true
        }
        this.setRenderedComponentName = this.setRenderedComponentName.bind(this);
        this.onLoginStatusCallBack = this.onLoginStatusCallBack.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(newUser) {
        this.setState({ user: newUser, childRefresh: !this.state.childRefresh })
    }

    setRenderedComponentName(renderedComponent) {   // set name of rendered component in Content
        this.setState({ renderedComponentName: renderedComponent })
    }

    onLoginStatusCallBack(loginOrlogout, currentUser, componentName) {
        this.setState({
            panelLoginStatus: loginOrlogout,
            user: currentUser,
            childRefresh: !this.state.childRefresh,
            renderedComponentName: componentName
        })
    }

    render() {

        return (
            <div>
                <Panel
                    key={this.state.childRefresh}
                    moveToComponent={this.setRenderedComponentName} // set name of rendered component
                    loginStatusCallBack={this.state.panelLoginStatus == true ? "true" : "false"}
                    currentUser={this.state.user ? this.state.user.firstName : ""}
                    currentUserPicture={this.state.user ? this.state.user.picture.image : "" }
                    onLogOut={this.onLoginStatusCallBack}
                />
                <Body
                    children={this.props.children}
                    renderedComponentName={this.state.renderedComponentName}
                    moveToComponent={this.setRenderedComponentName}
                    parentOnLoginStatusCallBack={this.onLoginStatusCallBack}
                    user={this.state.user}
                    updateUser={this.updateUser}
                />
            </div>
    );
  }
}
