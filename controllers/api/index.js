const router = require('express').Router();

const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
// const winelistRoutes = require('./winelistRoutes');
// const pairingRoutes = require('./pairingRoutes')

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
// router.use('/winelist', winelistRoutes);
// router.use('/pairing', pairingRoutes);

module.exports = router;