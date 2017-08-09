var app = getApp()
Page({
  data: {
    show: "",
  },

  onLoad: function () {
    console.log('onLoad')
  },
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
        getApp().globalData.scancode=res.result;

        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})  