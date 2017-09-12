//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    store: {},
    goods: {},
  },
  onLoad: function (e) { 
    var that = this;
    that.setData({
      // goodsJsonStr: goodsJsonStr,
      store: wx.getStorageSync('store'),
      goods: wx.getStorageSync('goods')
    });
    
  },
  createOrder: function (e) {
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为："  +  timestamp);
    wx.showLoading();
    var that = this;
    var openid = wx.getStorageSync("openid");
    var PHPSESSID = wx.getStorageSync("PHPSESSID");
    // console.log(openid)

    var postData = {
      token: openid,
      PHPSESSID:PHPSESSID,
      timestamp:timestamp,
      spid: that.data.goods.id,
      sdid: that.data.store.id,
      rebate_amount: that.data.goods.goldprice,
      life: that.data.goods.life,
      spname: that.data.goods.gname,
      spprice: that.data.goods.gprice,
      sdname: that.data.store.name
      // remark: remark
    };
    // console.log(postData);
    wx.request({
      url: getApp().globalData.url + 'addon/OrderTable/OrderTable/createOrder',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的 参数
      success: (res) => {
        wx.hideLoading();
        // console.log(res.data);
        console.log(res);
        if (res.data == 0) {
          wx.showModal({
            title: '网络异常或您还未登录，请检查小程序的授权情况',
            // content: res.data.msg,
            showCancel: false
          })
          return;
        }
        // 清空商店的缓存数据
        wx.removeStorageSync('store');
        wx.removeStorageSync('goods');
        // 下单成功，跳转到订单管理界面
        wx.reLaunch({
          url: "/pages/order-list/order-list"
        });
      }
    })
  },

})
