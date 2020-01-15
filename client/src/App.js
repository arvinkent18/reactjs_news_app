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
import Articles from './components/Articles';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/news/:source_id' component={Articles}/>
        </Switch>
      </Router>
    </Provider>
  );
}