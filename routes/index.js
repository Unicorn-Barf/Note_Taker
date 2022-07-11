const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

// Define route for /api
router.use('/api', apiRoutes);

module.exports = router