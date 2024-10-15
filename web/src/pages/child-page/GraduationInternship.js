import React, { useState } from 'react';
import { Button, Form, Row, Col, Space,Modal,Input } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useGraduationInternship     from '../../hooks/useGraduationInternship';

const { TextArea } = Input;
const GraduationInternship=()=>{
    const [form] = Form.useForm();
    const {data,updateData,filteredData,loading,searchCriteria,setSearchCriteria,currentRecord,setCurrentRecord,addModalVisible,setAddModalVisible,editModalVisible,setEditModalVisible,detailModalVisible,setDetailModalVisible,handleAdd,handleEdit,handleDelete,handleDetail,closeModal,handleAddOk,handleEditOk,handleSearch,handleResetSearch}=useGraduationInternship(form);
    const [resumeModalVisible, setResumeModalVisible] = useState(false);
    const [currentResume, setCurrentResume] = useState('');
    const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
    const [currentEvaluation, setCurrentEvaluation] = useState('');

    const tablefields = [
        {name:'name',label:'姓名',placeholder:'姓名',rules:[{required:true,message:'姓名是必填项'}]},
        {name:'id',label:'学号',placeholder:'学号',rules:[{required:true,message:'学号是必填项'}]},
        {name:'organization',label:'毕业实习单位',placeholder:'毕业实习单位'},
        {name:'position',label:'毕业实习岗位',placeholder:'毕业实习岗位'},
        {name:'internship_mentor',label:'实习导师',placeholder:'实习导师'},
        {name:'grade',label:'实习成绩',placeholder:'实习成绩'},
        {name:'evaluation',label:'实习评价',placeholder:'实习评价',type:'textarea'},
        {name:'resume',label:'个人简历',placeholder:'个人简历',type:'textarea'},
    ];
    const searchFields = [
        {name:'name',label:'姓名',placeholder:'姓名'},
        {name:'organization',label:'毕业实习单位',placeholder:'毕业实习单位'},
        {name:'position',label:'毕业实习岗位',placeholder:'毕业实习岗位'},
    ];

    const columns = [
        {title:'姓名',dataIndex:'name',key:'name'},
        {title:'学号',dataIndex:'id',key:'id'},
        {title:'毕业实习单位',dataIndex:'organization',key:'organization'},
        {title:'毕业实习岗位',dataIndex:'position',key:'position'},
        {title:'实习导师',dataIndex:'internship_mentor',key:'internship_mentor'},
        {title:'实习成绩',dataIndex:'grade',key:'grade'},
        {title:'实习评价',dataIndex:'evaluation',key:'evaluation',
            render:(text, record) => (
                <Button
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentEvaluation(text || '无实习评价');
                        setEvaluationModalVisible(true);
                    }}
                >
                    查看详情
                </Button>
            )
        },  
        {title:'个人简历',dataIndex:'resume',key:'resume',
            render:(text, record) => (
                <Button
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentResume(text || '无个人简历');
                        setResumeModalVisible(true);
                    }}
                >
                    查看详情
                </Button>
            )
        },  
        { title: '操作', key: 'action', render: (_, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
              <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
              <Button type="link" onClick={() => handleDetail(record)}>查看详情</Button>
            </Space>
        )}
    ];
    return(
        <div style={{ padding: 24 }}>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={16}>
                <SearchOther
                    fields={searchFields}
                    searchCriteria={searchCriteria}
                    setSearchCriteria={setSearchCriteria}
                    handleSearch={handleSearch}
                    handleResetSearch={handleResetSearch}
                />
                </Col>
                <Col span={8} style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                {/* 按钮区域 */}
                <Row style={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <Col>
                    <Button type="primary" onClick={handleAdd}>添加毕业实习信息</Button>
                    </Col>
                    <Col>
                    <ExcelUploader columns={columns} setData={updateData} />
                    </Col>
                    <Col>
                    <ExportExcelTemplate columns={columns} setData={updateData} />
                    </Col>
                </Row>
                </Col>
            </Row>

            <CustomTable
                loading={loading}
                dataSource={filteredData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDetail={handleDetail}
            />

            {/* 添加模态框 */}
            <CommonModal
                title="添加毕业实习信息"
                visible={addModalVisible}
                onCancel={closeModal}
                onOk={handleAddOk}
                form={form}
                currentRecord={{}}
                fields={tablefields}
                width={1000}
            />

            {/* 编辑模态框 */}
            <CommonModal
                title="编辑毕业实习信息"
                visible={editModalVisible}
                onCancel={closeModal}
                onOk={handleEditOk}
                form={form}
                currentRecord={currentRecord}
                fields={tablefields}
                width={1000}
            />

            {/* 详情模态框 */}
            <CommonModal
                title="毕业实习信息详情"
                visible={detailModalVisible}
                onCancel={closeModal}
                form={form}
                currentRecord={currentRecord}
                fields={tablefields}
                readOnly={true}
                width={1000}
            />
             <Modal
                title="实习评价详情"
                open={evaluationModalVisible}
                onCancel={() => setEvaluationModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={currentEvaluation}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                />
            </Modal>

            <Modal
                title="个人简历详情"
                open={resumeModalVisible}
                onCancel={() => setResumeModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={currentResume}
                    autoSize={{ minRows: 3, maxRows: 5 }}       
                    readOnly
                />
            </Modal>
        </div>
    );

}
export default GraduationInternship;
