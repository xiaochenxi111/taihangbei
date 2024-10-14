const sequelize = require('../sequelize'); 
const Students = require('../models/Students');
const StudentPositions = require('../models/StudentPositions');
const SixthTermExperience = require('../models/SixthTermExperience');
const Development = require('../models/Development');
const AlumniManagement = require('../models/AlumniManagement');
const PartnerCompanies = require('../models/PartnerCompanies');
const PartnerHighschools = require('../models/PartnerHighschools');
const Admin = require('../models/Admin');

// 建表

const createUsersTable = async () => {
  try {
    await sequelize.authenticate(); // 测试连接
    console.log('数据库连接成功');

    await sequelize.sync({ force: true }); // 创建表，force: true 会先删除已存在的表
    console.log('用户表已创建');

  } catch (error) {
    console.error('数据库操作失败:', error);
  }
};

module.exports = createUsersTable; // 确保导出
