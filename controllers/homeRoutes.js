const router = require('express').Router();
const {User, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const reviewData = await Review.findAll(
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    );
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

// create a route for signup call the signup handlebars
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/review');
    return;
  }

  res.render('login');
});


// GET one post
// Use the custom middleware before allowing the 
// user to access the posts
router.get('/review/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
          'id',
          'name',
          'description',
          'date_created',
        ],
      },
    ]
    });

    const reviews = reviewData.get({ plain: true });

    res.render('review', {
      ...this.review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/review', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('review', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/review', async (req, res) => { 
  try{
  const reviewData = await Review.findAll(
  
  // include: [
  //   {
  //     model: User,
  //     attributes: ['name'],
  //   },
  // ],
);
// Serialize data so the template can read it
const reviews = reviewData.map((review) => review.get({ plain: true }));

  
res.render('review',{ 
  reviews, 
   logged_in: req.session.logged_in });
}catch (err) {
  res.status(500).json(err);
}

});

module.exports = router;
