const PH = require('../../model/partner_high_schools')

// 查询学校数据
async function getHighSchoolData(ctx) {
  let filters = ctx.query; // 获取查询参数
  try {
    // 根据ID查询
    let result = await PH.where(filters).select();

    if (result.length === 0) {
      return ctx.status(404).send({ success: false, message: '未找到该学校数据' });
    }

    ctx.status(200).send({ success: true, data: result });
  } catch (error) {
    console.error('查询学校数据失败:', error);
    ctx.status(500).send({ success: false, message: '查询学校数据失败' });
  }
}

module.exports = {
  getHighSchoolData
};
