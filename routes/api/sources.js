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

const fetchSources = () => 
    newsapi.v2.sources({
        language: 'en'
    });

router.get('/', (req, res, next) => {
    fetchSources()
        .then(response => {
            res.json(response.sources);
        })
        .catch(error => console.log(`Failed to fetch sources: ${error}`));
});

module.exports = router;