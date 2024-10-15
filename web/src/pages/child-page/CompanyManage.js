import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Space, Tooltip } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import SearchOther from '../../components/SearchOther';
import CustomTable from '../../components/CustomTable';
import CommonModal from '../../components/CommonModal';
import useCompanyManage from '../../hooks/useCompanyManage';


const CompanyManage = () => {
  const [form] = Form.useForm();
  const {
    data,
    loading,
    currentRecord,
    addModalVisible,
    editModalVisible,
    detailModalVisible,
    filteredData,
    searchCriteria,
    setSearchCriteria,
    updateData,
    handleSearch,
    handleResetSearch,
    handleAddCompany,
    handleEdit,
    handleDelete,
    handleDetail,
    closeModal,
    handleAddOk,
    handleEditOk,
  } = useCompanyManage(form);
  const truncateText = (text, maxLength = 20) => {
    if (text && text.length > maxLength) {
      return (
        <Tooltip title={text}>
          {text.substring(0, maxLength)}...
        </Tooltip>
      );
    }
    return text;
  };

  const fields = [
    { name: 'name', label: '单位', type: 'text', rules: [{ required: true, message: '请输入单位!' }] },
    { name: 'contact_person', label: '联系人', type: 'text', rules: [{ required: true, message: '请输入联系人!' }] },
    { name: 'contact_change', label: '联系人变更情况', type: 'text' },
    { name: 'company_profile', label: '企业简介', type: 'textarea' },
    { name: 'alumni_position', label: '校友任职情况', type: 'textarea' },
    { name: 'common_positions', label: '常招岗位', type: 'text' },
    { name: 'basic_treatment', label: '基本待遇', type: 'text' },
    { name: 'recruitment_type', label: '招聘类型', type: 'text'}
  ];


  const columns = [
    { title: '单位', dataIndex: 'name', key: 'name' },
    { title: '联系人', dataIndex: 'contact_person', key: 'contact_person' },
    { title: '联系人变更情况', dataIndex: 'contact_change', key: 'contact_change' },
    {
      title: '企业简介',
      dataIndex: 'company_profile',
      key: 'company_profile',
      render: (text) => truncateText(text),
    },
    {
      title: '校友任职情况',
      dataIndex: 'alumni_position',
      key: 'alumni_position',
      render: (text) => truncateText(text),
    },
    { title: '常招岗位', dataIndex: 'common_positions', key: 'common_positions' },
    { title: '基本待遇', dataIndex: 'basic_treatment', key: 'basic_treatment' },
    {
      title: '招聘类型',
      dataIndex: 'recruitment_type',
      key: 'recruitment_type',
    },
    { title: '操作', key: 'action' },
  ];

  

  const searchFields = [
    { name: 'name', placeholder: '单位' }
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* <SearchOther 
        fields={searchFields}
        searchCriteria={searchCriteria} 
        setSearchCriteria={setSearchCriteria} 
        handleSearch={handleSearch} 
        handleResetSearch={handleResetSearch} 
      />
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleAddCompany}>添加公司</Button>
        <ExcelUploader columns={columns} setData={updateData}  />        
        <ExportExcelTemplate columns={columns} />
      </Space> */}
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
              <Button type="primary" onClick={handleAddCompany}>添加合作高中</Button>
            </Col>
            <Col>
              <ExcelUploader columns={columns} setData={updateData} />
            </Col>
            <Col>
              <ExportExcelTemplate columns={columns} />
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
      
      <CommonModal
        title="编辑公司"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleEditOk}
        form={form}
        currentRecord={currentRecord}
        fields={fields}
        width={1000}
      />

      <CommonModal
        title="添加公司"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}  // 添加时传入空对象
        fields={fields}
        width={1000}
      />
      <CommonModal
        title="公司详情"
        visible={detailModalVisible}
        onCancel={closeModal}
        form={form}
        currentRecord={currentRecord}
        fields={fields}
        readOnly={true}
        width={1000}
      />
    </div>
  );
};

export default CompanyManage;