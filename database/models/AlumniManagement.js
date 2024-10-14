const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Students = require('./Students');

const AlumniManagement = sequelize.define('AlumniManagement', {
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
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  graduation_destination:{
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  p_employer:{
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  changes: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  performance: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  participationIn_employment: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  guidance_content:{
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  feedback:{
    type: DataTypes.TEXT,
    defaultValue: ''
  }
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = AlumniManagement;
