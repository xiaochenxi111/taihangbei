// src/pages/child-page/Postgraduate.js
import React, { useState } from "react";
import { Button, Form, Row, Col, Space,Modal,Input } from "antd";
import ExcelUploader from '../../../components/ExcelUploader';
import ExportExcelTemplate from '../../../components/ExportExcelTemplate';
import CustomTable from '../../../components/CustomTable';
import SearchOther from '../../../components/SearchOther';
import CommonModal from '../../../components/CommonModal';
import usePostgraduate from '../../../hooks/usePostgraduate';
const { TextArea } = Input;


const Postgraduate = () => {
  const [form] = Form.useForm();
  const {data,updateData,filteredData,loading,searchCriteria,setSearchCriteria,currentRecord,setCurrentRecord,addModalVisible,setAddModalVisible,editModalVisible,setEditModalVisible,detailModalVisible,setDetailModalVisible,handleAdd,handleEdit,handleDelete,handleDetail,closeModal,handleAddOk,handleEditOk,handleSearch,handleResetSearch}=usePostgraduate(form);
  const [graduateInfo, setGraduateInfo] = useState('');
  const [graduateInfoModalVisible, setGraduateInfoModalVisible] = useState(false);
  const [alternativePaths, setAlternativePaths] = useState('');
  const [alternativePathsModalVisible, setAlternativePathsModalVisible] = useState(false);

  const searchFields=[
    { name: "grade", label: "年级", placeholder: "年级" },
    { name: "class", label: "班级", placeholder: "班级" },
    { name: "name", label: "姓名", placeholder: "姓名" },
    { name: "graduate_university", label: "报考院校", placeholder: "报考院校" },
    { name: "graduate_info", label: "录取信息", placeholder: "录取信息" }
  ]
  const tableFields=[
    { name: "name", label: "姓名",placeholder:"姓名",rules:[{required:true,message:'姓名是必填项'}]},
    { name: "id", label: "学号",placeholder:"学号",rules:[{required:true,message:'学号是必填项'}]},
    { name: "graduate_university", label: "报考院校",placeholder:"报考院校"},
    { name: "graduate_info", label: "录取信息",type:"textarea",placeholder:"录取信息"},
    { name: "alternative_paths", label: "未录取转化去向",type:"textarea",placeholder:"未录取转化去向"},

  ]

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "学号", dataIndex: "id", key: "id" },
    { title: "报考院校", dataIndex: "graduate_university", key: "graduate_university" },
    {title:'录取信息',dataIndex:'graduate_info',key:'graduate_info',
      render:(text, record) => (
          <Button
              type="link"
              onClick={(e) => {
                  e.stopPropagation();
                  setGraduateInfo(text || '无录取信息');
                  setGraduateInfoModalVisible(true);
              }}
          >
              查看详情
          </Button>
      )
  },  
  {title:'未录取转化去向',dataIndex:'alternative_paths',key:'alternative_paths',
    render:(text, record) => (
        <Button
            type="link"
            onClick={(e) => {
                e.stopPropagation();
                setAlternativePaths(text || '无未录取转化去向');
                setAlternativePathsModalVisible(true);
            }}
        >
            查看详情
        </Button>
    )
},  
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
          <Row style={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
            <Col>
              <Button type="primary" onClick={handleAdd}>添加考研信息</Button>
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
        title="添加考研信息"
        visible={addModalVisible}
        onCancel={closeModal}
        onOk={handleAddOk}
        form={form}
        currentRecord={{}}
        fields={tableFields}
        width={1000}
      />

      {/* 编辑模态框 */}
      <CommonModal
        title="编辑考研信息"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleEditOk}
        form={form}
        currentRecord={currentRecord}
        fields={tableFields}
        width={1000}
      />

      {/* 详情模态框 */}
      <CommonModal
        title="就业考研详情"
        visible={detailModalVisible}
        onCancel={closeModal}
        form={form}
        currentRecord={currentRecord}
        fields={tableFields}
        readOnly={true}
        width={1000}
      />

      <Modal
                title="录取信息详情"  
                open={graduateInfoModalVisible}
                onCancel={() => setGraduateInfoModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={graduateInfo}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                />
            </Modal>

            <Modal
                title="未录取转化去向详情"
                open={alternativePathsModalVisible}
                onCancel={() => setAlternativePathsModalVisible(false)}
                footer={null}
            >
                <TextArea
                    value={alternativePaths}
                    autoSize={{ minRows: 3, maxRows: 5 }}       
                    readOnly
                />
            </Modal>
    </div>
  );
};

export default Postgraduate;