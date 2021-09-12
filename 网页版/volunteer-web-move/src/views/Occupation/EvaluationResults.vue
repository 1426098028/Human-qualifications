<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="MBTI 性格测评分析报告"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>

    <el-card class="box-card" shadow="never">
      <div class="text item">
        {{ username }}
      </div>
      <div class="text item">
        {{ telephone }}
      </div>
      <div class="text item">
        {{ complete_time }}
      </div>
    </el-card>
    <Leida></Leida>

    <div class="MBTIcon box-card">
      <div class="MBTIcondiv">
        测评结果: <span> {{ code }} </span>
      </div>

      <div class="MBTIcondiv">
        担任角色: <span>{{ tableData[0].personality }}</span>
      </div>

      <div class="MBTIcondiv">
        性格特征:
        <span
          v-for="(item, index) in tableData[0].features.split(/\d+/)"
          :key="item"
        >
          <p v-if="index" style="text-align: left">
            <span style="color: red">{{ index }}</span>
            {{ item }}
          </p>
        </span>
      </div>

      <div class="MBTIcondiv">
        适合职位:
        <span v-for="(item, index) in zhiwei" :key="index">
          <p v-if="index" style="text-align: left">
            <span style="color: red">{{ index }}</span>
            {{ item.toString() }}
          </p>
        </span>
      </div>
      <div class="divdiv"></div>
    </div>
    <!-- <el-tabs type="border-card" stretch v-model="mbti_tab">
      <el-tab-pane label="测评结果" name="tab1">{{ code }}</el-tab-pane>
      <el-tab-pane label="担任角色" name="tab2">{{
        tableData[0].personality
      }}</el-tab-pane>
      <el-tab-pane label="性格特征" name="tab3" v-if="tableData[0].features">
      </el-tab-pane>
      <el-tab-pane label="适合职位" name="tab4">
        <div v-for="(item, index) in zhiwei" :key="index">
          <p v-if="index" style="text-align: left">
            <span style="color: red">{{ index }}</span>
            {{ item.toString() }}
          </p>
        </div>
      </el-tab-pane>
    </el-tabs> -->

    <!--    <div id="leida" style="width: 250px;height: 350px; margin: 0 auto"></div>-->
    <!--    <el-tag-->
    <!--      effect="plain"-->
    <!--      size="200"-->
    <!--    >-->
    <!--      {{ code }}-->
    <!--    </el-tag>-->
    <!--    <el-table-->
    <!--      :data="tableData"-->
    <!--      style="width: 100%">-->
    <!--      <el-table-column-->
    <!--        prop="personality"-->
    <!--        label="personality">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--        prop="features"-->
    <!--        label="features">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--        prop="profession"-->
    <!--        label="profession">-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->
    <div class="line"></div>
  </div>
</template>

<script>
import Leida from "@/components/MbtiShow_leida";
import * as echarts from "echarts";
import { Toast } from "vant";
export default {
  name: "MbtiShow",
  computed: {
    zhiwei: function () {
      let profession = this.tableData[0].profession;
      // console.log(profession);
      if (!profession) return [];
      let baseArray = profession.split(",");
      let len = baseArray.length;
      let n = 5; //假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        let temp = baseArray.slice(i * n, i * n + n);
        res.push(temp);
      }
      return res;
    },
  },
  data() {
    return {
      // mbti_code: JSON.parse(sessionStorage.getItem('mbti_code')) || this.rander(),
      username: localStorage.getItem("username") || "匿名用户",
      telephone: sessionStorage.getItem("telephone") || "匿名用户",
      code: sessionStorage.getItem("code") || "****",
      complete_time: sessionStorage.getItem("complete_time"),
      // 活跃的选项卡
      mbti_tab: "tab3",
      tableData: [
        {
          personality: sessionStorage.getItem("personality"),
          features: sessionStorage.getItem("features"),
          profession: sessionStorage.getItem("profession"),
        },
      ],
    };
  },
  //页面初始化
  mounted() {
    if (sessionStorage.getItem("features") == null) {
      Toast("请先测评");
      this.$router.push({ path: "/Occupation" });
    }
    // this.leida();
  },
  components: {
    Leida,
  },
  methods: {
    //返回上一页(完成)
    onClickLeft() {
      history.go(-1);
    },

    // rander(){
    //   this.mbti_code = {}
    //   this.$notify.info({
    //       title: '无效页面',
    //       message: '登录用户可以长期保存记录'
    //     });
    //   this.$router.push('/mbti/')
    // },
    // leida() {
    //   let chartDom = document.getElementById('leida');
    //   let myChart = echarts.init(chartDom);
    //   let option = {
    //     tooltip: {},
    //     radar: {
    //       // shape: 'circle',
    //       name: {
    //         textStyle: {
    //           color: '#fff',
    //           backgroundColor: '#999',
    //           borderRadius: 3,
    //           padding: [3, 5]
    //         }
    //       },
    //       indicator: [
    //         {name: 'E', max: 100},
    //         {name: 'S', max: 100},
    //         {name: 'J', max: 100},
    //         {name: 'T', max: 100},
    //         {name: 'I', max: 100},
    //         {name: 'N', max: 100},
    //         {name: 'P', max: 100},
    //         {name: 'F', max: 100}
    //       ]
    //     },
    //     series: [{
    //       name: '测评分析',
    //       type: 'radar',
    //       "label": {
    //         "normal": {
    //           "show": true,
    //           "position": "outer",
    //           "formatter": "{c}%"
    //         }
    //       },
    //       data: [
    //         {
    //           value: [
    //             this.mbti_code.E,
    //             this.mbti_code.S,
    //             this.mbti_code.J,
    //             this.mbti_code.T,
    //             this.mbti_code.I,
    //             this.mbti_code.N,
    //             this.mbti_code.P,
    //             this.mbti_code.F,],
    //           name: '测评分析',
    //
    //         },
    //       ]
    //     }]
    //   };
    //
    //   option && myChart.setOption(option);
    // }
  },
};
</script>

<style lang="less">
.MBTIcon {
  padding: 10px;
  height: 100%;
  background: #fff;
  .MBTIcondiv {
    font-size: 18px;
    // font-weight: 700;
    span {
      // font-weight: 600;
      // color: #c3c3cc;
    }
  }
  .line {
    height: 100px;
    background: pink;
    margin-bottom: 100px;
  }
  .divdiv {
    height: 10vh;
  }
}
</style>
