// src/components/Sider.js

import React, { useState,useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate,useLocation } from 'react-router-dom';
import '../styles/menu.css'

const { Sider } = Layout;

const AppSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys,setSelectedKeys]=useState(['StudentInfo'])

  useEffect(() => {
    const path = location.pathname;
    const key = path.split('/').pop()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    console.log(key);
    setSelectedKeys([key]);
  }, [location]);


  const handleMenuClick = (e) => {
    if (e.key === 'StudentInfo') {
      navigate('/home/student-info'); // 跳转到用户管理页面
    }
    if (e.key === 'AcademicManage') {
      navigate('/home/academic-manage');
    }
    if (e.key === 'InternshipManage') {
      navigate('/home/internship-manage');
    }
    if (e.key === 'PersonalDevelopment') {
      navigate('/home/personal-development');
    }
    if (e.key === 'AlumniManage') { // 校友管理
      navigate('/home/alumni-manage');      
    }    
    if (e.key === 'CompanyManage') { // 合作企业管理
      navigate('/home/company-manage');      
    }
    if (e.key === 'HighschoolManage') { // 合作高中信息管理
      navigate('/home/highschool-manage');      
    }
    if (e.key === 'EntryStudent') { // 学生录入
      navigate('/home/entry-student');      
    }
    if (e.key === 'EntryCompany') { // 企业录入
      navigate('/home/entry-company');      
    }
    if (e.key === 'EntryHighschool') { // 高中录入
      navigate('/home/entry-highschool');      
    }
    if (e.key === 'ActivityManage') { // 活动管理
      navigate('/home/activity-manage');      
    }
    if (e.key === 'InformationManage') { // 信息管理
      navigate('/home/information-manage');      
    }
  };

  const items = [
    {
      key: 'Student',
      icon: <UserOutlined />,
      label: '学生信息',
      children:[
        {
          key:'StudentInfo',
          label:'学生基本信息'
        },
        {
          key:'AcademicManage',
          label:'学情管理'
        },
        {
          key:'InternshipManage',
          label:'实习管理'
        },
        {
          key:'PersonalDevelopment',
          label:'个人发展轨迹管理'
        },
        {
          key:'AlumniManage',
          label:'校友管理'
        }
      ]
    },
    {
      key:'CompanyManage',
      label:'合作企业管理'
    },
    {
      key:'HighschoolManage',
      label:'合作高中信息管理'
    },
    {
      key:'ActivityManage',
      label:'活动管理'
    },
    {
      key:'InformationManage',
      label:'资讯管理'
    }
  ];

  return (
    <Sider collapsible>
      <Menu
        theme="dark"
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={handleMenuClick}
        items={items}
        style={{marginTop: '10px'}}
      />
    </Sider>
  );
};

export default AppSider;
