<template>
  <keep-alive>
    <div class="Prooooooo">
      <van-cell class="cellSearch" center>
        <div slot="title">
          <van-search
            style="width: 100%"
            v-model.trim="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入专业名称"
            @select="handleSelect"
            clearable
          />
          <!-- <van-search
            style="width: 100%"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入专业名称"
            @select="handleSelect"
            @input="loadAll"
            clearable
          /> -->
        </div>

        <div slot="default">
          <van-button size="small" round @click="jyqjbg" type="info"
            >生成分析报告</van-button
          >
        </div>
      </van-cell>

      <!-- 联想词语开始 -->
      <!-- //联想 有数据显示，没有隐藏 -->
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
          <!-- <div slot="title" class="Association">{{ item.value }}</div> -->

          <div
            slot="title"
            v-html="highilght((KeywordHighlight = item.value))"
            class="Association"
          ></div>
        </van-cell>
      </div>
      <!-- 联想词语结束 -->
      <!-- 联想点击或失去焦点或点击搜索按钮触发 -->

      <!-- <div class="SearchBox">
        <div>
          <div class="van-search van-search--show-action">
            <div class="van-search__content van-search__content--square">
              <div class="van-cell van-cell--borderless van-field">
                <div class="van-field__left-icon">
                  <i class="van-icon van-icon-search"></i>
                </div>
                <div
                  class="van-cell__value van-cell__value--alone van-field__value"
                >
                  <div>
                    <el-autocomplete
                      style="width: 100%"
                      v-model="state"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入专业名称"
                      @select="handleSelect"
                      @input="loadAll"
                      clearable
                    >
                    </el-autocomplete>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-button @click="jyqjbg"> 生成分析报告 </el-button>
      </div> -->

      <div class="box" v-if="Fx">
        <div
          class="box1"
          v-loading="loading"
          element-loading-text="正在为你采集并分析"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div
            id="pie"
            style="width: 100%; height: 350px; margin: 50px auto"
          ></div>
          <!-- <div
            id="bar"
            style="width: 100%; height: 350px; margin: 0px auto"
          ></div> -->
          <div id="bar"></div>
          <el-table
            v-loading="loading"
            :data="data"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            :cell-class-name="changeTrStyle"
            :row-style="changeTrStyle"
            :header-cell-style="{ background: '#409EFF', color: '#303133' }"
            class="tableBox"
            fit
          >
            <el-table-column prop="work_name" label="岗位名称" sortable>
            </el-table-column>
            <el-table-column
              prop="avg_salary"
              label="岗位薪酬(中位数)"
              sortable
            >
            </el-table-column>
            <el-table-column label="岗位占比" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.count | toPercentage(that) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <van-empty
        v-else
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无数据,请重新分析"
      />

      <van-cell><div class="cellsss"></div></van-cell>
    </div>
  </keep-alive>
