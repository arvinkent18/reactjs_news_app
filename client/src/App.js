import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Sources from './components/Sources';
import News from './components/News';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={2}>
          <Sources />
        </Grid>
        <Grid item xs={10}>
          <News />
        </Grid>
      </Grid>
    </div>
    </Provider>
  );
}