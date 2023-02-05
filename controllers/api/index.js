const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const wineRoutes = require('./wineRoutes');

router.use('/users', userRoutes);
router.use('/wines', wineRoutes);
router.use('/reviews', reviewRoutes);


module.exports = router;