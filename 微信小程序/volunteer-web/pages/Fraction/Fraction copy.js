import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Fractiontitle: "查分数",
        Ranking: "", //排名
        Fraction: "", //分数
        RangeVal1: "", //分数范围1
        RangeVal2: "", //分数范围2
        //是否只读 --开始
        readonlyRanking: false, //排名
        readonlyFraction: false, //分数
        readonlyRangeVal1: false, //分数范围1
        readonlyRangeVal2: false, //分数范围2
        readonlyOtherVal: false, //其他输入框
        //是否只读 --结束

        ///科类选择 --开始
        valueSelector: "", //科类选择结果
        Familys: ["文科", "理科", "综合改革", "其他"],
        // 选择其他显示输入框
        Other: false,
        OtherVal: "", //其他内容
        showPicker: false,
        ///科类选择 --结束

        // 结果 --开始
        ResultRanking: "", //排名 结果
        ResultFraction: "", //分数  结果
        ResultRangeVal1: "", //分数范围1  结果
        ResultRangeVal2: "", //分数范围2  结果
        ResultvalueSelector: "", //科类选择结果  结果
        ResultOtherVal: "", //其他内容 结果
        // 结果 --结束

        //保存当前最大小分
        gte: "",
        lte: "",





        Choice: "点击选择科类",


        //选择的内容
        Familys: ["文科", "理科", "综合改革", "其他"],
        //选择到的内容
        dropdownValue: 0,

        //表内容
        rows: [
            { name: 1, level_name: 'dick', MajorScore: 25, Pitching: '60', },
            { name: 2, level_name: 'suan', MajorScore: 22, Pitching: '48', },
            { name: 3, level_name: 'join', MajorScore: 23, Pitching: '70', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
            { name: 4, level_name: 'mike', MajorScore: 26, Pitching: '60', },
        ],
        //设置表头
        headers: ['学校', '学历', '专业分数线', '学校投档线',],
        //设置表头字段
        keys: ['name', 'level_name', 'MajorScore', 'Pitching'],
        tableConfig: {
            //设置单元格的宽
            columnWidths: ['', '', '', ''],
            border: true,
            scroll: true,
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    //我的排位
    onRanking(e) {
        console.log("我的排位", e.detail.value)
    },
    //我的分数
    onFraction(e) {
        console.log("我的分数", e.detail.value)
    },
    onInput() { },
    //搜索
    onFractionSearch() {
        console.log("搜索")
    },
    //显示弹窗
    onPickerTrue() {
        this.setData({
            showPicker: true
        });
    },
    //点击确定隐藏弹窗
    onConfirm(event) {
        console.log(event.detail.value)
        this.setData({
            Choice: event.detail.value
        })
        if (event.detail.value === "其他") {
            this.setData({
                Other: true
            });
        }
        this.setData({
            showPicker: false
        });

    },
    //点击取消隐藏弹窗
    onCancel() {
        this.setData({
            showPicker: false
        });
    },
    //点击取消隐藏弹窗
    onClose() {
        this.setData({
            showPicker: false
        });
    },









































    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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