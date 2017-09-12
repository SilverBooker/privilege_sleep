var app = getApp()
Page({
  data: {
    statusType: ["选择您在本店申请返利的订单"],
    currentTpye: 1,
    orderList: [],
    tabClass: ["", "", ""],
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.setData({
      currentTpye: curType
    });
    //  this.onShow();
    this.onLoad();
  },
  gotoindex: function (e) {
    wx.reLaunch({
      url: '/pages/more/more',
    })
  },
  goodsDetail: function (e) {
    var goodsId = e.currentTarget.dataset.id;
    var sdId = e.currentTarget.dataset.sdid;
    wx.navigateTo({
      url: "/pages/goods/goods?id=" + goodsId + "&sdid=" +sdId
    })
  },
  onLoad: function () {
    var that = this;
    var token = wx.getStorageSync("openid");
    var status = that.data.currentTpye;
    var postData = {
      token: token,
      status: status,
      code: getApp().globalData.scancode
    };
    wx.request({
      url: getApp().globalData.url + 'addon/OrderTable/OrderTable/getRebateList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的 参数
      success: function (res) {
        console.log(res)
        that.setData({
          orderList: res.data
        })
      }
    })
    // console.log("length:",that.data.orderList.length);
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    wx.stopPullDownRefresh();
    console.log('刷新');
    this.onLoad();
  },
})