import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FeatureTable } from './components/FeatureReactComponents/FeatureTable';
import { AddFeature } from './components/FeatureReactComponents/AddFeature';
import { EditFeature } from './components/FeatureReactComponents/EditFeature';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/feature' component={FeatureTable} />
            <Route path='/addfeature' component={AddFeature} />
            <Route path='/editfeature' component={EditFeature}/>
        </Layout>

    );
  }
}

