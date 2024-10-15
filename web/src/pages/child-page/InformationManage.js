import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Space, Tooltip } from 'antd';
import SearchOther from '../../components/SearchOther';
import CustomTable from '../../components/CustomTable';
import CommonModal from '../../components/CommonModal';

const InformationManage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  // 更新后的静态数据
  const staticData = [
    { id: 1, title: '软件学院校友返校交流暨捐赠仪式成功举行', author: '张三', publishDate: '2023-05-01', status: '已发布', content: '软件学院校友们满怀热忱返校，捐赠仪式圆满成功，彰显了校友对学院的深情厚谊及对教育事业的大力支持。<img src="https://www2.scut.edu.cn/_upload/article/images/2b/ea/ccdd0a764ef58f1de3ae0c5d338b/e67ae736-b69e-44b3-87dc-0e35355ce6bb_d.jpg" alt="图片1"/>' },
    { id: 2, title: '软件学院关于征集校史资料及实物的通知',  author: '李四', publishDate: '2023-05-02', status: '草稿', content: '学院现征集校史资料及实物，旨在丰富校史馆藏，传承学校精神。欢迎广大师生、校友及各界人士捐赠重要文献<img src="https://img1.baidu.com/it/u=2613906843,1936905114&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=383" alt="图片2"/>' },
    { id: 3, title: '软件学院项目式教学+人工智能改革的通知', author: '王五', publishDate: '2023-05-03', status: '已发布', content: '学院宣布将全面推进项目式教学改革，重点融入人工智能技术，培养适应未来技术发展的高素质软件人才。' },
  ];

  useEffect(() => {
    setFilteredData(staticData);
  }, []);
  
  const truncateText = (text, maxLength = 20) => {
    if (text && text.length > maxLength) {
      return (
        <Tooltip title={text}>
          {text.replace(/<[^>]+>/g, '').substring(0, maxLength)}...
        </Tooltip>
      );
    }
    return text.replace(/<[^>]+>/g, '');
  };
  

  const fields = [
    { name: 'title', label: '标题', type: 'text', rules: [{ required: true, message: '请输入标题!' }] },
    { name: 'author', label: '作者', type: 'text', rules: [{ required: true, message: '请输入作者!' }] },
    { name: 'publishDate', label: '发布日期', type: 'text', rules: [{ required: true, message: '请输入发布日期!' }] },
    { name: 'status', label: '状态', type: 'select', options: [
      { value: '已发布', label: '已发布' },
      { value: '草稿', label: '草稿' },
    ], rules: [{ required: true, message: '请选择状态!' }] },
    { name: 'content', label: '内容', type: 'textarea', rules: [{ required: true, message: '请输入内容!' }] },
  ];

  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title', render: (text) => truncateText(text) },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '发布日期', dataIndex: 'publishDate', key: 'publishDate' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '内容', dataIndex: 'content', key: 'content', render: (text) => truncateText(text, 30) },
    { title: '操作', key: 'action' },
  ];

  const handleAdd = () => {
    form.resetFields();
    form.setFieldsValue({
      status: '草稿',
      publishDate: new Date().toISOString().split('T')[0], // 设置为当前日期的字
    });
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    setModalType('edit');
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      publishDate: new Date(record.publishDate),
    });
    setModalVisible(true);
  };

  const handleDetail = (record) => {
    setModalType('detail');
    setCurrentRecord(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleModalOk = (values) => {
    const newData = filteredData.map(item => 
      item.id === currentRecord.id ? { ...item, ...values } : item
    );
    setFilteredData(newData);
    closeModal();
  };

  const handleAddOk = (values) => {
    const newItem = { ...values, id: Date.now() };
    setFilteredData([...filteredData, newItem]);
    closeModal();
  };

  const handleDelete = (id) => {
    const newData = filteredData.filter(item => item.id !== id);
    setFilteredData(newData);
  };

  const handleSearch = (criteria) => {
    const filtered = staticData.filter(item => 
      (!criteria.title || item.title.includes(criteria.title)) &&
      (!criteria.author || item.author.includes(criteria.author))
    );
    setFilteredData(filtered);
  };

  const handleResetSearch = () => {
    setSearchCriteria({});
    setFilteredData(staticData);
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={18}>
          <SearchOther
            fields={[
              { name: 'title', placeholder: '标题' },
              { name: 'author', placeholder: '作者' },
            ]}
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
            handleSearch={handleSearch}
            handleResetSearch={handleResetSearch}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleAdd}>添加资讯</Button>
        </Col>
      </Row>

      <CustomTable
        dataSource={filteredData}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDetail={handleDetail}
      />
      
      <CommonModal
        title={modalType === 'edit' ? '编辑资讯' : '资讯详情'}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={handleModalOk}
        form={form}
        currentRecord={currentRecord}
        fields={fields}
        readOnly={modalType === 'detail'}
        width={800}
        modalType={modalType}
      />
      <CommonModal
        title="添加资讯"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}
        fields={fields}
        width={800}
      />
    </div>
  );
};

export default InformationManage;
