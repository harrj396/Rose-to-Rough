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
    designation: {
       type: DataTypes.STRING,
       allowNull: true,
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
       allowNull: false,
     },
     region_1: {
       type: DataTypes.STRING,
       allowNull: true,
     },
     taster_name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
     },
     variety: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     winery: {
       type: DataTypes.STRING,
       allowNull: false,
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