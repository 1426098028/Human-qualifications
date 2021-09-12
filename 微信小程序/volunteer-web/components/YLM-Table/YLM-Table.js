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
        starO: { // 收藏图标
            type: Boolean, // object[]
            value: true,
        },
        VanIcon: { // 收藏图标
            type: String, // object[]
            value: "star-o"
        },
        rows: { // 数据行，对象数组
            type: Array, // object[]
            value: []
        },
        headers: { // 表格标题队列
            type: Array, // string[]
            value: []
        },
        keys: { // 键值，顺序对应表格的顺序
            type: Array, // string[]
            value: []
        },
        config: {
            type: Object,
            value: {
                columnWidths: { // 设置单元格宽度
                    type: Array, // string[]
                    value: []
                },
                border: { // 是否显示border
                    type: Boolean,
                    value: true
                },
                scroll: { // 是否开启滚动
                    type: Boolean,
                    value: true
                },
                stripe: {
                    type: Boolean,
                    value: true
                },
                headbgcolor: {
                    type: String,
                    value: '#f3f0f0'
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        //排序方式
        drop: false
    },




    /**
     * 组件的方法列表
     */
    methods: {
        //排序
        onSort(e) {
            console.log("关键字（分）", e.target.dataset.key)
            console.log("表格名字", e.target.dataset.item)
            console.log("表格数据", this.data.rows)
            console.log(e.target.dataset.item)
            let LowestScore = /最低分/gm
            if (LowestScore.test(`${e.target.dataset.item}`)) {
                console.log("DeviceLogin", e.target.dataset.item)
                // 最低分排名排序
                if (e.target.dataset.item !== "最低分") {
                    this.UpDown("min_rank")
                    return false
                }
                // 最低分排序
                this.UpDown("min")
            }
            let Job = /岗位/gm
            if (Job.test(`${e.target.dataset.item}`)) {
                // 	岗位占比   .split('省')[0]
                if (e.target.dataset.item === "岗位占比") {
                    // 升序
                    if (this.data.drop === false) {
                        this.setData({
                            drop: true,
                            rows: this.data.rows.sort(function (a, b) {
                                console.log(Number(b.count.split('%')[0]))
                                return Number(b.count.split('%')[0]) - Number(a.count.split('%')[0])
                            })
                        })
                        return false
                    }
                    // 降序
                    if (this.data.drop === true) {
                        this.setData({
                            drop: false,
                            rows: this.data.rows.sort(function (a, b) {
                                return Number(a.count.split('%')[0]) - Number(b.count.split('%')[0])
                            })
                        })
                        return false
                    }
                    return false
                }
                // 岗位薪酬(中位数)
                this.UpDown("avg_salary")
            }
            console.log(this.data.rows);
        },
        // 升降排序
        UpDown(ObjKeyValue) {
            // 升序
            if (this.data.drop === false) {
                this.setData({
                    drop: true,
                    rows: this.data.rows.sort(function (a, b) {
                        return Number(b[ObjKeyValue]) - Number(a[ObjKeyValue])
                    })
                })
                return false
            }
            // 降序
            if (this.data.drop === true) {
                this.setData({
                    drop: false,
                    rows: this.data.rows.sort(function (a, b) {
                        return Number(a[ObjKeyValue]) - Number(b[ObjKeyValue])
                    })
                })
                return false
            }
        },
        //表格功能
        onClick(e) {
            this.triggerEvent("onClick", e)

            // // console.log(e.target.dataset)
            // console.log(" 数据行，对象数组", this.data.rows)
            // console.log("表格标题队列", this.data.headers)
            // console.log("键值，顺序对应表格的顺序", this.data.keys)
        },
    },

    /**
     * 声明周期函数
     */
    pageLifetimes: {

    }
})