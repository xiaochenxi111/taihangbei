const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // 引入数据库连接

const Students = sequelize.define('Students', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    defaultValue: 0
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  gender: {
    type: DataTypes.STRING(50),
    defaultValue: ''
  },
  grade: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  class: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  counselor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  major_direction: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:''
  },
  contact_info: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:''
  },
  origin: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  high_school: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  rank: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  special_type: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  ability_assessment_general: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  ability_assessment_major: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  awards: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  punishment: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  position: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  thesis_adviser: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  sixth_term_status: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  }
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = Students;