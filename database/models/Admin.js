const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.UUID, // 使用 UUID 类型
    defaultValue: DataTypes.UUIDV4, // 如果需要默认值，可以使用 UUIDV4 生成随机 UUID
    primaryKey: true
  },
  username:{
    type: DataTypes.STRING(100),
    defaultValue: ''
  },
  password: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  }
},{
  freezeTableName: true, // 保持表名不变，不使用复数形式
  timestamps: false, // 禁用时间戳
});

module.exports = Admin;
