const express = require('express');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const xlsx = require('node-xlsx');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // 加载环境变量
const sequelize = require('./sequelize'); // 引入数据库连接
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Students = require('./models/Students');
const StudentPositions = require('./models/StudentPositions');
const SixthTermExperience = require('./models/SixthTermExperience');
const Development = require('./models/Development');
const AlumniManagement = require('./models/AlumniManagement');
const PartnerCompanies = require('./models/PartnerCompanies');
const PartnerHighschools = require('./models/PartnerHighschools');
const Admin = require('./models/Admin');




// 创建 Express 应用
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// 处理全局错误
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('出错误了！');
});




































// 上传解析Excel文件 ok
app.post('/api/uploadExcel', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('没有文件被上传');
    }

    const filePath = path.join(__dirname, req.file.path);

    try {
        // 解析上传的 Excel 文件
        const workbook = xlsx.readFile(filePath);
        const sheetNameList = workbook.SheetNames;
        const worksheet = workbook.Sheets[sheetNameList[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (const row of data) {
            const student = {
              student_id: row.student_id,         // 学生ID
              name: row.name,                     // 姓名
              gender: row.gender,                 // 性别
              grade: row.grade,                   // 年级
              class: row.class,                   // 班级
              counselor: row.counselor,           // 辅导员
              major_direction: row.major_direction, // 专业方向
              contact_info: row.contact_info,     // 联系方式
              origin: row.origin,                 // 籍贯
              high_school: row.high_school,       // 毕业中学
              rank: row.rank,                     // 年级综合排名
              stu_status: row.stu_status,         // 学业情况
              ability_assessment_general: row.ability_assessment_general, // 综合能力评价
              ability_assessment_major: row.ability_assessment_major,     // 专业能力评价
              awards: row.awards,                 // 荣誉奖项
              punishment: row.punishment,         // 处分情况
              position: row.position,             // 在校是否任职
              thesis_adviser: row.thesis_adviser, // 论文导师
              sixth_term_status: row.sixth_term_status, // 第六学期情况
              graduation_selection: row.graduation_selection // 毕业去向
            };

            try {
                // 插入每一行的数据到数据库
                await Students.create(student);
            } catch (error) {
                console.error('插入数据失败:', error);
                return res.status(500).json({ success: false, message: `插入数据失败，学生ID: ${row.student_id}` });
            }
        }

        // 删除上传的文件
        // fs.unlinkSync(file.path);

        // 如果所有数据插入成功
        return res.status(200).json({ success: true, message: 'Excel数据已成功插入数据库' });

    } catch (error) {
        console.error('文件处理失败:', error);
        return res.status(500).json({ success: false, message: '文件处理失败' });
    }
});















































// 修改密码接口 ok
app.post('/api/updatePassword', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const Admin = require('./models/Admin');
    try {

        // 验证当前密码
        const admin = await Admin.findOne({ where: { username } });
        if (!admin || admin.password !== oldPassword) {
            return res.status(401).json({ error: '当前密码不正确' });
        }
        // 更新密码 
        await Admin.update({ password: newPassword }, { where: { username } });
        res.status(200).json({ username, newPassword });
    } catch (error) {
        res.status(500).json({ error: '密码更新失败' });
    }
});








































// 登录账号接口 ok
app.post('/api/managerData', async (req, res) => {
    const { username, password } = req.body;
    const Admin = require('./models/Admin');
    try {
        const admin = await Admin.findOne({ where: { username } });
        if (admin && admin.password === password) {
            res.status(200).json({ admin_id: admin.admin_id, username: admin.username, password: admin.password });
        } else {
            res.status(401).json({ error: '用户名或密码错误' });
        }
    } catch (err) {
        res.status(500).json({ error: '数据库查询失败' });
    }
});

















































// 查询学生数据 ok
app.get('/api/searchData', async (req, res) => {
    const { type, filters } = req.body;
    console.log(req.body);

    // 定义模型关联
    Students.hasOne(StudentPositions, { foreignKey: 'student_id' });
    StudentPositions.belongsTo(Students, { foreignKey: 'student_id' });

    Students.hasOne(SixthTermExperience, { foreignKey: 'student_id' });
    SixthTermExperience.belongsTo(Students, { foreignKey: 'student_id' });

    Students.hasOne(Development, { foreignKey: 'student_id' });
    Development.belongsTo(Students, { foreignKey: 'student_id' });

    try {
        let result;
        switch (type) {
            case 'student':
                try {
                    console.log("Student");

                    // 动态构建 include 条件，过滤掉空的 where 子句
                    const includes = [
                        StudentPositions,
                        SixthTermWork,
                        SixthTermTrain,
                        Internship,
                        Development,
                        PublicWork,
                        JobGuidance,
                        AlumniManagement
                    ].map(model => {
                        const modelName = model.name.toLowerCase();
                        const filterKey = `${modelName.replace(/(?:[^\w\s]|_)/g, '')}_id`;

                        // 仅在有相关过滤条件时才添加 where
                        return {
                            model,
                            ...(filters[filterKey] && { where: { [filterKey]: filters[filterKey] } })
                        };
                    });

                    result = await Students.findAll({
                        include: includes,
                        where: Object.keys(filters).reduce((acc, key) => {
                            if (!key.includes('_')) {
                                acc[key] = filters[key];
                            }
                            return acc;
                        }, {})
                    });

                    console.log(result);
                    console.log("————————————————————————————");
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: '查询失败', details: error.message });
                }
                break;

            case 'partnerCompany':
                result = await PartnerCompanies.findAll({
                    where: { ...filters },
                });
                break;

            case 'partnerHighSchool':
                result = await PartnerHighschools.findAll({
                    where: { ...filters },
                });
                break;

            default:
                return res.status(400).json({ error: '无效的请求参数' });
        }

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: `未找到该 ${type}` });
        }
    } catch (error) {
        res.status(500).json({ error: '查询失败', details: error.message });
        console.error(error)
    }
});





































