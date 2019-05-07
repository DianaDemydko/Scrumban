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
import { BurnUp_DownCharts } from '../ChartReactComponents/BurnUp_DownCharts';
import { AddFeature } from '../FeatureReactComponents/AddFeature';
import { AdminTable } from '../AdminGridReactComponents/AdminTable';
import { StoryAdd } from '../StoryReactComponents/StoryAdd';
import { TeamGrid } from '../TeamReactComponent/TeamGrid';
import { TeamAdd } from '../TeamReactComponent/TeamAdd';
import { Chat } from '../Chat';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { JiraPage } from '../JiraReactComponent/JiraPage';

export class Body extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var renderedComponent;

        switch (this.props.renderedComponentName) {
            case 'admin':
                renderedComponent = <AdminTable moveToComponent={this.props.moveToComponent} />
                break
            case 'login':
                renderedComponent = <Login moveToComponent={this.props.parentOnLoginStatusCallBack} />
                break
            case 'signup':
                renderedComponent = <Register moveToComponent={this.props.moveToComponent} />
                break
            case 'profile':
                renderedComponent = <ProfilePage moveToComponent={this.props.moveToComponent} user={this.props.user} updateUser={this.props.updateUser}/>
                break
            case 'about':
                renderedComponent = <About moveToComponent={this.props.moveToComponent} />
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
            case 'featureAdd':
                renderedComponent = <AddFeature moveToComponent={this.props.moveToComponent} />
                break;
            case 'stories':
                renderedComponent = <StoryGrid moveToComponent={this.props.moveToComponent} />
                break
            case 'storyAdd':
                renderedComponent = <StoryAdd moveToComponent={this.props.moveToComponent} />
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
            case 'teams':
                renderedComponent = <TeamGrid moveToComponent={this.props.moveToComponent} />
                break
            case 'teamAdd':
                renderedComponent = <TeamAdd moveToComponent={this.props.moveToComponent} />
                break
            case 'jira':
                renderedComponent = <JiraPage moveToComponent={this.props.moveToComponent} />
                break
            case 'chat':
                renderedComponent = <Chat moveToComponent={this.props.moveToComponent} />
                break
            case 'kanbanBoard':
                renderedComponent = <Kanban/>
                break
            case 'burnDown_Up':
                renderedComponent = <BurnUp_DownCharts />
                break
            default:
                renderedComponent = <Kanban />
        }
        

        return (<div>
            <ToastContainer autoClose={3000} position="bottom-right" />
            <div> 
                {this.props.panelLoginStatus == true ?
                    (<SideBar moveToComponent={this.props.moveToComponent} />) :
                    ""
            }
            </div>
            <div> 
              {renderedComponent}
            </div> 
        </div>
        )
    }
}