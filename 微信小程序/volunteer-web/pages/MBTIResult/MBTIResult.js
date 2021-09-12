import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import * as echarts from '../../ec-canvas/echarts';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 初始化图表信息
    //雷达图 Radar
    //生成雷达图所需要的数据
    RadarArrr: {},
    RadarDom: "RadarDom",
    RadarCanvas: "RadarCanvas",
    RadarOptions: {},
    //测评分析报告
    Analysis: "",
    AddEvaluationdata: {},
    usernamedata: wx.getStorageSync('username') === "" ? "匿名" : wx.getStorageSync('username'),
    AnswerTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置图表信息
    this.setData({
      RadarArrr: JSON.parse(options.MBTI),
      Analysis: options.Analysis,
      AnswerTime: options.AnswerTime === undefined ? wx.getStorageSync('AnswerTime') : options.AnswerTime,
      AddEvaluationdata: wx.getStorageSync('AddEvaluationdata'),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.AddEvaluationdata)
  },

  //雷达图配置图表信息
  RadarOptions() {
    console.log(typeof this.data.RadarArrr)
    console.log(this.data.RadarArrr)
    return {
      tooltip: {
        confine: true,
      },
      radar: {
        radius: 80,
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: [
          { name: "E 外倾型", max: 100 },
          { name: "S 感觉型", max: 100 },
          { name: "J 判断型", max: 100 },
          { name: "T 思维型", max: 100 },
          { name: "I 内倾型", max: 100 },
          { name: "N 直觉型", max: 100 },
          { name: "P 知觉型", max: 100 },
          { name: "F 情感型", max: 100 },
        ],
      },
      series: [
        {
          name: "测评分析：",
          type: "radar",
          label: {
            normal: {
              show: true,
              position: "outer",
              formatter: "{c}%",
            },
          },
          symbolSize: 13,
          data: [
            {
              value: [
                this.data.RadarArrr.E,
                this.data.RadarArrr.S,
                this.data.RadarArrr.J,
                this.data.RadarArrr.T,
                this.data.RadarArrr.I,
                this.data.RadarArrr.N,
                this.data.RadarArrr.P,
                this.data.RadarArrr.F,
              ],
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: "rgba(255, 145, 141, 0.9)",
                    offset: 1,
                  },
                  {
                    color: "rgba(255, 145, 124, 0.1)",
                    offset: 0,
                  },
                ]),
              },
            },
          ],
        },
      ],
    }
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    this.setData({
      RadarOptions: this.RadarOptions(),//雷达图图表信息
    })
  },


})