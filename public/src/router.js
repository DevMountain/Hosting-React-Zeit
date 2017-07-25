import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

export default (
  <Switch>
    <Route component={ Dashboard } path="/" exact />
    <Route component={ Login } path="/login" />
  </Switch>
)