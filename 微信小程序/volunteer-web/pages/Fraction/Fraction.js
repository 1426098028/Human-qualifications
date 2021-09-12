import Toast from '@vant/weapp/toast/toast';
const { SearchRanking, SearchFraction } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({
    //使用多个插槽
    options: {
        //样式独立hua
        styleIsolation: 'shared',
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 页面的初始数据
     */
    data: {
        //保存当前请求状态码
        StatusCode: '',
        disabled: true,
        Fractiontitle: "排名录取分析",
        numPages: 1,//页码
        Pages: 20,//显示条数
        Ranking: "", //排名
        Fraction: "", //分数
        RangeVal1: "", //分数范围1
        RangeVal2: "", //分数范围2
        ///科类选择 --开始
        Choice: "点击选择科类",
        showPicker: false,//显示隐藏弹窗
        Familys: ["文科", "理科", "综合改革", "其他"],
        // 选择其他显示输入框
        FamiliesScreen: true,//显示隐藏弹窗是否为科类填写状态
        //科类选择 --结束
        //表内容
        rows: [
            // { name: 1, level_name: 'dick', MajorScore: 25, Pitching: '60', },
        ],
        //设置表头
        headers: ['学校', '学历', '专业分数线', '学校投档线'],
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
    //点击显示弹窗
    onFamily() {
        this.setData({
            showPicker: true,
        })
    },
    //点击空白地方隐藏弹窗
    onClose() {
        this.setData({
            showPicker: false
        });
    },
    // 取消选择
    onCancel() {
        this.setData({
            showPicker: false
        });
    },
    //点击确定隐藏弹窗
    onConfirm(event) {
        if (event.detail.value === "其他") {
            this.setData({
                FamiliesScreen: false,
                showPicker: false,
                Choice: "",
            });
            return false
        }
        this.setData({
            Choice: event.detail.value,
            showPicker: false
        });
    },
    //其他
    onChoice(event) {
        console.log(event.detail)
        this.setData({
            Choice: event.detail
        });
    },
    //排名     --发请求
    onRanking(event) {
        console.log(event.detail)
        this.setData({
            Ranking: event.detail,
            Fraction: '',
            disabled: false,
        });
        this.Rankingdata(this.data.Ranking, this.data.Fraction)
    },
    //分数     --发请求
    onFraction(event) {
        console.log(event.detail)
        if (Number(event.detail) < 10 || event.detail === "" || Number(event.detail) === 0) {
            this.setData({
                Fraction: event.detail,
                RangeVal1: "",
                RangeVal2: "",

            });
            return false
        }
        this.setData({
            Fraction: event.detail,
            Ranking: '',
            RangeVal1: Number(event.detail) - 10,
            RangeVal2: Number(event.detail) + 10,
            disabled: false,
        });
        this.Rankingdata(this.data.Ranking, this.data.Fraction)
    },
    //分数范围1
    onRangeVal1(event) {
        console.log(event.detail)
        if (this.data.Fraction === "") {
            Toast("我的分数不能为空")
            return false
        }
        if (Number(event.detail) > Number(this.data.Fraction)) {
            Toast(`不能大于${this.data.Fraction}`)
        }
        this.setData({
            RangeVal1: event.detail,
            disabled: false,
        });
    },
    //分数范围2
    onRangeVal2(event) {
        console.log(event.detail)
        if (this.data.Fraction === "") {
            Toast("我的分数不能为空")
            return false
        }
        if (Number(event.detail) <= Number(this.data.Fraction)) {
            Toast(`不能小于${this.data.Fraction}`)
        }
        this.setData({
            RangeVal2: event.detail,
            disabled: false,
        });
    },
    // 搜索
    onSearch() {
        console.log("搜索")
        if (this.data.Ranking === "") {
            Toast("我的排名不能为空")
            return false
        }
        // if (this.data.Fraction === "") {
        //     Toast("我的分数不能为空")
        //     return false
        // }
        this.setData({
            rows: [],
            disabled: true,
        })
        this.Searchdata()
    },
    //排名请求
    async Rankingdata(Ranking, Fraction) {
        let SearchRankingdata = await SearchRanking({
            body: {
                r: Ranking,//排名/位次
                s: Fraction,//分数
                // t: "",//科类：文科/理科/综合改革等
                pv: wx.getStorageSync('Latlong'),
            },
            params: {},
        })
        console.log("111111", SearchRankingdata.data.data[0])
        if (SearchRankingdata.data.code === 200) {
            //排名/位次
            if (Ranking !== "" && SearchRankingdata.data.data[0] !== undefined) {
                this.setData({
                    Fraction: SearchRankingdata.data.data[0].score,
                    RangeVal1: Number(SearchRankingdata.data.data[0].score) - 10,
                    RangeVal2: Number(SearchRankingdata.data.data[0].score) + 10,
                    Choice: SearchRankingdata.data.data[0].type
                });
                return false
            }
            //分数
            if (Fraction !== "" && SearchRankingdata.data.data[0] !== undefined) {
                this.setData({
                    Ranking: SearchRankingdata.data.data[0].rank,
                    Choice: SearchRankingdata.data.data[0].type
                });
                return false
            }
            console.log(SearchRankingdata.data.data[0])
        }
    },
    //分数请求
    async Searchdata() {
        let SearchFractiondata = await SearchFraction({
            body: {
                p: this.data.numPages,
                s: this.data.Pages,
                gt: this.data.RangeVal1,
                lt: this.data.RangeVal2,
                t: this.data.Choice === "点击选择科类" ? "" : this.data.Choice,
                pv: wx.getStorageSync('Latlong'),
            },
            params: {},
        })
        this.setData({
            StatusCode: SearchFractiondata.status,
        })
        if (SearchFractiondata.data.code === 200) {
            console.log(SearchFractiondata.data.data)
            if (SearchFractiondata.data.data.length === 0) {
                Toast("暂无相关学校")
            }
            for (var i = 0, len = SearchFractiondata.data.data.length; i < len; i++) {
                console.log(SearchFractiondata.data.data[i])
                this.setData({
                    rows: this.data.rows.concat({
                        // MajorScore: "Vip查看",
                        MajorScore: '<p class="VIPview">Vip查看</p>',
                        Pitching: '<p class="Ordinary">查看</p>',
                        ...SearchFractiondata.data.data[i],
                    }),
                    disabled: true,
                })
            }
            console.log(this.data.rows)
        }
    },
    //表格功能
    onClick(e) {
        // console.log("学校", e.detail.currentTarget.dataset)
        // console.log("学校", e.detail.currentTarget.dataset.grid)
        // console.log("学校", e.detail.currentTarget.dataset.outindex)
        // console.log("学校", `${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid)
        //查学校
        if (`${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid) {
            console.log("学校字", e.detail.currentTarget.dataset.school)
            wx.navigateTo({
                url: `/pages/School/School?SchoolName=${e.detail.currentTarget.dataset.school}`,
            })
        }
        //  专业分数线
        if (`${e.detail.currentTarget.dataset.outindex}-2` === e.detail.currentTarget.dataset.grid) {
            console.log("Vip专业分数线", e.detail.currentTarget.dataset)
            wx.navigateTo({
                url: `/pages/ProfessionalScore/ProfessionalScore?SchoolName=${e.detail.currentTarget.dataset.school}&Fraction=${this.data.Fraction}&RangeVal1=${this.data.RangeVal1}&RangeVal2=${this.data.RangeVal2}`,
            })
        }
        //学校投档线  ---完成
        if (`${e.detail.currentTarget.dataset.outindex}-3` === e.detail.currentTarget.dataset.grid) {
            console.log("普通学校投档线", e.detail.currentTarget.dataset, this.data.rows[e.detail.currentTarget.dataset.outindex].score)
            wx.setStorageSync(`SchoolName`, e.detail.currentTarget.dataset, this.data.rows[e.detail.currentTarget.dataset.outindex].score)
            wx.navigateTo({
                url: `/pages/PitchingLine/PitchingLine?SchoolName=${this.data.rows[e.detail.currentTarget.dataset.outindex].name}`,
            })
        }
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        //判断数据是否加载完毕
        if (this.data.StatusCode === 404) {
            return false
        }
        if (this.data.StatusCode >= 200 && this.data.StatusCode < 300 && this.data.StatusCode === 200) {
            await this.data.numPages++
            //搜索
            this.Searchdata()
            console.log(this.data.rows)
            console.log("页面上拉触底事件的处理函数")
            return false
        }
        if (this.data.StatusCode === 429) {
            const timer = setInterval(() => {
                this.Searchdata()
                  clearInterval(timer);
              },8000);
        }

    },










})