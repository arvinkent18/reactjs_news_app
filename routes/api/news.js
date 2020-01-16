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

const fetch = require('node-fetch');

const fetchTopHeadlines = (res, pageNum = 1) =>
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${pageNum}&apiKey=${process.env.NEWS_API_KEY}`)
        .then(res => {
            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }
            return res.json();
        })
        .then(news => {
            res.json(news);
        })
        .catch(error => console.log(`Failed to fetch top headlines: ${error}`));
        
const fetchEverything = (res, source = '', pageNum = 1) => 
    fetch(`https://newsapi.org/v2/everything?sources=${source}&pageSize=10&page=${pageNum}&apiKey=${process.env.NEWS_API_KEY}`)
    .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
    })
    .then(news => {
        res.json(news);
    })
    .catch(error => console.log(`Failed to fetch top headlines: ${error}`));

router.get('/', (req, res, next) => {  
    fetchTopHeadlines(res);
});

router.get('/page/:page_num', (req, res, next) => {    
    const pageNum = req.params.page_num;
    fetchTopHeadlines(res, pageNum);
});

router.get('/:source_id/page/:page_num', (req, res, next) => {
    const source = req.params.source_id;
    const pageNum = req.params.page_num;
    fetchEverything(res, source, pageNum);
});

module.exports = router;