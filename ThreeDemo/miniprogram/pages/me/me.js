// pages/me/me.js
const db = wx.cloud.database()
const user = db.collection("user")
const floor = db.collection("floor")
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    note: '',
    date: '',
    roomId: '',
    siteId: ''
  },
  cancel: function(e) {
    user.doc(this.data.user._id).update({
      data: {
        date: "null"
      },
      success: res => {
        //console.log("取消成功")
        floor.doc(this.data.roomId).update({
          data: {
            [`site.${this.data.siteId}.1`]: 'green',
            [`site.${this.data.siteId}.2`]: "null",
            count: _.inc(-1)
          },
          success: res2 => {
            wx.showToast({
              title: '取消成功',
              success: res2 => {
                var that = this
                that.onShow()
              }
            })
          }
        })

      }
    })
  },
  Input: function(e) {
    this.setData({
      note: e.detail.value
    })
    user.doc(this.data.user._id).update({
      data: {
        note:this.data.note
      },
    })
  },
  getUserInfo: function(result) {
    //console.log(result.detail.userInfo)
    user.where({
      _openid: result.detail._openid
    }).count().then(res => {
      //console.log(res.total)
      if (res.total == 0) {
        user.add({
          data: result.detail.userInfo,
        }).then(res => {
          wx.showToast({
            title: '登录成功',
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    user.get().then(res => {
      //console.log(res.data[0])
      this.setData({
        user: res.data[0],
        date: res.data[0].date,
        roomId: res.data[0].roomId,
        siteId: res.data[0].siteId
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})