const router = require('express').Router();
const  Review  = require('../../models/Review');
const withAuth = require('../../utils/auth');



router.get('/', (req, res) => {
  // find all reviews
  // be sure to include its associated Products
  Review.findAll().then((reviewData) => {
    res.json(reviewData);
  });
});

router.get('/:id', async (req, res) => {
  // find one review by its `id` value
  // be sure to include its associated Products
  Review.findOne({
    where:{
        id: req.params.id
          }, 
   
        }).then((reviewData) => {
      res.json(reviewData);
    });
});

// Create a new review
router.post('/', withAuth, async (req, res) => {
    // use Sequelize's create() method to add a row 
    // to the table 
    // Similar to "INSERT INTO" in plain SQL
    Review.create({
      description: req.body.description,
      title: req.body.title,
      user_id: req.session.user_id
   })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
  // update a review by its `id` value
  Review.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((newReview) => {
    res.json(newReview)
  });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;