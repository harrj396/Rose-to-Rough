const router = require("express").Router();
const { Review, User, Wine } = require("../models");

// We are using hardcoded data here, where would our data usually come from? Remember -
// we haven't yet set up a database or Sequelize in our app
const reviews = [
  {
    id: 1,
    title: "Homewood",
    taster_name: "Ana Dasilva",
    country: "US",
    variety: "Zinfandel Port",
    winery: "Homewood Winery",
    province: "Sonoma",
    region_1: "Sonoma Country",
    description:
      "An amazing port with aromas and flavors of dark skinned summer time fruits that you eat over the sink. Pair it with a chocolate raspberry torte and your favorite vanilla ice cream",
  },
  {
    id: 2,
    title: "Fuentevina",
    taster_name: "Oliver",
    country: "Spain",
    variety: "Cabernet Sauvignon",
    winery: "Fuentevina Winery",
    province: "Castilla y Leon",
    region_1: " Extremadura region of Spain",
    description:
      "Fresh citrus fruit flavors lead on the palate with a nice underlying note of tropical fruit.",
  },
  {
    id: 3,
    title: "Jenblossom",
    taster_name: "Zoraida",
    country: "United States",
    variety: "Cabernet Sauvignon",
    winery: "Jenblossom Winery",
    province: "Napa Valley",
    region_1: "Napa hillside vineyards",
    description:
      "With fruit sourced from legendary Napa hillside vineyards. marine-influenced morning fog and volcanic soil produce this velvety, extremely layered 100% Cabernet Sauvignon.",
  },
  {
    id: 4,
    title: "Rutherford",
    taster_name: "Jacob",
    country: "United States",
    variety: "Cabernet Sauvignon",
    winery: "Jenblossom Winery",
    province: "Napa Valley",
    region_1: "Napa",
    description:
      "In the Heart of Napa, cool nights, warm days and gravelly benchland soil combine to bring us this classic and structured Rutherford Cabernet.",
  },
];

// GET all reviews
router.get("/", async (req, res) => {
  // We find all reviews in the db and set the data equal to reviewData
  // const reviewData = await Review.findAll().catch((err) => {
  //   res.json(err);
  // });
  // We use map() to iterate over reviewData and then add .get({ plain: true }) each
  // object to serialize it.
  // const reviews = reviewData.map((review) => review.get({ plain: true }));
  // We render the template, 'homepage', passing in reviews, a new array of serialized
  // objects. 
  res.render("homepage", { reviews });
});

// // GET a single review
// router.get("/review/:num", async (req, res) => {
//   return res.render("review", reviews[req.params.num - 1]);
// });

// Get one review  with serialized data
router.get('/review/:id', async (req, res) => {
  return res.render('review', reviews[req.params.id - 1]);
  // try{
    // Search the database for a dish with an id that matches params
    // const reviewData = await Review.findByPk(req.params.id);
    // console.log(reviewData)
    // reviewData.save();

    // We use .get({ plain: true }) on the object to serialize it 
    // so thaq it only includes the data that we need.
    // const review = reviewData.get({ plain: true });
    // Then, the 'dish' template is rendered and dish is passed into the template.
    // res.render('review', reviewData);
  // } catch (err) {
    // res.status(500).json(err);
  // }
});

// CREATE a review
router.post("/review", async (req, res) => {
  try {
    const reviewData = await Review.create(req.body);
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a review
router.delete("/:id", async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
