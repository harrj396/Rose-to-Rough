const sequelize = require('../config/connection');
const { User, Review } = require('../models');

const userSeedData = require('./userSeedData.json');
const bookSeedData = require('./bookSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Reader.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of users) {
    const newUser = await User.create({
      user_id: id,
    });
  }

  for (const book of bookSeedData) {
    const newBook = await Book.create({
      ...book,
      // Attach a random reader ID to each book
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
