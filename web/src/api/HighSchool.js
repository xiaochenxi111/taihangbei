import axios from '../utils/axios';

// 添加新高中
export const addHighschool = data => 
    axios.post('/highschool/insert', data);

// 删除高中
export const deleteHighschool = data => 
    axios.delete('/highschool/delete', {data});

// 更新高中信息
export const updateHighschool = data => 
    axios.put('/highschool/update', data);

// 搜索高中
export const searchHighschools = params => 
    axios.get('/highschool/search', { params });

// 获取高中列表
export const searchAllHighschools = () => 
    axios.get('/highschool/search');