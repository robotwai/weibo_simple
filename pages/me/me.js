// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "../../image/default_photo.png",
    name: "xxx",
    followed: 'xxx',
    follower: 'xxx',
    sign_content: '生命就是一场旅行'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user_info',
      success: function (res) {
        console.log(res.data.name)
        that.setData({
          name: res.data.name,
          icon: "https://www.zshot.xyz" + res.data.icon,
          sign_content: res.data.sign_content,
          followed: res.data.followed,
          follower: res.data.follower,
        })
      },
      // fail: function () {
      //   wx.navigateTo({
      //     url: '../login/login'
      //   })
      // }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})