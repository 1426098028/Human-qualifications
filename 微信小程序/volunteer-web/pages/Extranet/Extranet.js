// pages/Extranet/Extranet.js
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.OpenLoadingStatus()

  this.setData({
    Url : options.Address
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
// this.CloseLoadingStatus()
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
//开启数据加载状态
 OpenLoadingStatus() {
  const ToastLoading = Toast.loading({
      duration: 0, // 持续展示 toast   0一直接加载
      message: '加载中...',
      forbidClick: true,
  })
},
//关闭数据加载状态
 CloseLoadingStatus() {
  Toast.clear();
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