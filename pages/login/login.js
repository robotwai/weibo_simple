// pages/login/login.js
var network = require('../../utils/network.js')
Page({
  data: {
    email: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      var that = this
      that.login('正在登录...')
    }
  },

   login: function (message) {
     var that = this
     var data = {
       email: that.data.email,
       password: that.data.password
     }
     network.requestLoading('https://www.zshot.xyz/app/loggin','POST' ,data, message, function (res) {
       console.log(res)
       
       if (res.status == 0) {
         var jj= {} 
         var jsonStr = res.data.replace(" ", "");
         if (typeof jsonStr != 'object') {
           jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
           var jj = JSON.parse(jsonStr);
           console.log(jj.name);
         }
      
         var o = {} //生成一个新的空对象
         console.log(res.data);
         console.log(res.data['name']);
         console.log(res.data.token);
         console.log(jj.icon);
         console.log(jj.sign_content);
         console.log(jj.followed);
         
         o = {
           name: jj.name,
           token: jj.token,
           icon: jj.icon,
           sign_content: jj.sign_content,
           followed: jj.followed,
           follower: jj.follower,
         };
         console.log("o tostring"+o.toString);
         console.log("j tostring" + jj.toString);
         wx.setStorage({
           key: 'user_info',
           data: jj,
           success: function (res) {
             wx.showToast({
               title: '登录成功',
             }),
             wx.navigateBack({
               delta: 2
             })
           },
           fail: function () {
             wx.showToast({
               title: '加载数据失败',
             })
           }
         })
       } else {
         wx.showToast({
           title: "账号密码错误",
         })
       }

     }, function (res) {
       wx.showToast({
         title: '加载数据失败',
       })

     })
   }
})