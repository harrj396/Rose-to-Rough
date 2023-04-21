const router = require("express").Router();
const { Review, User, Wine } = require("../models");

// We are using hardcoded data here, where would our our data usually come from? Remember -
// we haven't yet set up a database or Sequelize in our app
const reviews = [
  {
    id: 11,
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
    id: 12,
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
];

// GET all reviews
router.get("/", async (req, res) => {
  res.render("homepage", { reviews });
});

// GET a single review
router.get("/review/:id", async (req, res) => {
  return res.render("review", reviews[req.params.num - 1]);
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
