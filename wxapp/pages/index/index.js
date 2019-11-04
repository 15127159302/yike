//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },




// 用户授权登录
  onGotUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
   // 获取用户code
    wx.login({
      success(res) {
        console.log(res)
        // 微信返回的code   
        console.log(res.code)
      }
    })
  }
})
