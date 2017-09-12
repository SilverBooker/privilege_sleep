var util = require('../../utils/util.js')
Page({
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    var openid = wx.getStorageSync("openid")
    var postData = {
      token: openid,
      // remark: remark
    }; 
    var idData = {
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
      url: 'https://ygocore.cn/weicms/index.php?s=/addon/UserList/UserList/idDetail',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: idData, // 设置请求的 参数
      success: function (res) {
        console.log('hahahhaha')
        console.log(res)
        that.setData({
          idDetail: res.data
        })
      }
    })
  },
  formSubmit: function (e) {

    var that = this;
    var formData = e.detail.value;
    var openid = wx.getStorageSync("openid")
    console.log(formData)
    if (formData.idname > 0) {
      var IDData = {
        token: openid,
        idname: formData.idname,
        // remark: remark
      };
      wx.request({
        url: getApp().globalData.url + 'addon/UserList/UserList/getIdcard',
        method: 'POST',
        data: IDData,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data!= 0){
          console.log('hahahhaha')
          console.log(res)
          console.log(res.data)
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          });
          }
          else{
            wx.showModal({
              title: '错误',
              content: '绑定失败，检查是否授权登陆',
            })
          }
          that.onLoad();
        }
      })
    } else {
      wx.showToast({
        title: '请输入一个正确的身份证号码',
        icon: 'loading',
        duration: 500
      });
    }

  },

})