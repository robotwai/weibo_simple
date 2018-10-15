// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['照片', '视频'],
    index: 0,
    video: null,
    image: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  onAddImage: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == 0) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          that.setData({
            video: null,
            image: tempFilePaths[0]
          })
        }
      })
    } else {
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          console.log(res.tempFilePath)
          that.setData({
            video: res.tempFilePath,
            image: null
          })
        }
      })
    }
  },


  onsubmit: function (e) {
    var that = this
    if (e.detail.value.textarea == null || e.detail.value.textarea=="") {
      wx.showToast({
        title: '请输入内容',
      })
      return;
    }
    if (that.data.image != null) {
      wx.uploadFile({
        url: 'https://www.zshot.xyz/app/seedmicropost', //仅为示例，非真实的接口地址
        filePath: that.data.image,
        name: 'picture1',
        formData: {
          'picNum': tempFilePaths.length,
          'token': app.globalData.token,
          'content': e.detail.value.textarea
        },
        success(res) {
          const data = res.data
          //do something
          console.log(data)
          wx.showToast({
            title: '发送成功',
          }),
            wx.navigateBack({
              delta: 2
            })
        }
      })
    } else if (that.data.video != null) {

      wx.uploadFile({
        url: 'https://www.zshot.xyz/app/seedmicropost', //仅为示例，非真实的接口地址
        filePath: that.data.video,
        name: 'video',
        formData: {
          'picNum': '0',
          'token': app.globalData.token,
          'content': e.detail.value.textarea
        },
        success(res) {
          const data = res.data
          //do something
          console.log(data)
          wx.showToast({
            title: '发送成功',
          }),
            wx.navigateBack({
              delta: 2
            })
        }
      })
    }else{
      console.log('error')
    }
  }
})