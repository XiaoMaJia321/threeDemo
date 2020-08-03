// pages/room2/room2.js
const db = wx.cloud.database()
const floor = db.collection("floor")
const user = db.collection('user')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName: '',
    roomId: '',
    siteId: '',
  },
  click: function (e) {
    this.setData({
      siteId: e.currentTarget.id
    })
    wx.cloud.callFunction({
      name: 'getUser',
      complete: res => {
        //console.log('callFunction',res.result.openId)
        user.where({
          _openid: res.result.openId
        }).get().then(res2 => {
          //console.log(res2.data[0])
          if (res2.data[0].date == "null") {
            user.doc(res2.data[0]._id).update({
              data: {
                date: this.data.roomName + "-" + this.data.siteId,
                roomId: this.data.roomId,
                siteId: this.data.siteId
              },
              success: res3 => {
                floor.doc(this.data.roomId).update({
                  data: {
                    [`site.${this.data.siteId}.1`]: 'red',
                    [`site.${this.data.siteId}.2`]: res2.data[0].nickName,
                    count: _.inc(1)
                  },
                  success: res4 => {
                    wx.showToast({
                      title: '预约成功！！',
                      icon: 'success',
                      success: res5 => {
                        wx.navigateBack({
                          delta: 2
                        })
                      }
                    })
                  }
                })
              }
            })

          } else {
            wx.showToast({
              title: '已存在预约！！',
            })
          }
        })
      }
    })
    //console.log(e)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    floor.doc(options.id).get().then(res => {
      //console.log(res.data)
      this.setData({
        site: res.data.site,
        roomId: options.id,
        roomName: res.data.name
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})