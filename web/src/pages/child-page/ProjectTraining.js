import React, { useState } from 'react';
import { Button, Form, Row, Col, Space,Modal,Input } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useProjectTraining     from '../../hooks/useProjectTraining';

const { TextArea } = Input;
const ProjectTraining=()=>{
    const [form] = Form.useForm();
    const {data,updateData,filteredData,loading,searchCriteria,setSearchCriteria,currentRecord,setCurrentRecord,addModalVisible,setAddModalVisible,editModalVisible,setEditModalVisible,detailModalVisible,setDetailModalVisible,handleAdd,handleEdit,handleDelete,handleDetail,closeModal,handleAddOk,handleEditOk,handleSearch,handleResetSearch}=useProjectTraining(form);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState('');
    const [awardModalVisible, setAwardModalVisible] = useState(false);
    const [currentAward, setCurrentAward] = useState('');

    const tablefields = [
        {name:'name',label:'姓名',placeholder:'姓名',rules:[{required:true,message:'姓名是必填项'}]},
        {name:'id',label:'学号',placeholder:'学号',rules:[{required:true,message:'学号是必填项'}]},
        {name:'start_time',label:'开始时间',placeholder:'开始时间'},
        {name:'end_time',label:'结束时间',placeholder:'结束时间'},
        {name:'organization',label:'项目名称',placeholder:'项目名称'},
        {name:'position',label:'担任角色',placeholder:'担任角色'},
        {name:'main_tasks',label:'主要任务',placeholder:'主要任务',type:'textarea'},
        {name:'award',label:'获奖情况',placeholder:'获奖情况',type:'textarea'},
    ];
    const searchFields = [
        {name:'name',label:'姓名',placeholder:'姓名'},
        {name:'organization',label:'项目名称',placeholder:'项目名称'}
    ];

    const columns = [
        {title:'姓名',dataIndex:'name',key:'name'},
        {title:'学号',dataIndex:'id',key:'id'},
        {title:'开始时间',dataIndex:'start_time',key:'start_time'},
        {title:'结束时间',dataIndex:'end_time',key:'end_time'},
        {title:'项目名称',dataIndex:'organization',key:'organization'},
        {title:'担任角色',dataIndex:'position',key:'position'},
        {title:'主要任务',dataIndex:'main_tasks',key:'main_tasks',
            render:(text, record) => (
                <Button
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTask(text || '无主要任务');
                        setTaskModalVisible(true);
                    }}
                >
                    查看详情
                </Button>
            )
        },  
        {title:'获奖情况',dataIndex:'award',key:'award',
            render:(text, record) => (
                <Button
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentAward(text || '无获奖情况');
                        setAwardModalVisible(true);
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
                    <Button type="primary" onClick={handleAdd}>添加项目实训信息</Button>
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
                title="添加项目实训信息"
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
                title="编辑项目实训信息"
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
                title="项目实训信息详情"
                visible={detailModalVisible}
                onCancel={closeModal}
                form={form}
                currentRecord={currentRecord}
                fields={tablefields}
                readOnly={true}
                width={1000}
            />
             <Modal
                title="主要任务详情"
                open={taskModalVisible}
                onCancel={() => setTaskModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={currentTask}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                />
            </Modal>

            <Modal
                title="获奖情况详情"
                open={awardModalVisible}
                onCancel={() => setAwardModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={currentAward}
                    autoSize={{ minRows: 3, maxRows: 5 }}       
                    readOnly
                />
            </Modal>
        </div>
    );

}
export default ProjectTraining;
