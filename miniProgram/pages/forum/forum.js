Page({
  data: {
    newPostContent: '',
    searchKeyword: '',
    originalPosts: [
      {
        isLiked: false,
        avatar: '/images/avatar.svg',
        nickname: '张三',
        time: '1小时前',
        content: '今天参加了校友会的活动，见到了很多老同学，真是太开心了！',
        likeCount: 123,
        commentCount: 45,
        comments: [
          {
            content: '这条活动真不错，下次我也想去参加！',
            time: '30分钟前'
          },
          {
            content: '好久不见，大家都变样了呢。',
            time: '20分钟前'
          },
          {
            content: '校友会太棒了，希望能经常组织这样的活动。',
            time: '10分钟前'
          }
        ],
        shareCount: 23
      },
      {
        isLiked: false,
        avatar: '/images/avatar.svg',
        nickname: '李四',
        time: '2小时前',
        content: '毕业十年了，时光荏苒，大家的变化都好大啊！',
        likeCount: 178,
        commentCount: 32,
        comments: [
          {
            content: '时间过得真快，一晃眼就十年了。',
            time: '1小时前'
          },
          {
            content: '是啊，大家的变化都很大，但还是能认出彼此。',
            time: '45分钟前'
          },
          {
            content: '期待下一次的聚会，希望能见到更多的老同学。',
            time: '30分钟前'
          }
        ],
        shareCount: 15
      }
      // 更多帖子...
    ],
    posts: [
      {
        isLiked: false,
        avatar: '/images/avatar.svg',
        nickname: '张三',
        time: '1小时前',
        content: '今天参加了校友会的活动，见到了很多老同学，真是太开心了！',
        likeCount: 123,
        commentCount: 45,
        comments: [
          {
            content: '这条活动真不错，下次我也想去参加！',
            time: '30分钟前'
          },
          {
            content: '好久不见，大家都变样了呢。',
            time: '20分钟前'
          },
          {
            content: '校友会太棒了，希望能经常组织这样的活动。',
            time: '10分钟前'
          }
        ],
        shareCount: 23
      },
      {
        isLiked: false,
        avatar: '/images/avatar.svg',
        nickname: '李四',
        time: '2小时前',
        content: '毕业十年了，时光荏苒，大家的变化都好大啊！',
        likeCount: 178,
        commentCount: 32,
        comments: [
          {
            content: '时间过得真快，一晃眼就十年了。',
            time: '1小时前'
          },
          {
            content: '是啊，大家的变化都很大，但还是能认出彼此。',
            time: '45分钟前'
          },
          {
            content: '期待下一次的聚会，希望能见到更多的老同学。',
            time: '30分钟前'
          }
        ],
        shareCount: 15
      }
      // 更多帖子...
    ]
  },
  onSearchInput: function(e) {
    // 当用户输入搜索内容时，更新searchText
    this.setData({
      searchKeyword: e.detail.value
    });
    
    // 这里可以添加搜索逻辑，比如过滤帖子列表等
  },
  onSearch: function() {
    const keyword = this.data.searchKeyword.trim();
    if (keyword) {
      const filteredPosts = this.data.posts.filter(post => 
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      this.setData({
        posts: filteredPosts
      });
    } else {
      this.setData({
        posts: this.data.originalPosts
      })
    }
  },
  onLike: function(e) {
    const index = e.currentTarget.dataset.index
    let posts = this.data.posts
    posts[index].isLiked = !posts[index].isLiked

    if (posts[index].isLiked) {
      posts[index].likeCount += 1;
    } else {
      posts[index].likeCount -= 1;
    }
    this.setData({
      posts
    })
  },
  onComment: function(e) {
    const index = e.currentTarget.dataset.index;
    let posts = this.data.posts;
    wx.navigateTo({
      url: `/pages/commentList/commentList?post=${encodeURIComponent(JSON.stringify(posts[index]))}`
    });
},


  onShare: function(e) {
    const index = e.currentTarget.dataset.index;
    let posts = this.data.posts;
    // 增加分享计数
    posts[index].shareCount += 1;
    this.setData({
      posts
    });
  
    // 弹出分享对话框
    wx.showModal({
      title: '分享',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '分享',
      confirmColor: '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          // 用户点击了分享
          wx.updateShareMenu({
            withShareTicket: true,
            success: function (res) {
              // 分享成功的逻辑
              console.log('分享成功');
            },
            fail: function (res) {
              // 分享失败的逻辑
              console.log('分享失败');
            }
          });
        } else if (res.cancel) {
          // 用户点击了取消
          console.log('用户取消了分享');
        }
      }
    });
  },
  onPostInput: function(e) {
    // 当用户输入帖子内容时，更新newPostContent
    this.setData({
      newPostContent: e.detail.value
    });
  },
  
  onPostSubmit: function() {
    // 用户提交帖子
    const newPost = {
      isLiked: false,
      avatar: '/images/avatar.svg', // 假设使用默认头像
      nickname: '匿名用户', // 假设使用默认昵称
      time: '刚刚', // 假设帖子刚发布
      content: this.data.newPostContent,
      likeCount: 0,
      commentCount: 0,
      comments: [],
      shareCount: 0
    };

    // 将新帖子添加到帖子列表的顶部
    let posts = this.data.posts;
    posts.unshift(newPost);

    // 清空输入框
    this.setData({
      newPostContent: '',
      posts: posts
    });
  },
  
});
