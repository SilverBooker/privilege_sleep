
var app = getApp();
Page({
  data: {
    storelist: [
      {
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getList',
      data: {},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          storelist: res.data,
        });
      }
    })
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
 
    console.log('刷新');
    this.onLoad();
    wx.stopPullDownRefresh();
  },

})