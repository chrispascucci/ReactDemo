import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {hashHistory, Router, Route, Redirect} from 'react-router';

import Layout from './layout/layout';

import StudentsPage from './pages/students';

const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="students" />
    <Route path="/" component={Layout}>
      <Route path="students" component={StudentsPage}>
      </Route>
    </Route>
  </Router>
)

jQuery(function() {
  ReactDOM.render(
    app,
    document.getElementById('student-box')
  );
})
