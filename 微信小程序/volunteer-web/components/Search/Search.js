Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // hidden   true  --隐藏  false  --显示
        Associa: {
            type: Boolean,
            value: true 
        },
        isSchool: {
            type: Boolean,
            value: true
        },
        isMajor: {
            type: Boolean,
            value: true
        },
        SearchKeywords: {
            type: String,
            value: ""
        },
        WordArr: {
            type: Array,
            value: []
        },
        SchoolArr:{
            type:Array,
            value:[]
        },
        MajorArr:{
            type:Array,
            value:[]
        },
        MoreMajor:{
            type:Boolean,
            More:false,
        },
        More:{
            type:Boolean,
            More:false,
        }



    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 输入内容变化时触发
        onChange(e) {
            this.triggerEvent("onChange", e)
        },
        // 点击热搜索数据时触发
        getWord(e) {
            this.triggerEvent("getWord", e)
        },
        // 点击搜索时触发
        onSearch() {
            this.triggerEvent("onSearch")
        },
        // 点击筛选时触发
        onScreen() {
            this.triggerEvent("onScreen")
        }

    }
})
