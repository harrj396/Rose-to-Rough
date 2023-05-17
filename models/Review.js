const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    country: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    designation: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
    },
    region_1: {
      type: DataTypes.STRING,
    },
    region_2: {
      type: DataTypes.STRING,
    },
    taster_name: {
      type: DataTypes.STRING,
    },
    taster_twitter_handle: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    variety: {
      type: DataTypes.STRING,
    },
    winery: {
      type: DataTypes.STRING,
    },
    // Store a reference of the 'id' of the 'User' that owns this Review
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: false,
    // underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;