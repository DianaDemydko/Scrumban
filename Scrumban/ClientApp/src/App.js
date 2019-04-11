import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FeatureTable } from './components/FeatureReactComponents/FeatureTable';
import { AddFeature } from './components/FeatureReactComponents/AddFeature';
import { EditFeature } from './components/FeatureReactComponents/EditFeature';
import { TaskGrid } from './components/TaskReactComponenets/TaskGrid';
import { TaskAdd } from './components/TaskReactComponenets/TaskAdd';
import { Panel } from './components/PanelReactComponents/Panel';

import { DefectGrid } from './components/DefectReactComponent/DefectGrid';
import { DefectAdd } from './components/DefectReactComponent/DefectAdd';
import { StoryGrid } from './components/StoryReactComponents/StoryGrid';
import { StoryAdd } from './components/StoryReactComponents/StoryAdd';

import { SprintMain } from './components/Sprint/SprintMain';
import { SprintCreateForm } from './components/Sprint/CreateForm/SprintCreateForm';

import { Login } from './components/PanelReactComponents/Login';
import { ProfilePage } from './components/PanelReactComponents/UserProfileComponents/ProfilePage'


export default class App extends Component {
    displayName = App.name
  render() {
    return (
      <Layout>

            <Route exact path='/' component={Login} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/defects' component={DefectGrid} />
        <Route path='/defect_add' component={DefectAdd} /> 
        <Route path='/counter'      component={Counter} />
        <Route path='/fetchdata'    component={FetchData} />
		    <Route path='/stories' component={StoryGrid} />
		    <Route path='/addStory' component={StoryAdd} />
        <Route path='/tasks'        component={TaskGrid} />
            <Route path='/addTask' component={TaskAdd} />
            <Route path='/Sprints' component={SprintMain} />
            <Route path='/CreateNewSprint' component={SprintCreateForm} />
<Route path='/feature' component={FeatureTable} />
                <Route path='/addfeature' component={AddFeature} />
                <Route path='/editfeature' component={EditFeature} />
            <Route path='/panel' component={Panel} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={ProfilePage} />
      </Layout>
    );
  }

}

