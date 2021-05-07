const router = require('express').Router();

router.get('/', async (req, res) => {
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

module.exports = router;
