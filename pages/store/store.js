var app = getApp();
Page({

  data: {
    seeAllGoods: false,
    btnMsg: '查看全部',
    store:{},
    goods: [{}],

  },
  onReady() {
    var that = this;
    console.log('onReady');
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
  },
  //查看全部商品
  goodsmore(event) {
    const that = this;
    let msg = '查看全部';
    if (that.data.seeAllGoods) {
      msg = '查看全部';
    } else {
      msg = '收起';
    }
    that.setData({
      btnMsg: msg,
      seeAllGoods: !that.data.seeAllGoods,
    })
  },

  //打电话
  callPhone(event) {
    wx.makePhoneCall({
      // phoneNumber: '18581885527',
      phoneNumber: this.data.store.phone
    })
  },
  //商品详情

  onLoad: function (options) {
    var that = this
    console.log(options)
    
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getDetail',
      data: {id:options.id},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          store:res.data
        })
      }
    }),
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/GoodList/GoodList/getListbysdid',
      data: { sdid:options.id },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          goods: res.data
        })
      }
    })
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getXy',
      data: { id: options.id },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          xx: res.data,
        
        })
        getApp().globalData.xx = res.data;
      }
    })
    wx.request({
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/StoreList/StoreList/getYx',
      data: { id: options.id },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          yy: res.data
        })
        getApp().globalData.yy = res.data;
      }

    })
  },
  //地图
  mapLocation(event) {
    const that = this;
    wx.openLocation({
      latitude: getApp().globalData.yy, // 纬度，范围为-90~90，负数表示南纬
      longitude: getApp().globalData.xx, // 经度，范围为-180~180，负数表示西经
      scale: 50, // 缩放比例
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
  onPullDownRefresh: function () {
    // Do something when pull down.
    wx.stopPullDownRefresh();
    console.log('刷新');
    // this.onLoad();

  },

  
  
})