Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    radio: '1',
    checked: true,

    show: false,
    value: '',
    columns: ['北京', '杭州', '上海', '深圳', '成都'],
    showArea: false,
    pickerValue: '',
    area: '北京',

    works: ['前端开发工程师', '软件测试工程师', '系统分析师', '数据库管理员', '软件架构师','项目经理','后端开发工程师','UI设计师'],
    showWork: false,
    workValue: '',
    work: '前端开发工程师',

    fileList: [],
    showButton: true,
    showPopup: false,
    showAward: false,
    inputMessage: '',
    message: '无',

    codePath: '',
    codePaths: [
      '../../icons/code1.jpg',
      '../../icons/code2.jpg',
      '../../icons/code3.jpg',
      '../../icons/code4.jpg',
      '../../icons/code5.jpg',
      '../../icons/code6.jpg'
    ],
    name: '用户名',
  }, 
  showSheet() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onLogin() {
    this.setData({
      isLogin: true
    })
  },
  onEnter() {
    this.setData({
      isLogin: false
    })
  },
  inputName(event) {
    this.setData({
      name: event.detail.value
    })
  },
  onSelect(e) {  
    const values = e.detail.value;  
    if (values.includes('agree')) {  
      this.setData({  
        checked: true,  
      });  
    } else {  
      this.setData({  
        checked: false,  
      });  
    }  
  },
  onChange(e) {  
    this.setData({  
      radio: e.detail.value[0], 
    });  
  },

  showPopup() {
    const randomIndex = Math.floor(Math.random() * this.data.codePaths.length)
    this.setData({ 
      showPopup: true,
      codePath: this.data.codePaths[randomIndex]
    })
  },
  closePopup() {
    this.setData({ 
      showPopup: false,
    });
  },

  showAward() {
    this.setData({ 
      showAward: true,
      inputMessage: this.data.message
    })
  },
  updateMessage(event) {
    this.setData({
      inputMessage: event.detail,
    })
  },
  closeAward() {
    this.setData({ 
      showAward: false,
      message: this.data.inputMessage
    })
  },

  chooseImage: function() {  
    const that = this 
    wx.chooseImage({  
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],   
      success(res) {  
        const tempFilePaths = res.tempFilePaths;  
        that.setData({  
          fileList: tempFilePaths,
          showButton: false  
        })
      }  
    })
  },

  showArea() { 
    this.setData({ 
      showArea: true,
      pickerValue: this.data.area
    });
  },
  closeArea() {
    this.setData({ 
      showArea: false,
      pickerValue: ''
    });
  },
  onAreaChange(event) {  
    const { value } = event.detail;  
    this.setData({  
      area: value, 
      pickerValue: value, 
      showArea: false
    });  
  },

  showWork() { 
    this.setData({ 
      showWork: true,
      workValue: this.data.work
    });
  },
  closeWork() {
    this.setData({ 
      showWork: false,
      workValue: ''
    });
  },
  onWorkChange(event) {  
    const { value } = event.detail;  
    this.setData({  
      work: value, 
      workValue: value, 
      showWork: false
    });  
  },
  reLaunchToHome: function() {
    wx.reLaunch({
      url: '/pages/user/user' 
    });
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
  onShow() {

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