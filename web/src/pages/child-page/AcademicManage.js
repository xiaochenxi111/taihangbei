// src/pages/child-page/AcademicManage.js
import React from "react";
import { Button, Form, Row, Col, Space } from "antd";
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useAcademicManage from '../../hooks/useAcademicManage';

const AcademicManage = () => {
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
  } = useAcademicManage(form);

  const searchFields = [
    { name: "grade", label: "年级", placeholder: "年级" },
    { name: "class", label: "班级", placeholder: "班级" },
    { name: "counselor", label: "辅导员", placeholder: "辅导员" },
    { name: "major", label: "专业方向", placeholder: "专业方向" },
    { name: "name", label: "姓名", placeholder: "姓名" },
    { name: "student_id", label: "学号", placeholder: "学号" },
    { name: "class_position", label: "班级任职", placeholder: "班级任职" },
    { name: "organizational_position", label: "组织任职", placeholder: "组织任职" },
    { name: "club_position", label: "社团任职", placeholder: "社团任职" },
    { name: "stu_status", label: "特殊类型", placeholder: "特殊类型" },
    { name: "ability_assessment_general", label: "综合能力", placeholder: "综合能力" },
    { name: "ability_assessment_major", label: "专业能力", placeholder: "专业能力" },
    { name: "awards", label: "荣誉", placeholder: "荣誉" },
    { name: "publishment", label: "处分", placeholder: "处分" },
  ];

  const modalFields = [
    { name: "name", label: "姓名", rules: [{ required: true, message: "姓名是必填项" }] },
    { name: "student_id", label: "学号", rules: [{ required: true, message: "学号是必填项" }] },
    { name: "class_position", label: "班级任职" },
    { name: "organizational_position", label: "组织任职" },
    { name: "club_position", label: "社团任职" },
    { name: "stu_status", label: "特殊类型" },
    { name: "ability_assessment_general", type: "textarea", label: "综合能力" },
    { name: "ability_assessment_major", type: "textarea", label: "专业能力" },
    { name: "awards", label: "荣誉" },
    { name: "publishment", label: "处分" },
  ];

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "学号", dataIndex: "student_id", key: "student_id" },
    { title: "班级任职", dataIndex: "class_position", key: "class_position" },
    { title: "组织任职", dataIndex: "organizational_position", key: "organizational_position" },
    { title: "社团任职", dataIndex: "club_position", key: "club_position" },
    { title: "特殊类型", dataIndex: "stu_status", key: "stu_status" },
    { title: "综合能力", dataIndex: "ability_assessment_general", key: "ability_assessment_general" },
    { title: "专业能力", dataIndex: "ability_assessment_major", key: "ability_assessment_major" },
    { title: "荣誉", dataIndex: "awards", key: "awards" },
    { title: "处分", dataIndex: "publishment", key: "publishment" },
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
              <Button type="primary" onClick={handleAdd}>添加学情信息</Button>
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
        title="添加学情信息"
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
        title="编辑学情信息"
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
        title="学情信息详情"
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

export default AcademicManage;
