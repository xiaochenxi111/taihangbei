Page({
  data: {
    messages: [],
    inputMessage: '',
    scrollToMessage: '',
    showOperationPanel: false,
    robotAvatar: '/images/xiaomai.png',
    aiResponse: '', // 用于存储 AI 返回的数据
  },
  
  // 初始化消息列表
  initMessages: function() {
    this.setData({
      messages: [
        { id: 1, content: '你好，我是AI小脉！请问有什么可以帮助你的？', avatar: this.data.robotAvatar, isSelf: false },
        { id: 2, content: '业务办理 进校参观 校招社招 校友捐赠', avatar: this.data.robotAvatar, isSelf: false },
      ]
    });
  },

  // 处理用户输入框的内容变化
  onInputChange: function(e) {
    this.setData({
      inputMessage: e.detail.value
    });
  },

  // 更新消息列表并滚动到底部
  updateMessages: function(message) {
    this.setData({
      messages: [...this.data.messages, message],
      scrollToMessage: `msg-${message.id}`
    });
  },

  // 处理AI响应
  handleAIResponse(res, newMessage) {
    if (res.data && res.data.data && res.data.data.choices && res.data.data.choices.length > 0) {
      const aiReply = res.data.data.choices[0].message.content;
      const replyMessage = {
        id: newMessage.id + 1,
        content: aiReply,
        avatar: this.data.robotAvatar,
        isSelf: false
      };
      this.updateMessages(replyMessage); // 更新消息列表
    } else {
      wx.showToast({
        title: '对话失败',
        icon: 'none'
      });
    }
  },

  // 发送请求到后端接口，获取 AI 的回复
  fetchAIInfo: function(newMessage) {
    const inputText = newMessage.content;

    // 发起 wx.request 请求
    wx.request({
      url: 'http://localhost:9991/aiuser/ai', // 替换为后端接口的实际地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        messages: [
          {
            role: 'user',
            content: inputText,
          },
        ],
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.handleAIResponse(res, newMessage); // 调用处理AI响应的方法
        } else {
          wx.showToast({
            title: 'AI 处理失败',
            icon: 'none',
          });
        }
      },
      fail: (error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        });
        console.error('请求失败:', error);
      },
    });
  },

  // 发送消息
  sendMessage: function() {
    const messageContent = this.data.inputMessage.trim();
    if (!messageContent) return;

    // 构建用户的消息
    const newMessage = {
      id: this.data.messages.length + 1,
      content: messageContent,
      avatar: '/images/avatar.svg',
      isSelf: true
    };

    this.updateMessages(newMessage); // 更新消息列表
    this.fetchAIInfo(newMessage); // 发送用户消息并获取 AI 回复
    this.setData({ inputMessage: '' }); // 清空输入框
  },

// 发送提示消息
sendHint: function(e) {
  const content = e.currentTarget.dataset.content;
  this.setData({
    inputMessage: content
  });
  // 不直接发送，而是等待用户在输入框中发送
},

  // 切换操作面板的显示状态
  toggleOperationPanel: function() {
    this.setData({
      showOperationPanel: !this.data.showOperationPanel
    });
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 页面加载时的初始化操作
  onLoad: function() {
    this.initMessages(); // 初始化默认消息
  },

  onShow: function () {
    wx.hideTabBar();
  },

  reLaunchToHome: function() {
    wx.reLaunch({
      url: '/pages/home/home'
    });
  },
});