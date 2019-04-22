
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

import { SideBar } from "./SideBar";
import './SideBar.css';
import { DefectGrid } from '../DefectReactComponent/DefectGrid';
import { FeatureTable } from '../FeatureReactComponents/FeatureTable';
import { SprintMain } from '../Sprint/SprintMain';
import { StoryGrid } from '../StoryReactComponents/StoryGrid';
import { AddFeature } from '../FeatureReactComponents/AddFeature';


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
        switch (this.props.renderedComponentName) {
            case 'login':
                    renderedComponent = < Login parentOnLoginStatusCallBack={this.parentOnLoginStatusCallBack} />
                break
            case 'signup':
                renderedComponent = <Register moveToComponent2={this.props.moveToComponent} />
                break
            case 'about':
                renderedComponent = <About moveToComponent2={this.props.moveToComponent} />
                break
            case 'tasks':
                renderedComponent = <TaskGrid moveToComponent2={this.props.moveToComponent} />
                break
            case 'defects':
                renderedComponent = <DefectGrid moveToComponent2={this.props.moveToComponent} />
                break
            case 'feature':
                renderedComponent = <FeatureTable moveToComponent={this.props.moveToComponent} />
                break
            case 'featureAdd':
                renderedComponent = <AddFeature moveToComponent={this.props.moveToComponent} />
                break;
            case 'stories':
                renderedComponent = <StoryGrid moveToComponent2={this.props.moveToComponent} />
                break
            case 'sprints':
                renderedComponent = <SprintMain moveToComponent2={this.props.moveToComponent} />
                break 
            default:
                renderedComponent = this.props.children
        }


        return (<Grid fluid>
            <Row>
                <Col>
                    <SideBar moveToComponent={this.props.moveToComponent} />
                </Col>
                <Col sm={10}>
                    {renderedComponent}
                </Col>
            </Row>
        </Grid>
        )
    }
}