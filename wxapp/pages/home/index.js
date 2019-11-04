


//引入代码
var call = require("../../utils/request.js")

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let isRefesh = false; //正在下拉更多
let isloadmore = false; //正在下载更多
let istop = true;
let pageSize = 10;
let pageIndex = 1;
let totalpages = 1;
Page({
  data: {
    tabs: ["选项一", "选项二"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    wH: 500,
    mydata: [],
    isTop: true, //滚动条顶部
    loadMore: true,
    topNum: 0
  },
  onLoad: function () {
   
    
    // 判断
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    var that = this;
    wx.getSystemInfo({
      //通过 getSystemInfo  获取窗口的  试图高度
      success: function (res) {
        that.setData({
          wH: res.windowHeight - 60,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }

    });
    this.onPullDownRefresh2();


    //调用封装的方法，为了方便我直接在页面加载的时候执行这个方法
    call.getData('url', this.shuffleSuc, this.fail);

  },
  // 成功回调
  shuffleSuc: function (data) {
    console.log("成功");
  },
  // 失败回调
  fail: function () {
    console.log("失败");
  },
  



  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.onPullDownRefresh2()

  },
  onPullDownRefresh2() {
    isRefesh = true;
    isloadmore = false;
    istop = false;
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })

    let self = this;
    setTimeout(() => {
      self.getData();

    }, 2000)
  },
  //停止下拉事件
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
      
        // 隐藏 消息提示框
        wx.hideToast()
        
      }
    })
  },
  //滚动条到top
  doScrollTop(e) {
    console.log(e)
    istop = this.data.isTop
    if (e.detail.scrollTop < 10) {

      if (!istop) {
        this.setData({
          isTop: true
        })
      }
    } else {
      if (istop) {
        this.setData({
          isTop: false
        })
      }
    }
  },
  /**
   * 更多
   */
  loadmore() {
    let self = this;
    wx.showLoading({
      title: 'loading',
    })
    isloadmore = true;

    self.setData({
      loadMore: isloadmore,
    })
    setTimeout(() => {
      console.log(pageIndex)
      pageIndex++;

      self.getData();

    }, 2000)
  },
  getData() {
    wx.hideLoading();
    let mydata = this.data.mydata;
    if (isRefesh) {
      this.stopPullDownRefresh();
      mydata = [0, 1, 2, 3];
      console.log(mydata+"我的")
    } else {

      for (let i = 0; i < 5; i++) {
        mydata.push(i)
        console.log(mydata.length)
      }
    }
    this.setData({
      loadMore: false,
      mydata
    })
    isRefesh = false;
    isloadmore = false;
  },
  tabClick: function (e) {
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    let id = e.currentTarget.id
    if (id == 1) {
      this.setData({
        mydata: []
      })
    } else {
      this.onPullDownRefresh2();
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

});