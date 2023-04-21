const sequelize = require('../config/connection');
const { User, Review, Wine } = require('../models');

const userSeedData = require('./userSeedData.json');
const reviewSeedData = require('./reviewSeedData.json');

// when you say sync it will drop the tables and insert the data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const reviews = await Review.bulkCreate(reviewSeedData, {
    individualHooks: true,
    returning: true,
  });


  for (const { id } of users) {
    const newWine = await Wine.create({
      user_id: id,
    });
  }

  for (const review of reviewSeedData) {
    const newReview = await Review.create({
      ...review,
      // Attach a random user ID to each review
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
