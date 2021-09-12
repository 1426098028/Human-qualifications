// components/Tabbar/Tabbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
    },

    /**
     * 组件的方法列表
     */

    // onClick(event) {
    //     wx.showToast({
    //         title: `点击标签 ${event.detail + 1}`,
    //         icon: 'none',
    //     });
    //     wx.navigateTo({
    //         url: 'pages/My/My',
    //     })

    // },

    methods: {

        onChange: function(event) {
            console.log("ssss")
                // wx.showToast({
                //     title: `点击标签 ${event.detail + 1}`,
                //     icon: 'none',
                // });

            this.setData({
                active: event.detail
            })
            if (event.detail === 1) {
                wx.navigateTo({
                    url: '/pages/My/My',
                })
            }


        }



    }
})