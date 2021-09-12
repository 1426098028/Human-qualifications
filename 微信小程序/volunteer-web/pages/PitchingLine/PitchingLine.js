// pages/PitchingLine/PitchingLine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //表内容
    rows: [
      // { name: 1, level_name: 'dick', MajorScore: 25, Pitching: '60', },
    ],
    //设置表头
    headers: ['学科', '最低录取分数线', '年份', '学籍地'],
    //设置表头字段
    keys: ['type', 'min', 'year', 'SchoolPlace'],
    tableConfig: {
      //设置单元格的宽
      columnWidths: ['', '', '', '', ''],
      border: true,
      scroll: true,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.SchoolName)
    wx.setNavigationBarTitle({
      title:  options.SchoolName  
    })
  },



  onClick(e) {
    console.log(
      console.log("sssss")

    )
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    for (var i = 0, len = wx.getStorageSync('SchoolName').score.length; i < len; i++) {
      this.setData({
        rows: this.data.rows.concat({
          SchoolPlace: wx.getStorageSync('SchoolName').score[i].province_name.name,
          ...wx.getStorageSync('SchoolName').score[i],
        })
      })
    }
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
      console.log("清空页面数据-监听页面隐藏")
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log("清空页面数据-监听页面卸载")
      //清空页面数据
      wx.removeStorageSync('SchoolName')
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