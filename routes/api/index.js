const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtsRoutes);

module.exports = router;
