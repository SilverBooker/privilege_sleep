var app = getApp()
Page({
  data: {
    statusType: ["选择您在本店申请返利的订单"],
    currentTpye: 0,
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
  orderVerity: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var postData = {
      id:id,
      time:timestamp
    }
    wx.request({
      url: getApp().globalData.url + 'addon/OrderTable/OrderTable/orderVerity',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:postData,
      success:function (res){
        console.log(res)
        if (res.data != 1) {
          wx.showModal({
            title: '网络异常或该返利订单已过期',
            // content: res.data.msg,
            showCancel: false
          })
          return;
        }
        else{
          wx.reLaunch({
            url: '/pages/after/after',
          })
        }
      }
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