const PH = require('../../model/partner_high_schools')

// 插入高中数据
async function insertHighSchoolData(ctx) {
  let data = ctx.body;
  try {
    // 检查是否已存在
    let existingHighSchool = await PH.where({
      name: data.name  // 使用 data.name 访问名称
    }).select();

    if (existingHighSchool.length > 0) {
      return ctx.status(400).send({ success: false, message: '高中已存在' });
    }

    if (!data.name) {
      return ctx.status(400).send({ success: false, message: 'name 不能为空' });
    }

    // 插入高中数据
    let result = await PH.insert(data);

    ctx.status(200).send({ success: true, message: '高中数据插入成功', result });
  } catch (error) {
    console.error(error);
    ctx.status(500).send({ success: false, message: '插入高中数据失败' });
  }
}

module.exports = {
  insertHighSchoolData
};