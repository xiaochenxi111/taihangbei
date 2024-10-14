const Students = require('../../model/students');
const SP = require('../../model/stu_position');
const Development = require('../../model/development');
const AM = require('../../model/alumni_management');
const STE = require('../../model/sixth_term_experience');
const db = require('../../lib/initdb');

// 插入学生基本信息
async function insertStudentBaseData(data) {
  return await Students.insert(data);
}

// 插入学生办公情况
async function insertStudentPositionData(data) {
  let positionData = {
    id: data.id,
    name: data.name
  };
  return await SP.insert(positionData);
}

// 插入第六学期实习数据
async function insertSixthTermExperienceData(data) {
  let sixthTermExperienceData = {
    id: data.id,
    name: data.name,
    type: data.type
  };
  return await STE.insert(sixthTermExperienceData);
}

// 插入学生就业数据
async function insertDevelopmentData(data) {
  let developmentData = {
    id: data.id,
    name: data.name,
    career_type: data.career_type
  };
  return await Development.insert(developmentData);
}

// 插入校友管理数据
async function insertAlumniManagementData(data) {
  let alumniManagementData = {
    id: data.id,
    name: data.name
  };
  return await AM.insert(alumniManagementData);
}

// 统一处理存在性检查
async function checkExistence(modelName, fieldName, value) {
  let existing = await db.model(modelName).where({ [fieldName]: value }).select();
  return existing.length > 0;
}

// 插入学生数据
async function insertStudentData(ctx) {
  let { type, data } = ctx.body;

  // 检查必填字段
  if (!data || !data.id || !data.name) {
    return ctx.status(400).send({ success: false, message: '以下字段不能为空:id,name' });
  }

  let modelMap = {
    students: insertStudentBaseData,
    sp: insertStudentPositionData,
    ste: insertSixthTermExperienceData,
    development: insertDevelopmentData,
    am: insertAlumniManagementData,
  };

  let insertFunction = modelMap[type];

  if (!insertFunction) {
    return ctx.status(400).send({ success: false, message: '无效的 type 参数' });
  }

  try {
    console.log('准备插入数据:', data); // 调试信息
    let exists = await checkExistence('students', 'id', data.id);

    if (exists) {
      return ctx.status(400).send({ success: false, message: '学生已存在' });
    }

    // 插入学生基本信息
    let result = await insertFunction(data);

    // 如果是插入学生基本信息，继续插入其他相关数据
    if (type === 'students') {
      // 插入学生办公情况
      if (data.position) {
        await insertStudentPositionData({ id: data.id, name: data.name });
      }

      // 插入第六学期实习数据
      if (data.sixth_term_status === "实习") {
        await insertSixthTermExperienceData({ id: data.id, name: data.name, type: data.sixth_term_status })
      }

      if (data.sixth_term_status === "实训") {
        await insertSixthTermExperienceData({ id: data.id, name: data.name, type: data.sixth_term_status })
      }

      // 插入学还发展情况
      if (data.graduation_selection === "升学") {
        await insertDevelopmentData({ id: data.id, name: data.name, career_type: data.graduation_selection })
      }

      if (data.graduation_selection === "考公") {
        await insertDevelopmentData({ id: data.id, name: data.name, career_type: data.graduation_selection });
      }

      if (data.graduation_selection === "就业") {
        await insertDevelopmentData({ id: data.id, name: data.name, career_type: data.graduation_selection });
      }

      if (data.graduation_selection === "实习") {
        await insertDevelopmentData({ id: data.id, name: data.name, career_type: data.graduation_selection });
      }

      // 插入学生就业数据
      if (data.graduation_selection == "待业") {
        let temp = { id };
        await deleteDevelopmentData(temp);
      }

      await insertAlumniManagementData({ id: data.id, name: data.name })
    }

    ctx.status(200).send({ success: true, message: '数据插入成功', result });
  } catch (error) {
    console.error('插入数据失败:', error);
    ctx.status(500).send({ success: false, message: '插入数据失败' });
  }
}


module.exports = {
  insertStudentData,
};
