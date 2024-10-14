const PC = require('../../model/partner_companies.js')

async function updateCompanyData(ctx) {
    let data = ctx.body;
    
    if (!data.id) {
      return ctx.status(400).send({ success: false, message: '请求体中缺少公司ID' });
    }
  
    try {
      let result = await PC.where({ id: data.id }).update(data);
  
      if (result.affectedRows === 0) {
        return ctx.status(404).send({ success: false, message: '公司信息不存在' });
      }
  
      ctx.status(200).send({ success: true, message: '公司信息更新成功' });
    } catch (error) {
      console.error('更新公司信息失败:', error);
      ctx.status(500).send({ success: false, message: '更新公司信息失败' });
    }
  }
  

module.exports = {
    updateCompanyData
  };
  