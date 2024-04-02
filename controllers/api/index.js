const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');
router.use('/dashboard', dashboardRoutes);
module.exports = router;