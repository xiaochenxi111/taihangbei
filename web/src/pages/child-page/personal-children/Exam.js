// src/pages/child-page/personal-children/Exam.js

import React from "react";
import { Button, Form, Row, Col, Space } from "antd";
import ExcelUploader from '../../../components/ExcelUploader';
import ExportExcelTemplate from '../../../components/ExportExcelTemplate';
import CustomTable from '../../../components/CustomTable';
import SearchOther from '../../../components/SearchOther';
import CommonModal from '../../../components/CommonModal';
import useExam from '../../../hooks/useExam';


const Exam = () => {
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
  } = useExam(form);

  const searchFields = [
    { name: "grade", label: "年级", placeholder: "年级" },
    { name: "class", label: "班级", placeholder: "班级" },
    { name: "name", label: "姓名", placeholder: "姓名" },
    { name: "public_exam_type", label: "报考类型", placeholder: "报考类型" },
    { name: "exam_status", label: "初复试通过情况", placeholder: "通过情况" },
  ];

  const modalFields = [
    { name: "name", label: "姓名", rules: [{ required: true, message: "姓名是必填项" }] },
    { name: "id", label: "学号", rules: [{ required: true, message: "学号是必填项" }] },
    { name: "public_exam_type", label: "报考类型", rules: [{ required: true, message: "报考类型是必填项" }] },
    { name: "exam_status", label: "初复试通过情况",type:"textarea" },    
  ];

  const columns = [
    
      { title: "姓名", dataIndex: "name", key: "name" },
      { title: "学号", dataIndex: "id", key: "id" },
      { title: "报考类型", dataIndex: "public_exam_type", key: "public_exam_type" },
      { title: "初复试通过情况", dataIndex: "exam_status", key: "exam_status" },
      {
        title: "操作",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
            <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
            <Button type="link" onClick={() => handleDetail(record)}>查看详情</Button>
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
        <Col span={8} style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Row style={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
            <Col>
              <Button type="primary" onClick={handleAdd}>添加考公信息</Button>
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
        dataSource={filteredData}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDetail={handleDetail}
      />

      {/* 添加模态框 */}
      <CommonModal
        title="添加考公信息"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}
        fields={modalFields}
        width={1000}
      />

      {/* 编辑模态框 */}
      <CommonModal
        title="编辑考公信息"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleEditOk}
        form={form}
        currentRecord={currentRecord}
        fields={modalFields}
        width={1000}
      />

      {/* 详情模态框 */}
      <CommonModal
        title="考公信息详情"
        visible={detailModalVisible}
        onCancel={closeModal}
        form={form}
        currentRecord={currentRecord}
        fields={modalFields}
        readOnly={true}
        width={1000}
      />
    </div>
  );
};

export default Exam;