import React from 'react';
import { Menu } from './Menu';
import { Switch, Route } from 'react-router';
import { Content } from './Content';
import { Col, Grid, Row } from 'react-bootstrap';
import { Login } from './Login';
import { Register } from './Register';
import { ProfilePage } from './UserProfileComponents/ProfilePage';
import { About } from './About';

import { TaskGrid } from '../TaskReactComponenets/TaskGrid';
import { TaskAdd } from '../TaskReactComponenets/TaskAdd';
//import { Logout } from './Logout';

export class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            i: 1
        }
    }

    render() {

        var renderedComponent;
        if (this.props.renderedComponentName === "login") {
            renderedComponent = < Login moveToComponent={this.props.parentOnLoginStatusCallBack} />
        } else if (this.props.renderedComponentName === "signup") {
            renderedComponent = <Register moveToComponent2={this.props.moveToComponent} />
        } else if (this.props.renderedComponentName === "about") {
            renderedComponent = <About moveToComponent2={this.props.moveToComponent} />
        } else if (this.props.renderedComponentName === "tasks") {
            renderedComponent = <TaskGrid moveToComponent={this.props.moveToComponent} />
        } else if(this.props.renderedComponentName === "addTask") {
            renderedComponent = <TaskAdd moveToComponent={this.props.moveToComponent} />
        } else if (this.props.renderedComponentName === "profile") {
            renderedComponent = <ProfilePage key={this.state.i++} moveToComponent={this.props.moveToComponent} user={this.props.user} updateUser={this.props.updateUser}/>
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