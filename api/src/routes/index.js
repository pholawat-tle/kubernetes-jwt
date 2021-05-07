const router = require('express').Router();
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/health', healthRoutes);

module.exports = router;
