import * as echarts from '../../ec-canvas/echarts';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ChartWordDomId: {
      type: String,
      ChartWordDomId: ""
    },
    WordCanvasId: {
      type: String,
      WordCanvasId: ""
    },
    Options: {
      type: Object,
      Options: {}
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      ec: true
    }
  },
  /**
   * 组件的方法列表
   */
  created() {
    this.AllChart =  this.AllPictures//把生成图表放到全局上
  },
  async attached() {
    console.log(this.data.ChartWordDomId)
    console.log(this.data.WordCanvasId)
   
    console.log("获取canvas   --Id", this.selectComponent(`#${this.data.ChartWordDomId}`))
      await this.AllPictures()
      console.log(this.AllChart)
  },
  methods: {
    async AllPictures() {
      await this.selectComponent(`#${this.data.ChartWordDomId}`).init((canvas, width, height, dpr) => {
        let chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        canvas.setChart(chart);
        let option = this.data.Options
        chart.setOption(option);//配置图表信息
        return chart;
      })
    },

  }
})
