const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Define a User as having many Comments, thus creating a foreign key in the 
// 'post' table
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


module.exports = { User, Post, Comment };