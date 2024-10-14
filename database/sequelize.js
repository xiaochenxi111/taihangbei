 // ------ 下面是使用 Sequelize 连接到数据库并测试连接
 const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('school_project', 'hserver', null, {
   host: 'localhost',
   dialect: 'postgres',
   port: 5432
 });
 
 
 
 
 sequelize.authenticate()
 .then(() => {
   console.log('数据库连接成功');
 })
 .catch((err) => {
   console.error('数据库连接失败:',err);
 });
 
 module.exports = sequelize;
 
 
 