
var app = getApp();
Page({
  data: {
    searchlist: [
      {
      }
    ],

  },
  onLoad: function (options) {
    var searchname = JSON.parse(options.model);
    var that=this;
    wx.request({
      url: getApp().globalData.url + 'addon/StoreList/StoreList/getSearch',
      method: 'POST',
      data: searchname,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          searchlist: res.data,
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
  formSubmit: function (e) {

    var that = this;
    var model = JSON.stringify(e.detail.value)
    if (e.detail.value.searchname.length == 0) {
      this.setData({
        tip: '提示：搜索不能为空！',
      })
    } else {
      wx.redirectTo({
        url: '../search/search?model=' + model,
      })
    }
  },
  gotoindex: function (e) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  

})