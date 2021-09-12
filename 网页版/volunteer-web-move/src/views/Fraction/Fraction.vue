<template>
  <div class="Fraction">
    <van-sticky>
      <van-nav-bar
        :title="Fractiontitle"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>

    <van-sticky :offset-top="-88">
      <!-- 我的排位 -->

      <van-cell>
        <div class="FractionContent" slot="default">
          <div class="Fractiontit">我的排名</div>
          <van-field
            v-model="Ranking"
            input-align="center"
            type="number"
            required
            minlength="0"
            class="Ranking25"
            :placeholder="placeholderranking"
            @input="onRanking"
          />
        </div>
      </van-cell>

      <!-- 我的分数 -->
      <van-cell>
        <div class="FractionContent" slot="default">
          <div class="Fractiontit">等同去年分数</div>
          <van-field
            v-model="Fraction"
            input-align="center"
            border
            :readonly="readonlyFraction"
            type="number"
            maxlength="4"
            minlength="0"
            :placeholder="placeholderfraction"
            @input="onInput"
          />
          <!-- @blur="onFraction" -->
          <!-- 其他科类 -->
          <van-field
            input-align="center"
            v-model.trim="OtherVal"
            v-if="Other"
            border
            :readonly="readonlyOtherVal"
            placeholder="请输入科类"
          />

          <van-field
            input-align="center"
            v-else
            readonly
            clickable
            name="picker"
            :value="valueSelector"
            placeholder="选择科类"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="Familys"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </div>
      </van-cell>
      <!-- <van-cell>
        <div class="FractionContent" slot="default">
          <div class="FractiontitRange">分数范围</div>
          <van-field
            input-align="center"
            v-model="RangeVal1"
            border
            :readonly="readonlyRangeVal1"
            type="number"
            maxlength="4"
            minlength="0"
            placeholder="输入分数范围"
          />
          <span>~~</span>
          <van-field
            input-align="center"
            v-model="RangeVal2"
            border
            :readonly="readonlyRangeVal2"
            type="number"
            maxlength="4"
            minlength="0"
            placeholder="输入分数范围"
          />
        </div>
      </van-cell> -->
      <!-- 分数范围 -->
      <van-cell>
        <div class="FractionContent" slot="default">
          <div class="FractiontitRange">分数范围</div>
          <div class="fieldW">
            <van-field
              input-align="center"
              v-model.number="RangeVal1"
              border
              :readonly="readonlyRangeVal1"
              type="number"
              maxlength="4"
              minlength="0"
              :placeholder="placeholderRangeVal1"
              @input="onRangeVal1"
            />
            <div class="wave">~~</div>
            <van-field
              v-model.number="RangeVal2"
              size="large"
              input-align="center"
              border
              :readonly="readonlyRangeVal2"
              type="number"
              maxlength="4"
              minlength="0"
              :placeholder="placeholderRangeVal2"
              @input="onRangeVal2"
            />
          </div>
        </div>

        <div slot="right-icon">
          <van-button round type="info" size="small" @click="onFractionSearch"
            >搜索</van-button
          >
        </div>
      </van-cell>
    </van-sticky>

    <vxeFraction
      :loading="loading"
      :columns="columnsdata"
      :Tabledata="Scoredata"
      :starO="starO"
      v-bind:onClick="onClick"
      :tablePage="tablePage"
      v-bind:onPage="onPage"
    >
    </vxeFraction>
    <div class="vxeFraction"></div>
  </div>
</template>
<script>
import {
  SearchFraction,
  SearchRanking,
  SearchRFraction,
} from "../../NewApi/Flymain";

import { Toast } from "vant";
import vxeFraction from "@/components/vxeTable/vxeTable";
import { mapState } from "vuex";

import { debounce } from "lodash";

