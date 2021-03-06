//index.js
//获取应用实例
var network = require('../../utils/network.js')
const app = getApp()

Page({
  data: {
    page: 1,
    pageSize: 30,
    hasMoreData: true,
    contentlist: [],
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getFeed('正在加载数据...')
  },
  onPullDownRefresh: function() {
    this.data.page = 1
    this.getFeed('正在刷新数据')
  },
  //图片点击事件
  imgYu: function(event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  onPostClick: function(event) {
    if(app.globalData.token==null){
      wx.navigateTo({
                url: '../login/login'
              })
    }else{
       wx.navigateTo({
          url: '../add/add'
        })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.getFeed('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  getFeed: function(message) {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    network.requestLoading('https://www.zshot.xyz/app/getFindMicroposts', 'GET', data, message, function(res) {
      console.log(res)
      var contentlistTem = that.data.contentlist
      if (res.status == 0) {
        if (that.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.data
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1
          })
        }

      } else if (res.status==2){
        wx.showToast({
          title: "账号登录失效",
        })
        app.globalData.token = null
      }

    })


  },
})