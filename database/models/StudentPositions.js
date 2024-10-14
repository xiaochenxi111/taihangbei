const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Students = require('./Students');

const StudentPositions = sequelize.define('StudentPositions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Students,
      key: 'student_id',
    },
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  class_position: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  organizational_position: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  club_position: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = StudentPositions;
