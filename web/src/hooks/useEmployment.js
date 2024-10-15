// // src/hooks/useEmployment.js
  
// import { useState } from 'react';
// import { message } from 'antd';

// const useEmployment = (form) => {
//   const [data, setData] = useState([
//     { id: '201905', name: '孙七', job: '软件工程师', target_region: '北京', target:"软件工程师" },
//     { id: '201906', name: '周八', job: '产品经理', target_region: '上海' },
//     // 更多模拟数据...
//   ]);

//   const [filteredData, setFilteredData] = useState(data);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchCriteria, setSearchCriteria] = useState({
//     grade: "",
//     class: "",
//     counselor: "",
//     major_direction: "",
//     name: "",
//     stu_status: "",
//   });
//   const updateData = (newData) => {
//     setData(newData);
//     setFilteredData(newData);
//   };

//   const handleSearch = () => {
//     const filtered = data.filter((item) => {
//       return Object.keys(searchCriteria).every((key) => {
//         const itemValue = item[key] || "";
//         return searchCriteria[key] === "" || itemValue.includes(searchCriteria[key]);
//       });
//     });
//     setFilteredData(filtered);
//   };

//   const handleResetSearch = () => {
//     setSearchCriteria({
//       grade: "",
//       class: "",
//       counselor: "",
//       major_direction: "",
//       name: "",
//       stu_status: "",
//     });
//     setFilteredData(data);
//   };

//   const handleAdd = () => {
//     setAddModalVisible(true);
//     form.resetFields();
//   };

//   const handleAddOk = () => {
//     form.validateFields()
//       .then((values) => {
//         const newData = [...data, { ...values, key: data.length + 1 }];
//         setData(newData);
//         setFilteredData(newData);
//         setAddModalVisible(false);
//       })
//       .catch((errorInfo) => {
//         message.error('请填写所有必填项');
//       });
//   };

//   const handleEdit = (record) => {
//     setCurrentRecord(record);
//     setEditModalVisible(true);
//     form.setFieldsValue(record);
//   };

//   const handleEditOk = () => {
//     form.validateFields()
//       .then((values) => {
//         const newData = data.map((item) => {
//           if (item.key === currentRecord.key) {
//             return { ...item, ...values };
//           }
//           return item;
//         });
//         setData(newData);
//         setFilteredData(newData);
//         setEditModalVisible(false);
//       })
//       .catch((errorInfo) => {
//         message.error('请填写所有必填项');
//       });
//   };

//   const handleDelete = (key) => {
//     const newData = data.filter((item) => item.key !== key);
//     setData(newData);
//     setFilteredData(newData);
//   };

//   const handleDetail = (record) => {
//     setCurrentRecord(record);
//     setDetailModalVisible(true);
//   };

//   const closeModal = () => {
//     setAddModalVisible(false);
//     setEditModalVisible(false);
//     setDetailModalVisible(false);
//     form.resetFields();
//   };

//   return {
//     data,
//     updateData,
//     filteredData,
//     searchCriteria,
//     setSearchCriteria,
//     currentRecord,
//     addModalVisible,
//     editModalVisible,
//     detailModalVisible,
//     handleAdd,
//     handleAddOk,
//     handleEdit,
//     handleEditOk,
//     handleDelete,
//     handleDetail,
//     closeModal,
//     handleSearch,
//     handleResetSearch,
//   };
// };

// export default useEmployment

import { useState, useEffect } from 'react';
import { message } from 'antd';
import { insertAndUpdateEmployment, searchEmployment, deleteEmployment } from '../api/Employment-api';

const useEmployment = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // 初始化数据获取
  useEffect(() => {
    fetchEmployment();
  }, []);

  const fetchEmployment = async () => {
    setLoading(true);
    try {
      const response = await searchEmployment({ type: 'development' });
      const employmentData = response.result.map(item => ({
        name: item.name,
        id: item.id,
        job: item.job,
        target_region: item.target_region,
        target: item.target,
        interview_guidance: item.interview_guidance,
        follow_records: item.follow_records,
        process: item.process,
        job_evaluation: item.job_evaluation,
      }));
      setData(employmentData);
      setFilteredData(employmentData);
    } catch (error) {
      message.error('获取就业信息失败');
    } finally {
      setLoading(false);
    }
  };

  const updateData = (newData) => {
    setData(newData);
    setFilteredData(newData);
  };

  const handleAdd = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const data = { id: id }
      await deleteEmployment(data);
      message.success('删除成功');
      fetchEmployment();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleDetail = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setDetailModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDetailModalVisible(false);
  };

  const handleAddOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('就业信息插入',values)
      await insertAndUpdateEmployment(values);
      message.success('添加成功');
      setAddModalVisible(false);
      fetchEmployment();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      await insertAndUpdateEmployment({ ...values });
      message.success('编辑成功');
      setEditModalVisible(false);
      fetchEmployment();
    } catch (error) {
      message.error('编辑失败');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchEmployment({ type: 'development', ...searchCriteria });
      const searchedData = response.result.map(item => ({
        name: item.name,
        id: item.id,
        job: item.job,
        target_region: item.target_region,
        target: item.target,
        interview_guidance: item.interview_guidance,
        follow_records: item.follow_records,
        process: item.process,
        job_evaluation: item.job_evaluation,
      }));
      setFilteredData(searchedData);
    } catch (error) {
      message.error('搜索失败');
    }
  };

  const handleResetSearch = () => {
    setSearchCriteria({});
    setFilteredData(data);
  };

  return {
    data,
    updateData,
    filteredData,
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
    handleAdd,
    handleEdit,
    handleDelete,
    handleDetail,
    closeModal,
    handleAddOk,
    handleEditOk,
    handleSearch,
    handleResetSearch,
  };
};

export default useEmployment;

