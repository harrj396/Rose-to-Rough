const User = require('./User');
const Review = require('./Review');
const Wine = require('./Wine');

User.belongsToMany(Review, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Wine,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_wines'
});

Review.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Wine,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'review_users'
});

module.exports = { User, Review, Wine };
