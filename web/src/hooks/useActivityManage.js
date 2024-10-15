import { useState, useEffect } from 'react';
import { message } from 'antd';

const useActivityManage = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchActivityManage();
  }, []);
  const fetchActivityManage=()=>{
    setLoading(true);
    const testData = [
        {
            institution: '校学生会',
            id: 'xsh001',
            start_time: '2023-10-20 09:00',
            end_time: '2023-10-20 17:00',
            activity_name: '秋季运动会',
            activity_content: '一年一度的秋季运动会，包括各种田径项目和团队比赛。'
        },
        {
            institution: '软件学院',
            id: 'rjxy001',
            start_time: '2023-11-15 14:00',
            end_time: '2023-11-15 18:00',
            activity_name: '科技创新讲座',
            activity_content: '邀请知名科学家就最新科技趋势进行讲座和交流。'
        },
        {
            institution: '校团委',
            id: 'xtw001',
            start_time: '2023-12-01 08:30',
            end_time: '2023-12-01 12:00',
            activity_name: '慈善义卖',
            activity_content: '学生组织慈善义卖活动，所得款项将捐给需要帮助的群体。'
        },
        {
            institution: '国际文化交流学院',
            id: 'gjwh001',
            start_time: '2023-11-22 10:00',
            end_time: '2023-11-22 16:00',
            activity_name: '国际文化节',
            activity_content: '展示不同国家的文化，包括美食、音乐、舞蹈和手工艺品。'
        },
        {
            institution: '计算机学院',
            id: 'jsj001',
            start_time: '2023-10-25 13:30',
            end_time: '2023-10-25 19:30',
            activity_name: '创业大赛',
            activity_content: '学生团队展示他们的创业项目，竞争最佳商业计划奖。'
        }
    ];
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
    const newActivityManage={
      ...values
    }
    updateData([...data,newActivityManage]);
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
export default useActivityManage;