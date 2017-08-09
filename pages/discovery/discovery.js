//discovery.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["推荐", "预留", "预留", "预留"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
   
   goods:[]
  },
 
   
    onLoad: function () {
      console.log('onLoad')
      var that = this
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