</template>
<script>
//旧接口
import { mapState } from "vuex";
import { debounce, throttle } from "lodash";
import { Dialog, Toast } from "vant";
import * as echarts from "echarts";
import { JyqjMajboOpera, SearchWords, JyqjReportOpera } from "@/api/api.js";
export default {
  name: "EmploymentProspects",
  data() {
    return {
      Fx: true,
      //联想     有数据显示，没有隐藏
      Associa: false,
      //请求返回的数据
      Word: "",
      //点击联想和失去焦点时错误 有数据显示，没有隐藏
      // WordClick: false,
      //滑动加载数据

      that: this,
      loading: false,
      restaurants: [],
      state: "安全工程",
      data: [
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
    };
  },
  mounted() {
    this.loadbar();
  },
  filters: {
    toPercentage(count, that) {
      let total = 0;
      for (let item of that.data) {
        total += item.count;
      }
      return Number((count / total) * 100).toFixed(2) + "-------";
    },
  },
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  methods: {
    //请求的关键字搜索
    Keywords(Keyword) {
      console.log(Keyword);
      // // let Keyword = window.document.getElementById("Keyword").innerHTML;
      // console.log("dKeyword");
      this.state = Keyword;
      // console.log(this.value==Keyword)
      this.jyqjbg();
      // //开启滑动加载
      // this.finished = false;
      // this.WordClick = true;
      //做取消监听
      // var unwatch = this.$watch("value", this.value);
      // // 之后取消观察
      // unwatch();
    },

    //高亮
    highilght(KeywordHighlight) {
      console.log(KeywordHighlight);

      // return KeywordHighlight;

      new RegExp(KeywordHighlight, "gi");
      return KeywordHighlight.replace(
        new RegExp(this.state, "gi"),
        `<span style="color:#90BBFD">${this.state}</span>`
      );
    },
    //返回上一页(完成)
    onClickLeft() {
      history.go(-1);
    },
    //隔行变色(完成)
    changeTrStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    // loadAll(value_state) {
    //   if (value_state == "") {
    //     return false;
    //   }
    //   console.log(value_state);
    //   let params = {
    //     t: "2",
    //     m: value_state,
    //   };
    //   // 请求分析数据
    //   JyqjMajboOpera({
    //     params: params,
    //   }).then((data) => {
    //     if (data.code == 200) {

    //       this.restaurants = data.data;
    //       console.log("请-------", this.restaurants);
    //     }
    //   });
    // },
    // 生成分析报告
    jyqjbg() {
      this.Fx = true;
      //处理显示状态
      this.Associa = false;
      if (this.state == "") {
        return false;
      }
      this.loading = true;
      let cache_data = JSON.parse(sessionStorage.getItem(this.state));
      if (!cache_data) {
        JyqjReportOpera({
          params: {
            t: 2,
            m: this.state,
            token: this.token,
          },
        })
          .then((response) => {
            if (response.code == 200) {
              console.log("分析", response);
              if (Object.keys(response.data).length === 0) {
                Toast.fail("目前暂无此类分析,请调整分析类别");
                this.Fx = false;
              }

              // console.log(response.data);
              this.data = response.data;
              console.log("第一次缓存开始", this.data);
              if (this.data.length) {
                sessionStorage.setItem(this.state, JSON.stringify(this.data));
              }
              this.loadbar();
              this.loading = false;
            }
          })
          .catch((data) => {
            if (data.toString().endsWith("404")) {
              this.$message({
                showClose: true,
                message: "无效查询，请重新输入",
                type: "warning",
              });
              this.$router.go(0); // 刷新当前页
            } else if (data.toString().endsWith("429")) {
              this.$message({
                showClose: true,
                message: "操作频繁，请休息一下。",
                type: "warning",
              });
            }
          });
      } else {
        // console.log('读取缓存');

        this.data = cache_data;
        this.loadbar();
        // this.Bubble();

        this.loading = false;
      }
    },
    querySearchAsync(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 100 * Math.random());

      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    loadbar() {
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

      // console.log("wdweeeeeeeeeeee", (31.2 / 20.5) * 100);

      let bar_data = [];
      let pie_data = [];
      let work_names = [];
      let Bubbledata = [];

      console.log("------", typeof this.data);

      for (let d of this.data) {
        console.log(d);
        let Avg = 1;
        Avg = Number(d["avg_salary"]);
        // console.log(typeof d["work_name"], typeof Avg, typeof d["count"]);

        work_names.push(d["work_name"]);
        bar_data.push([d["work_name"], Avg]);
        pie_data.push({ value: d["count"], name: d["work_name"] });
        Bubbledata.push([d["count"], Avg, d["work_name"]]);
      }

      console.log("bar_data------", bar_data);
      console.log("pie_data------", pie_data);
      console.log("Bubbledata----", Bubbledata);

      let barchartDom = document.getElementById("bar");
      let piechartDom = document.getElementById("pie");
      let barmyChart = echarts.init(barchartDom);
      let piemyChart = echarts.init(piechartDom);
      let bar_option, pie_option;

      //饼图
      pie_option = {
        title: {
          text: `${this.state}专业的相关职位信息统计`,
          subtext: "各大招聘网站职位数据实时采集统计",
          left: "center",
        },
        // tooltip: {
        //   trigger: "item",
        // },

        tooltip: {
          show: true, //是否开启提示
          // trigger 可选择值  "item"  "axis"
          // trigger: "item", //当formatter为函数时,不要使用trigger
          // padding: [10, 10], //布局
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
            console.log("----------", params.data.name);
            console.log("----------", params.percent + "%");
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
            //有问题
            itemStyle: {
              normal: {
                color: function (params) {
                  console.log("----------------", params);

                  setrgb();
                  setcolor16();
                  console.log(getcolor);
                  console.log(getrgb);

                  return getcolor;
                },
              },
            },

            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: "rgba(0, 0, 0, 0.5)",
            //   },
            // },
          },
        ],
      };
      //气泡图
      bar_option = {
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
              console.log(params);
              let result = params[1] / 150;
              return result;
            },
            //有问题
            itemStyle: {
              normal: {
                color: function (params) {
                  console.log("----------------", params);

                  setrgb();
                  setcolor16();
                  console.log(getcolor);
                  console.log(getrgb);

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
      pie_option && piemyChart.setOption(pie_option);

      window.addEventListener("resize", function () {
        bar_option && barmyChart.resize();
        pie_option && piemyChart.resize();
      });
    },
  },

  //监视数据变化   学校和专业的联想关键词 words
  watch: {
    state: {
      //当数据发生变化时，会立即调用
      handler: debounce(async function (Val, oldVal) {
        console.log(Val, oldVal);

        // if (Val == oldVal) {
        //   console.log("bub1");
        //   return;
        // }
        //清空搜索记录
        this.Word = [];
        this.SchoolArr = [];
        this.MajorArr = [];

        let Words = await SearchWords({
          params: {
            //分页
            // page: 100,
            // 高校/专业名称
            m: this.state,
            //查询类型 "1"：高校名称，"2": 专业名称
            // t: this.SwitchId,
            t: 2,
          },
        });
        console.log(Words);

        for (const item in Words.data) {
          console.log(Words.data[item]);
          console.log("请求的专业", this.state);
          console.log(this.state === Words.data[item].value);
          // if (res.data[item].name === this.$route.query.School) {
          //   this.content = res.data[item].content;
          // }
        }

        if (Words.code === 200) {
          this.Word = Words.data;

          console.log(this.Word);

          this.Associa = true;
          if (Object.keys(Words.data).length == 1) {
            console.log("sssss");
            //处理显示状态
            this.Associa = false;
          }
          if (!Words.data.length) {
            //处理显示状态
            this.Associa = false;
            //关闭滑动加载
            Toast.fail("输入正确的专业名");
          }
        }
      }, 80),
      immediate: true,
      // deep: true,
    },
  },
};
</script>

<style>
/* .Prooooooo {
  position: relative;
}
.PAssocia {
  position: fixed;
  top: 120px;
} */
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
#bar {
  width: 98%;
  height: 300px;
  margin: auto;
}

.SearchBox {
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button {
  /* position: absolute; */
  margin: 8px !important;
  /* padding: 0; */
  /* height: 100%; */
}

.Range {
  margin-left: 8px !important;
}

.el-autocomplete {
  /* position: relative; */
  display: block;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #f7f8fa;
  background-image: none;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 24px;
  line-height: 0px;
  outline: 0;
  padding: 0;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.van-icon-search {
  margin-top: 1px;
  margin-right: 1px;
}

.el-table .warning-row {
  background: #fff;
}

.el-table .success-row {
  background: #b9d8fa;
}

.box .box1.tableBox {
  color: black;
}
.box .box1.tableBox th {
  padding: 4px 0 !important;
}
.box .box1.tableBox td {
  padding: 4px 0 !important;
}
.cell {
  text-align: center;
  padding: 6px !important;
}
.box .box1.tableBox .el-icon-star-on {
  font-size: 24px;
}

.el-table th > .cell {
  width: 100%;
}
.el-table td,
.el-table th .is-leaf {
  border: 0px;
}
.el-table td,
.el-table th {
  padding: 0;
}
.btn-prev {
  background-color: blue !important;
}
.btn-next {
  background-color: pink !important;
}
.el-pagination--small {
  line-height: 20px;
  font-size: 20px;
}
.cellsss {
  margin-bottom: 60px;
}
</style>
