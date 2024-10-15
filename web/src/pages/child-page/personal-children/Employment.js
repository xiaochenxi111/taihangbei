// src/pages/child-page/personal-children/Employment.js
import React from "react";
import { Button, Form, Row, Col, Space } from "antd";
import ExcelUploader from '../../../components/ExcelUploader';
import ExportExcelTemplate from '../../../components/ExportExcelTemplate';
import CustomTable from '../../../components/CustomTable';
import SearchOther from '../../../components/SearchOther';
import CommonModal from '../../../components/CommonModal';
import useEmployment from '../../../hooks/useEmployment';

const Employment = () => {
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
  } = useEmployment(form);

  const searchFields = [
    { name: "grade", label: "年级", placeholder: "年级" },
    { name: "class", label: "班级", placeholder: "班级" },
    { name: "name", label: "姓名", placeholder: "姓名" },
    { name: "job", label: "求职岗位", placeholder: "求职岗位" },
    { name: "target_region", label: "求职地区", placeholder: "求职地区" }
    // { name: "jobGuidanceTime", label: "简历面试指导时间" ,placeholder:"简历面试指导实践"},
    // { name: "jobGuidanceContent", label: "简历面试指导内容" ,placeholder:"简历面试指导内容"},


  ];

  const modalFields = [
    { name: "name", label: "姓名", rules: [{ required: true, message: "姓名是必填项" }] },
    { name: "id", label: "学号", rules: [{ required: true, message: "学号是必填项" }] },
    { name: "job", label: "求职岗位" },
    { name: "target_region", label: "求职地区" },
    {name: "target",label:"求职目标"},
    // { name: "jobGuidanceTime", label: "简历面试指导时间" ,type:"textarea"},
    // { name: "jobGuidanceContent", label: "简历面试指导内容" ,type:"textarea"},
    { name: "interview_guidance", label: "面试指导",type:"textarea"},
    { name: "follow_records", label: "跟进指导记录",type:"textarea"},
    { name: "process", label: "求职过程",type:"textarea" },
    { name: "job_evaluation", label: "企业与校友评价" ,type:"textarea"},
  ];

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "学号", dataIndex: "id", key: "id" },
    { title: "求职岗位", dataIndex: "job", key: "job" },
    { title: "求职地区", dataIndex: "target_region", key: "target_region" },
    {title:"求职目标",dataIndex:"target",key:"target"},
    // { title: "简历面试指导时间", dataIndex: "jobGuidanceTime", key: "jobGuidanceTime" },
    // { title: "简历面试指导内容", dataIndex: "jobGuidanceContent", key: "jobGuidanceContent" },
    {title: "面试指导",dataIndex: "interview_guidance", key: "interview_guidance"},
    { title: "跟进指导记录", dataIndex: "follow_records", key: "follow_records" },
    { title: "求职过程", dataIndex: "process", key: "process" },
    { title: "企业与校友评价", dataIndex: "job_evaluation", key: "job_evaluation" },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.student_id)}>删除</Button>
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
              <Button type="primary" onClick={handleAdd}>添加就业信息</Button>
            </Col>
            <Col>
              <ExcelUploader columns={columns} setData={updateData} />
            </Col>
            <Col>
              <ExportExcelTemplate columns={columns} data={updateData} />
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
        title="添加就业信息"
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
        title="编辑就业信息"
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
        title="就业信息详情"
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

export default Employment;