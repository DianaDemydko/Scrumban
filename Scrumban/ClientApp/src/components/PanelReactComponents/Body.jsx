import React from 'react';
import { Menu } from './Menu';
import { Switch, Route } from 'react-router';
import { Content } from './Content';
import { Col, Grid, Row } from 'react-bootstrap';
import { Login } from './Login';
import { Register } from './Register';
import { About } from './About';
//import { Logout } from './Logout';

import { SideBar } from "./SideBar";
import './SideBar.css';

export class Body extends React.Component {
    constructor(props) {
        super(props);

        this.parentOnLoginStatusCallBack = this.parentOnLoginStatusCallBack.bind(this);
    }

    parentOnLoginStatusCallBack(param, user) {
        this.props.parentOnLoginStatusCallBack(param, user);
    }

    render() {

        var renderedComponent;
        if (this.props.panelStatus === "login") {
            renderedComponent = < Login parentOnLoginStatusCallBack={this.parentOnLoginStatusCallBack} />;
        } else if (this.props.panelStatus === "signup") {
            renderedComponent = <Register />;
        } else if (this.props.panelStatus === "about") {
            renderedComponent = <About />
        }
        else { renderedComponent = this.props.children }

        return (<Grid fluid>
            <Row>
                 <Col>
                        <SideBar />
                    </Col>
                
                <Col sm={10}>
                    {renderedComponent}
                    
                </Col>
            </Row>
        </Grid>
        )
    }
}