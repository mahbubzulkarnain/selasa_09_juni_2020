import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from "../components/Navbar";

import CartContainer from '../containers/Cart'
import HomeContainer from '../containers/Home'
import NotFoundContainer from '../containers/NotFound'
import PrivateRoute from "../components/PrivateRoute";

export default () => (
  <BrowserRouter>
    <Navbar/>
    <Switch>
      <PrivateRoute exact path='/mycart' component={ CartContainer }/>
      <Route exact path='/' component={ HomeContainer }/>
      <Route component={ NotFoundContainer }/>
    </Switch>
  </BrowserRouter>
)
