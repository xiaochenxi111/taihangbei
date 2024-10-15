import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons';

// 可复用的表格组件
const CustomTable = ({ dataSource, columns, handleEdit, handleDelete, handleDetail }) => {
  // 渲染操作列
  const actionRender = (_, record) => (
    <Space size="middle">
      <Button
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      />
      <Popconfirm
        title="您确定要删除这条记录吗？"
        onConfirm={() => handleDelete(record.key || record.id)}
        okText="确定"
        cancelText="取消"
      >
        <Button
          icon={<DeleteOutlined />}
          danger
        />
      </Popconfirm>
      {handleDetail && (
        <Button
          icon={<ExportOutlined />}
          onClick={() => handleDetail(record)}
        />
      )}
    </Space>
  );

  return (
    <Table
      dataSource={dataSource}
      columns={columns.map((col) => ({
        ...col,
        render: col.key === 'action' ? actionRender : col.render,
      }))}
      rowKey="key"
      pagination={false}
    />
  );
};

export default CustomTable;