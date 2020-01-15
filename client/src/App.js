import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from './components/Main';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/:source_id'>
            Test
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}