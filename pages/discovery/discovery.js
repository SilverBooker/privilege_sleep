//discovery.js
var util = require('../../utils/util.js')
var app = getApp();
var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({
  data: {
    imgUrls:[],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
   
   goods:[]
  },
 
   
    onLoad: function () {
      console.log('onLoad')
      var that = this
      getApp().getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      }),
      wx.request({
        url: getApp().globalData.url + 'addon/SlideShow/SlideShow/getSlideShow',
        data: {},
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData({
            imgUrls: res.data
          })
        }
      }),
      wx.request({
        url: 'https://ygocore.cn/weicms/index.php?s=/addon/GoodList/GoodList/getList',
        data: {},
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData({
            goods: res.data
          })
        }
      })      
    },
    onPullDownRefresh: function () {
      // Do something when pull down.
      wx.stopPullDownRefresh();
      console.log('刷新');
      this.onLoad();

    },
    
})
