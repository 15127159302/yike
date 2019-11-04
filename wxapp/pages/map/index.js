// pages/map/index.js

// 获取当前时间
var util=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    // 具体定位
    longitude:"113.324520",
    latitude:"23.099994",
    isshow:false,   // 弹出框 调用条件
    content:"哈哈哈",
    openisshow:false, // 展开true 隐藏false  
    height:"",
    date:"",// 当前时间
    selectArray: [{
      "id": "10",
      "text": "会计类"
    }, {
      "id": "21",
      "text": "工程类"
    }],
    // selectArrays: [{
    //   "id": "16",
    //   "text": "我我我我我"
    // }, {
    //   "id": "33",
    //   "text": "eee"
    // }],


    // 用户的具体位置   多个点 
    markers: [{
        // 图片
        iconPath: "/resources/others.png",
        id: 0,
        latitude:"", // 当前定位的经纬度
        longitude: "",
        width: 50,   // 设置图片的大小
        height: 50,
     
    }, { 
        id:1,
        latitude: "39.9226", // 当前定位的经纬度
        longitude: "116.44355",
        width: 50,   // 设置图片的大小
        height: 50
      }],
      // 圈
    circles: [{
      latitude: "",
      longitude:"",
      color: '#FF0000DD', // 最外层线的颜色
      fillColor: '#7cb5ec88',   // 圈的颜色
      radius: 1000,  //  圈的半径
      strokeWidth: 1,
      position: {
        top: 200
      }
    }],
    
     
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 获取当前时间
    var TIME = util.formatTime(new Date());
    that.setData({
      time: TIME,
    });
    console.log(that.data.time)







    wx.getLocation({
      type: '需要获取用户的地理位置',
      success: function (res) {
        // res.latitude res.longitude
        console.log(res.latitude, res.longitude)
        // 获取经纬度
        let latitude = 39.922
        let longitude = 116.44375 
        
        // 标记点获取值
        let markers = that.data.markers
        markers[0].latitude = 39.922
        markers[0].longitude = 116.44375 

        // 半径
        let circles=that.data.circles
        circles[0].latitude = 39.922
        circles[0].longitude = 116.44375 

        // 渲染视图
        that.setData({
          markers,
          longitude,
          latitude,
          circles
        })  
         
        // 判断是否在打卡范围     1是1公里
        if (that.getGreatCircleDistance(39.922, 116.44375, res.latitude, res.longitude)<=1){
          console.log("打卡")
        }else{
          console.log("未在范围内")
        }
        

       
        
      }
    })
   
  },
  
  // 计算 当前位置到 定点位置的距离
  getGreatCircleDistance(lat1, lng1, lat2, lng2) {
      var EARTH_RADIUS = 6378.137; //地球半径
      function rad(d) {
          return d * Math.PI / 180.0;
      }

      var radLat1 = rad(lat1);
      var radLat2 = rad(lat2);
      var a = radLat1 - radLat2;
      var b = rad(lng1) - rad(lng2);
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
      s = s * EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;//返回数值单位：公里
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 调用弹窗事件 true为调用 false为取消
    this.setData({
      "isshow":true
    })
    console.log(this.data.isshow)
    this.dialog = this.selectComponent("#dialog"); 
  },

  // 弹出框的  事件
  showDialog() {
    this.dialog.showDialog();
  },
  //取消事件 
  _cancelEvent() {
    this.setData({
      "isshow": false
    })
    
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件 
  _confirmEvent() {
    this.setData({
      "isshow": false
    })
    
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },



  //  展开隐藏
  Open:function(){
    let that=this
    let openisshow = that.data.openisshow
    let height = that.data.height
    openisshow=true
    height ="100%"
    that.setData({
      openisshow,
      height
    })


  },

  Close:function(){
    let that = this
    let openisshow = that.data.openisshow
    let height = that.data.height
    openisshow = false
    height = ""
    that.setData({
      openisshow,
      height
    })
  } ,


  // 下拉框
  getDate: function (e) {
    console.log(e.detail)
  },
  // getList:function(e){
  //   console.log(e.detail)
  // } ,

  // 回到当前位置
  Location:function(e){
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
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