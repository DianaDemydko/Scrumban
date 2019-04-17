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

import { SideBar } from "./SideBar";
import './SideBar.css';
import { DefectGrid } from '../DefectReactComponent/DefectGrid';
import { FeatureTable } from '../FeatureReactComponents/FeatureTable';
import { SprintMain } from '../Sprint/SprintMain';
import { StoryGrid } from '../StoryReactComponents/StoryGrid';
import { DefectAdd } from '../DefectReactComponent/DefectAdd';
import Kanban  from '../KanbanBoard/KanbanMain';
import { SprintCreateForm } from '../Sprint/CreateForm/SprintCreateForm';
import { Home } from '../Home';


export class Body extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            i: 1
        }
    }

    render() {
        var renderedComponent;

        switch (this.props.renderedComponentName) {
            case 'login':
                renderedComponent = <Login moveToComponent={this.props.parentOnLoginStatusCallBack} />
                break
            case 'signup':
                renderedComponent = <Register moveToComponent={this.props.moveToComponent} />
                break
            case 'profile':
                renderedComponent = <ProfilePage key={this.state.i++} moveToComponent={this.props.moveToComponent} user={this.props.user} updateUser={this.props.updateUser}/>
                break
            case 'about':
                renderedComponent = <About moveToComponent={this.props.moveToComponent} />
                break
            case 'home':
                renderedComponent = <Home />
                break
            case 'tasks':
                renderedComponent = <TaskGrid moveToComponent={this.props.moveToComponent} />
                break
            case 'taskAdd':
                renderedComponent = <TaskAdd moveToComponent={this.props.moveToComponent} />
                break
            case 'feature':
                renderedComponent = <FeatureTable moveToComponent={this.props.moveToComponent} />
                break
            case 'stories':
                renderedComponent = <StoryGrid moveToComponent={this.props.moveToComponent} />
                break
            case 'sprints':
                renderedComponent = <SprintMain moveToComponent={this.props.moveToComponent} />
                break 
            case 'sprintAdd':
                renderedComponent = <SprintCreateForm moveToComponent={this.props.moveToComponent} />
                break 
            case 'defects':
                renderedComponent = <DefectGrid moveToComponent={this.props.moveToComponent} />
                break
            case 'defectAdd':
                renderedComponent = <DefectAdd moveToComponent={this.props.moveToComponent} />
                break 
            case 'kanbanBoard':
                renderedComponent = <Kanban/>
                break
            default:
                renderedComponent = this.props.children
        }
        
        return (<div>
            <div> 
                    <SideBar moveToComponent={this.props.moveToComponent}  />
            </div>
            <div> 
               
                    {renderedComponent}
                </div> 
        </div>
        )
    }
}