import { Dialog } from "vant";
export default {
  name: "Fraction",
  data() {
    return {
      placeholderranking: "请输入排位",
      placeholderfraction: "请输入分数",
      placeholderRangeVal1: "分数范围",
      placeholderRangeVal2: "分数范围",

      Fractiontitle: "排名录取分析",
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

      //表格状态
      starO: true,
      loading: true,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      //请求到的数据
      columnsdata: [
        {
          field: "name",
          title: "学校",
          width: "100",
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "level_name",
          title: "学历",
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "MajorScore",
          title: "专业分数线",
          width: "100",
          showHeaderOverflow: true, //一行省略 加点击提示
          slots: { default: "SeeMajor" }, //插槽
        },

        {
          field: "Pitching",
          title: "学校投档线",
          width: "100",

          showHeaderOverflow: true, //一行省略 加点击提示
          slots: { default: "SeePitching" }, //插槽
        },

        // {
        //   field: "min_rank",
        //   title: "最低分排位",
        //   width: "110",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        // {
        //   field: "remarks",
        //   title: "分析评估",
        //   width: "90",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        // {
        //   field: "Collection",
        //   title: "收藏",
        //   width: "50",
        //   showHeaderOverflow: true, //一行省略 加点击提示
        //   slots: { default: "Collection" }, //插槽
        // },
      ],
      //表中数据
      Scoredata: [],
      //保存当前点击学校的投档线
      PitchingArr: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation", "Times"]),
  },
  mounted() {
    this.loading = false;
  },

  methods: {
    //排名请求
    async Rankingdata(Ranking, Fraction) {
      console.log(this.Fraction, Ranking, Fraction);
      if (Fraction === "") {
        this.placeholderfraction = "请输入分数";
      }
      if (Ranking === "") {
        this.placeholderranking = "请输入排位";
      }
      let SearchRankingdata = await SearchRanking({
        body: {
          r: Ranking, //排名/位次
          s: Fraction, //分数
          // t: "",//科类：文科/理科/综合改革等
          pv: sessionStorage.getItem("Latlong"),
        },
        params: {},
      });
      console.log(SearchRankingdata.data.data[0]);
      if (SearchRankingdata.data.code === 200) {
        //排名/位次
        if (Fraction === "" && SearchRankingdata.data.data[0] !== undefined) {
          this.placeholderfraction = String(
            SearchRankingdata.data.data[0].score
          );
          this.RangeVal1 = String(
            Number(SearchRankingdata.data.data[0].score) - 10
          );
          this.RangeVal2 = String(
            Number(SearchRankingdata.data.data[0].score) + 10
          );
          this.valueSelector = SearchRankingdata.data.data[0].type;
          return false;
        }
        //分数
        if (Ranking === "" && SearchRankingdata.data.data[0] !== undefined) {
          this.placeholderranking = String(SearchRankingdata.data.data[0].rank);
          this.valueSelector = SearchRankingdata.data.data[0].type;
          return false;
        }
      }
    },

    ///科类选择结果
    onConfirm(valueSelector) {
      if (valueSelector === "其他") {
        this.Other = true;

        this.valueSelector = this.OtherVal;
        this.ResultOtherVal = this.OtherVal;
        console.log("其他", this.valueSelector);
        this.showPicker = false;
        return false;
      }

      this.showPicker = false;
      this.valueSelector = valueSelector;
      this.ResultOtherVal = "";

      console.log(this.valueSelector);
    },
    //搜索
    async onFractionSearch() {
      if (this.Ranking === "" && this.placeholderranking === "请输入排位") {
        this.placeholderranking = "请输入排位";
        Toast.fail("我的排名不能为空");
        return false;
      }
      // if (this.Fraction === "") {
      //   Toast.fail("我的分数不能为空");
      //   return false;
      // }
      // if (this.OtherVal === "") {
      //   Toast("建议选择科类");
      // }
      // this.ResultRanking === this.Ranking; //排名
      // this.ResultFraction === this.Fraction; //分数
      // this.ResultRangeVal1 === this.RangeVal1; //分数范围1
      // this.ResultRangeVal2 === this.RangeVal2; //分数范围2
      // this.ResultvalueSelector === this.valueSelector; //科类选择结果
      // this.ResultOtherVal === this.OtherVal; //其他内容 结果

      if (
        this.ResultRanking === this.Ranking &&
        this.ResultFraction === this.Fraction &&
        this.ResultRangeVal1 === this.RangeVal1 &&
        this.ResultRangeVal2 === this.RangeVal2 &&
        this.ResultvalueSelector === this.valueSelector &&
        this.ResultOtherVal === this.OtherVal
      ) {
        console.log("输入无变化");

        return false;
      }
      console.log("输入变化");

      //保存获取到的数据
      this.ResultRanking = this.Ranking; //排名
      this.ResultFraction = this.Fraction; //分数
      this.ResultRangeVal1 = this.RangeVal1; //分数范围1
      this.ResultRangeVal2 = this.RangeVal2; //分数范围2
      this.ResultvalueSelector = this.valueSelector; //科类选择结果
      this.ResultOtherVal = this.OtherVal; //其他内容 结果
      console.log("保存获取到的数据成功");

      //请求数据
      this.loading = true;
      this.gte = this.ResultRangeVal1;
      this.lte = this.ResultRangeVal2;
      try {
        let SearchFractiondata = await SearchFraction({
          body: {
            gt: this.ResultRangeVal1,
            lt: this.ResultRangeVal2,

            t:
              this.ResultvalueSelector === ""
                ? this.ResultOtherVal
                : this.ResultvalueSelector,
            pv: sessionStorage.getItem("Latlong"),
          },

          params: {},
        });
        console.log(SearchFractiondata);
        console.log(SearchFractiondata.data.code);
        if (SearchFractiondata.data.code === 200) {
          if (SearchFractiondata.data.data.length === 0) {
            Toast.fail("当前无符合分数的学校");
            this.Scoredata = SearchFractiondata.data.data;
            console.log(this.Scoredata);
            this.tablePage.pageSize = SearchFractiondata.data.pageSize;
            this.tablePage.total = SearchFractiondata.data.totalCount;

            //关闭加载状态  ---延迟
            const timer = setInterval(() => {
              this.loading = false;
              clearInterval(timer);
            }, 3000);
            return false;
          }
          if (SearchFractiondata.data.data.length !== 0) {
            this.Scoredata = SearchFractiondata.data.data;
            console.log(this.Scoredata);
            this.tablePage.pageSize = SearchFractiondata.data.pageSize;
            this.tablePage.total = SearchFractiondata.data.totalCount;
            // this.loading = false;

            //关闭加载状态  ---延迟
            const timer = setInterval(() => {
              this.loading = false;
              clearInterval(timer);
            }, 3000);

            return false;
          }
        }
      } catch (SearchFractiondata) {
        console.log(SearchFractiondata);
        Toast.fail("请您刷新网页重试");
      }
    },
    //排名
    async onRanking(e) {
      // console.log("执行", e);
      // this.Rankingdata(e, "");
      this.Fraction = "";
    },
    //分数
    async onInput(e) {
      if (Number(e) < 10 || e === "" || Number(e) === 0) {
        this.Fraction = e;
        this.RangeVal1 = "";
        this.RangeVal2 = "";
        this.Ranking = "";
        return false;
      }
      this.Fraction = e;
      this.Ranking = "";
      this.RangeVal1 = Number(e) - 10;
      this.RangeVal2 = Number(e) + 10;
      this.disabled = false;
      // this.Rankingdata("", e);
      // this.gte = this.ResultRangeVal1;
      // this.lte = this.ResultRangeVal2;
    },
    //分数范围1
    onRangeVal1(event) {
      console.log(event);
      if (this.Fraction === "" && this.placeholderfraction === "请输入分数") {
        Toast("我的分数不能为空");
        return false;
      }

      if (this.Fraction === "") {
        if (Number(event) > Number(this.placeholderfraction)) {
          Toast(`不能大于${this.placeholderfraction}`);
          return false;
        }
        return false;
      }
      if (Number(event) > Number(this.Fraction)) {
        Toast(`不能大于${this.Fraction}`);
      }
      this.RangeVal1 = event;
      this.disabled = false;
    },
    //分数范围2
    onRangeVal2(event) {
      console.log(event);
      if (this.Fraction === "" && this.placeholderfraction === "请输入分数") {
        Toast("我的分数不能为空");
        return false;
      }
      if (this.Fraction === "") {
        if (Number(event) < Number(this.placeholderfraction)) {
          Toast(`不能小于${this.placeholderfraction}`);
          return false;
        }
        return false;
      }
      if (Number(event) < Number(this.Fraction)) {
        Toast(`不能小于${this.Fraction}`);
      }
      this.RangeVal2 = event;
      this.disabled = false;
    },
    //分页
    async onPage(type, currentPage, pageSize, $event) {
      console.log($event.pageSize);
      console.log($event.currentPage);
      this.gte = this.ResultRangeVal1;
      this.lte = this.ResultRangeVal2;
      this.loading = true;
      let SearchFractiondata = await SearchFraction({
        body: {
          p: $event.currentPage,
          s: $event.pageSize || 10,
          gt: this.ResultRangeVal1,
          lt: this.ResultRangeVal2,
          t:
            this.ResultvalueSelector === ""
              ? this.ResultOtherVal
              : this.ResultvalueSelector,
          pv: sessionStorage.getItem("Latlong"),
        },
        params: {},
      });
      this.Scoredata = SearchFractiondata.data.data;

      //关闭加载状态  ---延迟
      const timer = setInterval(() => {
        this.loading = false;
        clearInterval(timer);
      }, 3000);
    },
    //表格点击跳转
    async onClick(row) {
      console.log(row);

      await sessionStorage.removeItem("Throw");

      //点击专业分数      --进入专业详情
      if (row.column.property === "MajorScore") {
        this.$router.push({
          path: "/Major",
          query: {
            Major: row.row.name,
            gte: this.gte,
            lte: this.lte,
            inpval: this.Fraction || this.placeholderfraction,
            t: this.valueSelector,
          },
        });
      }
      //点击学校      --进入学校详情
      if (row.column.property === "name") {
        this.$router.push({
          path: "/School",
          query: {
            School: row.row.name,
            gte: this.gte,
            lte: this.lte,
            inpval: this.Fraction,
            t: this.valueSelector,
          },
        });
      }

      //点击学校投档线      --进入投档线详情
      if (row.column.property === "Pitching") {
        console.log(this.Scoredata[row.rowIndex]);
        console.log(this.Scoredata[row.rowIndex].score);

        sessionStorage.setItem(
          "Throw",
          JSON.stringify(this.Scoredata[row.rowIndex].score)
        );

        this.PitchingArr.push(...this.Scoredata[row.rowIndex].score);
        this.$router.push({
          path: "/PitchingLine",
          query: {
            PitchingLine: row.row.name,
          },
        });
      }
    },
  },
  // 2.映射组件
  components: {
    vxeFraction,
  },
  //监视数据变化   学校和专业的联想关键词 words
  watch: {
    Ranking: {
      //当数据发生变化时，会立即调用
      handler: debounce(async function (Val, oldVal) {
        console.log(Val, oldVal);
        if (Val === "") {
          return false;
        }
        this.Rankingdata(Val, "");
        this.Fraction = "";
      }, 150),
      immediate: true,
      // deep: true,
    },
    Fraction: {
      //当数据发生变化时，会立即调用
      handler: debounce(async function (Val, oldVal) {
        console.log(Val, oldVal);
        if (Val === "") {
          return false;
        }
        this.Rankingdata("", Val);
      }, 150),
      immediate: true,
      // deep: true,
    },
  },
};
</script>
<style lang="less">
.Fraction {
  // @field-placeholder-text-color: black;
  ::placeholder {
    color: rgb(109, 108, 108);
  }
  .FractionContent {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 24px;

    .Ranking25 {
      width: 200%;
    }
    .Fractiontit {
      width: 100%;
    }
    .FractiontitRange {
      width: 66%;
    }
    .fieldW {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-field {
        width: 98%;
      }
      .wave {
        text-align: center;
        width: 10px;
      }
    }
  }
  .vxeFraction {
    height: 10vh;
  }
}
</style>
