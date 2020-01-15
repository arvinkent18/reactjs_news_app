import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSources } from '../actions/sourceActions';

class Sources extends Component {
    componentDidMount() {
        this.props.dispatch(fetchSources());
    }

    render() {
        const { error, loading, sources } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }
    
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <List>
                    {sources.map(source => 
                        <ListItem key={source.id} button component={NavLink} to={`/news/${source.id}/page/1`}>
                            <ListItemText primary={source.name} />
                        </ListItem>
                    )}
                </List>    
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    sources: state.sources.items,
    loading: state.sources.loading,
    error: state.sources.error
});

export default connect(mapStateToProps)(Sources);

