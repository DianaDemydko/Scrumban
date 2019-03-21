import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { TaskGrid } from './components/TaskReactComponenets/TaskGrid';
import { TaskAdd } from './components/TaskReactComponenets/TaskAdd';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/'   component={Home} />
        <Route path='/counter'  component={Counter} />
        <Route path='/fetchdata'component={FetchData} />
        <Route path='/tasks'    component={TaskGrid} />
        <Route path='/add'      component={TaskAdd} />
      </Layout>
    );
  }
}
