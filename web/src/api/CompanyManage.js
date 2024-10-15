import axios from '../utils/axios';

// 添加新公司
export const addCompany = data => 
    axios.post('/company/insert', data);

// 删除公司
export const deleteCompany = data => 
    axios.delete('/company/delete', {data});

// 更新公司信息
export const updateCompany = data => 
    axios.put('/company/update', data);

// 搜索公司
export const searchCompanies = params => 
    axios.get('/company/search', { params });

// 获取公司列表
export const searchAllCompanies = () => 
    axios.get('/company/search');