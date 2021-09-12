//引入echarts模块

import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
const { HotSearch, VipProspect } = require('../../utils/Api/config/Flymain-wx.js')
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
let newArr = []
// import * as echarts from '../../ec-canvas/echarts';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        //表内容
        rows: [
            { work_name: "EHS工程师", avg_salary: 6000, count: "33.6%" },
            { work_name: "EHS专员", avg_salary: 5000, count: "30.04%" },
            { work_name: "EHS主管", avg_salary: 8000, count: "11.46%" },
            { work_name: "EHS", avg_salary: 6000, count: "6.32%" },
            { work_name: "EHS安全工程师", avg_salary: 6000, count: "4.74%" },
            { work_name: "EHS咨询师(出差工作性质)", avg_salary: 8000, count: "4.35%" },
            { work_name: "2021届应届毕业生", avg_salary: 4000, count: "3.95%" },
            { work_name: "2020届建筑工程应届毕业生（安全员、试验员方向）", avg_salary: 3000, count: "2.77%" },
            { work_name: "2021届安全工程类大学生", avg_salary: 1000, count: "2.77%" },
        ],
        //设置表头
        headers: ['岗位名称', '岗位薪酬(中位数)', '岗位占比'],
        //设置表头字段
        keys: ['work_name', 'avg_salary', 'count',],
        tableConfig: {
            //设置单元格的宽
            columnWidths: ['210rpx', '240rpx', '210rpx',],
            border: true,
            scroll: true,
        },
        Hot: false,
        isPicker: true,
        Analysis: "",//输入框
        SaveAnalysis: "",//保存输入框
        Other: "",//其他条数输入框
        SaveOther: "",//保存其他条数输入框
        ValIndex: 0,
        SaveValIndex: 0,//保存当前索引值
        array: ['选择条数', '20', '40', '60', '其他条数'],
        objectArray: [
            {
                id: 0,
                name: '选择条数'
            },
            {
                id: 1,
                name: 20
            },
            {
                id: 2,
                name: 40
            },
            {
                id: 3,
                name: 60
            },
            {
                id: 4,
                name: "其他条数"
            }
        ],
        //请求data
        WordArr: [],
        // 初始化图表信息
        //饼图 Pie
        PieArrr: [
            { value: 8415, name: "EHS工程师", avg_salary: 6000 },
            { value: 7524, name: "EHS专员", avg_salary: 5000 },
            { value: 2871, name: "EHS主管", avg_salary: 8000 }, ,
            { value: 1584, name: "EHS", avg_salary: 6000 },
            { value: 1188, name: "EHS安全工程师", avg_salary: 6000 },
            { value: 1089, name: "EHS咨询师(出差工作性质)", avg_salary: 8000 },
            { value: 990, name: "2021届应届毕业生", avg_salary: 4000 },
            { value: 693, name: "2020届建筑工程应届毕业生（安全员、试验员方向）", avg_salary: 3000 },
            { value: 693, name: "2021届安全工程类大学生", avg_salary: 1000 },
        ],//生成饼图所需要的数据
        PieDom: "PieDom",
        PieCanvas: "PieCanvas",
        PieOptions: {},
        //气泡图 Bubble
        BubArr: [
            ["EHS工程师", 6000],
            ["EHS专员", 5000],
            ["EHS主管", 8000],
            ["EHS", 6000],
            ["EHS安全工程师", 6000],
            ["EHS咨询师(出差工作性质)", 8000],
            ["2021届应届毕业生", 4000],
            ["2020届建筑工程应届毕业生（安全员、试验员方向）", 3000],
            ["2021届安全工程类大学生", 1000],
        ],//生成气泡图所需要的数据
        JobArr: [
            ["EHS工程师"],
            ["EHS专员"],
            ["EHS主管"],
            ["EHS"],
            ["EHS安全工程师"],
            ["EHS咨询师(出差工作性质)"],
            ["2021届应届毕业生"],
            ["2020届建筑工程应届毕业生（安全员、试验员方向）"],
            ["2021届安全工程类大学生"],
        ],
        BubDom: "BubDom",
        BubCanvas: "BubCanvas",
        BubOptions: {},
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.rows = []
        app.duplicateRemoval = this.duplicateRemoval
        app.setcolor16 = this.setcolor16
        // 设置图表信息
        this.setData({
            PieOptions: this.PieOptions(),//饼图图表信息
            BubOptions: this.BubOptions()
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    //获取输入框内容
    onSearch(event) {
        // console.log("获取输入框内容", event.detail)
        this.setData({
            Analysis: event.detail
        })
        if (this.data.Analysis === "") {
            this.setData({
                Hot: false
            })
            return false
        }
        this.GetHotdata(event.detail)
    },
    //获取热搜索数据
    async getWord(event) {
        this.setData({
            Analysis: event.currentTarget.dataset.word
        })
        this.GetHotdata(event.currentTarget.dataset.word)
    },
    // 选择条数
    onPickerChange(event) {
        console.log(event.detail.detail.value)
        if (event.detail.detail.value === "0") {
            this.setData({
                ValIndex: 1
            })
            return false
        }
        if (event.detail.detail.value === "4") {
            this.setData({
                ValIndex: event.detail.detail.value,
                isPicker: false
            })
            return false
        }
        this.setData({
            ValIndex: event.detail.detail.value
        })
    },
    //输入条数
    onOther(event) {
        this.setData({
            Other: event.detail
        })

    },
    //生成分析报告
    async onReport() {
        if (this.data.Analysis === "") {
            Toast.fail("请输入相关的专业");
            return false
        }
        if (this.data.Analysis === this.data.SaveAnalysis && Number(this.data.array[this.data.ValIndex]) !== NaN && this.data.ValIndex === this.data.SaveValIndex && this.data.Other === this.data.SaveOther) {
            return false
        }

        console.log(this.data.ValIndex)
        if (this.data.ValIndex === '4') {
            console.log(this.data.Other)
            this.GetTradedata(this.data.Analysis, Number(this.data.Other))
            return false
        }

        this.GetTradedata(this.data.Analysis, Number(this.data.array[this.data.ValIndex]))

    },
    //获取热搜索数据
    async GetHotdata(Keyword) {
        //显示热搜索列表
        this.setData({
            Hot: true
        })
        //热搜索
        let HotSearchdata = await HotSearch({
            body: {
                m: Keyword,
                t: 2
            },
            params: {},
        })
        if (HotSearchdata.data.code === 200) {
            this.setData({
                WordArr: [],//热搜索数据
            })
            if (HotSearchdata.data.data.length > 0) {
                this.setData({
                    WordArr: HotSearchdata.data.data
                })
                return false
            }
            if (HotSearchdata.data.data.length === 0) {
                Toast.fail("请输入相关的专业");
                return false
            }
        }
    },
    //获取搜索数据  ----   Vip就业前景
    async GetTradedata(Keyword, PickerLength) {
        console.log(app.rows)
        //隐藏热搜索列表和保存当前搜索的值和保存当前索引值的值和保存其他条数输入框
        this.setData({
            Hot: false,//隐藏热搜索列表
            SaveAnalysis: this.data.Analysis,//保存当前搜索的值
            SaveValIndex: this.data.ValIndex,//保存当前索引值的值
            SaveOther: this.data.Other//保存其他条数输入框

        })
        let VipProspectdata = await VipProspect({
            body: {
                m: Keyword,
                token: wx.getStorageSync('token')
            },
            params: {},
        })
        let Arr = []
        let Pie = []
        let Bub = []
        let Job = [] //工作名字
        if (VipProspectdata.data.code === 200) {
            this.setData({
                rows: [],//热搜索数据
                PieArrr: [],
                BubArr: [],
                JobArr: [],
                PieOptions: {},
                BubOptions: {}
            })
            if (VipProspectdata.data.data.length === 0) {
                Toast.fail("暂无相关分析");
                return false
            }
            if (VipProspectdata.data.data.length > 0) {
                //处理显示条数
                console.log("VipProspectdata.data.data", VipProspectdata.data.data)
                if (isNaN(PickerLength) === true || PickerLength === 0 || PickerLength === "0") {
                    await Object.keys(VipProspectdata.data.data).forEach((item, index) => {
                        // console.log(index);
                        // Arr.push(VipProspectdata.data.data[index]);
                        // console.log(VipProspectdata.data.data[index].avg_salary)
                        // console.log(VipProspectdata.data.data[index].count)
                        // console.log(VipProspectdata.data.data[index].work_name)
                        Pie.push({
                            value: Number(VipProspectdata.data.data[index].count),
                            name: VipProspectdata.data.data[index].work_name,
                            avg_salary: Number(VipProspectdata.data.data[index].avg_salary),
                        })
                        Bub.push([
                            VipProspectdata.data.data[index].work_name,
                            Number(VipProspectdata.data.data[index].avg_salary),
                            // VipProspectdata.data.data[index].work_name,
                        ])
                        Job.push([
                            VipProspectdata.data.data[index].work_name,
                        ])
                    }
                    );

                    console.log("------------------------------------------", Job)
                    await this.setData({
                        rows: [],
                        PieArrr: Pie,
                        BubArr: Bub,
                        JobArr: Job
                    })
                    // //执行饼图和气泡图
                    const PieClass = this.selectComponent('.PieClass');//获取组件中所有信息
                    await PieClass.AllChart()//执行组件中饼图和气泡图的方法
                    const BubClass = this.selectComponent('.BubClass');//获取组件中所有信息
                    await BubClass.AllChart()//执行组件中饼图和气泡图的方法
                    // 设置图表信息
                    await this.setData({
                        PieOptions: this.PieOptions(),//饼图图表信息
                        BubOptions: this.BubOptions()//气泡图图表信息
                    })
                    // console.log('全部显示', this.data.rows, PickerLength)
                    // console.log("全部饼图数据", this.data.PieArrr)
                    // console.log("全部气泡图数据", this.data.BubArr)
                    // console.log("全部气泡图工作名字数据", this.data.JobArr)
                    //执行饼图和气泡图

                    return false
                }
                await Object.keys(VipProspectdata.data.data).forEach((item, index) => {
                    if (index + 1 <= Number(PickerLength)) {
                        // Arr.push(VipProspectdata.data.data[index]);
                        // console.log(VipProspectdata.data.data[index].avg_salary)
                        // console.log(VipProspectdata.data.data[index].count)
                        // console.log(VipProspectdata.data.data[index].work_name)
                        Pie.push({
                            value: Number(VipProspectdata.data.data[index].count),
                            name: VipProspectdata.data.data[index].work_name,
                            avg_salary: Number(VipProspectdata.data.data[index].avg_salary),
                        })
                        Bub.push([
                            VipProspectdata.data.data[index].work_name,
                            Number(VipProspectdata.data.data[index].avg_salary),
                            // VipProspectdata.data.data[index].work_name,
                        ])
                        Job.push([
                            VipProspectdata.data.data[index].work_name,
                        ])
                    }
                }
                );
                await this.setData({
                    rows: [],
                    PieArrr: Pie,
                    BubArr: Bub,
                    JobArr: Job
                })
                // //执行饼图和气泡图
                const PieClass = this.selectComponent('.PieClass');//获取组件中所有信息
                await PieClass.AllChart()//执行组件中饼图和气泡图的方法
                const BubClass = this.selectComponent('.BubClass');//获取组件中所有信息
                await BubClass.AllChart()//执行组件中饼图和气泡图的方法
                // 设置图表信息
                await this.setData({
                    PieOptions: this.PieOptions(),//饼图图表信息
                    BubOptions: this.BubOptions()//气泡图图表信息
                })
                console.log("饼图数据", this.data.PieArrr)
                console.log("气泡图数据", this.data.BubArr)
                console.log("气泡图工作名字数据", this.data.JobArr)
                return false
            }
        }
    },
    //饼图配置图表信息    ---   Optiondata 和Colour16 主要传入颜色 
    PieOptions() {
        app.rows = []
 
        return {
            // title: {
            //     text: '某站点用户访问来源',
            //     subtext: '纯属虚构',
            //     left: 'center'
            // },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            // },
            tooltip: {
                formatter: function (params) {
                    let data =
                        "岗位:" +
                        params.data.name +
                        "\n" +
                        "百分比:" +
                        params.percent +
                        "%";
                    return data;
                },
            },

            series: [
                {
                    name: '职位个数',
                    type: 'pie',
                    radius: '40%',
                    data: this.data.PieArrr,
                    label: {
                        formatter: function (params) {
                            console.log("----params-------", params);
                            app.rows.push({
                                work_name: params.data.name,
                                avg_salary: params.data.avg_salary,
                                count: params.percent + "%",
                            });
                            app.duplicateRemoval()
                        },
                    },
                    // itemStyle: {
                    //     normal: {
                    //         color: function (params) {
                    //             // setrgb();
                    //             // setcolor16();
                    //           let Col=  app.setcolor16();
                    //             console.log(Col)
                    //             return Col
                    //         },
                    //     },
                    // },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    },
    //气泡图配置图表信息
    BubOptions(Optiondata, Colour16) {
        let Length = this.data.BubArr.length
        return {
            dataZoom: {
                type: "slider",
                start: 0,
                end: 30,
            },
            dataset: {
                source: this.data.BubArr,
            },
            xAxis: {
                name: "职位",
                nameTextStyle: {
                    padding: [, 0, 0, -10],
                },
                data: this.data.JobArr,
                scale: true, //是否是脱离 0 值比例
            },
            yAxis: {
                name: "薪酬中位数（元/月）",
                nameTextStyle: {
                    padding: [0, 0, 0, 50],
                },
                scale: true, //是否是脱离 0 值比例
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    let data =
                        "岗位" +
                        params.data[0] +
                        "\n" +
                        "平均薪酬:" +
                        params.data[1];
                    return data;
                },
            },
            series: [{
                type: 'scatter',
                symbolSize: function (params) {
                    let result;
                    if (Length < 20) {
                        result = params[1] / 200;
                        return result;
                    }
                    if (Length < 40) {
                        result = params[1] / 260;
                        return result;
                    }
                    if (Length < 60) {
                        result = params[1] / 300;
                        return result;
                    }
                    if (Length < 10000) {
                        result = params[1] / 340;
                        return result;
                    }
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // setrgb();
                            // setcolor16();
                          let Col=  app.setcolor16();
                            console.log(Col)
                            return Col
                        },
                    },
                },
                markPoint: {
                    data: [
                        { type: "max", name: "最大值" },
                        { type: "min", name: "最小值" },
                    ],
                },
            }]
        }
    },
    //去重
    duplicateRemoval() {
        this.setData({
            rows: []
        })
        var result = [];
        var obj = {};
        for (var i = 0; i < app.rows.length; i++) {
            if (!obj[app.rows[i].work_name]) {
                result.push(app.rows[i]);
                obj[app.rows[i].work_name] = true;
            }
        }
        this.setData({
            rows: result
        })
        console.log(this.data.rows, app.rows, "======================= ");
    },
    //rgb颜色随机
    setrgb() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        getrgb = "(" + r + "," + g + "," + b + ")";

        // return rgb;
    },
    //十六进制颜色随机
    setcolor16() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        let getcolor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
        return getcolor
    },


})