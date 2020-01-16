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
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { fetchNews } from '../actions/newsActions';
import Pagination from 'material-ui-flat-pagination';

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

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  componentDidMount() {
    this.props.dispatch(fetchNews());
  }

  render() {
    const { classes, error, loading, news } = this.props;

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div>
        <CssBaseline />
        <Grid container direction="row">
          {news.articles.map(article => 
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
        <h1>Showing 10 of {news.totalResults} entries</h1>
        <Pagination
            limit={10}
            offset={2}
            total={news.totalResults}
            onClick={(e, offset) => this.handleClick(offset)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news.items,
  loading: state.news.loading,
  error: state.news.error
});

export default connect(mapStateToProps)(withStyles(styles)(News));