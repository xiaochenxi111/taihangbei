/*import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertStudentInfo,updateStudentInfo,deleteStudentInfo,searchStudentInfo} from '../api/StudentInfo-api';

const useStudentInfo = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchStudentInfo();
  }, []);
  const fetchStudentInfo=()=>{
    setLoading(true);
    const testData=[
      { name: '张三', gender: '男',id:'201901',grade:'2019级',class:'5班',counselor:'哈哈',major_direction:'移动互联网',contact_info:'12345678654',origin:'河北省邯郸市',high_school:'邯郸一中',rank:'10' },
      { name: '李四', gender: '男',id:'201902',grade:'2019级',class:'6班',counselor:'哈哈',major_direction:'移动互联网',contact_info:'12345678654',origin:'河北省邯郸市',high_school:'邯郸一中',rank:'12' }
    ]
    setData(testData);
    setFilteredData(testData);
    setLoading(false);
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
    console.log(record);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
 };

 const handleDelete = (id)=>{
    const newData = data.filter(item => item.id !== id);
    updateData(newData);
    message.success('删除成功');
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
    const newStudentInfo={
      ...values
    }
    updateData([...data,newStudentInfo]);
    message.success('添加成功');
    setAddModalVisible(false);
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    const newData=data.map(item=>
      item.id===currentRecord.id?{...item,...values}:item
    )
    updateData(newData);
    message.success('编辑成功');
    setEditModalVisible(false);
  }catch(error){
    message.error('编辑失败');
  }
 }
  const handleSearch = () => {
    const filtered = data.filter(item => 
      Object.entries(searchCriteria).every(([key, value]) => 
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
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
export default useStudentInfo;*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertStudentInfo,updateStudentInfo,deleteStudentInfo,searchStudentInfo} from '../api/StudentInfo-api';

const useStudentInfo = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  //加载获取学生信息
  const fetchStudentInfo=async ()=>{
    setLoading(true);
    try{
      const response=await searchStudentInfo({type:'students'});
      console.log(response);
      console.log(response.result);
      const studentInfoData=response.result.map(item=>({
        name:item.name,
        gender:item.gender,
        id:item.id,
        grade:item.grade,
        class:item.class,
        counselor:item.counselor,
        major_direction:item.major_direction,
        contact_info:item.contact_info,
        origin:item.origin,
        high_school:item.high_school,
        rank:item.rank
      }))
      setData(studentInfoData) ;
      setFilteredData(studentInfoData);
    }catch(error){
      message.error('获取学生信息失败');
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
        type:'students',
        data:{id:id}
      }
      await deleteStudentInfo(operateData);
      message.success('删除成功');
      fetchStudentInfo();
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
    await insertStudentInfo(values);
    message.success('添加成功');
    setAddModalVisible(false);
    fetchStudentInfo();
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    const {name,gender,grade,class:classValue,counselor,major_direction,contact_info,origin,high_school,rank}=values;
    let operateData = {
      id: currentRecord.id,
      name,
      gender,
      grade,
      class: classValue,  // 这里使用 'class' 作为键名，保持与数据库一致
      counselor,
      major_direction,
      contact_info,
      origin,
      high_school,
      rank
    };
    await updateStudentInfo(operateData);
    message.success('编辑成功');
    setEditModalVisible(false);
    fetchStudentInfo();
  }catch(error){
    message.error('编辑失败');
  }
 }
  const handleSearch = async () => {
    try{
      let operateData={
        type:'students',
        ...searchCriteria
      }
      const response=await searchStudentInfo(operateData);
      const searchedData=response.result.map(item=>({
        name:item.name,
        gender:item.gender,
        id:item.id,
        grade:item.grade,
        class:item.class,
        counselor:item.counselor,
        major_direction:item.major_direction,
        contact_info:item.contact_info,
        origin:item.origin,
        high_school:item.high_school,
        rank:item.rank,
        sixth_term_status:item.sixth_term_status,
        graduation_selection:item.graduation_selection
      }))
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

export default useStudentInfo; 

  
