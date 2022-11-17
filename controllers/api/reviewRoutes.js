const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

const comments = [
  {
    id: 1,
    comment_title: 'Why MVC is so important',
    description: 
      'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the view layer for design'
  },
  {
    id: 2,
    comment_title: 'Authenticatioon vs. Authorization',
    description: 
      'There is a difference between authentication and authorization. Authentication menas confirming your own identity'
  },
];

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
   include:[Product]
        }).then((reviewData) => {
      res.json(reviewData);
    });
});

// Creater a new review
router.post('/', withAuth, async (req, res) => {
  // try {
  //   const newReview = await Review.create({
  //     ...req.body,
  //     userId: req.session.userId,
  //   });
  //   res.json(newReview);
  // } catch (err) {
  //   res.status(500).json(err);
  // }

    Review.create({
      country: req.body.country,
      description: req.body.description,
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