const User = require('./User');
const Review = require('./Review');
const License = require('./License');

User.hasOne(License, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

License.belongsTo(User, {
  foreignKey: 'user_id',
});

// Define a User as having many review, thus creating a foreign key in the 
// 'review' table
User.hasMany(Review, {
  foreignKey: 'user_id'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Review };