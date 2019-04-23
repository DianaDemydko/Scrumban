import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';


import { Chat } from './components/Chat';

import { TeamGrid } from './components/TeamReactComponent/TeamGrid';
import { TeamAdd } from './components/TeamReactComponent/TeamAdd';
import { TeamEdit } from './components/TaskReactComponenets/TaskEdit';

export default class App extends Component {
    displayName = App.name
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Layout} />
      </Layout>
    );
  }

}

