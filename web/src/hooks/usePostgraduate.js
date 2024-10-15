// src/hooks/usePostgraduate.js
/*import { useState } from 'react';
import { message } from 'antd';

const usePostgraduate = (form) => {
  const [data, setData] = useState([
    { name: '张三', student_id: '201901', postgraduateSchool: '清华大学', admissionInfo: '录取', conversionInfo: '无' },
    { name: '李四', student_id: '201902', postgraduateSchool: '北京大学', admissionInfo: '未录取', conversionInfo: '就业' },
    // 更多模拟数据...
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

export default usePostgraduate;*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdatePostgraduate,searchPostgraduate,deletePostgraduate} from '../api/Postgraduate-api';
import {searchStudentInfo} from '../api/StudentInfo-api';

const usePostgraduate = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchPostgraduate();
  }, []);
  const fetchPostgraduate=async ()=>{
    setLoading(true);
    try{
    const response=await searchPostgraduate({type:'development'});
    const postgraduateData=response.result.filter(item=>item.career_type==='升学')
    .map(item=>{
            return{
                name:item.name,
                id:item.id,
                graduate_university:item.graduate_university,
                graduate_info:item.graduate_info,
                alternative_paths:item.alternative_paths,
            }
    })
    setData(postgraduateData);
    setFilteredData(postgraduateData);
    setLoading(false);
  }catch(error){
    message.error('获取研究生信息失败');
  }finally{
    setLoading(false);
  }
}

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

 const handleDelete = async (id)=>{
    try{
      let operateData={
          type:'development',
          data:{id:id}
      }
      await deletePostgraduate(operateData);
      message.success('删除成功');
      fetchPostgraduate();
    }catch(error){
      message.error('删除失败');
    }
 }

 const handleDetail=(record)=>{
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setDetailModalVisible(true);
 }

 const closeModal=()=>{
  setAddModalVisible(false);
  setEditModalVisible(false);
  setDetailModalVisible(false);
 }

 const handleAddOk=async()=>{
  try{
    const values=await form.validateFields();
    const studentInfo=await searchStudentInfo({type:'students',id:values.id,name:values.name});
    if(studentInfo.result.length===0){
      message.error('添加失败,请检查姓名和学号是否已在学生基本信息表存在');
      setAddModalVisible(false);
      fetchPostgraduate();
      return;
    }
    await insertAndUpdatePostgraduate(values);
    message.success('添加成功');
    setAddModalVisible(false);
    fetchPostgraduate();
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    await insertAndUpdatePostgraduate({...values});
    message.success('编辑成功');
    setEditModalVisible(false);
    fetchPostgraduate();
  }catch(error){
    message.error('编辑失败');
  }
 }
  const handleSearch = async () => {
    try{
        let operateData={
            type:'development',
            ...searchCriteria
        }
        const response=await searchPostgraduate(operateData);
        const searchedData=response.result.filter(item=>item.career_type==='升学')
        .map(item=>{
            return{
              name:item.name,
              id:item.id,
              graduate_university:item.graduate_university,
              graduate_info:item.graduate_info,
              alternative_paths:item.alternative_paths
            }
        })
        setFilteredData(searchedData);
    }catch(error){
        message.error('搜索失败');
    }
};

const handleResetSearch = () => {
    setSearchCriteria({});
    setFilteredData(data);
};

  return{
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
  }


}
export default usePostgraduate;



