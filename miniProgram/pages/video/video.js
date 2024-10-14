
Page({
  data: {
    liked: false,
    collected: false,
    danmu: '', // 当前输入的弹幕
    danmuList: [], // 存储所有弹幕的数组
    currentVideoIndex: 0,
    showDanmuContainer: false,
    videoList: [
      { url: 'https://img.tukuppt.com/video_show/2405811/00/25/91/5f7181591abbb.mp4', title: '风景如画的山脉', liked: false,  collected: false},
      { url: 'https://img.tukuppt.com/video_show/15653652/00/28/58/5f91886f8659a.mp4', title: '城市的繁华夜景', liked: false,  collected: false },
      { url: 'https://img.tukuppt.com/video_show/15653652/01/36/55/63144d3b2e795.mp4', title: '沙滩上的日落', liked: false,  collected: false },
      { url: 'https://img.tukuppt.com/video_show/25193134/00/31/98/5fb4e2a26fea3.mp4', title: '森林中的小径', liked: false,  collected: false }
      // ...更多视频URL、标题和点赞状态
    ],
    startY: 0,
    moveY: 0,
    translateY: 0,
  },

  handleTouchStart: function(e) {
    this.setData({
      startY: e.touches[0].pageY,
      moveY: 0
    });
  },

  handleTouchMove: function(e) {
    const moveY = e.touches[0].pageY - this.data.startY;
    this.setData({
      moveY: moveY,
      translateY: moveY
    });
  },

  handleTouchEnd: function(e) {
    const moveY = this.data.moveY;
    if (Math.abs(moveY) > 100) { // 判断滑动距离是否足够大
      if (moveY > 0) {
        this.prevVideo();
      } else {
        this.nextVideo();
      }
    }
    // 重置移动距离和transform
    this.setData({
      moveY: 0,
      translateY: 0
    });
  },

  nextVideo: function() {
    let index = this.data.currentVideoIndex;
    if (index < this.data.videoList.length - 1) {
      this.setData({
        currentVideoIndex: index + 1
      });
    }
  },

  prevVideo: function() {
    let index = this.data.currentVideoIndex;
    if (index > 0) {
      this.setData({
        currentVideoIndex: index - 1
      });
    }
  },
  toggleLike: function() {
    const currentVideoIndex = this.data.currentVideoIndex;
    const videoList = this.data.videoList;
    videoList[currentVideoIndex].liked = !videoList[currentVideoIndex].liked;
    this.setData({
      videoList: videoList
    });
  },
  flipVideo: function() {
    const videoContext = wx.createVideoContext('myVideo', this);
    // 获取当前视频的方向
    const { direction } = videoContext;
    // 根据当前方向设置新的方向
    if (direction === 90 || direction === 270) {
      // 如果当前是横屏，则设置为竖屏
      videoContext.requestFullScreen({ direction: 0 });
    } else {
      // 如果当前是竖屏，则设置为横屏
      videoContext.requestFullScreen({ direction: 90 });
    }
  },
  toggleCollect: function() {
    const currentVideoIndex = this.data.currentVideoIndex;
    const videoList = this.data.videoList;
    const video = videoList[currentVideoIndex];
    const newCollectedState = !video.collected;
  
    // 更新收藏状态
    video.collected = newCollectedState;
    this.setData({
      videoList: videoList
    }, () => {
      // 仅在新状态为已收藏时弹出提示框
      if (newCollectedState) {
        wx.showToast({
          title: '已收藏',
          image: '/images/collect.svg',
          duration: 500
        });
      }
    });
  },
  bindInputDanmu: function(e) {
    this.setData({
      danmu: e.detail.value
    });
  },

  sendDanmu: function() {
    const danmu = this.data.danmu.trim();
    if (danmu) {
      const danmuList = this.data.danmuList;
      danmuList.push(danmu);
      this.setData({
        danmuList: danmuList,
        danmu: '' // 清空输入框
      });
      // 将弹幕保存到本地存储
      wx.setStorageSync('danmuList', danmuList);
    }
  },

  onLoad: function() {
    // 页面加载时从本地存储读取弹幕数据
    const danmuList = wx.getStorageSync('danmuList') || [];
    this.setData({
      danmuList: danmuList
    });
  },
toggleComment: function() {
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });

    if (this.data.showDanmuContainer) {
      animation.height(0).step();
    } else {
      animation.height('100rpx').step();
    }

    this.setData({
      animationData: animation.export(),
      showDanmuContainer: !this.data.showDanmuContainer
    });
  },
});

