//app.js
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if(res.code){
            console.log(res.code);
            wx.request({
              url: that.url+'addon/UserList/UserList/sendCode',
              data:{
                code:res.code,
                PHPSESSID: wx.getStorageSync('PHPSESSID')
              },
              
              success:function(res){
                // 缓存sessionID
                wx.setStorageSync('PHPSESSID', res.data.PHPSESSID)
                wx.setStorageSync('openid', res.data.openid)

                //获取用户信息
                wx.getUserInfo({
                  success:function(res){
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    // console.log(res);

                    wx.request({
                      url: that.url + 'addon/UserList/UserList/saveUserInfo',
                      data:{
                        encryptedData: res.encryptedData,
                        PHPSESSID: wx.getStorageSync('PHPSESSID'),
                        iv: res.iv
                      },
                      success: function (res){
                        console.log(res)
                      }
                    })

                  }
                })
              }
            })
          }

          // wx.getUserInfo({
          //   success: function (res) {
          //     that.globalData.userInfo = res.userInfo
          //     typeof cb == "function" && cb(that.globalData.userInfo)
          //   }
          // })
        }
      })
    }
  },
  globalData:{
    xx: 117.23361,
    yy: 31.826626,
    userInfo:null,
    scancode:null

  },
  url:'https://ygocore.cn/weicms/index.php?s=/'
})