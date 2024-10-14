const Students = require('../../model/students');
const SP = require('../../model/stu_position');
const Development = require('../../model/development');
const AM = require('../../model/alumni_management');
const STE = require('../../model/sixth_term_experience');
const db = require('../../lib/initdb');


// 删除学生办公情况
async function deleteStudentPositionData(temp) {
  return await SP.where(temp).delete();
}


// 删除学生就业数据
async function deleteDevelopmentData(temp) {
  return await Development.where(temp).delete();
}
// 更新学生基本信息
async function updateStudentBaseData(id, query) {
  console.log(`Updating student with ID: ${id} and query:`, query);
  return await Students.where({ id }).update(query);
}

// 更新学生办公情况
async function updateStudentPositionData(id, query) {
  return await SP.where({ id }).update(query);
}

// 更新第六学期实习数据
async function updateSixthTermExperienceData(id, query) {
  return await STE.where({ id }).update(query);
}

// 更新学生就业数据
async function updateDevelopmentData(id, query) {
  return await Development.where({ id }).update(query);
}

// 更新校友管理数据
async function updateAlumniManagementData(id, query) {
  return await AM.where({ id }).update(query);
}

// 更新学生数据
async function updateStudentData(ctx) {
  console.log(ctx.body)
  let { type, data } = ctx.body;
  let { id, ...query } = data;
  console.log(query)


  let modelMap = {
    students: updateStudentBaseData,
    stu_position: updateStudentPositionData,
    sixth_term_experience: updateSixthTermExperienceData,
    development: updateDevelopmentData,
    alumni_management: updateAlumniManagementData,
  };

  let updateFunction = modelMap[type];

  if (!updateFunction) {
    return ctx.status(400).send({ success: false, message: '无效的 type 参数' });
  }

  try {
    let result = await updateFunction(id, query);
    // 如果是插入学生基本信息，继续插入其他相关数据
    if (type === 'students') {
      // 插入学生办公情况
      if (data.position === "否") {
        let temp = { id };
        await deleteStudentPositionData(temp);
      }

      // 插入第六学期实习数据
      if (data.sixth_term_status === "实习") {
        await updateSixthTermExperienceData(data);
      }

      if (data.sixth_term_status === "实训") {
        await updateSixthTermExperienceData(data);
      }

      // 插入学还发展情况
      if (data.graduation_selection === "升学") {
        await updateDevelopmentData(data);
      }

      if (data.graduation_selection === "考公") {
        await updateDevelopmentData(data);
      }

      if (data.graduation_selection === "就业") {
        await updateDevelopmentData(data);
      }

      if (data.graduation_selection === "实习") {
        await updateDevelopmentData(data);
      }

      // 插入学生就业数据
      if (data.graduation_selection == "待业") {
        let temp = { id };
        await deleteDevelopmentData(temp);
      }

    }
    ctx.status(200).send({ success: true, message: '更新成功', result });
  } catch (error) {
    console.error('更新数据失败:', error);
    ctx.status(500).send({ success: false, message: '更新数据失败' });
  }
}


// 导出更新接口
module.exports = {
  updateStudentData,
};
