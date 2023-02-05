const router = require('express').Router();
const { Review, User, Wine } = require('../../models');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll();
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single review
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Wine.findByPk(req.params.id, {
      // JOIN with users, using the Wine through table
      include: [{ model: User, through: Wine,
      as: 'review_users' }]
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a review
router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create(req.body);
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a review
router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;















