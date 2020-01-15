import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Content from './Content';

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

class Main extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
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
            </div>
        )
    }
}

export default (withStyles(styles)(Main));