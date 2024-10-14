const Students = require('../../model/students');
const SP = require('../../model/stu_position');
const Development = require('../../model/development');
const AM = require('../../model/alumni_management');
const STE = require('../../model/sixth_term_experience');

// 查询学生基本信息
async function getStudentBaseData(query) {
  return await Students.where(query).select();
}

// 查询学生办公情况
async function getStudentPositionData(query) {
  return await SP.where(query).select();
}

// 查询学生就业数据
async function getDevelopmentData(query) {
  return await Development.where(query).select();
}

// 查询第六学期实习数据
async function getSixthTermExperienceData(query) {
  return await STE.where(query).select();
}

// 查询校友管理数据
async function getAlumniManagementData(query) {
  return await AM.where(query).select();
}

// 主查询函数
async function getStudentData(ctx) {
  let { type, ...query } = ctx.query;

  let modelMap = {
    students: getStudentBaseData,
    stu_position: getStudentPositionData,
    sixth_term_experience: getSixthTermExperienceData,
    development: getDevelopmentData,
    alumni_management: getAlumniManagementData,
  };

  let queryFunction = modelMap[type];

  if (!queryFunction) {
    return ctx.status(400).send({ success: false, message: '无效的 type 参数' });
  }

  try {
    let result = await queryFunction(query);

    // Combine the results if needed
    // For example, if you want to combine base data with position data
    let completeUserInfo = {};
    if (type === 'students') {
      let positionData = await getStudentPositionData(query);
      completeUserInfo = {
        ...result[0], // assuming result is an array and you want the first element
        position: positionData,
      };
    } else {
      completeUserInfo = result;
    }

    ctx.status(200).send({ success: true, message: '查询成功', result: completeUserInfo });
  } catch (error) {
    console.error('查询数据失败:', error);
    ctx.status(500).send({ success: false, message: '查询数据失败' });
  }
}


// 导出查询接口
module.exports = {
  getStudentData,
};