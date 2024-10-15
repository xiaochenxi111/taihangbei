import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, message } from 'antd';
import VerifyCode from '../components/VerifyCode'; // 引入验证码组件
import tower from '../images/tower.jpg';
import { useAuth } from '../context/AuthProvider';
import { login } from '../api/login';

const Login = () => {
  const { handleUserInfo, user } = useAuth();
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState('');

  const handleCaptchaUpdate = (newCaptcha) => {
    setCaptcha(newCaptcha);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await login(values);
      console.log(res);
      const userInfo = {
        username: res.username,
        token: res.token
    };
      handleUserInfo(userInfo);
      //handleUserInfo({username: values.username, token: '1'});
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.partA}>
        <img src={tower} alt="时光塔图片" style={styles.image} />
        <div style={styles.welcomeWords}>
          <h1 style={styles.title}>欢迎登录</h1>
          <p style={styles.subtitle}>Welcome to login</p>
        </div>
      </div>
      <div style={styles.partB}>
        <h2 style={styles.header}>后台管理系统</h2>
        <Form
          form={form}
          name="myForm"
          onFinish={handleSubmit}
          style={styles.form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="passwd"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="enteredCaptcha"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div style={styles.captchaContainer}>
              <Input
                placeholder="验证码"
                style={styles.captchaInput}
              />
              <VerifyCode onUpdateCode={handleCaptchaUpdate} />
            </div>
          </Form.Item>

          <Form.Item>
            <div style={styles.options}>
              <Checkbox>记住密码</Checkbox>
              <a style={styles.forgotPassword} onClick={() => console.log('忘记密码')}>
                忘记密码?
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.submitButton}>
              登录
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      margin: 0,
    },
    partA: {
      flex: 2,
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    welcomeWords: {
      color: '#ffffff',
      fontFamily: 'sans-serif',
      left: '60px',
      bottom: '70px',
      position: 'absolute',
    },
    title: {
      marginBottom: 0,
    },
    subtitle: {
      borderBottom: '#ffffff 2px solid',
      paddingBottom: '10px',
    },
    partB: {
      textAlign: 'center',
      flex: 1,
      padding: '0 20px', // 增加一些内边距
    },
    header: {
      color: '#333333',
      marginTop: '20%',
      marginBottom: '40px',
    },
    form: {
      maxWidth: 400, // 将宽度设置为更窄的300px
      margin: '0 auto',
    },
    captchaContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    captchaInput: {
      width: '150px', // 调整验证码输入框的宽度
      marginRight: '10px',
    },
    options: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: '10px',
    },
    forgotPassword: {
      color: '#1f75fe',
    },
    submitButton: {
      width: '100%', // 按钮宽度随表单调整
      marginTop: '10px',
      maxWidth: 400, // 按钮最大宽度与表单一致
    },
  };

export default Login;




