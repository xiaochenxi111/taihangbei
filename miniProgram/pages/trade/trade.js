// pages/trade/trade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [  
      { image: '../../icons/house.svg', text: '房屋租赁' },  
      { image: '../../icons/pencil.svg', text: '学习用具' },  
      { image: '../../icons/life.svg', text: '生活用品' },  
      { image: '../../icons/phone.svg', text: '电子产品' },  
      { image: '../../icons/cloth.svg', text: '衣物鞋帽' },  
    ],
    details: [  
      {  
        img: 'https://img0.baidu.com/it/u=1363264908,2534837192&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500',  
        description: '一室一厅精装公寓 家具齐全 拎包入住',  
        price: '1688',
        unit: '/月',
        seller: {  
          avatar: 'https://img1.baidu.com/it/u=1653751609,236581088&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',  
          name: '蜡笔小新'  
        }  
      },  
      {  
        img: 'https://img0.baidu.com/it/u=505217587,2529292273&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',  
        description: '日本斑马ZEBRA双头手账荧光笔 颜色齐全',  
        price: '5',
        unit: '/支',  
        seller: {  
          avatar: 'https://img0.baidu.com/it/u=1145018329,3874925109&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=525',  
          name: '冒泡达人'  
        }  
      },
      {  
        img: 'https://img0.baidu.com/it/u=3161248969,2616284317&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500',  
        description: 'TCL智能护眼台灯 床头阅读灯保护视力 九五新',  
        price: '39',  
        seller: {  
          avatar: 'https://img1.baidu.com/it/u=3020086053,2062599188&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',  
          name: 'cc'  
        }  
      },
      {  
        img: 'https://img2.baidu.com/it/u=1712930245,3759139097&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',  
        description: '精品二手雅马哈kb309电子琴 99新 无拆无修',  
        price: '2500',  
        seller: {  
          avatar: 'https://img1.baidu.com/it/u=870975181,849440641&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',  
          name: '哈哈哈哈'  
        }  
      },
      {  
        img: 'https://img1.baidu.com/it/u=910618640,1367361075&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',  
        description: '早秋新款复古牛仔外套 仅试穿',  
        price: '199',  
        seller: {  
          avatar: 'https://img2.baidu.com/it/u=2424567408,950570388&fm=253&fmt=auto&app=120&f=JPEG?w=504&h=500',  
          name: '小秋'  
        }  
      }   
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