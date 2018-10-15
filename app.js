//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    
    var that = this
    wx.getStorage({
      key: 'user_info',
      success: function(res) {
        that.globalData.token = res.data.token
      },
    })

    // 获取用户信息
    
  },
  globalData: {
    token: null,
  }
})