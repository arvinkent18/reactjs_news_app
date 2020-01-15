import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    state = {
        news: [],
    }
    componentDidMount() {
        const id = this.props.match.params.source_id;
        fetch(`http://localhost:5000/news/`+id)
            .then(response => response.json())
            .then(articles => {
                this.setState({
                    news: [...this.state.news, ...articles],
                });
            }).catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Grid container direction="row">
                    {this.state.news.map(article => 
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

Articles.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Articles);