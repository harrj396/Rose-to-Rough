const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const reviewRoutes = require('./reviewRoutes');


router.use('/', homeRoutes);
// router.use('/review', reviewRoutes);
router.use('/api', apiRoutes);
// router.use('/favorite', favoriteRoutes);

module.exports = router;