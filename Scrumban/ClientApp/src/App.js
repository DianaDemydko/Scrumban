import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { StoryGrid } from './components/StoryReactComponents/StoryGrid';
import { StoryAdd } from './components/StoryReactComponents/StoryAdd';
import { Login } from './components/Login';
import { Register } from './components/Register';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
			<Route exact path='/' component={StoryGrid} />
        <Route path='/counter'      component={Counter} />
        <Route path='/fetchdata'    component={FetchData} />
        <Route path='/login'        component={Login}/>
		<Route path='/register' component={Register} />
		<Route path='/stories' component={StoryGrid} />
		<Route path='/add' component={StoryAdd} />
      </Layout>
    );
  }
}
