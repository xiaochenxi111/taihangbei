import React, { useState } from 'react';
import { Table, Button, Input, Space, Popconfirm, Modal, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CrudTable = ({ columns, data, setData, formFields, title }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleAddOrEdit = () => {
    form.validateFields().then(values => {
      if (currentRecord) {
        // Edit mode
        const updatedData = data.map(item => item.key === currentRecord.key ? { ...item, ...values } : item);
        setData(updatedData);
      } else {
        // Add mode
        const newData = { key: Date.now(), ...values };
        setData([...data, newData]);
      }
      form.resetFields();
      setModalVisible(false);
      setCurrentRecord(null);
    });
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const actionColumn = {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Popconfirm
          title="您确定要删除这条记录吗？"
          onConfirm={() => handleDelete(record.key)}
          okText="确定"
          cancelText="取消"
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      </Space>
    )
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>添加</Button>
      </Space>
      <Table dataSource={data} columns={[...columns, actionColumn]} rowKey="key" />
      <Modal
        title={currentRecord ? `编辑${title}` : `添加${title}`}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRecord(null);
          form.resetFields();
        }}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleAddOrEdit}>保存</Button>
        ]}
      >
        <Form form={form} layout="vertical">
          {formFields.map(field => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={[{ required: true, message: `请输入${field.label}!` }]}
            >
              <Input placeholder={`请输入${field.label}`} type={field.type || 'text'} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default CrudTable;