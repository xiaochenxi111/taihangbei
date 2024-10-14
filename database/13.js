app.post('/api/uploadExcel', async (req, res) => {
    console.log(req.files)
    // console.log(req.files.file)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, message: '没有上传文件' });
    }

    const file = req.files.file;

    // 解析 Excel 文件
    const workbook = xlsx.parse(file.buffer);
    const sheetNames = workbook.SheetNames;
    console.log(sheetNames);

    try {
        for (const sheetName of sheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);

            for (const row of data) {
                console.log("111")
                // 插入学生基本信息
                const student = await Students.create({
                    name_stuid: row.name_stuid || '',
                    student_id: row.student_id || 0,
                    name: row.name || '',
                    gender: row.gender || '',
                    class: row.class || '',
                    counselor: row.counselor || '',
                    major_direction: row.major_direction || '',
                    contact_info: row.contact_info || '',
                    origin: row.origin || '',
                    high_school: row.high_school || '',
                    rank: row.rank || 0,
                    stu_status: row.stu_status || '',
                    ability_assessment_general: row.ability_assessment_general || '',
                    ability_assessment_major: row.ability_assessment_major || '',
                    awards: row.awards || '',
                    punishment: row.punishment || '',
                    position: row.position || false,
                    thesis_adviser: row.thesis_adviser || '',
                    sixth_term_status: row.sixth_term_status || '',
                    graduation_selection: row.graduation_selection || ''
                });

                // 插入学生任职情况
                if (row.position) {
                    await StuPosition.create({
                        student_id: student.student_id,
                        name: student.name,
                        class_position: row.class_position || '',
                        organizational_position: row.organizational_position || '',
                        club_position: row.club_position || ''
                    });
                }

                // 插入第六学期实习数据
                if (row.start_time && row.end_time) {
                    await SixthTermWork.create({
                        student_id: student.student_id,
                        name: student.name,
                        start_time: row.start_time,
                        end_time: row.end_time,
                        organization: row.organization || '',
                        position: row.position || '',
                        changes_remarks: row.changes_remarks || ''
                    });
                }

                // 插入第六学期实训数据
                if (row.project_name) {
                    await SixthTermTrain.create({
                        student_id: student.student_id,
                        name: student.name,
                        project_name: row.project_name || '',
                        role: row.role || '',
                        main_tasks: row.main_tasks || '',
                        award: row.project_award || ''
                    });
                }

                // 插入毕业实习数据
                if (row.internship_mentor) {
                    await Internship.create({
                        student_id: student.student_id,
                        name: student.name,
                        internship_mentor: row.internship_mentor || '',
                        organization: row.internship_organization || '',
                        position: row.position || '',
                        grade: row.grade || '',
                        evaluation: row.evaluation || '',
                        Resume: row.resume || ''
                    });
                }

                // 插入升学数据
                if (row.graduate_university) {
                    await Development.create({
                        student_id: student.student_id,
                        name: student.name,
                        graduate_university: row.graduate_university || '',
                        graduate_info: row.graduate_info || '',
                        alternative_paths: row.alternative_paths || ''
                    });
                }

                // 插入考公数据
                if (row.public_exam_type) {
                    await PublicWork.create({
                        student_id: student.student_id,
                        name: student.name,
                        public_exam_type: row.public_exam_type || '',
                        exam_status: row.exam_status || ''
                    });
                }

                // 插入就业数据
                if (row.job) {
                    await JobGuidance.create({
                        student_id: student.student_id,
                        name: student.name,
                        interview_guidance: row.interview_guidance || '',
                        job: row.job || '',
                        target_region: row.target_region || '',
                        target: row.target || '',
                        follow_records: row.follow_records || '',
                        process: row.process || '',
                        evaluation: row.evaluation || ''
                    });
                }

                // 插入校友管理数据
                if (row.alumni_name) {
                    await AlumniManagement.create({
                        student_id: student.student_id,
                        name: row.alumni_name || '',
                        graduation_destination: row.graduation_destination || '',
                        p_employer: row.p_employer || '',
                        changes: row.changes || '',
                        performance: row.performance || '',
                        participationIn_employment: row.participationIn_employment || '',
                        guidance_content: row.guidance_content || '',
                        feedback: row.feedback || ''
                    });
                }

                // 插入合作企业数据
                if (row.company_name) {
                    await PartnerCompanies.create({
                        name: row.company_name || '',
                        contact_person: row.contact_person || '',
                        contact_change: row.contact_change || '',
                        company_profile: row.company_profile || '',
                        alumni_position: row.alumni_position || '',
                        common_positions: row.common_positions || '',
                        basic_treatment: row.basic_treatment || '',
                        recruitment_type: row.recruitment_type || ''
                    });
                }

                // 插入合作高中数据
                if (row.highschool_name) {
                    await PartnerHighschools.create({
                        name: row.highschool_name || '',
                        address: row.highschool_address || '',
                        graduate_count: row.highschool_graduate_count || 0,
                        contact_person: row.highschool_contact_person || '',
                        contact_position: row.highschool_contact_position || '',
                        contact_phone: row.highschool_contact_phone || '',
                        recruitment_method: row.highschool_recruitment_method || '',
                        admission_count: row.highschool_admission_count || 0
                    });
                }
            }
        }

        res.status(201).json({ success: true, message: '数据插入成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '插入数据失败' });
    }
});