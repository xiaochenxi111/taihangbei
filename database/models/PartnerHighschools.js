const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PartnerHighschools = sequelize.define('PartnerHighschools', {
  name: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    defaultValue: ''
  },
  address: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  graduate_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  contact_person: {
    type: DataTypes.STRING(100),
    defaultValue: ''},
  contact_position:{ 
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  contact_phone:{ 
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  recruitment_method:{ 
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  admission_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = PartnerHighschools;
