const User = require('./User');
const Post = require('./Post');
const Review = require('./Review');

User.hasOne(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Define a User as having many Post, thus creating a foreign key in the 
// 'post' table
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


module.exports = { User, Post, Review };