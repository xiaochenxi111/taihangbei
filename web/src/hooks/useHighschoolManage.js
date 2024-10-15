import { useState, useEffect } from 'react';
import { message } from 'antd';
import { getHighschools, addHighschool, updateHighschool, deleteHighschool, searchAllHighschools } from '../api/HighSchool'; // 导入API函数
import ColumnGroup from 'antd/es/table/ColumnGroup';

const useHighschoolManage = (form) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    fetchHighschools();
  }, []);

  const fetchHighschools = async () => {
    setLoading(true);
    try {
      const response = await searchAllHighschools();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      message.error('获取高中列表失败');
    } finally {
      setLoading(false);
    }
    
  };

  const updateData = (newData) => {
    setData(newData);
    setFilteredData(newData);
  };


  const handleAddSchool = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (e) => {
    // const newData = data.filter(item => item.key !== key);
    // updateData(newData);   
    // message.success('删除成功');
    // handleResetSearch();

    // 注释掉的后端 API 调用代码
  
    try {
      console.log(e)
      const data = {id: e}
      console.log('gaozh',data)
      const isDelete = await deleteHighschool(data);
      console.log('gaozh',isDelete)
      if (isDelete) {
        message.success('删除成功');
        fetchHighschools();
      }
      
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
        console.log('gaozh',values)
        const response = await addHighschool(values);
        console.log('gaozh11111',response)
        if (response.success) {
            const newSchool = {
                key: response.result.id, // 使用返回的 id 作为 key
                ...values
            };
            updateData([...data, newSchool]); // 将新学校添加到数据中
            message.success(response.message || '添加成功');
            setAddModalVisible(false);
            handleResetSearch();
        } else {
            message.error(response.message || '添加失败');
        }
    } catch (error) {
        message.error('添加失败');
    }
};


  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      await updateHighschool({ id: currentRecord.id, ...values });
      message.success('编辑成功');
      setEditModalVisible(false);
      fetchHighschools();
    } catch (error) {
      message.error('编辑失败');
    }
    
  };

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

  return {
    data,
    //setData,
    updateData, 
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
    handleAddSchool,
    handleEdit,
    handleDelete,
    handleDetail,
    closeModal,
    handleAddOk,
    handleEditOk,
    handleSearch,
    handleResetSearch,
    filteredData,
  };
};

export default useHighschoolManage;
