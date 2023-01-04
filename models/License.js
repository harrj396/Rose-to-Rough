const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class License extends Model {}

License.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    card_number: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    modelName: 'library_card',
  }
);

module.exports = License;