// 插入学生数据 ok
app.post('/api/insertData', async (req, res) => {
    const { type, ...data } = req.body;
    try {
        // 检查是否已存在
        const existingStudent = await Students.findOne({
            where: {
                [Op.or]: [
                    { name_stuid: data.name_stuid },
                    { student_id: data.student_id }
                ]
            }
        });

        if (existingStudent) {
            return res.status(400).json({ success: false, message: '学生已存在' });
        }

        if (!data.student_id) {
            return res.status(400).json({ success: false, message: 'student_id 不能为空' });
        }


        let result;
        switch (type) {
            case 'student':
                console.log("————————" + res.body)
                result = await insertStudentData(data);
                break;
            case 'highschool':
                result = await insertHighschoolData(data);
                break;
            case 'company':
                result = await insertCompanyData(data);
                break;
            default:
                return res.status(400).json({ success: false, message: '无效的 type 参数' });
        }

        res.status(201).json({ success: true, message: `${type} 数据插入成功`, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '插入数据失败' });
    }
});

async function insertStudentData(data) {
    // 插入学生基本信息
    //     // 检查必填字段是否为空
    // if (!data.student_id) {
    //     return res.status(400).json({ success: false, message: 'student_id 不能为空' });
    // }
    // if (!data.name_stuid) {
    //     return res.status(400).json({ success: false, message: 'name_stuid 不能为空' });
    // }
    // if (!data.name) {
    //     return res.status(400).json({ success: false, message: 'name 不能为空' });
    // }
    // if (!data.class) {
    //     return res.status(400).json({ success: false, message: 'class 不能为空' });
    // }
    // if (!data.counselor) {
    //     return res.status(400).json({ success: false, message: 'counselor 不能为空' });
    // }
    // if (!data.major_direction) {
    //     return res.status(400).json({ success: false, message: 'major_direction 不能为空' });
    // }
    // if (!data.contact_info) {
    //     return res.status(400).json({ success: false, message: 'contact_info 不能为空' });
    // }

    const student = await Students.create({
        name_stuid: data.name_stuid || '',
        student_id: data.student_id || 0,
        name: data.name || '',
        gender: data.gender || '',
        class: data.class || '',
        counselor: data.counselor || '',
        major_direction: data.major_direction || '',
        contact_info: data.contact_info || '',
        origin: data.origin || '',
        high_school: data.high_school || '',
        rank: data.rank || 0,
        stu_status: data.stu_status || '',
        ability_assessment_general: data.ability_assessment_general || '',
        ability_assessment_major: data.ability_assessment_major || '',
        awards: data.awards || '',
        punishment: data.punishment || '',
        position: data.position || false, //在校是否任职（班级、社团、组织）
        thesis_adviser: data.thesis_adviser || '',
        sixth_term_status: data.sixth_term_status || '', //第六学期情况（实习/实训）
        graduation_selection: data.graduation_selection || '' //毕业去向（升学、考公、就业、待业）
    });

    // 插入学生任职情况
    if (data.position) {
        await StudentPositions.create({
            student_id: data.student_id,
            name: data.name,
            class_position: data.class_position,
            organizational_position: data.organizational_position || '',
            club_position: data.club_position || ''
        });
    }

    // 插入第六学期实习数据
    if (data.sixth_term_status == "实习") {
        await SixthTermWork.create({
            student_id: data.student_id,
            name: data.name,
            start_time: data.start_time,
            end_time: data.end_time,
            organization: data.organization,
            position: data.position,
            changes_remarks: data.changes_remarks || ''
        });
    }

    // 插入第六学期实训数据
    if (data.sixth_term_status == "实训") {
        await SixthTermTrain.create({
            student_id: data.id,
            name: data.name,
            project_name: data.project_name,
            role: data.role,
            main_tasks: data.main_tasks,
            award: data.project_award || ''
        });
    }

    // 插入毕业实习数据
    if (data.internship_mentor) {
        await Internship.create({
            student_id: student.id,
            name: student.name,
            internship_mentor: data.internship_mentor,
            organization: data.organization,
            position: data.position,
            grade: data.grade || '',
            evaluation: data.evaluation || '',
            Resume: data.resume || ''
        });
    }

    // 插入学生考公数据
    if (data.graduation_selection == "考公") {
        await PublicWork.create({
            student_id,
            public_exam_type: data.public_exam_type || '',
            exam_status: data.exam_status || ''
        });
    }
    // 插入学生升学数据
    if (data.graduation_selection == "升学") {
        await JobGuidance.create({
            student_id,
            interview_guidance: data.interview_guidance || '',
            job: data.job || '',
            target_region: data.target_region || '',
            target: data.target || '',
            follow_records: data.follow_records || '',
            process: data.process || '',
            evaluation: data.evaluation || ''
        });
    }
    // 插入学生就业数据
    if (data.graduation_selection == "就业") {
        await Development.create({
            student_id,
            graduate_university: data.graduate_university || '',
            graduate_info: data.graduate_info || '',
            alternative_paths: data.alternative_paths || ''
        });
    }

    return student;
}

