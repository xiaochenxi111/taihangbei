// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperOptions:{
      indicatorDots:true,
      autoplay:true,
      interval:3000,
      duration:1000,
    },
    newsList: [
      { title: '软件学院校友返校交流暨捐赠仪式成功举行', date: '2021-12-16', readCount: 360,content:'软件学院校友们满怀热忱返校，捐赠仪式圆满成功，彰显了校友对学院的深情厚谊及对教育事业的大力支持。' ,imgurl:'https://www2.scut.edu.cn/_upload/article/images/2b/ea/ccdd0a764ef58f1de3ae0c5d338b/e67ae736-b69e-44b3-87dc-0e35355ce6bb_d.jpg'},
      { title: '软件学院关于征集校史资料及实物的通知', date: '2021-12-16', readCount: 7,content:'学院现征集校史资料及实物，旨在丰富校史馆藏，传承学校精神。欢迎广大师生、校友及各界人士捐赠重要文献。',imgurl:'https://img1.baidu.com/it/u=2613906843,1936905114&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=383' },
      { title: '软件学院项目式教学+人工智能改革的通知', date: '2021-12-16', readCount: 7,content:'学院宣布将全面推进项目式教学改革，重点融入人工智能技术，培养适应未来技术发展的高素质软件人才。',imgurl:'https://www.xzyz.edu.cn/__local/B/B8/6C/8C6EF1BCB2AA7C0ADAA63B7AF42_B0A53F60_273D7.jpg' }
    ],
    selectedText: '业务办理',
    currentSelection: 'thing'
  },
 

  updateWord: function(event) {  
    const newText = event.currentTarget.dataset.text; 
    const newContent = event.currentTarget.dataset.content; 
    this.setData({  
      selectedText: newText,
      currentSelection: newContent   
    });  
  },
  server: function() {  
    wx.navigateTo({  
      url: '/pages/server/server'  
    });  
  },  
  donate: function() {  
    wx.navigateTo({  
      url: '/pages/donate/donate'  
    });  
  },  
  activity: function() {  
    wx.navigateTo({  
      url: '/pages/activity/activity'  
    });  
  },  
  trade: function() {  
    wx.navigateTo({  
      url: '/pages/trade/trade'  
    });  
  },  
  hire: function() {  
    wx.navigateTo({  
      url: '/pages/hire/hire'  
    });  
  },
  onTap() {
    // 调用全局点击处理方法
    if (this.handleGlobalTap) {
      this.handleGlobalTap();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showTabBar();  // Show tab bar on other pages
  },  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})