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
          <!-- <van-field
            v-if="Other"
            readonly
            clickable
            name="picker"
            input-align="center"
            :value="AnalysisQuantity"
            placeholder="选择分析数量"
            @click="showPicker = true"
          />
          <van-field
            v-else
            v-model.trim="Analysis"
            center
            input-align="center"
            type="number"
            placeholder="输入分析数量"
            @input="onAnalysis"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup> -->
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
        :Tabledata="NewScoredata"
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

import { Toast, Dialog, CountDown } from "vant";
import { mapState } from "vuex";
import vxeFraction from "@/components/vxeTable/vxeTable";
import * as echarts from "echarts";
let newArr = [];
let Piedata = {};
let Length = "";
export default {
  data() {
    return {
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
      Major: "安全工程",
      AnalysisQuantity: "",
      columns: [20, 40, 60, "其他条数"],
      showPicker: false,
      Word: [],
      newArr: [],
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
        { work_name: "安全工程师", avg_salary: "7000", count: 110900 },
        {
          work_name: "安全员",
          avg_salary: "6000",
          count: 67900,
        },
        { work_name: "安全主管", avg_salary: "8000", count: 33900 },
        {
          work_name: "施工安全员",
          avg_salary: "6000",
          count: 27300,
        },
        { work_name: "网络安全工程师", avg_salary: "7000", count: 25800 },
        {
          work_name: "信息安全工程师",
          avg_salary: "9000",
          count: 23500,
        },
        { work_name: "注册安全工程师", avg_salary: "8000", count: 22700 },
        {
          work_name: "安全评价师",
          avg_salary: "6000",
          count: 20800,
        },
      ],

      NewScoredata: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
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
    await this.onpie();
    await this.bar();
    this.duplicateRemoval();
  },

  methods: {
    onAnalysis() {},
    // 输入框
    async inpMajor() {
      console.log("------------", this.Major);
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

          console.log("-----HotSearchdata-------", this.Word);
          if (Object.keys(HotSearchdata.data.data).length == 1) {
            //处理显示状态
            this.Associa = false;
          }
          if (!HotSearchdata.data.data.length) {
            //处理显示状态
            this.Associa = false;
            //关闭滑动加载
            Toast.fail("输入正确的专业名");
          }
        }
      } catch (HotSearchdata) {
        HotSearchdata;
      }
    },
    //搜索按钮
    async onGenerate() {
      this.loading = true;
      this.show = true;
      this.Associa = false;
      this.Scoredata = [];
      this.NewScoredata = [];
      console.log("------------", this.Major);
      console.log("------------", this.AnalysisQuantity);
      if (this.AnalysisQuantity === "") {
        this.AnalysisQuantity = Number(20);
      }
      this.AnalysisQuantity;
      this.Major;

      try {
        let VipProspectdata = await VipProspect({
          body: {
            m: this.Major,
            token: this.token,
          },
          params: {},
        });
        if (VipProspectdata.data.code === 200) {
          this.Scoredata = [];
          this.NewScoredata = [];
          if (Object.keys(VipProspectdata.data.data).length === 0) {
            Toast.fail("目前暂无此类分析,请调整分析类别");
            this.loading = false;
            this.show = false;
            return false;
          }
          if (this.Analysis === "") {
            this.Analysis = 20;
            Length = 20;
          }

          if (this.AnalysisQuantity === 0) {
            this.Scoredata = [];
            this.NewScoredata = [];
            await Object.keys(VipProspectdata.data.data).forEach(
              (item, index) => {
                console.log(index);
                if (index + 1 < Number(this.Analysis)) {
                  this.Scoredata.push(VipProspectdata.data.data[index]);
                }
              }
            );
            Length = this.Scoredata.length;
            await console.log(this.Scoredata);
            await this.bar();
            await this.onpie();
            this.loading = false;
            this.show = false;
            console.log(this.Scoredata, "----------");
            await this.duplicateRemoval();
            console.log("this.AnalysisQuantity", this.AnalysisQuantity);
            return false;
          }
          if (this.AnalysisQuantity !== "其他条数") {
            this.Scoredata = [];
            this.NewScoredata = [];
            await Object.keys(VipProspectdata.data.data).forEach(
              (item, index) => {
                console.log(index);
                if (index + 1 < this.AnalysisQuantity) {
                  this.Scoredata.push(VipProspectdata.data.data[index]);
                }
              }
            );
            await console.log(this.Scoredata);
            Length = this.Scoredata.length;
            await this.bar();
            await this.onpie();
            await this.duplicateRemoval();
            this.loading = false;
            this.show = false;

            console.log(this.Scoredata, "----------");
          }

          // this.Scoredata = VipProspectdata.data.data;

          // await console.log(this.Scoredata);
          // Length = this.Scoredata.length;
          // await this.bar();
          // await this.onpie();
          // await this.duplicateRemoval();
          // this.loading = false;
          // this.show = false;

          // console.log(this.Scoredata, "----------");
        }
      } catch (VipProspectdata) {}
    },
    //选择器
    onConfirm(AnalysisQuantity) {
      this.Scoredata = [];
      this.NewScoredata = [];

      this.AnalysisQuantity = "";
      if (AnalysisQuantity === "其他条数") {
        this.Other = false;
        this.showPicker = false;
        this.AnalysisQuantity = Number(this.Analysis);
        return false;
      }
      this.AnalysisQuantity = Number(AnalysisQuantity);
      this.showPicker = false;
    },

    //饼图
    async onpie() {
      this.NewScoredata = [];
      let getrgb = "";
      let getcolor = "";
      //rgb颜色随机
      function setrgb() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        getrgb = "(" + r + "," + g + "," + b + ")";

        // return rgb;
      }

      //十六进制颜色随机
      function setcolor16() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        getcolor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      }

      let bar_data = [];
      let pie_data = [];
      let work_names = [];
      let Bubbledata = [];

      // console.log("------", typeof this.Scoredata);

      for (let d of this.Scoredata) {
        let Avg = 1;
        Avg = Number(d["avg_salary"]);
        // work_names.push(d["work_name"]);
        // bar_data.push([d["work_name"], Avg]);
        pie_data.push({
          value: d["count"],
          name: d["work_name"],
          avg_salary: Avg,
        });
        // Bubbledata.push([d["count"], Avg, d["work_name"]]);
      }
      console.log("pie_data------", pie_data);
      // console.log("Bubbledata----", Bubbledata);
      let piechartDom = document.getElementById("pie");
      let piemyChart = echarts.init(piechartDom);
      let pie_option;
      newArr = [];
      pie_option = {
        tooltip: {
          show: true, //是否开启提示
          extraCssText: "text-ailgn:left", //文字对齐方式
          // 边框
          borderColor: "#364834",
          // borderWidth: "10 ",
          // 字体颜色等等,相关设置
          textStyle: {
            color: "#c3c3c3",
          },
          // 触发提示内容事件
          // triggerOn:"click",
          // formatter:"{c}"//格式化提示内容

          formatter: function (params) {
            // console.log("----------", params.data.name);
            // console.log("----百分比------", params.percent + "%");
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
            data: pie_data,

            label: {
              formatter: function (params) {
                // console.log("----params-------", params);
                // console.log("----------", params.data.name);
                // console.log("----百分比------", params.percent + "%");

                Piedata = {
                  work_name: params.data.name,
                  avg_salary: params.data.avg_salary,
                  count: params.percent + "%",
                };

                newArr.push(Piedata);

                // this.duplicateRemoval();
              },
            },

            //有问题
            itemStyle: {
              normal: {
                color: function (params) {
                  // console.log("----------------", params);
                  setrgb();
                  setcolor16();
                  // console.log(getcolor);
                  // console.log(getrgb);
                  return getcolor;
                },
              },
            },
          },
        ],
      };
      pie_option && piemyChart.setOption(pie_option);
      window.addEventListener("resize", function () {
        pie_option && piemyChart.resize();
      });
    },
    //气泡图
    bar() {
      let getrgb = "";
      let getcolor = "";
      this.NewScoredata = [];

      //rgb颜色随机
      function setrgb() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        getrgb = "(" + r + "," + g + "," + b + ")";

        // return rgb;
      }

      //十六进制颜色随机
      function setcolor16() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        getcolor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      }

      // console.log("wdweeeeeeeeeeee", (31.2 / 20.5) * 100);

      let bar_data = [];
      let pie_data = [];
      let work_names = [];
      let Bubbledata = [];

      console.log("------", typeof this.Scoredata);

      for (let d of this.Scoredata) {
        console.log(d);
        let Avg = 1;
        Avg = Number(d["avg_salary"]);
        // console.log(typeof d["work_name"], typeof Avg, typeof d["count"]);

        work_names.push(d["work_name"]);
        bar_data.push([d["work_name"], Avg]);
        // pie_data.push({ value: d["count"], name: d["work_name"] });
        // Bubbledata.push([d["count"], Avg, d["work_name"]]);
      }

      console.log("bar_data------", bar_data);
      console.log("work_names------", work_names);
      // console.log("Bubbledata----", Bubbledata);

      let barchartDom = document.getElementById("bar");
      let barmyChart = echarts.init(barchartDom);
      let bar_option;

      //气泡图
      bar_option = {
        dataZoom: {
          type: "slider",
          start: 0,
          end: 30,
        },
        tooltip: {},
        dataset: {
          source: bar_data,
        },
        xAxis: {
          name: "职位",
          // type: "category",
          nameTextStyle: {
            padding: [, 0, 0, -10], // 四个数字分别为上右下左与原位置距离
          },
          data: work_names,
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
          // triggerOn:"click",
          // formatter:"{c}"//格式化提示内容
          formatter: function (params) {
            // console.log(params.data)

            setrgb();
            setcolor16();
            console.log(getcolor);
            console.log(getrgb);

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
              // console.log(params, "");
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
              if (Length < 680) {
                result = params[1] / 340;
                return result;
              }
            },
            //有问题
            itemStyle: {
              normal: {
                color: function (params) {
                  // console.log("----------------", params);

                  // setrgb();
                  setcolor16();
                  // console.log(getcolor);
                  // console.log(getrgb);

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
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }],
            // },
          },
        ],
      };

      bar_option && barmyChart.setOption(bar_option);

      window.addEventListener("resize", function () {
        bar_option && barmyChart.resize();
      });
    },
    duplicateRemoval() {
      this.NewScoredata = [];
      this.Scoredata = [];
      var result = [];
      var obj = {};
      for (var i = 0; i < newArr.length; i++) {
        if (!obj[newArr[i].work_name]) {
          result.push(newArr[i]);
          obj[newArr[i].work_name] = true;
        }
      }
      this.NewScoredata = result;
      console.log(this.NewScoredata, "======================= ");
    },
    //请求的关键字搜索
    async Keywords(Keyword) {
      this.Major = Keyword;
      this.Associa = false;
      this.Scoredata = [];
      this.onGenerate();
      // await this.bar();
      // await this.onpie();
      // this.duplicateRemoval();
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
      padding: 0;
      width: 33%;
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
