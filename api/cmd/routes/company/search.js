const PC = require('../../model/partner_companies.js')

// 查询合作公司数据
async function searchCompanyData(ctx) {
  let filters = ctx.query; // 使用查询参数
  console.log(filters)  
  try {
    // 使用 where 方法进行条件查询
    let result = await PC.where(filters).select();
    console.log(result)

    ctx.status(200).send({ success: true, data: result });
  } catch (error) {
    console.error('查询合作公司数据失败:', error);
    ctx.status(500).send({ success: false, message: '查询合作公司数据失败' });
  }
}

module.exports = {
  searchCompanyData
};
