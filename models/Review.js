const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
       type: DataTypes.STRING,
       allowNull: true,
     },
    // points: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
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