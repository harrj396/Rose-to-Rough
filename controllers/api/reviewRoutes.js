// const router = require('express').Router();
// const  Review  = require('../../models/Review');
// const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {
//   // find all reviews
//   // be sure to include its associated Products
//   Review.findAll().then((reviewData) => {
//     res.json(reviewData);
//   });
// });

// router.get('/:id', async (req, res) => {
//   // find one review by its `id` value
//   // be sure to include its associated Products
//   Review.findOne({
//     where:{
//         id: req.params.id
//           }, 
   
//         }).then((reviewData) => {
//       res.json(reviewData);
//     });
// });

// // Create a new review
// router.post('/', withAuth, async (req, res) => {
//     // use Sequelize's create() method to add a row 
//     // to the table 
//     // Similar to "INSERT INTO" in plain SQL
//     Review.create({
//       description: req.body.description,
//       title: req.body.title,
//       user_id: req.session.user_id
//    })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });

// });

// router.put('/:id', (req, res) => {
//   // update a review by its `id` value
//   Review.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//   .then((newReview) => {
//     res.json(newReview)
//   });
// });


// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const reviewData = await Review.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!reviewData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(reviewData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

/********************************************************************************************************************************** */

const router = require('express').Router();
const  Review  = require('../../models/Review');
// const withAuth = require('../../utils/auth');



// route to create/add a dish
router.post('/', async (req, res) => {
  try {
    const reviewData = await Review.create({
      title: req.body.title,
      description: req.body.description,
      taster_name: req.body.taster_name,
      has_nuts: req.body.has_nuts,
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const review = await Review.update(
      {
        title: req.body.title,
        description: req.body.description,
        guest_name: req.body.guest_name,
        has_nuts: req.body.has_nuts,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
