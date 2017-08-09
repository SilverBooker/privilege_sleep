//var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    statusType:["未使用","待发放","已发放"],
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    orderList: [
      {
        goodsImg: "../../images/24280.png",
        des: "爱马仕（HERMES）大地男士香水大地男士香水大地如果有两行就这样显示超出部分用省…超出部分用省…",

        price: "300.00",
        orderDate: "2017.03.04 10:33:33",
        orderStatus: "已关闭"
      },
      {
        goodsImg: "../../images/24280.png",
        des: "爱马仕（HERMES）大地男士香水大地男士香水大地如果有两行就这样显示超出部分用省…超出部分用省…",
        price: "400.00",
        orderDate: "2017.03.05 10:33:33",
        orderStatus: "待付款"
      },
    ]
  },
   statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentTpye = curType
     this.setData({
      currentTpye:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    wx.stopPullDownRefresh();
    console.log('刷新');
    this.onLoad();

  },
})