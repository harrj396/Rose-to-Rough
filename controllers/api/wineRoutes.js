const router = require('express').Router();
// Include the Review model with the other imports
const { User, Review, Wine } = require('../../models');

// CREATE a user
router.post('/', async (req, res) => {
  try {
    const wineData = await Wine.create({
      reader_id: req.body.trip_id,
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const wineData = await Wine.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!wineData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(wineData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
