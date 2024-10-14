const PC = require('../../model/partner_companies.js')

// 插入公司数据
async function insertCompanyData(ctx) {
  let data = ctx.body; // 直接使用 ctx.body 包含所有数据
  console.log(data);
  try {
    // 检查是否已存在
    let existingCompany = await PC.where({
      name: data.name  // 使用 data.name 访问名称
    }).select();

    if (existingCompany.length > 0) {
      return ctx.status(400).send({ success: false, message: '公司已存在' });
    }

    if (!data.name) {
      return ctx.status(400).send({ success: false, message: 'name 不能为空' });
    }

    // 插入公司数据
    let result = await PC.returning('*').insert(data); // 直接插入整个 data 对象

    ctx.send(result);
  } catch (error) {
    console.error(error);
    ctx.status(500).send({ success: false, message: '插入公司数据失败' });
  }
}

module.exports = {
  insertCompanyData
};