import React, { useState } from 'react';
import { Button, Form, Row, Col, Space,Modal,Input } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useActivityManage     from '../../hooks/useActivityManage';

const { TextArea } = Input;
const ActivityManage=()=>{
    const [form] = Form.useForm();
    const {data,updateData,filteredData,loading,searchCriteria,setSearchCriteria,currentRecord,setCurrentRecord,addModalVisible,setAddModalVisible,editModalVisible,setEditModalVisible,detailModalVisible,setDetailModalVisible,handleAdd,handleEdit,handleDelete,handleDetail,closeModal,handleAddOk,handleEditOk,handleSearch,handleResetSearch}=useActivityManage(form);
    const [activityModalVisible, setActivityModalVisible] = useState(false);
    const [currentActivity, setCurrentActivity] = useState('');

    const tablefields = [
        {name:'institution',label:'活动发布单位',placeholder:'活动发布单位'},
        {name:'id',label:'单位代号',placeholder:'单位代号',rules:[{required:true,message:'单位代号是必填项'}]},
        {name:'start_time',label:'活动开始时间',placeholder:'活动开始时间'},
        {name:'end_time',label:'活动结束时间',placeholder:'活动结束时间'},
        {name:'activity_name',label:'活动名称',placeholder:'活动名称'},
        {name:'activity_content',label:'活动内容',placeholder:'活动内容',type:'textarea'}
    ];
    const searchFields = [
        {name:'activity_name',label:'活动名称',placeholder:'活动名称'},
        {name:'institution',label:'活动发布单位',placeholder:'活动发布单位'}
    ];

    const columns = [
        {title:'活动发布单位',dataIndex:'institution',key:'institution'},
        {title:'单位代号',dataIndex:'id',key:'id'},
        {title:'活动开始时间',dataIndex:'start_time',key:'start_time'},
        {title:'活动结束时间',dataIndex:'end_time',key:'end_time'},
        {title:'活动名称',dataIndex:'activity_name',key:'activity_name'},
        {title:'活动内容',dataIndex:'activity_content',key:'activity_content',
            render:(text, record) => (
                <Button
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentActivity(text || '无活动内容');
                        setActivityModalVisible(true);
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
                    <Button type="primary" onClick={handleAdd}>添加校园活动信息</Button>
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
                title="添加校园活动信息"
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
                title="编辑校园活动信息"
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
                title="校园活动信息详情"
                visible={detailModalVisible}
                onCancel={closeModal}
                form={form}
                currentRecord={currentRecord}
                fields={tablefields}
                readOnly={true}
                width={1000}
            />
             <Modal
                title="活动内容详情"
                open={activityModalVisible}
                onCancel={() => setActivityModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={currentActivity}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                />
            </Modal>
        </div>
    );

}
export default ActivityManage;
