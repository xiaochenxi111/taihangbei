// pages/hire/hire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItems: [  
      { img: '../../icons/jobs.svg', text: '全部职位' },  
      { img: '../../icons/urgent.svg', text: '急招岗位' },  
      { img: '../../icons/part-time.svg', text: '兼职招聘' },  
      { img: '../../icons/red.svg', text: '内部推荐' }  
    ],
    companies: [  
      {  
        img: 'https://img0.baidu.com/it/u=2058673508,2411821772&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',  
        name: '上海云科技有限公司',  
        sort: '互联网/电子商务/游戏'  
      },  
      {  
        img: 'https://img1.baidu.com/it/u=3425427555,2414976407&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',  
        name: '北京云影文化传媒公司',  
        sort: '影视/媒体/艺术/出版'  
      },  
      {  
        img: 'https://img1.baidu.com/it/u=2872904669,188449102&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',  
        name: '北京点众科技股份有限公司',  
        sort: '互联网/科技/开发'  
      }  
    ],
    items: [  
      {  
        job: '项目经理',  
        money: '12 - 14K',  
        requirements: ['本科', '计算机相关专业', '1-3年工作经验'],  
        benefits: ['五险一金', '年终奖', '意外险'],  
        employer: {  
          avatar: '../../icons/avatar.svg',  
          name: '张三大数据',  
          size: '50-999人'  
        }  
      },
      {  
        job: 'javascript工程师',  
        money: '7 - 10K',  
        requirements: ['本科', '经验不限', '提供住宿/餐饮补贴'],  
        benefits: ['五险一金', '全勤奖', '上六休一'],  
        employer: {  
          avatar: '../../icons/jobs.svg',  
          name: '码农',  
          size: '10-50人'  
        }  
      },
      {  
        job: '移动web前端开发',  
        money: '6 - 10K',  
        requirements: ['1-3年', 'React', '本科', '前端开发经验'],  
        benefits: ['交通补助', '节日福利', '双休'],  
        employer: {  
          avatar: '../../icons/house.svg',  
          name: '王女士 人事',  
          size: '20-99人'  
        }  
      },  
    ] 
  },
  navigateToIndex: function() {  
    wx.navigateBack({  
      delta:1 
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