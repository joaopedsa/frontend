import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../services/auth";

const PrivateRoute = (props) => (
  getToken() ?
  <Route path={props.path} component={props.component} /> :
  <Redirect to="/"/>
);


export default PrivateRoute;