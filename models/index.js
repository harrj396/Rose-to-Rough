const User = require('./User');
const Review = require('./Review');

// Define a User as having many review, thus creating a foreign key in the 
// 'review' table
User.hasMany(Review, {
  foreignKey: 'user_id'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Review };