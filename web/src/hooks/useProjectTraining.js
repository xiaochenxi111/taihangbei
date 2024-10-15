/*import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateProjectTraining,deleteProjectTraining,searchProjectTraining} from '../api/ProjectTraining-api';

const useProjectTraining = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchProjectTraining();
  }, []);
  const fetchProjectTraining=()=>{
    setLoading(true);
    const testData=[
        {name: '张三',id: '201901',start_time: '2023-06',end_time: '2023-12',organization: '腾讯',position: 'Software Engineer',change_remarks: '无变化'},
        {name: '李四',id: '201902',start_time: '2023-07',end_time: '2023-12',organization: '阿里巴巴',position: 'Software Engineer',change_remarks: '无变化'},
        {name: '王五',id: '201903',start_time: '2023-08',end_time: '2023-12',organization: '百度',position: 'Software Engineer',change_remarks: '无变化'},
        {name: '赵六',id: '201904',start_time: '2023-09',end_time: '2023-12',organization: '字节跳动',position: 'Software Engineer',change_remarks: '无变化哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'}
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
    const newProjectTraining={
      ...values
    }
    updateData([...data,newProjectTraining]);
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
export default useProjectTraining;*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateProjectTraining,deleteProjectTraining,searchProjectTraining} from '../api/ProjectTraining-api';
import {searchStudentInfo} from '../api/StudentInfo-api';

const useProjectTraining = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchProjectTraining();
  }, []);
  const fetchProjectTraining=async ()=>{
    setLoading(true);
    try{
    const response=await searchProjectTraining({type:'sixth_term_experience'});
    const projectTrainingData=response.result.filter(item=>item.type==='实训').map(item=>{
            return{
                name:item.name,
                id:item.id,
                start_time:item.start_time,
                end_time:item.end_time,
                organization:item.organization,
                position:item.position,
                main_tasks:item.main_tasks,
                award:item.award
            }
    })
    setData(projectTrainingData);
    setFilteredData(projectTrainingData);
    setLoading(false);
  }catch(error){
    message.error('获取项目实训信息失败');
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
        await deleteProjectTraining(operateData);
        message.success('删除成功');
        fetchProjectTraining();
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
      fetchProjectTraining();
      return;
    }
    await insertAndUpdateProjectTraining(values);
    message.success('添加成功');
    setAddModalVisible(false);
    fetchProjectTraining();
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    await insertAndUpdateProjectTraining({...values});
    message.success('编辑成功');
    setEditModalVisible(false);
    fetchProjectTraining();
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
        const response=await searchProjectTraining(operateData);
        const searchedData=response.result.filter(item=>item.type==='实训').map(item=>{
              return{
                  name:item.name,
                  id:item.id,
                  start_time:item.start_time,
                  end_time:item.end_time,
                  organization:item.organization,
                  position:item.position,
                  main_tasks:item.main_tasks,
                  award:item.award  
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
export default useProjectTraining;