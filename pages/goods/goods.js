var app = getApp();

Page({

  data: {

    goods: {},
    store: {},
  },
 
  banner(event) {
    const that = this;
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: that.data.goods.photo[parseInt(index)], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.goods.photo,
    })

  },
  gobuy(event) {
    // console.log(event);
    wx.setStorageSync('goods',this.data.goods)
    wx.setStorageSync('store', this.data.store)
    wx.navigateTo({
      url: '../to-pay-order/index',
    })
  },
  storeDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/store/store?id=" + id
    })
  },

  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.store.phone,
    })
  },
  



  onLoad: function (options) {
    var that = this
    console.log("the sdid is :", options.sdid)

    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/GoodList/GoodList/getDetail',
      data: { id: options.id },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          goods: res.data
        })
      }
    }),

      wx.request({
        url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getDetail',
        data: { id: options.sdid },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData({
            store: res.data
          })
        }
      })
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getXy',
      data: { id: options.sdid },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          xx: res.data,

        })
        getApp().globalData.xx = res.data;
      }
    })
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getYx',
      data: { id: options.sdid },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          yy: res.data
        })
        getApp().globalData.yy = res.data;
      }

    })
  },
  
  location(event) {
    const that = this;

    wx.openLocation({
      latitude: getApp().globalData.yy, // 纬度，范围为-90~90，负数表示南纬
      longitude: getApp().globalData.xx, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      name: '这是那儿哦', // 位置名
      address: '当前位置定位...', // 地址的详细说明
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


})