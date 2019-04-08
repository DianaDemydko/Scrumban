import React from 'react';
import { Menu } from './Menu';
import { Switch, Route } from 'react-router';
import { Content } from './Content';
import { Col, Grid, Row } from 'react-bootstrap';
import { Login } from './Login';
import { Register } from './Register';
import { About } from './About';

import { TaskGrid } from '../TaskReactComponenets/TaskGrid';
//import { Logout } from './Logout';

export class Body extends React.Component {
    constructor(props) {
        super(props);

        this.parentOnLoginStatusCallBack = this.parentOnLoginStatusCallBack.bind(this);
        this.moveToComponent = this.moveToComponent.bind(this);
    }

    parentOnLoginStatusCallBack(param, user, path) {
        this.props.parentOnLoginStatusCallBack(param, user, path);
    }

    moveToComponent(param) {
        this.props.moveToComponent(param);
    }

    render() {

        var renderedComponent;
        if (this.props.renderedComponentName === "login") {
            renderedComponent = < Login parentOnLoginStatusCallBack={this.parentOnLoginStatusCallBack} />
        } else if (this.props.renderedComponentName === "signup") {
            renderedComponent = <Register moveToComponent2={this.props.moveToComponent} />
        } else if (this.props.renderedComponentName === "about") {
            renderedComponent = <About moveToComponent2={this.props.moveToComponent} />
        } else if (this.props.renderedComponentName === "tasks") {
            renderedComponent = <TaskGrid moveToComponent2={this.props.moveToComponent} />
        }
        else { renderedComponent = this.props.children }

        return (<Grid fluid>
            <Row>
                <Col sm={2}>
                    <Menu />
                </Col>
                <Col sm={10}>
                    {renderedComponent}
                </Col>
            </Row>
        </Grid>
        )
    }
}