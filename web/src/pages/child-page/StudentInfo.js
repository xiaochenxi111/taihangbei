import React from 'react';
import { Button, Form, Row, Col, Space, message } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useStudentInfo from '../../hooks/useStudentInfo';
import axios from 'axios';

const StudentInfo=()=>{
    const [form] = Form.useForm();
    const {data,updateData,filteredData,loading,searchCriteria,setSearchCriteria,currentRecord,setCurrentRecord,addModalVisible,setAddModalVisible,editModalVisible,setEditModalVisible,detailModalVisible,setDetailModalVisible,handleAdd,handleEdit,handleDelete,handleDetail,closeModal,handleAddOk,handleEditOk,handleSearch,handleResetSearch}=useStudentInfo(form);

    const tablefields = [
        {name:'name',label:'姓名',placeholder:'姓名',rules:[{required:true,message:'姓名是必填项'}]},
        {name:'gender',label:'性别',placeholder:'性别'},
        {name:'id',label:'学号',placeholder:'学号',rules:[{required:true,message:'学号是必填项'}]},
        {name:'grade',label:'年级',placeholder:'年级'},
        {name:'class',label:'班级',placeholder:'班级'},
        {name:'counselor',label:'辅导员',placeholder:'辅导员'},
        {name:'major_direction',label:'专业方向',placeholder:'专业方向'},
        {name:'contact_info',label:'联系方式',placeholder:'联系方式'},
        {name:'origin',label:'籍贯',placeholder:'籍贯'},
        {name:'high_school',label:'毕业中学',placeholder:'毕业中学'},
        {name:'rank',label:'年级综合排名',placeholder:'年级综合排名'},
        {name:'sixth_term_status',label:'第六学期状态',placeholder:'第六学期状态',type:'select',options:[{label:'实习',value:'实习'},{label:'实训',value:'实训'}]},
        {name:'graduation_selection',label:'毕业去向',placeholder:'毕业去向',type:'select',options:[{label:'升学',value:'升学'},{label:'考公',value:'考公'},{label:'实习',value:'实习'},{label:'就业',value:'就业'}]},
        {name:'position',label:'职位情况',placeholder:'职位情况',type:'select',options:[{label:'是',value:'是'},{label:'否',value:'否'}]}
      ];
      const editFields=[
        {name:'name',label:'姓名',placeholder:'姓名',rules:[{required:true,message:'姓名是必填项'}]},
        {name:'gender',label:'性别',placeholder:'性别'},
        {name:'id',label:'学号',placeholder:'学号',rules:[{required:true,message:'学号是必填项'}]},
        {name:'grade',label:'年级',placeholder:'年级'},
        {name:'class',label:'班级',placeholder:'班级'},
        {name:'counselor',label:'辅导员',placeholder:'辅导员'},
        {name:'major_direction',label:'专业方向',placeholder:'专业方向'},
        {name:'contact_info',label:'联系方式',placeholder:'联系方式'},
        {name:'origin',label:'籍贯',placeholder:'籍贯'},
        {name:'high_school',label:'毕业中学',placeholder:'毕业中学'},
        {name:'rank',label:'年级综合排名',placeholder:'年级综合排名'}
      ]
      const searchFields=[
        {name:'name',label:'姓名',placeholder:'姓名'},
        {name:'grade',label:'年级',placeholder:'年级'},
        {name:'class',label:'班级',placeholder:'班级'},
        {name:'counselor',label:'辅导员',placeholder:'辅导员'},
        {name:'major_direction',label:'专业方向',placeholder:'专业方向'},
        {name:'origin',label:'籍贯',placeholder:'籍贯'},
        {name:'high_school',label:'毕业中学',placeholder:'毕业中学'}
      ];
      const columns = [
        {title: '姓名',dataIndex: 'name',key: 'name'},
        {title: '性别',dataIndex: 'gender',key: 'gender'},
        {title: '学号',dataIndex: 'id',key: 'id'},
        {title: '年级',dataIndex: 'grade',key: 'grade'},
        {title: '班级',dataIndex: 'class',key: 'class'},
        {title: '辅导员',dataIndex: 'counselor',key: 'counselor'},
        {title: '专业方向',dataIndex: 'major_direction',key: 'major_direction'},
        {title: '联系方式',dataIndex: 'contact_info',key: 'contact_info'},
        {title: '籍贯',dataIndex: 'origin',key: 'origin'},
        {title: '毕业中学',dataIndex: 'high_school',key: 'high_school'},
        {title: '年级综合排名',dataIndex: 'rank',key: 'rank'},
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
                    <Button type="primary" onClick={handleAdd}>添加学生信息</Button>
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
                title="添加学生信息"
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
                title="编辑学生信息"
                visible={editModalVisible}
                onCancel={closeModal}
                onOk={handleEditOk}
                form={form}
                currentRecord={currentRecord}
                fields={editFields}
                width={1000}
            />

            {/* 详情模态框 */}
            <CommonModal
                title="学生信息详情"
                visible={detailModalVisible}
                onCancel={closeModal}
                form={form}
                currentRecord={currentRecord}
                fields={tablefields}
                readOnly={true}
                width={1000}
            />
        </div>
    );
}

export default StudentInfo;
