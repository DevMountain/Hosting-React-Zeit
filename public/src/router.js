import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

export default (
  <Switch>
    <Route component={ Dashboard } path="/" exact />
    <Route component={ Auth } path="/auth" />
    <Route component={ Profile } path="/profile" />
  </Switch>
)