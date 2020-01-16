import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fetchNews } from '../actions/newsActions';

const styles = theme => {
    console.log(theme);
    return {
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
    }
};

class Articles extends Component {
    componentDidMount() {
        const sourceId = this.props.match.params.source_id;
        const pageNum = this.props.match.params.page_num;

        this.props.dispatch(fetchNews(sourceId, pageNum));
    }

    render() {
        const { classes, error, loading, news, sourceId } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }
    
        if (loading) {
            return <div>Loading...</div>;
        }
        
        return (
            <div>{sourceId}
            <Typography variant="headline" color="inherit"></Typography>
                <Grid container direction="row">
                    {news.map(article => 
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia 
                            className={classes.media}
                            image={article.urlToImage}
                            title={article.title}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="Caption" component="h5">
                                {article.publishedAt}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Read More
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    )}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    news: state.news.items,
    id: state.news[ownProps.source_id],
    loading: state.news.loading,
    error: state.news.error
});

export default connect(mapStateToProps)(withStyles(styles)(Articles));