const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PartnerCompanies = sequelize.define('PartnerCompanies', {
  name: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    defaultValue: ''
  },
  contact_person: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  contact_change: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  company_profile: DataTypes.TEXT,
  alumni_position: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  common_positions: DataTypes.TEXT,
  basic_treatment:{ 
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  recruitment_type: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = PartnerCompanies;
