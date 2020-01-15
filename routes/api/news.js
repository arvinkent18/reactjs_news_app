/**
 * express module
 * @const
 */
const express = require('express');
/**
 * news api module
 * @const
 */
const NewsAPI = require('newsapi');
/**
 * express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * news api
 * @type {object}
 * @const
 */
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm, newsSource, pageNum) =>
    newsapi.v2.everything({
        q: searchTerm,
        source: newsSource,
        language: 'en',
        page: 1,
        pageSize: 10,
    });

router.get('/', (req, res, next) => {    
    console.log('test')
    const topic = 'bitcoin';
    console.log(topic);
    const source = 'bbc-news';
    console.log(source);
    fetchNews(topic,source, 1)
        .then(response => {
        res.json(response.articles);
        })
        .catch(error => console.log(`Failed to fetch news: ${error}`));
});

module.exports = router;