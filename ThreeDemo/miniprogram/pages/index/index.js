import {
  createScopedThreejs
} from 'threejs-miniprogram'
const {
  renderModel
} = require('../test-cases/model')
const app = getApp()
const db = wx.cloud.database()
const information = db.collection("information")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inform: '',
    vedioSrc: 'cloud://color-0d38e6.636f-color-0d38e6-1258790240/武汉大学校园_好看视频.mp4',
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    information.get().then(res => {
      //console.log(res)
      this.setData({
        inform: res.data[0]
      })
    })
    // wx.createSelectorQuery()
    //   .select('#webgl')
    //   .node()
    //   .exec((res) => {
    //     const canvas = res[0].node
    //     // 创建一个与 canvas 绑定的 three.js
    //     const THREE = createScopedThreejs(canvas)
    //     // 传递并使用 THREE 变量
    //     renderModel(canvas, THREE)
    //   })
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
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
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