const PH = require('../../model/partner_high_schools')

// 删除学校数据
async function deleteHighSchoolData(ctx) {
    console.log(ctx.body);
    
    let { id } = ctx.body; // 从请求体获取学校ID

    if (!id) {
        return ctx.status(400).send({ success: false, message: '请求体中缺少学校ID' });
    }

    try {
        // 检查该学校是否存在
        let existingSchool = await PH.where({ id }).select();

        if (existingSchool.length === 0) {
            return ctx.status(404).send({ success: false, message: '学校不存在' });
        }

        // 删除学校数据
        let result = await PH.where({ id }).delete();

        ctx.status(200).send({ success: true, message: '学校数据删除成功', result });
    } catch (error) {
        console.error('删除学校数据失败:', error);
        ctx.status(500).send({ success: false, message: '删除学校数据失败' });
    }
}

module.exports = {
    deleteHighSchoolData
};
