<template>
  <div class="Prospect">
    <van-sticky>
      <van-nav-bar
        title="就业前景分析报告"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <van-cell center>
        <div slot="default" center class="defchoice">
          <van-field
            v-model.trim="Major"
            center
            input-align="center"
            placeholder="输入专业名"
            @input="inpMajor"
          />
          <van-button round type="info" @click="onGenerate" size="small"
            >生成分析报告</van-button
          >
        </div>
      </van-cell>
    </van-sticky>
    <div v-if="Vip">
      <van-empty description="请升级为Vip用户">
        <van-button
          round
          type="danger"
          @click="onMemberVip"
          class="bottom-button"
        >
          马上升级
        </van-button>
      </van-empty>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" type="spinner" color="#1989fa" vertical
          >加载中...</van-loading
        >
      </div>
    </van-overlay>

    <div class="PAssocia" v-if="Associa">
      <van-cell
        id="Keyword"
        center
        v-for="(item, index) in Word"
        :key="index"
        @click="Keywords((Keyword = item.value))"
      >
        <div slot="icon" class="AssociaIcon">
          <van-icon size="18" name="search" />
        </div>
        <div
          slot="title"
          v-html="highilght((KeywordHighlight = item.value))"
          class="Association"
        ></div>
      </van-cell>
    </div>
    <div v-if="VipPAssocia">
      <div class="Pietit van-multi-ellipsis--l2">
        <div class="tit1">{{ Major }}专业的相关职位信息统计</div>
        <div class="tit2">各大招聘网站职位数据实时采集统计</div>
      </div>

      <!-- 饼图 -->
      <div id="pie"></div>
      <!-- 气泡图 -->
      <div id="bar"></div>
      <!-- <van-sticky> -->
      <vxeFraction
        :columns="columnsdata"
        :Tabledata="Scoredata"
        :tablePage="tablePage"
        v-bind:onClick="onClick"
      >
      </vxeFraction>
    </div>

    <!-- </van-sticky> -->
    <div class="vxeFraction"></div>
  </div>
