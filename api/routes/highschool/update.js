const PH = require('../../model/partner_high_schools')

// 更新学校数据
async function updateHighSchoolData(ctx) {
  console.log(ctx.body)
  let body  = ctx.body;
  
  if (!body || !body.id) {
    return ctx.status(400).send({ success: false, message: '请求体不能为空,且必须包含学校ID' });
  }

  let { id, ...updateData } = body; // 提取ID及其他更新数据

  try {
    // 根据ID更新学校数据
    let result = await PH.where({ id }).update(updateData);

    if (result.affectedRows === 0) {
      return ctx.status(404).send({ success: false, message: '未找到该学校数据' });
    }

    ctx.status(200).send({ success: true, message: '学校数据更新成功' });
  } catch (error) {
    console.error('更新学校数据失败:', error);
    ctx.status(500).send({ success: false, message: '更新学校数据失败' });
  }
}

module.exports = {
  updateHighSchoolData
};
