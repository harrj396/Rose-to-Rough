const router = require('express').Router();
const {User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const reviewData = await Review.findAll().catch((err) => {
      res.json(err);
    });
    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
     reviews, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/reviews', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });
    console.log(userData);

    res.render('reviews', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/winelist/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    let review;
    user.reviews.forEach((element) => {
      if (element.id == req.params.id) {
        review = element;
      }
    });

    if (review) {
      res.render('winelist', review);
    } else {
      res.status(404).json({
        message: `A review with id: ${req.params.id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/reviews');
    return;
  }

  res.render('login');
});

// create a route for signup call the signup handlebars
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/reviews');
    return;
  }
  
  res.render('signup');
});


// GET one post
// Use the custom middleware before allowing the 
// user to access the posts
// router.get('/review/:id', withAuth, async (req, res) => {
//   try {
//     const reviewData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: [
//           'id',
//           'name',
//           'description',
//           'date_created',
//         ],
//       },
//     ]
//     });

//     const review = reviewData.get({ plain: true });

//     res.render('review', {
//       ...this.review,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

  // route to get one review
  router.get('/review/:id', async (req, res) => {
    try{ 
        const reviewData = await Review.findByPk(req.params.id);
        if(!reviewData) {
            res.status(404).json({message: 'No review with this id!'});
            return;
        }
        const review = reviewData.get({ plain: true });
        res.render('review', review);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

// router.get('/review', async (req, res) => { 
//   try{
//   const reviewData = await Review.findAll(
  
  // include: [
  //   {
  //     model: User,
  //     attributes: ['name'],
  //   },
  // ],
// );
// Serialize data so the template can read it
// const reviews = reviewData.map((review) => review.get({ plain: true }));
  
// res.render('review',{ 
//   reviews, 
//    logged_in: req.session.logged_in });
// }catch (err) {
//   res.status(500).json(err);
// }

// });

// module.exports = router;


/******************************************************************************************************************************** */

// route to get all reviews
router.get('/', async (req, res) => {
  const reviewData = await Review.findAll().catch((err) => { 
      res.json(err);
    });
      const reviews = reviewData.map((review) => review.get({ plain: true }));
      res.render('all', { reviews });
    });



module.exports = router;
