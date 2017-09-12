//logs.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
   idDetail:{}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  orderlistclick(event) {
    const that = this;
    wx.navigateTo({
      url: '../order-list/order-list',
    })
  },
  moneyclick(event) {
    const that = this;
    wx.navigateTo({
      url: '../purse/purse',
    })
  },
  codeclick(event) {
    var that = this;
    var show;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        getApp().globalData.scancode = res.result;

        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../scan-list/scan-list',
        })
      },
      fail: (res) => {
        wx.showModal({
          title: '失败',
          content: '请在光源充足的环境下扫描二维码',
        })
      },
      complete: (res) => {
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    var openid = wx.getStorageSync("openid")
    var idData = {
      token: openid,
      // remark: remark
    };
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    }),
      wx.request({
        url: 'https://ygocore.cn/weicms/index.php?s=/addon/UserList/UserList/idDetail',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: idData, // 设置请求的 参数
        success: function (res) {
          console.log(res)
          that.setData({
            idDetail: res.data
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

  idcard:function(){
    wx.navigateTo({
      url: '../idcard/idcard?',
    })
  }


})