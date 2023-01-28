const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
// const pairingRoutes = require('./pairingRoutes')
const winelistRoutes = require('./winelistRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/winelist', winelistRoutes);
// router.use('/pairing', pairingRoutes);

module.exports = router;