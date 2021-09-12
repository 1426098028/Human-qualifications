const { Location } = require('../../utils/AMap/LocationMap')
import Toast from '@vant/weapp/toast/toast';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //Map标签属性
    //缩放级别，取值范围为3-20
    ZoomLevel: 16,
    //定位方向
    direction: false,
    //指南针
    Compass: true,
    //自定义图标样式
    Markers: [],
    //经纬度
    latitude: null,//纬度
    longitud: null,//经度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.OpenLoadingStatus()
    await wx.removeStorageSync('SchoolTips')
    //自动获取定位
    this.onGetLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },


  //开启数据加载状态
  OpenLoadingStatus() {
    const ToastLoading = Toast.loading({
      duration: 0, // 持续展示 toast   0一直接加载
      message: '加载中...',
      forbidClick: true,
    });
  },
  //关闭数据加载状态
  CloseLoadingStatus() {
    const timer = setInterval(() => {
      Toast.clear();
      clearInterval(timer);
    }, 2000);
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () { },

  //自动获取定位
  async onGetLocation() {
    let onGetLocationdata = await Location.onGetLocation()
    this.setData({
      latitude: onGetLocationdata.latitude,
      longitude: onGetLocationdata.longitude,
      Markers: Location.onMarkers(onGetLocationdata.longitude, onGetLocationdata.latitude),
    })
    this.CloseLoadingStatus()
    wx.removeStorageSync('SchoolTips')
  },
  //点击获取定位
  async LocationSearch() {
     this.OpenLoadingStatus()
    let onClickLocationdata = await Location.onClickLocation()
    this.setData({
      latitude: onClickLocationdata.latitude,
      longitude: onClickLocationdata.longitude,
      Markers: Location.onMarkers(onClickLocationdata.longitude, onClickLocationdata.latitude),
    })
    this.CloseLoadingStatus()
    wx.removeStorageSync('SchoolTips')
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