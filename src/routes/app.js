import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from '../pages/Login';
import Timeline from '../pages/Timeline';
import PrivateRoute from './privateRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}/>
          <PrivateRoute path="/timeline" exact component={Timeline}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;