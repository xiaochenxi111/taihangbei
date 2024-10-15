import React from 'react';
import { Button, Form, Row, Col, Space } from 'antd';
import ExcelUploader from '../../components/ExcelUploader';
import ExportExcelTemplate from '../../components/ExportExcelTemplate';
import CustomTable from '../../components/CustomTable';
import SearchOther from '../../components/SearchOther';
import CommonModal from '../../components/CommonModal';
import useHighschoolManage from '../../hooks/useHighschoolManage'; // 引入自定义 Hook

const HighschoolManage = () => {
  const [form] = Form.useForm();
  const {
    data,
    //setData,
    updateData,
    loading,
    searchCriteria,
    setSearchCriteria,
    currentRecord,
    setCurrentRecord,
    addModalVisible,
    setAddModalVisible,
    editModalVisible,
    setEditModalVisible,
    detailModalVisible,
    setDetailModalVisible,
    handleAddSchool,
    handleEdit,
    handleDelete,
    handleDetail,
    closeModal,
    handleAddOk,
    handleEditOk,
    handleSearch,
    handleResetSearch,
    filteredData
  } = useHighschoolManage(form); // 使用自定义 Hook

  const searchFields = [
    { name: 'name', label: '合作高中名称', placeholder: '合作高中名称', type: 'text' }
  ];

  const fields = [
    { name: 'name', label: '合作高中名称', placeholder: '合作高中名称', type: 'text' },
    { name: 'address', label: '地址', placeholder: '地址', type: 'text' },
    { name: 'graduate_count', label: '毕业生人数', placeholder: '毕业生人数', type: 'number' },
    { name: 'contact_person', label: '联系人', placeholder: '联系人', type: 'text' },
    { name: 'contact_position', label: '职务', placeholder: '职务', type: 'text' },
    { name: 'contact_phone', label: '联系方式', placeholder: '联系方式', type: 'text' },
    { name:'recruitment_method', label: '宣传方式', placeholder: '宣传方式', type: 'text' },
    { name: 'admission_count', label: '近三年被录取学生人数', placeholder: '近三年被录取学生人数', type: 'number' }
  ];

  const columns = [
    { title: '合作高中名称', dataIndex: 'name', key: 'name' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '毕业生人数', dataIndex: 'graduate_count', key: 'graduate_count' },
    { title: '联系人', dataIndex: 'contact_person', key: 'contact_person' },
    { title: '职务', dataIndex: 'contact_position', key: 'contact_position' },
    { title: '联系方式', dataIndex: 'contact_phone', key: 'contact_phone' },
    { title: '宣传方式', dataIndex: 'recruitment_method', key: 'recruitment_method' },
    { title: '近三年被录取学生人数', dataIndex: 'admission_count', key: 'admission_count' },
    { title: '操作', key: 'action', render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
        <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        <Button type="link" onClick={() => handleDetail(record)}>查看详情</Button>
      </Space>
    )}
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
          {/* 按钮区域 */}
          <Row style={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
            <Col>
              <Button type="primary" onClick={handleAddSchool}>添加合作高中</Button>
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
        title="添加学校"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}
        fields={fields}
        width={1000}
      />

      {/* 编辑模态框 */}
      <CommonModal
        title="编辑学校"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleEditOk}
        form={form}
        currentRecord={currentRecord}
        fields={fields}
        width={1000}
      />

      {/* 详情模态框 */}
      <CommonModal
        title="学情详情"
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

export default HighschoolManage;
