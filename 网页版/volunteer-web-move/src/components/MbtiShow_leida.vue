<template>
  <div class="sssssss">
    <h4 class="divH4">测评分析报告图</h4>
    <!-- <div id="leida"></div> -->
    <div id="leida" style="width: 375px; height: 500px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "MbtiShow_leida",
  data() {
    return {
      mbti_code:
        JSON.parse(sessionStorage.getItem("mbti_code")) || this.rander(),
      code: sessionStorage.getItem("code") || "****",
    };
  },
  mounted() {
    this.leida();
  },
  methods: {
    rander() {
      // this.mbti_code = {}
      this.$notify.info({
        title: "无效页面",
        message: "请先完成一次MBTI测试",
      });
      this.$router.push("/mbti/");
    },
    leida() {
      let chartDom = document.getElementById("leida");
      let myChart = echarts.init(chartDom);
      let option = {
        tooltip: {},
        radar: {
          radius: 80,
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "E外倾型", max: 100 },
            { name: "S感觉型", max: 100 },
            { name: "J判断型", max: 100 },
            { name: "T思维型", max: 100 },
            { name: "I内倾型", max: 100 },
            { name: "N直觉型", max: 100 },
            { name: "P知觉型", max: 100 },
            { name: "F情感型", max: 100 },
          ],
        },
        series: [
          {
            name: "测评分析",
            type: "radar",
            label: {
              normal: {
                show: true,
                position: "outer",
                formatter: "{c}%",
              },
            },
            data: [
              {
                value: [
                  this.mbti_code.E,
                  this.mbti_code.S,
                  this.mbti_code.J,
                  this.mbti_code.T,
                  this.mbti_code.I,
                  this.mbti_code.N,
                  this.mbti_code.P,
                  this.mbti_code.F,
                ],
                symbolSize: 13,
                name: "测评分析",
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
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.sssssss {
  position: relative;
  height: 70vh;
  background-color: #fff;
}
.divH4 {
  position: absolute;
  /* top: -10%; */
  left: 32%;
}
/* #leida {
  width: 375px;
  height: 100%;
} */
/* 

#leida {
  width: 100vw;
  background: #fff;
} */
</style>
