Component({
	    //使用多个插槽
			options: {
        //样式独立hua
        styleIsolation: 'shared',
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
	data: {
		active: 0,
		list: [
			{
				url: "/pages/index/index",
				icon: "wap-home-o",
				text: "首页"
		},
		{
				url: "/pages/My/My",
				icon: "contact",
				text: "我的"
		}
		]
	},
	//事件函数处理
	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},
		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
