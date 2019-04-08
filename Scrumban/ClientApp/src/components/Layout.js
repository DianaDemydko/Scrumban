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
            renderedComponentName: "", // name of current active component
            panelLoginStatus: false,
            user: null,
            childRefresh: true
        }
        this.setRenderedComponentName = this.setRenderedComponentName.bind(this);
        this.onLoginStatusCallBack = this.onLoginStatusCallBack.bind(this);
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
        var user = "layout_user:  "
        var renderedComponentName = "layout_renderedComponentName:     ";
        var panelLoginStatus = "layout_loginStatus:     ";

        if (this.state.user != null) {
            user += this.state.user.firstName
        }
        if (this.state.renderedComponentName != null) {
            renderedComponentName += this.state.renderedComponentName.toString()
        }
        if (this.state.panelLoginStatus != null) {
            panelLoginStatus += this.state.panelLoginStatus.toString()
        }

        //<div>{renderedComponentName}</div>
        //    <div>{panelLoginStatus}</div>
        //    <div>{panelLoginStatus}</div>
        //    <div>{user}</div>

        return (
            <div>


                <span>
                    <Panel key={this.state.childRefresh} moveToComponent={this.setRenderedComponentName} loginStatusCallBack={this.state.panelLoginStatus} currentUser={this.state.user} />
                </span>

                <Body children={this.props.children} renderedComponentName={this.state.renderedComponentName} moveToComponent={this.setRenderedComponentName} parentOnLoginStatusCallBack={this.onLoginStatusCallBack} />

            </div>

        );
    }
}