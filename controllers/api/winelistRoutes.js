const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// get single review
router.get("/:id", async (req, res) => {
    try {
        // Search the database for a deck with an id that matches params
        const reviewData = await Review.findByPk(req.params.id);

        // serialize the data
        const winelist = reviewData.get({ plain: true });
        res.render("winelist", winelist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Make changes to an existing review
router.put("/", withAuth, async (req, res) => {
    try {
        const review = await Review.findByPk(req.body.review_id);
        if (req.body.title) {
            review.title = req.body.title;
        }
        if (req.body.description) {
            review.description = req.body.description;
        }
        await review.save();
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;