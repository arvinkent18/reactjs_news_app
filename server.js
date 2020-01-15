require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const newsRouter = require('./routes/api/news');
const sourcesRouter = require('./routes/api/sources');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/news', newsRouter);
app.use('/sources', sourcesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server on port ${port}`));