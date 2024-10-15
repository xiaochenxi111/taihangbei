/*import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateGraduationInternship,searchGraduationInternship} from '../api/GraduationInternship-api';

const useGraduationInternship = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchGraduationInternship();
  }, []);
  const fetchGraduationInternship=()=>{
    setLoading(true);
    const testData=[
        {name: '张一一',id: '201912',organization: '腾讯',position: '前端开发',internship_mentor: '张三',grade: 'A',evaluation: '优秀',
        resume:'这是简历'},
        {name: '张二二',id: '201913',organization: '阿里巴巴',position: '后端开发',internship_mentor: '李四',grade: 'B',evaluation: '良好',
        resume:'这是简历'},
        {name: '张三三',id: '201914',organization: '百度',position: '全栈开发',internship_mentor: '王五',grade: 'C',evaluation: '一般',
        resume:'这是简历'},
        {name: '张四四',id: '201915',organization: '字节跳动',position: '前端开发',internship_mentor: '赵六',grade: 'D',evaluation: '较差',
        resume:'这是简历'}
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
    const newGraduationInternship={
      ...values
    }
    updateData([...data,newGraduationInternship]);
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
export default useGraduationInternship;*/

import { useState, useEffect } from 'react';
import { message } from 'antd';
import {insertAndUpdateGraduationInternship,searchGraduationInternship,deleteGraduationInternship} from '../api/GraduationInternship-api';
import {searchStudentInfo} from '../api/StudentInfo-api';

const useGraduationInternship = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchGraduationInternship();
  }, []);
  const fetchGraduationInternship=async ()=>{
    setLoading(true);
    try{
    const response=await searchGraduationInternship({type:'development'});
    const graduationInternshipData=response.result.filter(item=>item.career_type==='实习')
    .map(item=>{
            return{
                name:item.name,
                id:item.id,
                organization:item.organization,
                position:item.position,
                internship_mentor:item.internship_mentor,
                grade:item.grade,
                evaluation:item.evaluation,
                resume:item.resume
            }
    })
    setData(graduationInternshipData);
    setFilteredData(graduationInternshipData);
    setLoading(false);
  }catch(error){
    message.error('获取毕业实习信息失败');
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
      await deleteGraduationInternship(operateData);
      message.success('删除成功');
      fetchGraduationInternship();
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
      fetchGraduationInternship();
      return;
    }
    await insertAndUpdateGraduationInternship(values);
    message.success('添加成功');
    setAddModalVisible(false);
    fetchGraduationInternship();
  }catch(error){
    message.error('添加失败');
  }
 }

 const handleEditOk=async()=>{
  try{
    const values=await form.validateFields();
    await insertAndUpdateGraduationInternship({...values});
    message.success('编辑成功');
    setEditModalVisible(false);
    fetchGraduationInternship();
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
        const response=await searchGraduationInternship(operateData);
        const searchedData=response.result.filter(item=>item.career_type==='实习')
        .map(item=>{
                return{
                  name:item.name,
                  id:item.id,
                  organization:item.organization,
                  position:item.position,
                  internship_mentor:item.internship_mentor,
                  grade:item.grade,
                  evaluation:item.evaluation,
                  resume:item.resume 
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
export default useGraduationInternship;