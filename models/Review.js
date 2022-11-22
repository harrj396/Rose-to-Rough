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
    },
    price: {
      type: DataTypes.INTEGER,
    },
    province: {
      type: DataTypes.STRING,
    },
    region_1: {
      type: DataTypes.STRING,
    },
    taster_name: {
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;