const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Students = require('./Students');

const SixthTermExperience = sequelize.define('SixthTermExperience', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Students,
      key: 'student_id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  type: {
    type: DataTypes.ENUM('work', 'train'),
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  changes_remarks: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  main_tasks: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  award: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = SixthTermExperience;