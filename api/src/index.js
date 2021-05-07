const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.use('/', routes);

app.listen(config.PORT || 5000, () => {
    console.log(`Listening to Port ${config.PORT || 5000}`);
});

module.exports = app;
