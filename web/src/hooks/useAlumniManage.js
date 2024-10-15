// src/hooks/useAlumniManage.js
import { useState } from 'react';
import { message } from 'antd';

const useAlumniManage = (form) => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "王五",
      student_id: "2018123456",
      graduation_direction: "某公司",
      postgraduate_employment: "研究所",
      employment_change: "稳定",
      work_performance: "出色",
      employment_activity: "积极",
      employment_guidance: "就业指导讲座",
      industry_feedback: "行业发展迅速",
    },
    {
      key: "2",
      name: "赵六",
      student_id: "2019789123",
      graduation_direction: "某高校",
      postgraduate_employment: "高校教师",
      employment_change: "升迁",
      work_performance: "良好",
      employment_activity: "一般",
      employment_guidance: "个别就业咨询",
      industry_feedback: "市场需求量大",
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
    graduation_direction: "",
    postgraduate_employment: "",
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
      graduation_direction: "",
      postgraduate_employment: "",
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
    setEditModalVisible(false);
    setAddModalVisible(false);
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
    handleAdd,
    handleAddOk,
    editModalVisible,
    detailModalVisible,
    handleEdit,
    handleEditOk,
    handleDelete,
    handleDetail,
    closeModal,
    handleSearch,
    handleResetSearch,
  };
};

export default useAlumniManage;