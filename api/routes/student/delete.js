const Students = require('../../model/students');
const SP = require('../../model/stu_position');
const Development = require('../../model/development');
const AM = require('../../model/alumni_management');
const STE = require('../../model/sixth_term_experience');
const db = require('../../lib/initdb');

// 删除学生基本信息
async function deleteStudentBaseData(data) {
    return await Students.where(data).delete();
}

// 删除学生办公情况
async function deleteStudentPositionData(data) {
    return await SP.where(data).delete();
}

// 删除第六学期实习数据
async function deleteSixthTermExperienceData(data) {
    return await STE.where(data).delete();
}

// 删除学生就业数据
async function deleteDevelopmentData(data) {
    return await Development.where(data).delete();
}

// 删除校友管理数据
async function deleteAlumniManagementData(data) {
    return await AM.where(data).delete();
}

// 删除学生数据
async function deleteStudentData(ctx) {
    let { type, data } = ctx.body;
    console.log(type, data)
    // 检查 data 是否包含关键字段，比如 id
    if (!data || !data.id) {
        return ctx.status(400).send({ success: false, message: '缺少必要的查询条件: id' });
    }

    let modelMap = {
      students: deleteStudentBaseData,
      stu_position: deleteStudentPositionData,
      sixth_term_experience: deleteSixthTermExperienceData,
      development: deleteDevelopmentData,
      alumni_management: deleteAlumniManagementData,
    };

    let deleteFunction = modelMap[type];

    if (!deleteFunction) {
      return ctx.status(400).send({ success: false, message: '无效的 type 参数' });
    }

    try {
      console.log('准备删除数据，条件:', data); // 调试信息

      let result = await deleteFunction(data);

      // 检查是否实际删除了记录
      if (result === 0) {
        return ctx.status(404).send({ success: false, message: '没有找到要删除的记录' });
      }

      ctx.status(200).send({ success: true, message: '删除成功', result });
    } catch (error) {
      console.error('删除数据失败:', error);
      ctx.status(500).send({ success: false, message: '删除数据失败' });
    }
}

module.exports = {
    deleteStudentData,
};
