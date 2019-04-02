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
            panelSatus: "",
            panelLoginStatus: false,
            user: null,
            childRefresh: true
        }
        this.onLogIn = this.onLogIn.bind(this);
        this.onLoginStatusCallBack = this.onLoginStatusCallBack.bind(this);
    }

    onLogIn(childrenPanelStatus) {
        this.setState({ panelSatus: childrenPanelStatus })
    }

    onLoginStatusCallBack(loginOrlogout, userCallBack) {
        this.setState({ panelLoginStatus: loginOrlogout, user: userCallBack, childRefresh: !this.state.childRefresh })
    }

    render() {
        var param = "Hell"
        if (this.state.user != null) {
            param = this.state.user;
        }
    return (

        <div>
            <span>
                <Panel key={this.state.childRefresh} login={this.onLogIn} loginStatusCallBack={this.state.panelLoginStatus} currentUser={this.state.user} />
            </span>

            <Body children={this.props.children} panelStatus={this.state.panelSatus} parentOnLoginStatusCallBack={this.onLoginStatusCallBack} /> 

        </div>

    );
  }
}
