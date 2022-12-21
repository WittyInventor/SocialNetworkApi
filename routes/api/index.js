const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/category', categoryRoutes);
router.use('/productRoutes', productRoutes);
router.use('/tagRoutes', tagRoutes);

module.exports = router;
