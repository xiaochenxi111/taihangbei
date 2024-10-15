/*import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateSemesterInternship,deleteSemesterInternship,searchSemesterInternship} from '../api/SemesterInternship-api';

const useSemesterInternship = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchSemesterInternship();
  }, []);
  const fetchSemesterInternship=()=>{
    setLoading(true);
    const testData=[
      {name: '李四',id: '201902',
        start_time:'2024-10',end_time:'2024-12',organization: 'Project X',position: '前端开发',main_tasks: '编写代码',award: '获得了优秀奖',
      },
      {name: '王五',id: '201903',
        start_time:'2024-11',end_time:'2024-12',organization: 'Project Y',position: '后端开发',main_tasks: '编写代码',award: '获得了优秀奖',
      },
      {name: '赵六',id: '201904',
        start_time:'2024-12',end_time:'2024-12',organization: 'Project Z',position: '前端开发',main_tasks: '编写代码',award: '获得了优秀奖',
      }
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
    const newSemesterInternship={
      ...values
    }
    updateData([...data,newSemesterInternship]);
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
export default useSemesterInternship;*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateSemesterInternship,deleteSemesterInternship,searchSemesterInternship} from '../api/SemesterInternship-api';
import {searchStudentInfo} from '../api/StudentInfo-api';

const useSemesterInternship = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchSemesterInternship();
  }, []);
  const fetchSemesterInternship=async ()=>{
    setLoading(true);
    try{
      const response = await searchSemesterInternship({type:'sixth_term_experience'});
      console.log(response.result);
      const semesterInternshipData = response.result
        .filter(item => item.type === '实习')
        .map(({ name, id, start_time, end_time, organization, position, change_remarks }) => ({
          name,
          id,
          start_time,
          end_time,
          organization,
          position,
          change_remarks
        }));
      console.log(semesterInternshipData);
      setData(semesterInternshipData);
      setFilteredData(semesterInternshipData);
    setLoading(false);
  }catch(error){
    message.error('获取学期实习信息失败');
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
            type:'sixth_term_experience',
            data:{id:id}
        }
        await deleteSemesterInternship(operateData);
        message.success('删除成功');
        fetchSemesterInternship();
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
      fetchSemesterInternship();
      return;
    }
    await insertAndUpdateSemesterInternship(values);
    message.success('添加成功');
    setAddModalVisible(false);
    fetchSemesterInternship();
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    await insertAndUpdateSemesterInternship({...values});
    message.success('编辑成功');
    setEditModalVisible(false);
    fetchSemesterInternship();
  }catch(error){
    message.error('编辑失败');
  }
 }
  const handleSearch = async () => {
    try{
        let operateData={
            type:'sixth_term_experience',
            ...searchCriteria
        }
        const response=await searchSemesterInternship(operateData);
        const searchedData = response.result
        .filter(item => item.type === '实习')
        .map(({ name, id, start_time, end_time, organization, position, change_remarks }) => ({
          name,
          id,
          start_time,
          end_time,
          organization,
          position,
          change_remarks
        }));
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
export default useSemesterInternship;