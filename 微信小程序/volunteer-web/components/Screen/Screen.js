// components/Screen/Screen.js
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
    //是否显示筛选
    Popupshow: {
      type: Boolean,
      show: false
    },
    //标签
    SaveScreenResult: {
      type: Array,
      value: []
    },
    //省份
    SaveScreenRadio: {
      type: Array,
      value: []
    },
    //筛选结果
    ScreeningResults: {
      type: String,
      value: ''
    }
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
    
    // 关闭弹出层时触发
    onClose() {
      this.triggerEvent("onClose")
    },

    //标签  当绑定值变化时触发的事件
    onCheckboxScreen(event) {
      this.triggerEvent("onCheckboxScreen", event)
      this.setData({
        SaveScreenResult: event.detail,
      });
    },
    //省份已选中  当绑定值变化时触发的事件
    onRadioScreen(event) {
      this.triggerEvent("onRadioScreen", event)
      this.setData({
        SaveScreenRadio: event.detail,
      });
    },
    //省份未选中  当绑定值变化时触发的事件
    onProvince(event) {
      // console.log("当前点击的值",event)
      this.triggerEvent("onProvince" ,event )

    },
    //重置筛选----点击重置筛选时触发事件
    onResetFilter() {
      this.triggerEvent("onResetFilter")
    },
    //重置筛选----点击提交筛选时触发事件
    onSubmitFilter() {
      this.triggerEvent("onSubmitFilter")
    },
  }
})
