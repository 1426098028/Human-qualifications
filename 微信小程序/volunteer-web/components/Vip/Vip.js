// components/Vip/Vip.js
let app = getApp()

Component({


  //使用多个插槽
  options: {
    //样式独立hua
    styleIsolation: 'shared',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
  
  },

  /**
   * 组件的初始数据
   */
  data: {

  },








  /**
   * 组件的方法列表
   */
  methods: {
    onVipService() {
      wx.navigateTo({
          url: '/pages/Member/Member',
      })
      console.log("会员服务")
  },
  }
})
