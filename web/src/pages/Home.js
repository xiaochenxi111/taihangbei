import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Modal } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Sider from '../components/Sider';
import StudentInfo from './child-page/StudentInfo'; 
import AcademicManage from './child-page/AcademicManage';
import InternshipManagement from './child-page/InternshipManage';
import CompanyManage from './child-page/CompanyManage';
import HighschoolManage from './child-page/HighschoolManage';
import Others from './child-page/Others';
import InformationManage from './child-page/InformationManage';
//import Testtable from './child-page/Testtable';
import ChangePasswordSteps from '../components/ChangePasswordSteps'; // 导入新组件
import '../styles/header.css';
import AlumniManage from './child-page/Alumni-manage';
import PersonalDevelopment from './child-page/PersonalDevelopment';
import ActivityManage from './child-page/ActivityManage';
import logo from '../images/logo.png'
const Home = () => {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const { Header, Content } = Layout;
  const navigate = useNavigate();

  const showPasswordReset = () => {
    setIsChangePasswordVisible(true);
  };

  const showLogoutModal = () => {
    setIsLogoutVisible(true);
  };

  const handleLogoutOk = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log('已退出登录');
    setIsLogoutVisible(false);
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setIsLogoutVisible(false);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordVisible(false);
  };

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userName = userInfo.username || '未登录';

  const menu = (
    <Menu onClick={({ key }) => onHeaderClick(key)}>
      <Menu.Item key="profile">
        <span>{userName}</span>
      </Menu.Item>
      <Menu.Item key="changePassword" onClick={showPasswordReset}>
        修改密码
      </Menu.Item>
      <Menu.Item key="logout" onClick={showLogoutModal}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const onHeaderClick = (key) => {
    // 可以考虑根据功能来处理
    switch (key) {
      case 'logout':
        showLogoutModal();
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider />
        <Layout>
          <Header className="header">
            <img src={logo} className='logo' alt='logo'/>
            <Dropdown overlay={menu} placement="bottomRight">
              <div className="header-dropdown">
                <UserOutlined />
                <DownOutlined />
              </div>
            </Dropdown>
          </Header>

          {/* 修改密码模态框 */}
          <ChangePasswordSteps visible={isChangePasswordVisible} onClose={handleCloseChangePassword} />

          {/* 退出登录模态框 */}
          <Modal
            title="提示"
            visible={isLogoutVisible}
            onOk={handleLogoutOk}
            onCancel={handleLogoutCancel}
            okText="确定"
            cancelText="取消"
          >
            <p>确定退出登录吗？</p>
          </Modal>

          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="student-info" element={<StudentInfo />} />
              <Route path="academic-manage" element={<AcademicManage />} />
              <Route path="internship-manage" element={<InternshipManagement />} />
              <Route path="company-manage" element={<CompanyManage />} />
              <Route path="highschool-manage" element={<HighschoolManage />} />
              <Route path="alumni-manage" element={<AlumniManage />} />
              <Route path="others" element={<Others />} />
              <Route path="personal-development" element={<PersonalDevelopment />} />

              <Route path="" element={<StudentInfo />} />
              <Route path="activity-manage" element={<ActivityManage />} />
              <Route path="information-manage" element={<InformationManage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;