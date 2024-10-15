// src/hooks/useAcademicManage.js
import { useState } from 'react';
import { message } from 'antd';

const useAcademicManage = (form) => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "张三",
      student_id: "2020123456",
      class_position: "班长",
      organizational_position: "学生会主席",
      club_position: "篮球社社长",
      stu_status: "贫困生",
      ability_assessment_general: "优秀",
      ability_assessment_major: "良好",
      awards: "国家奖学金",
      publishment: "无",
    },
    {
      key: "2",
      name: "李四",
      student_id: "2020789123",
      class_position: "副班长",
      organizational_position: "团委书记",
      club_position: "音乐社成员",
      stu_status: "特优生",
      ability_assessment_general: "良好",
      ability_assessment_major: "优秀",
      awards: "三好学生",
      publishment: "无",
    },
    // 更多数据...
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    grade: "",
    class: "",
    counselor: "",
    major: "",
    name: "",
    stu_status: "",
  });
  const updateData = (newData) => {
    setData(newData);
    setFilteredData(newData);
 };
 

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return Object.keys(searchCriteria).every((key) => {
        const itemValue = item[key] || "";
        return searchCriteria[key] === "" || itemValue.includes(searchCriteria[key]);
      });
    });
    setFilteredData(filtered);
  };

  const handleResetSearch = () => {
    setSearchCriteria({
      grade: "",
      class: "",
      counselor: "",
      major: "",
      name: "",
      stu_status: "",
    });
    setFilteredData(data);
  };

  const handleAdd = () => {
    setAddModalVisible(true);
    form.resetFields();
  };

  const handleAddOk = () => {
    form.validateFields()
      .then((values) => {
        const newData = [...data, { ...values, key: data.length + 1 }];
        setData(newData);
        setFilteredData(newData);
        setAddModalVisible(false);
      })
      .catch((errorInfo) => {
        message.error('请填写所有必填项');
      });
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleEditOk = () => {
    form.validateFields()
      .then((values) => {
        const newData = data.map((item) => {
          if (item.key === currentRecord.key) {
            return { ...item, ...values };
          }
          return item;
        });
        setData(newData);
        setFilteredData(newData);
        setEditModalVisible(false);
      })
      .catch((errorInfo) => {
        message.error('请填写所有必填项');
      });
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
  };

  const handleDetail = (record) => {
    setCurrentRecord(record);
    setDetailModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDetailModalVisible(false);
    form.resetFields();
  };

  return {
    data,
    setData,
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
  };
};

export default useAcademicManage;