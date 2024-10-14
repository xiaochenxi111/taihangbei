// pages/leaveSchool/leaveSchool.js
Page({
  data: {
    // 这里可以放置一些初始数据
  },
  submitLeaveSchool: function(e) {
    // 提交表单的逻辑
    console.log('提交的表单数据：', e.detail.value);
    // 在这里可以进行表单验证和处理，然后发送请求到后端
    // 以下为模拟提交成功的提示
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    });
  },
  reLaunchToHome: function() {
    wx.reLaunch({
      url: '/pages/server/server' 
    });
  },
  navigateToIndex: function() {  
    wx.navigateBack({  
      delta:1 
    });  
  },
})
