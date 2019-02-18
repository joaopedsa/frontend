import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Login from './pages/login/Login';
import Timeline from './pages/timeline/Timeline';
import PrivateRoute from './routes/privateRoute';
import Register from './pages/register/register';
import PageNotFound from './pages/404/404';
import reducers from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <PrivateRoute path="/timeline" exact component={Timeline}/>
                <Route path="*" component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));