
// import { useState } from 'react';
// import { message } from 'antd';

// const useExam = (form) => {
//   const [data, setData] = useState([
//     { key: "1", name: '王五', student_id: '201903', examType: '公务员', examStatus: '通过' },
//     { key: "2", name: '赵六', student_id: '201904', examType: '事业单位', examStatus: '未通过' }
//     // 更多数据...
//   ]);

//   const [filteredData, setFilteredData] = useState(data);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [searchCriteria, setSearchCriteria] = useState({
//     grade: "",
//     class: "",
//     name: "",
//     public_exam_type: "",
//     exame_status: ""
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
//       name: "",
//       public_exam_type: "",
//       exame_status: ""
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

// export default useExam;


import { useState, useEffect } from 'react';
import { message } from 'antd';
import { insertAndUpdateExam, deleteExam, searchExam } from '../api/Exam-api';

const useExam = (form) => {
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
    fetchExam();
  }, []);

  const fetchExam = async () => {
    setLoading(true);
    try {
      const response = await searchExam({ type: 'development' });
      const examData = response.result.map(item => ({
        id: item.id,
        name: item.name,
        public_exam_type: item.public_exam_type,
        exame_status: item.exame_status
      }));
      setData(examData);
      setFilteredData(examData);
    } catch (error) {
      message.error('获取考试信息失败');
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
      await deleteExam({ id: { id } });
      message.success('删除成功');
      fetchExam();
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
      console.log('考公添加信息', values)
      await insertAndUpdateExam(values);
      message.success('添加成功');
      setAddModalVisible(false);
      fetchExam();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      await insertAndUpdateExam({ ...currentRecord, ...values });
      message.success('编辑成功');
      setEditModalVisible(false);
      fetchExam();
    } catch (error) {
      message.error('编辑失败');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchExam({ type: 'development', ...searchCriteria });
      const searchedData = response.result.map(item => ({
        id: item.id,
        name: item.name,
        public_exam_type: item.public_exam_type,
        exame_status: item.exame_status
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

export default useExam;
