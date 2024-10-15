// import { useState, useEffect } from 'react';
// import { message } from 'antd';

// const useCompanyManage = (form) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchCriteria, setSearchCriteria] = useState({});

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = () => {
//     setLoading(true);
//     // 模拟从后端获取数据
//     const mockData = [
//         {
//             key: '1',
//             unit: 'XYZ公司',
//             contact: '张三',
//             contactChange: '无',
//             companyIntro: '一家专注于科技的企业。',
//             commonRecruitmentPositions: '软件工程师',
//             basicBenefits: '年薪20万',
//             recruitmentType: '校招',
//             alumniDetails: '李四（2020）在职，王五（2021）离职',
//           },
//           {
//             key: '2',
//             unit: '0713公司',
//             contact: '苏醒',
//             contactChange: '无',
//             companyIntro: '一家专注于快乐的企业。',
//             commonRecruitmentPositions: '快乐',
//             basicBenefits: '年薪20万',
//             recruitmentType: '校招,实习',
//             alumniDetails: '王圆（2024）在职，王五（2021）离职',
//           },
//     ];
//     setData(mockData);
//     setFilteredData(mockData);
//     setLoading(false);
//   };

//   const updateData = (newData) => {
//     setData(newData);
//     setFilteredData(newData);
//   };

//   const handleSearch = () => {
//     const filtered = data.filter(item => 
//       Object.entries(searchCriteria).every(([key, value]) => 
//         item[key].toString().toLowerCase().includes(value.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   };

//   const handleResetSearch = () => {
//     setSearchCriteria({});
//     setFilteredData(data);
//   };

//   const handleAddCompany = () => {
//     form.resetFields();
//     setAddModalVisible(true);
//     handleResetSearch();
//   };

//   const handleEdit = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue(record);
//     setEditModalVisible(true);
//     handleResetSearch();
//   };
  
//   const handleDelete = (key) => {
//     const newData = data.filter(item => item.key !== key);
//     updateData(newData);
//     message.success('删除成功');
//     handleResetSearch();
//   };

//   const handleDetail = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue(record);
//     setDetailModalVisible(true);
//   };

//   const closeModal = () => {
//     setAddModalVisible(false);
//     setEditModalVisible(false);
//     setDetailModalVisible(false);
//   };

//   const handleAddOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const newCompany = {
//         key: Date.now().toString(),
//         ...values
//       };
//       updateData([...data, newCompany]); 
//       message.success('添加成功');
//       setAddModalVisible(false);
//     } catch (error) {
//       message.error('添加失败');
//     }
//   };

//   const handleEditOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const updatedData = data.map(item =>
//         item.key === currentRecord.key ? { ...item, ...values } : item
//       );
//       updateData(updatedData);
//       message.success('编辑成功');
//       setEditModalVisible(false);
//     } catch (error) {
//       message.error('编辑失败');
//     }
//   };

//   return {
//     data,
//     loading,
//     currentRecord,
//     addModalVisible,
//     editModalVisible,
//     detailModalVisible,
//     filteredData,
//     searchCriteria,
//     setSearchCriteria,
//     updateData,
//     handleSearch,
//     handleResetSearch,
//     handleAddCompany,
//     handleEdit,
//     handleDelete,
//     handleDetail,
//     closeModal,
//     handleAddOk,
//     handleEditOk,
//   };
// };

// export default useCompanyManage;


import { useState, useEffect } from 'react';
import { message } from 'antd';
import { searchCompanies, addCompany, updateCompany, deleteCompany, searchAllCompanies } from '../api/CompanyManage';
const useCompanyManage = (form) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    // 模拟从后端获取数据
    try {
        const response = await searchAllCompanies();
        const companiesData = response.data.map(company => ({
          key: company.id,
          ...company
        }));
        setData(companiesData);
        setFilteredData(companiesData);
        console.log(companiesData);
        console.log(response.data);
    } catch (error) {
        message.error('获取数据失败');
    } finally {
        setLoading(false);
    }
  };

  const updateData = (newData) => {
    setData(newData);
    setFilteredData(newData);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchCompanies(searchCriteria);
      const companiesData = response.data.map(company => ({
        key: company.id,
        ...company
      }));
      setFilteredData(companiesData);
    } catch (error) {
      message.error('搜索失败');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchCriteria({});
    setFilteredData(data);
  };

  const handleAddCompany = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };
  
  const handleDelete = async (key) => {
    try {
      const data = {id: key};
      console.log(data);
      await deleteCompany(data);
     
      message.success('删除成功');
      fetchCompanies();
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
      console.log(values)
      await addCompany(values);
      message.success('添加成功');
      setAddModalVisible(false);
      fetchCompanies();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleEditOk = async () => {
    try {
      const values = await form.validateFields();
      await updateCompany({ id: currentRecord.key, ...values });
      message.success('编辑成功');
      setEditModalVisible(false);
      fetchCompanies();
    } catch (error) {
      message.error('编辑失败');
    }
  };

  return {
    data,
    loading,
    currentRecord,
    addModalVisible,
    editModalVisible,
    detailModalVisible,
    filteredData,
    searchCriteria,
    setSearchCriteria,
    updateData,
    handleSearch,
    handleResetSearch,
    handleAddCompany,
    handleEdit,
    handleDelete,
    handleDetail,
    closeModal,
    handleAddOk,
    handleEditOk,
  };
};

export default useCompanyManage;