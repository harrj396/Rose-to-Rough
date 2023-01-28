const router = require('express').Router();
const  { Review, User }  = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  // find all reviews
  // be sure to include its associated Products
  Review.findAll().then((reviewData) => {
    res.json(reviewData);
  });
});

// Get a list of reviews for the user with id = :id
router.get("/:id", async (req, res) => {
  try {
      const userData = await Review.findAll({
          where: {
              user_id: req.params.id,
          },
          order: [["createdAt", "ASC"]],
      });
      if (!userData) {
          res.status(404).json({
              message: `No user found with id: ${req.params.id}`,
          });
          return;
      }
      res.status(200).json(userData);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

// route to create/add a review
router.post('/', withAuth,  async (req, res) => {
  try {
    const reviewData = await Review.create({
      user_id: req.session.user_id,
      title: req.body.title,
      description: req.body.description,
      taster_name: req.body.taster_name,
      is_twenty_one: req.body.is_twenty_one,
    });

    req.session.save(() => {
      req.session.logged_in = true
      res.status(200).json(reviewData);
    });
    
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/', withAuth, async (req, res) => {
  try {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
    const reviewData = await Review.update(req.body, {
       where: {
          id: req.body.id,
        },
    });

    if (!reviewData) {
      res.status(400).json({
        message: "Review does not exist. Please create review first!",
      });
    }
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }

  });

router.delete('/', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.body.id,
      },
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
