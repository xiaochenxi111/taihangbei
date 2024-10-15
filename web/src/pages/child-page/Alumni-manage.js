// src/pages/child-page/AlumniManage.js
import React from "react";
import { Button, Form, Row, Col, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import SearchOther from '../../components/SearchOther';
import CustomTable from '../../components/CustomTable'; // 使用 CustomTable 组件
import CommonModal from '../../components/CommonModal';
import useAlumniManage from '../../hooks/useAlumniManage';

const AlumniManage = () => {
  const [form] = Form.useForm();
  const {
    
    updateData,
    filteredData,
    searchCriteria,
    setSearchCriteria,
    currentRecord,
    addModalVisible,
    editModalVisible,
    detailModalVisible,
    handleAdd,
    handleAddOk,
    handleEdit,
    handleEditOk,
    handleDelete,
    handleDetail,
    closeModal,
    handleSearch,
    handleResetSearch,
  } = useAlumniManage(form);

  // searchFields

    const searchFields = [
    { name: "grade", label: "年级", placeholder: "年级" },
    { name: "class", label: "班级", placeholder: "班级" },
    { name: "name", label: "姓名", placeholder: "姓名" },
    { name: "graduation_direction", label: "毕业去向", placeholder: "毕业去向" },
    { name: "postgraduate_employment", label: "研究生毕业就业单位", placeholder: "研究生毕业就业单位" }
  ];


  const modalFields = [
    { name: "name", label: "姓名", rules: [{ required: true, message: "姓名是必填项" }] },
    { name: "student_id", label: "学号", rules: [{ required: true, message: "学号是必填项" }] },
    { name: "graduation_direction", label: "毕业去向", rules: [{ required: true, message: "毕业去向是必填项" }] },
    { name: "postgraduate_employment", label: "研究生毕业就业单位" },
    { name: "employment_change", label: "就业变化情况",type:"textarea" },
    { name: "work_performance", label: "工作业绩",type:"textarea" },
    { name: "employment_activity", label: "参与就业活动情况",type:"textarea" },
    { name: "employment_guidance", label: "就业指导内容",type:"textarea" },
    { name: "industry_feedback", label: "行业信息反馈",type:"textarea" },
  ];

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "学号", dataIndex: "student_id", key: "student_id" },
    { title: "毕业去向", dataIndex: "graduation_direction", key: "graduation_direction" },
    { title: "研究生毕业就业单位", dataIndex: "postgraduate_employment", key: "postgraduate_employment" },
    { title: "就业变化情况", dataIndex: "employment_change", key: "employment_change" },
    { title: "工作业绩", dataIndex: "work_performance", key: "work_performance" },
    { title: "参与就业活动情况", dataIndex: "employment_activity", key: "employment_activity" },
    { title: "就业指导内容", dataIndex: "employment_guidance", key: "employment_guidance" },
    { title: "行业信息反馈", dataIndex: "industry_feedback", key: "industry_feedback" },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
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
        <Col span={8} style={{ textAlign: "right" }}>
          <Space>
            <Button type="primary" onClick={handleAdd}>添加校友信息</Button>
            
            <ExcelUploader setData={updateData} columns={columns} />
            <ExportExcelTemplate columns={columns} setData={updateData}/>
          </Space>
        </Col>
      </Row>

      <CustomTable
        dataSource={filteredData}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDetail={handleDetail}
      />

      {/* 添加模态框 */}
      <CommonModal
        title="添加校友信息"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}
        fields={modalFields}
        width={800}
      />

      {/* 编辑模态框 */}
      <CommonModal
        title="编辑校友信息"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleEditOk}
        form={form}
        currentRecord={currentRecord}
        fields={modalFields}
        width={800}
      />

      {/* 详情模态框 */}
      <CommonModal
        title="查看校友信息"
        visible={detailModalVisible}
        onCancel={closeModal}
        form={form}
        currentRecord={currentRecord} 
        readOnly={true}
        fields={modalFields}
        width={800}
      />
    </div>

  );
};

export default AlumniManage;