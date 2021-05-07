const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.get('/health', async (req, res) => {
    const timestamp = new Date();
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: timestamp.toLocaleDateString('en-GB'),
    };
    try {
        res.send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).send();
    }
});

app.listen(config.PORT || 5000, () => {
    console.log(`Listening to Port ${config.PORT || 5000}`);
});

module.exports = app;
