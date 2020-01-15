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

const fetchTopHeadlines = (source, pageNum) =>
    newsapi.v2.everything({
        sources: source,
        language: 'en',
        page: pageNum,
        pageSize: 10,
    });

router.get('/', (req, res, next) => {    
    fetchTopHeadlines('bbc-news', 1)
        .then(response => {
            res.json(response.articles);
        })
        .catch(error => console.log(`Failed to fetch top headlines: ${error}`)); 
});

router.get('/:source_id/page/:page_num', (req, res, next) => {
    const source = req.params.source_id;
    const pageNum = req.params.page_num;
    console.log(source);
    fetchTopHeadlines(source, pageNum)
        .then(response => {
            res.json(response.articles);
        })
        .catch(error => console.log(`Failed to fetch news: ${error}`));
});

module.exports = router;