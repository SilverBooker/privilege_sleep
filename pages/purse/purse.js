//discovery.js
var util = require('../../utils/util.js')

Page({
  data: {
    navTab: ["账单", "提现"],
    currentNavtab: "0",
    imgUrls: [

    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    purse: [{}],
    purseDetail:[{}]
  },


  onLoad: function () {
    console.log('onLoad')
    var that = this
    var openid = wx.getStorageSync("openid")
    var postData = {
      token: openid,
      // remark: remark
    };
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/WithdrawalTable/WithdrawalTable/purseDetail',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: postData, // 设置请求的 参数
      success: function (res) {
        console.log(res)
        that.setData({
          purseDetail: res.data
        })
      }
    }),
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/WithdrawalTable/WithdrawalTable/getPurse',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: postData, 
      success: function (res) {
        console.log(res.data)
        that.setData({
          purse: res.data
        })
      }
    })
  },
  formSubmit: function (e) {

    var that = this;
    var formData = e.detail.value;
    var openid = wx.getStorageSync("openid")
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为："  +  timestamp);
    console.log(formData.txmoney)
    var temp = that.data.purseDetail.money-formData.txmoney
    if((formData.txmoney>0)&&(temp>0)){
    var purseData = {
      token: openid,
      timestamp: timestamp,
      txmoney:formData.txmoney,
      txname:formData.txname,
      txrealname:formData.txrealname,
      // remark: remark
    };
    wx.request({
      url: getApp().globalData.url +  'addon/WithdrawalTable/WithdrawalTable/addPurse',
      method: 'POST',
      data: purseData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        console.log(res.data)
    wx.showToast({
      title: '正在提现',
      icon:'loading',
      duration: 2000
    });
    that.onLoad();
      },
      
    })   
  }else{
      wx.showToast({
        title: '请输入一个正确的金额',
        icon: 'loading',
        duration: 500
      });
  }

  
},
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      allValue: ''
    })
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    wx.stopPullDownRefresh();
    console.log('刷新');
    this.onLoad();
  },

})
