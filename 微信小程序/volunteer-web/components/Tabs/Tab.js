// components/Tabs/Tab.js
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
        LeftValue: {
            type: String,
            value: ''
        },
        RightValue: {
            type: String,
            value: ''
        },
        // active: {
        //     type: Number,
        //     value: 0
        // }



    },

    /**
     * 组件的初始数据
     */
    data: {
        LeftValue: "左",
        RightValue: "右",
        active: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onChangeTab(e) {
            this.triggerEvent("onChangeTab", e)
            console.log(e)

        },
    }
})