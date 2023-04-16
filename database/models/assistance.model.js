const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../libraries/sequelize');

const ASSISTANCE_TABLE = 'assistances';

const AssistanceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.STRING
  },
  userName: {
    allowNull: false,
    field: 'user_name',
    type: DataTypes.STRING
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'assistance_date'
  },
  punchIn: {
    allowNull: false,
    field: 'punch_in',
    type: DataTypes.STRING
  },
  punchOut: {
    allowNull: false,
    field: 'punch_out',
    type: DataTypes.STRING
  },
  deleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Assistance extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASSISTANCE_TABLE,
      modelName: 'Assistance',
      timestamps: true
    }
  }
}

module.exports = { ASSISTANCE_TABLE, AssistanceSchema, Assistance }