async function insertHighschoolData(data) {
    return await PartnerHighschools.create({
        name: data.name || '',
        address: data.address || '',
        graduate_count: data.graduate_count || 0,
        contact_person: data.contact_person || '',
        contact_position: data.contact_position || '',
        contact_phone: data.contact_phone || '',
        recruitment_method: data.recruitment_method || '',
        admission_count: data.admission_count || 0
    });
}

async function insertCompanyData(data) {
    return await PartnerCompanies.create({
        name: data.name || '',
        contact_person: data.contact_person || '',
        contact_change: data.contact_change || '',
        company_profile: data.company_profile || '',
        alumni_position: data.alumni_position || '',
        common_positions: data.common_positions || '',
        basic_treatment: data.basic_treatment || '',
        recruitment_type: data.recruitment_type || ''
    });
}







































// 更新学生、企业或高中的数据 ok
app.patch('/api/updateData', async (req, res) => {
    const { type, identifier_id, identifier_name, ...updatedFields } = req.body;

    try {
        let updated;
        switch (type) {
            case 'student':
                updated = await Students.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'studentPosition':
                updated = await StudentPositions.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'semester6Internship':
                updated = await SixthTermWork.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'semester6Training':
                updated = await SixthTermTrain.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'graduationInternship':
                updated = await Internship.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'personalDevelopment':
                updated = await Development.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'alumni':
                updated = await PublicWork.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'jobGuidance':
                updated = await JobGuidance.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'alumniManagement':
                updated = await AlumniManagement.update(updatedFields, {
                    where: { student_id: identifier_id, name: identifier_name },
                    returning: true
                });
                break;
            case 'partnerCompany':
                updated = await PartnerCompanies.update(updatedFields, {
                    where: { company_name: identifier_name },
                    returning: true
                });
                break;
            case 'partnerHighSchool':
                updated = await PartnerHighschools.update(updatedFields, {
                    where: { highschool_name: identifier_name },
                    returning: true
                });
                break;
            default:
                return res.status(400).json({ error: '无效的请求参数' });
        }

        if (updated[0]) {
            res.status(200).json({ success: true, message: `${type} 信息已更新` });
        } else {
            res.status(404).json({ error: `未找到该 ${type}` });
        }
    } catch (error) {
        res.status(500).json({ error: '更新失败', details: error.message });
    }
});





































// 删除学生、企业或高中数据 ok
app.delete('/api/deleteData', async (req, res) => {
    const { identifier_id, identifier_name, type } = req.body; // 假设前端传入 identifier 和 type

    try {
        let deleted;

        switch (type) {
            case 'student':
                // 假设有 9 个学生表，逐一删除
                if (!identifier_id || !identifier_name || !type) {
                    return res.status(400).json({ error: '缺少 identifier 或 type 参数' });
                }
                const studentTables = ['StudentPositions', 'SixthTermWork', 'SixthTermTrain', 'Internship', 'Development', 'PublicWork', 'JobGuidance', 'AlumniManagement', 'Students'];
                for (const table of studentTables) {
                    const model = require(`./models/${table}`);
                    await model.destroy({ where: { student_id: identifier_id, name: identifier_name } });
                }
                deleted = true; // 只要至少删除一张表就返回成功
                break;
            case 'partnerCompany':
                if (!identifier_name || !type) {
                    return res.status(400).json({ error: '缺少 identifier_name 或 type 参数' });
                }
                const Companies = require('./models/PartnerCompanies'); // 企业模型
                deleted = await Companies.destroy({
                    where: { company_name: identifier_name }
                });
                break;
            case 'partnerHighSchool':
                if (!identifier_name || !type) {
                    return res.status(400).json({ error: '缺少 identifier_name 或 type 参数' });
                }
                const Highschools = require('./models/PartnerHighschools'); // 高中模型
                deleted = await Highschools.destroy({
                    where: { highschool_name: identifier_name }
                });
                break;
            default:
                return res.status(400).json({ error: '无效的 type 参数' });
        }

        if (deleted) {
            res.status(200).json({ success: true, message: `${type} 已删除` });
        } else {
            res.status(404).json({ success: false, message: '未找到该记录' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '删除失败' });
    }
});


























// 启动服务
app.listen(9991, () => {
    console.log(`Server is running on port 9991`);
});
