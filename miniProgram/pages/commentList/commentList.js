// pages/commentList/commentList.js
Page({
  data: {
    comments: [], // 用于存储传递过来的评论列表
    showInput: false,
    inputMessage:'',
    keyboardHeight:0
  },
  showCommentInput() {
    this.setData({ showCommentInput: true });
  },
  onLoad: function(options) {
    // 获取传递过来的帖子数据
    if (options.post) {
      const post = JSON.parse(decodeURIComponent(options.post));
      this.setData({
        post: post,
        comments: post.comments // 评论数据是帖子的一部分
      });
    }
  },
  reLaunchToHome: function() {
    wx.reLaunch({
      url: '/pages/forum/forum' 
    });
  },
  toggleOperationPanel: function() {
    this.setData({
      showOperationPanel: !this.data.showOperationPanel
    });
  },
  showInput: function() {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  onFocus:function(e){
    this.setData({
      keyboardHeight: e.detail.height || 0
    });
  },
  //隐藏输入框
  onHideInput: function() {
    this.setData({
      showInput: false,
      keyboardHeight:0
    })
    console.log('hide+++++++++++')
  },
})