</template>
<script>
//旧接口
import { HotSearch, VipProspect } from "../../NewApi/Flymain";
import { Toast, Dialog } from "vant";
import { mapState } from "vuex";
import vxeFraction from "@/components/vxeTable/vxeTable";
import * as echarts from "echarts";
export default {
  name: "Prospect",
  data() {
    return {
      newMajor: "",
      show: false,
      Associa: false,
      VipPAssocia: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loading: false,
      Other: true,
      Vip: true,
      Analysis: "",
      Major: "",
      AnalysisQuantity: "",
      columns: [20, 40, 60, "其他条数"],
      showPicker: false,
      Word: [],
      //请求到的数据
      columnsdata: [
        {
          field: "work_name",
          title: "岗位名称",
          // width: "900",
        },
        {
          field: "avg_salary",
          title: "岗位薪酬(中位数)",
          sortable: true,
          width: "160",
        },
        {
          field: "count",
          title: "岗位占比", //要通过饼图才能得到数据
          sortable: true,
          width: "130",
        },
      ],

      //表中数据

      Scoredata: [
        { work_name: "EHS工程师", avg_salary: 6000, count: "33.6%" },
        { work_name: "EHS专员", avg_salary: 5000, count: "30.04%" },
        { work_name: "EHS主管", avg_salary: 8000, count: "11.46%" },
        { work_name: "EHS", avg_salary: 6000, count: "6.32%" },
        { work_name: "EHS安全工程师", avg_salary: 6000, count: "4.74%" },
        {
          work_name: "EHS咨询师(出差工作性质)",
          avg_salary: 8000,
          count: "4.35%",
        },
        { work_name: "2021届应届毕业生", avg_salary: 4000, count: "3.95%" },
        {
          work_name: "2020届建筑工程应届毕业生（安全员、试验员方向）",
          avg_salary: 3000,
          count: "2.77%",
        },
        {
          work_name: "2021届安全工程类大学生",
          avg_salary: 1000,
          count: "2.77%",
        },
      ],

      pieArr: [
        { value: 8415, name: "EHS工程师", avg_salary: 6000 },
        { value: 7524, name: "EHS专员", avg_salary: 5000 },
        { value: 2871, name: "EHS主管", avg_salary: 8000 },
        ,
        { value: 1584, name: "EHS", avg_salary: 6000 },
        { value: 1188, name: "EHS安全工程师", avg_salary: 6000 },
        { value: 1089, name: "EHS咨询师(出差工作性质)", avg_salary: 8000 },
        { value: 990, name: "2021届应届毕业生", avg_salary: 4000 },
        {
          value: 693,
          name: "2020届建筑工程应届毕业生（安全员、试验员方向）",
          avg_salary: 3000,
        },
        { value: 693, name: "2021届安全工程类大学生", avg_salary: 1000 },
      ], //饼图数据
      barArr: [
        ["EHS工程师", 6000],
        ["EHS专员", 5000],
        ["EHS主管", 8000],
        ["EHS", 6000],
        ["EHS安全工程师", 6000],
        ["EHS咨询师(出差工作性质)", 8000],
        ["2021届应届毕业生", 4000],
        ["2020届建筑工程应届毕业生（安全员、试验员方向）", 3000],
        ["2021届安全工程类大学生", 1000],
      ], //气泡数据
      barNameArr: [
        ["EHS工程师"],
        ["EHS专员"],
        ["EHS主管"],
        ["EHS"],
        ["EHS安全工程师"],
        ["EHS咨询师(出差工作性质)"],
        ["2021届应届毕业生"],
        ["2020届建筑工程应届毕业生（安全员、试验员方向）"],
        ["2021届安全工程类大学生"],
      ], //气泡职位名
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
    window.setcolor16 = this.setcolor16;
    let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
    //未登录提示
    if (VipInformation === null) {
      Dialog.confirm({
        title: "登录",
        message: "请您先登录再使用",
        confirmButtonText: "去登录",
      })
        .then(() => {
          this.$router.push({
            path: "/Login",
          });
        })
        .catch(() => {
          Toast("已取消重新登录,部分功能无法使用");
        });
      this.Vip = true;

      return false;
    }

    if (Object.keys(VipInformation.user_level).length === 0) {
      Toast("请成为会员");
      this.Vip = true;

      return false;
    }
    if (VipInformation.user_level[0].type === "普通用户") {
      Toast("请成为会员");
      this.Vip = true;
      return false;
    }
    if (VipInformation.user_level[0].type === "vip用户") {
      this.Vip = false;
      this.VipPAssocia = true;

      return false;
    }
  },
  async mounted() {
    await this.AllChart();
    await this.bar();
  },
  methods: {
    // 输入框
    async inpMajor() {
      this.Associa = true;
      try {
        let HotSearchdata = await HotSearch({
          body: {
            t: 2,
            m: this.Major,
          },
          params: {},
        });

        if (HotSearchdata.data.code === 200) {
          this.Word = HotSearchdata.data.data;
          if (Object.keys(HotSearchdata.data.data).length == 1) {
            //处理显示状态
            this.Associa = false;
          }
          if (!HotSearchdata.data.data.length) {
            //处理显示状态
            this.Associa = false;
            //关闭滑动加载
            // Toast.fail("输入正确的专业名");
          }
        }
      } catch (HotSearchdata) {
        HotSearchdata;
      }
    },
    //搜索按钮
    async onGenerate() {
      if (this.newMajor === this.Major) {
        return false;
      }
      let total = null;
      this.loading = true;
      this.show = true;
      this.Associa = false;

      this.newMajor = this.Major;
      try {
        this.Scoredata = [];
        this.pieArr = [];
        this.barArr = [];
        let VipProspectdata = await VipProspect({
          body: {
            m: this.Major,
            token: this.token,
          },
          params: {},
        });
        if (VipProspectdata.data.code === 200) {
          if (Object.keys(VipProspectdata.data.data).length === 0) {
            Toast.fail("目前暂无此类分析,请调整分析类别");
            this.loading = false;
            this.show = false;
            return false;
          }
          // 计算count总数
          await Object.keys(VipProspectdata.data.data).forEach(
            (item, index) => {
              total += Number(VipProspectdata.data.data[index].count);
            }
          );
          await Object.keys(VipProspectdata.data.data).forEach(
            (item, index) => {
              if (index + 1 <= 20) {
                this.pieArr.push({
                  value: Number(VipProspectdata.data.data[index].count),
                  name: VipProspectdata.data.data[index].work_name,
                  avg_salary: Number(
                    VipProspectdata.data.data[index].avg_salary
                  ),
                });
                this.barArr.push([
                  VipProspectdata.data.data[index].work_name,
                  Number(VipProspectdata.data.data[index].avg_salary),
                ]);
                this.barNameArr.push([
                  VipProspectdata.data.data[index].work_name,
                ]);
              }
              this.Scoredata.push({
                count: `${(
                  (Number(VipProspectdata.data.data[index].count) / total) *
                  100
                ).toFixed(2)}%`,
                work_name: VipProspectdata.data.data[index].work_name,
                avg_salary: Number(VipProspectdata.data.data[index].avg_salary),
              });
            }
          );
          console.log(total);
          console.log("饼图数据", this.pieArr);
          console.log("气泡数据", this.barArr);
          console.log("表数据", this.Scoredata);
          console.log("气泡数据", this.barNameArr);
          this.loading = false;
          this.show = false;
          await this.AllChart();
          await this.bar();
        }
      } catch (VipProspectdata) {
        this.loading = false;
        this.show = false;

        if (VipProspectdata.status === 429) {
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");

          return false;
        }
      }
    },
    //图表
    AllChart() {
      var myChart = echarts.init(document.getElementById("pie"));
      let option = {
        grid: {
          containLabel: true,
        },
        tooltip: {
          confine: true,

          show: true, //是否开启提示
          extraCssText: "text-ailgn:left", //文字对齐方式
          // 边框
          borderColor: "#364834",
          textStyle: {
            color: "#c3c3c3",
          },
          formatter: function (params) {
            let data =
              "岗位:" +
              params.data.name +
              "<br/>" +
              "百分比:" +
              params.percent +
              "%";
            return data;
          },
        },
        series: [
          {
            name: "职位个数",
            type: "pie",
            radius: "50%",
            data: this.pieArr,
            //有问题
            // itemStyle: {
            //   normal: {
            //     color: function (params) {
            //       let getcolor = window.setcolor16();
            //       return getcolor;
            //     },
            //   },
            // },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    //十六进制颜色随机
    setcolor16() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      let getcolor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return getcolor;
    },
    //饼图
    //气泡图
    bar() {
      let barchartDom = document.getElementById("bar");
      let barmyChart = echarts.init(barchartDom);
      let bar_option;
      //气泡图
      bar_option = {
        dataset: {
          source: this.barArr,
        },
        xAxis: {
          name: "职位",
          nameTextStyle: {
            padding: [, 0, 0, -10], // 四个数字分别为上右下左与原位置距离
          },
          data: this.barNameArr,
          scale: true, //是否是脱离 0 值比例
        },
        yAxis: {
          name: "薪酬中位数（元/月）",
          nameTextStyle: {
            padding: [0, 0, 0, 50], // 四个数字分别为上右下左与原位置距离
          },
          scale: true, //是否是脱离 0 值比例
        },
        //全局设置：手指或鼠标放上提示相关数据
        tooltip: {
          confine: true,
          show: true, //是否开启提示
          // trigger 可选择值  "item"  "axis"
          trigger: "item", //当formatter为函数时,不要使用trigger

          extraCssText: "text-ailgn:left", //文字对齐方式
          // 边框
          borderColor: "#364834",
          // borderWidth: "10 ",
          // 字体颜色等等,相关设置
          textStyle: {
            color: "#c3c3c3",
          },
          // 触发提示内容事件
          formatter: function (params) {
            let getcolor = window.setcolor16();
            let data =
              '<span style="display:inline-block;margin-right:5px; margin-top:5px;border-radius:10px;width:10px;height:10px;background-color:' +
              getcolor +
              '";"></span>' +
              "岗位" +
              params.data[0] +
              "<br/>" +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
              getcolor +
              '";"></span>' +
              "平均薪酬:" +
              params.data[1];
            return data;
          },
        },
        series: [
          {
            name: "薪酬",
            color: "#409EFF",
            type: "scatter", //直坐标图 气泡图：scatter 折线图：line ... 必须设置
            symbolSize: function (params) {
              let result;
              result = params[1] / 200;
              return result;
            },
            //有问题
            itemStyle: {
              // color: {
              //   x: 0.5,
              //   y: 0.5,
              //   r: 0.5,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: "red", // 0% 处的颜色
              //     },
              //     {
              //       offset: 1,
              //       color: "blue", // 100% 处的颜色
              //     },
              //   ],
              // },
              normal: {
                color: function (params) {
                  let getcolor = window.setcolor16();
                  return getcolor;
                },
              },
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
        ],
      };

      bar_option && barmyChart.setOption(bar_option);

      window.addEventListener("resize", function () {
        bar_option && barmyChart.resize();
      });
    },
    //请求的关键字搜索
    async Keywords(Keyword) {
      this.Major = Keyword;
      this.Associa = false;
      this.Scoredata = [];
      this.pieArr = [];
      this.barArr = [];
      this.onGenerate();
    },
    //高亮
    highilght(KeywordHighlight) {
      new RegExp(KeywordHighlight, "gi");
      return KeywordHighlight.replace(
        new RegExp(this.Major, "gi"),
        `<span style="color:#90BBFD">${this.Major}</span>`
      );
    },
    //我的会员
    onMemberVip() {
      if (
        this.username !== null &&
        this.token !== null &&
        this.UserInformation !== null
      ) {
        this.$router.push({
          path: "/Member",
        });
      } else {
        this.$toast("请先登录");
      }
    },
    onClick() {},
  },
  components: {
    vxeFraction,
  },
};
</script>
<style lang="less">
.Prospect {
  width: 100vw;
  .defchoice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-cell {
      padding: 4px 0;
      width: 50%;
      background: #ffffff5d;
      border-radius: 4px;
      border: 1px solid #cfcfd2;
    }
  }
  .vxeFraction {
    height: 10vh;
  }
  .PAssocia {
    // position: absolute;
    z-index: 10;
    background: crimson !important;
  }
  .Pietit {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    .tit1 {
      margin: 10px;
      font-size: 18px;
      font-weight: 500;
    }
    .tit2 {
      font-size: 16px;
      font-weight: 300;
    }
  }
  #pie {
    width: 100%;
    min-height: 400px;
  }
  #bar {
    width: 100%;
    min-height: 375px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
}
</style>
