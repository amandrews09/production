const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const commentRoutes = require('./commentRoutes');
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
module.exports = router;