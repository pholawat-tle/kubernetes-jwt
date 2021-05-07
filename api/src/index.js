const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.listen(config.PORT || 5000, () => {
    console.log(`Listening to Port ${config.PORT || 5000}`);
});
