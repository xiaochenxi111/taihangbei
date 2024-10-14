const PC = require('../../model/partner_companies.js')
async function deleteCompanyData(ctx) {
    console.log("请求体:", ctx.body); // 修改为 ctx.request.body
    
    let id = ctx.body.id; // 确保从请求体获取 id

    if (!id) {
        return ctx.status(400).send({ success: false, message: '请求体中缺少公司ID' });
    }

    try {
        let result = await PC.where({ id }).delete();

        if (result.affectedRows === 0) {
            return ctx.status(404).send({ success: false, message: '公司信息不存在' });
        }

        ctx.status(200).send({ success: true, message: '公司信息删除成功' });
    } catch (error) {
        console.error('删除公司信息失败:', error);
        ctx.status(500).send({ success: false, message: '删除公司信息失败' });
    }
}

  
  module.exports = {
    deleteCompanyData
  };
  