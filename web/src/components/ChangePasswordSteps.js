import React, { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { changePassword } from '../api/ChangePassword-api';

const ChangePasswordSteps = ({ visible, onClose }) => {
  const [formValues, setFormValues] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async () => {
    let currentErrors = {};
    setErrors({ username: '', oldPassword: '', newPassword: '', confirmPassword: '' });

    // 验证输入
    if (!formValues.username) {
      currentErrors.username = '请输入姓名';
    }
    if (!formValues.oldPassword) {
      currentErrors.oldPassword = '请输入旧密码';
    }
    if (!formValues.newPassword) {
      currentErrors.newPassword = '请输入新密码';
    }
    if (formValues.newPassword !== formValues.confirmPassword) {
      currentErrors.confirmPassword = '两次输入的新密码不一致';
    }
    if (formValues.oldPassword === formValues.newPassword) {
      currentErrors.newPassword = '新密码不能与旧密码相同';
    }

    if (Object.keys(currentErrors).length) {
      setErrors(currentErrors);
      return;
    }

    // 在这里发送请求到后端
    try {
      const userData = {
        username: formValues.username,
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      }
      const response = await changePassword(userData);
      console.log('response:', response);
      if (response.success) {
        // 处理成功逻辑，比如提示用户密码修改成功等
        alert('密码修改成功');
        handleClose();
      } else {
        // 处理错误，比如弹出错误信息
        alert(response.message || '密码修改失败');
      }
    } catch (error) {
      if(error.status === 401){
        alert('用户名或密码错误');
      }
    }
  };

  const handleClose = () => {
    setFormValues({
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    onClose();
  };

  return (
    <Modal
      title="修改密码"
      open={visible}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item
          label="姓名"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username || ''}
        >
          <Input
            placeholder="请输入姓名"
            value={formValues.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="旧密码"
          validateStatus={errors.oldPassword ? 'error' : ''}
          help={errors.oldPassword || ''}
        >
          <Input
            placeholder="请输入旧密码"
            type="password"
            value={formValues.oldPassword}
            onChange={(e) => handleInputChange('oldPassword', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="新密码"
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword || ''}
        >
          <Input
            placeholder="请输入新密码"
            type="password"
            value={formValues.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword || ''}
        >
          <Input
            placeholder="请再输入一次新密码"
            type="password"
            value={formValues.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={handleSubmit}>
            修改密码
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePasswordSteps;
