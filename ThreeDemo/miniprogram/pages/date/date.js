import { createScopedThreejs } from 'threejs-miniprogram'
const { cubeModel } = require('./cubeModel')
const app = getApp()
// pages/date/date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.createSelectorQuery()
      .select('#cube1')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        // 创建一个与 canvas 绑定的 three.js
        const THREE = createScopedThreejs(canvas)
        // 传递并使用 THREE 变量
        cubeModel(canvas, THREE)
      })
    wx.createSelectorQuery().select('#cube2').node().exec((res) => {
        const canvas = res[0].node
        const THREE = createScopedThreejs(canvas)
        cubeModel(canvas, THREE)
      })
    wx.createSelectorQuery().select('#cube3').node().exec((res) => {
      const canvas = res[0].node
      const THREE = createScopedThreejs(canvas)
      cubeModel(canvas, THREE)
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