import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import store from './store';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Grid from '@material-ui/core/Grid';

const styles = theme => {
  console.log(theme);
  return {
      root: {
          flexGrow: 1,
      },
      paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
      },
  };
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Grid container direction="row">
                <Grid item xs={12}>
                  <NavBar />
                </Grid>
                <Grid item xs={2}>
                  <Sidebar />
                </Grid>
                <Grid item xs={10}>
                  <Content />
                </Grid>
              </Grid>
            </Route>
            <Route path='/news/:source_id/page/:page_num' component={Articles}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default (withStyles(styles)(App));