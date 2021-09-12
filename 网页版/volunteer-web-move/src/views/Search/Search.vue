<template>
  <keep-alive>
    <div class="Search">
      <van-sticky>
        <van-nav-bar
          :title="titleName"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
        <!-- <div>
          <van-search
            v-model="value"
            show-action
            :placeholder="`请输入${titleName}关键词`"
            input-align="center"
            @focus="onfocus"
          >
            <template #action>
              <div
                @click="onSearch"
                class="Searchbut"
                round
                type="info"
                size="mini"
              >
                搜索
              </div>
            </template>
          </van-search>

          <van-button
            class="SearchAll"
            @click="onScreen"
            type="primary"
            size="small"
          >
            <van-icon size="20" name="filter-o" /> 筛选</van-button
          >
        </div> -->
        <van-search
          v-model="value"
          show-action
          :placeholder="`请输入${titleName}关键词`"
          input-align="center"
          @focus="onfocus"
        >
          <div class="SearchAll" slot="action">
            <van-button
              class="Searchbut"
              round
              type="info"
              size="mini"
              @click="onSearch"
            >
              搜索
            </van-button>
            <van-button size="mini" class="SearchAll" @click="onScreen">
              <van-icon size="20" name="filter-o" /> 筛选
            </van-button>
          </div>
        </van-search>
      </van-sticky>
      <div class="SearhBackground">
        <!-- 联想词语开始 -->
        <!-- //联想 有数据显示，没有隐藏 -->
        <div class="Associa" v-if="Associa">
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
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <!-- 跳转方法一 -->
          <router-link
            v-show="SwitchId === '1'"
            :to="{ path: '/School', query: { School: Schools.name } }"
            v-for="(Schools, index) in SchoolArr"
            :key="index + 'School'"
          >
            <div class="cell-Line"></div>
            <van-cell center>
              <div slot="default" class="in">
                <div>
                  <div>
                    {{ Schools.name }}
                    <span class="wordSize wordFrame">
                      {{
                        Schools.dual_class_name === null ||
                        Schools.dual_class_name === ""
                          ? "无"
                          : Schools.dual_class_name
                      }}
                      <!-- {{
                        Schools.dual_class_name === null ||
                        Schools.dual_class_name === ""
                          ? (dual = false)
                          : Schools.dual_class_name
                      }} -->
                    </span>
                    <span class="wordSize wordFrame">
                      {{ Schools.f211 === 1 ? "211" : "无" }}
                      <!-- {{ Schools.f211 === 1 ? "211" : (f211 = false) }} -->
                    </span>
                    <span class="wordSize wordFrame">
                      {{ Schools.f985 === 1 ? "985" : "无" }}
                      <!-- {{ Schools.f985 === 1 ? "985" : (f985 = false) }} -->
                    </span>
                  </div>
                  <div class="wordSize">
                    {{ Schools.school_nature_name }}/{{ Schools.type_name }}/
                    {{ Schools.belong }}
                  </div>
                </div>
                <div class="in">
                  <van-icon name="location-o" size="20" />
                  <div class="wordSize">{{ Schools.province_name }}</div>
                </div>
              </div>
            </van-cell>
          </router-link>
        </van-list>
      </div>
      <van-popup class="ScreenAll" v-model="show" position="right" round>
        <van-divider dashed>请筛选</van-divider>
        <!-- <van-cell center>
          <div slot="title">筛选结果：</div>
          <div slot="default" class="ResultAll">
            <div>筛选结果：</div>
            <div>筛选结果：</div>
            <div>筛选结果：</div>
            <div>筛选结果：</div>
          </div>
        </van-cell> -->
        <div>
          <van-divider content-position="left">热门标签</van-divider>
          <div class="Screen">
            <van-button
              plain
              size="mini"
              hairline
              type="info"
              @click="Touflow($event)"
              value="双一流"
            >
              双一流
            </van-button>
            <van-button
              plain
              size="mini"
              hairline
              @click="onF985($event)"
              type="info"
              >985</van-button
            >
            <van-button
              plain
              size="mini"
              hairline
              @click="onF211($event)"
              type="info"
              >211</van-button
            >
          </div>
        </div>
        <van-divider content-position="left">所在地</van-divider>
        <div class="Screen">
          <van-button
            plain
            size="mini"
            hairline
            @click="wholeCountry($event)"
            type="info"
            >全国</van-button
          >
          <van-button
            plain
            size="mini"
            hairline
            @click="Beijing($event)"
            type="info"
            >北京</van-button
          >
          <van-button
            plain
            size="mini"
            hairline
            @click="Guangdong($event)"
            type="info"
            >广东</van-button
          >
        </div>
        <!-- <div class="Screen">
          <van-button plain size="mini" hairline type="info">江苏</van-button>
          <van-button plain size="mini" hairline type="info">上海</van-button>
          <van-button plain size="mini" hairline type="info">重庆</van-button>
        </div> -->
        <van-divider dashed>筛选结果</van-divider>
        <van-field
          v-model="message"
          rows="2"
          autosize
          disabled
          type="textarea"
          placeholder="请进行筛选"
          show-word-limit
        />
        <van-divider dashed>提交</van-divider>
        <van-sticky>
          <van-button
            round
            size="small"
            @click="onResetFilter"
            value="重置筛选"
            type="danger"
          >
            重置筛选
          </van-button>
          <van-button round size="small" @click="onSubmitFilter" type="info">
            提交筛选
          </van-button>
        </van-sticky>
        <van-divider dashed></van-divider>
      </van-popup>
    </div>
  </keep-alive>
</template>
<script>
import { AjaxSchoolAndMajor, SearchWords, AjaxMajorList } from "@/api/api.js";
//工具函数 --节流防抖 --按需加载
import { mapState } from "vuex";

import { debounce } from "lodash";
import { ContactList, CouponCell, Toast } from "vant";
export default {
  name: "Search",
  data() {
    return {
      message: "",
      dual: true,
      f211: true,
      f985: true,
      show: false,
      Tou: false,
      F985: false,
      F211: false,
      whole: false,
      Bei: false,
      Guang: false,
      TouflowText: "",
      F985Text: "",
      F211Text: "",
      wholeCountryText: "",
      BeijingText: "",
      GuangdongText: "",
      sieve: [],
      //联想     有数据显示，没有隐藏
      Associa: false,
      //请求返回的数据
      Word: "",
      //点击联想和失去焦点时错误 有数据显示，没有隐藏
      //滑动加载数据

      list: [],
      SchoolArr: [],
      MajorArr: [],
      //加载状态
      loading: false,
      finished: true,
      //显示条数
      Pages: 20,
      //显示页数
      numPages: 1,
      //搜索类型名字
      titleName: "",
      //搜索类型
      SwitchId: "",
      //搜索关键字
      value: "北京",
      oldvalue: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
    this.SwitchId = this.$route.query.id;
    this.titleName = this.$route.query.name;
    this.onSearch();
  },
  methods: {
    Touflow(event) {
      Toast("完善中,省份可选");
      // if (this.Tou === true) {
      //   this.Tou = false;
      //   this.sieve = this.sieve.filter(
      //     (item) => item.indexOf(event.srcElement.innerText) < 0
      //   );
      //   console.log("存在", this.sieve);
      // } else {
      //   this.Tou = true;
      //   this.sieve.push(event.srcElement.innerText);
      //   console.log("不存在", this.sieve);
      // }
      // var str = "";
      // this.sieve.forEach((i, index) => {
      //   console.log(i);
      //   str += "/" + i;
      // });
      // this.message = str;
    },
    onF985(event) {
      Toast("完善中,省份可选");

      // if (this.F985 === true) {
      //   this.F985 = false;
      //   this.sieve = this.sieve.filter(
      //     (item) => item.indexOf(event.srcElement.innerText) < 0
      //   );
      //   console.log("存在", this.sieve);
      // } else {
      //   this.F985 = true;
      //   this.sieve.push(event.srcElement.innerText);
      //   console.log("不存在", this.sieve);
      // }
      // var str = "";
      // this.sieve.forEach((i, index) => {
      //   console.log(i);
      //   str += "/" + i;
      // });
      // this.message = str;
    },
    onF211(event) {
      Toast("完善中,省份可选");

      // if (this.F211 === true) {
      //   this.F211 = false;
      //   this.sieve = this.sieve.filter(
      //     (item) => item.indexOf(event.srcElement.innerText) < 0
      //   );
      //   console.log("存在", this.sieve);
      // } else {
      //   this.F211 = true;
      //   this.sieve.push(event.srcElement.innerText);
      //   console.log("不存在", this.sieve);
      // }
      // var str = "";
      // this.sieve.forEach((i, index) => {
      //   console.log(i);
      //   str += "/" + i;
      // });
      // this.message = str;
    },
    Guangdong(event) {
      if (this.sieve.length === 0) {
        if (this.Guang === true) {
          this.Guang = false;
          this.sieve = this.sieve.filter(
            (item) => item.indexOf(event.srcElement.innerText) < 0
          );
          console.log("存在", this.sieve);
        } else {
          this.Guang = true;
          this.sieve.push(event.srcElement.innerText);
          console.log("不存在", this.sieve);
        }
        var str = "";
        this.sieve.forEach((i, index) => {
          console.log(i);
          str += "/" + i;
        });
        this.message = str;

        return false;
      } else {
        this.sieve = [];
        Toast("只选择一个省份");
      }
    },
    Beijing(event) {
      if (this.sieve.length === 0) {
        if (this.Bei === true) {
          this.Bei = false;
          this.sieve = this.sieve.filter(
            (item) => item.indexOf(event.srcElement.innerText) < 0
          );
          console.log("存在", this.sieve);
        } else {
          this.Bei = true;
          this.sieve.push(event.srcElement.innerText);
          console.log("不存在", this.sieve);
        }
        var str = "";
        this.sieve.forEach((i, index) => {
          console.log(i);
          str += "/" + i;
        });
        this.message = str;
      } else {
        this.sieve = [];
        Toast("只选择一个省份");
      }
    },
    wholeCountry(event) {
      Toast("当前不支持全国筛选");
      // if (this.whole === true) {
      //   this.whole = false;
      //   this.sieve = this.sieve.filter(
      //     (item) => item.indexOf(event.srcElement.innerText) < 0
      //   );
      //   console.log("存在", this.sieve);
      // } else {
      //   this.whole = true;
      //   this.sieve.push(event.srcElement.innerText);
      //   console.log("不存在", this.sieve);
      // }
      // var str = "";
      // this.sieve.forEach((i, index) => {
      //   console.log(i);
      //   str += "/" + i;
      // });
      // this.message = str;
    },

    onResetFilter() {
      console.log("重置筛选");

      this.message = "";
      this.sieve = [];
      this.Tou = false;
      this.F985 = false;
      this.F211 = false;
      this.whole = false;
      this.Bei = false;
      this.Guang = false;
    },
    async onSubmitFilter() {
      this.show = false;

      this.Word = [];
      this.SchoolArr = [];
      this.MajorArr = [];
      this.Associa = true;

      if (this.sieve[0] === "北京") {
        console.log("北京");
        // this.value = "北京";
   Toast("请等待,正在获取数据");
        let AjaxSchoolAndMajordata = await AjaxSchoolAndMajor({
          params: {
            //当前页码 不能写死
            p: 1,
            //显示条数
            s: 20,
            //专业名或学校
            kw: "北京",
            // k: "计算机",
            //选择(学校：1，专业：2，分数：3)  2
            pv: "北京",
            // token: this.token || "", //	登录后返回
            // token: "登录后才有"
            // sign: 'rzh2021.sign.test'
          },
        });
     

        if (AjaxSchoolAndMajordata.code === 200) {
          this.SchoolArr.push(...AjaxSchoolAndMajordata.data);
          this.MajorArr.push(...AjaxSchoolAndMajordata.data);
          console.log(this.SchoolArr);
        }

        this.loading = false;
      }
      if (this.sieve[0] === "广东") {
         Toast("请等待,正在获取数据");
        // this.value = "广东";
        let AjaxSchoolAndMajordata = await AjaxSchoolAndMajor({
          params: {
            //当前页码 不能写死
            p: 1,
            //显示条数
            s: 20,
            //专业名或学校
            kw: "广东",
            // k: "计算机",
            //选择(学校：1，专业：2，分数：3)  2
            pv: "广东",
            // token: this.token || "", //	登录后返回
            // token: "登录后才有"
            // sign: 'rzh2021.sign.test'
          },
        });
       
        if (AjaxSchoolAndMajordata.code === 200) {
          this.SchoolArr.push(...AjaxSchoolAndMajordata.data);
          this.MajorArr.push(...AjaxSchoolAndMajordata.data);
          console.log(this.SchoolArr);
        }
        this.loading = false;
      }

      // if (this.sieve.length === 0) {
      //   Toast("您尚未进行筛选");
      //   this.show = false;
      // } else {
      //   this.Word = [];
      //   this.SchoolArr = [];
      //   this.MajorArr = [];
      //   let AjaxSchoolAndMajordata = await AjaxSchoolAndMajor({
      //     params: {
      //       kw: this.value,
      //       // k: "计算机",
      //       //选择(学校：1，专业：2，分数：3)  2
      //       pv: sessionStorage.getItem("Latlong"),
      //       // token: this.token,
      //     },
      //   });
      //   if (AjaxSchoolAndMajordata.code === 200) {
      //     this.SchoolArr.push(...AjaxSchoolAndMajordata.data);
      //     this.MajorArr.push(...AjaxSchoolAndMajordata.data);
      //     console.log(this.SchoolArr);
      //   }

      // let AjaxSchoolAndMajordata = await AjaxMajorList({
      //           params: {
      //             //当前页码 不能写死
      //             // p: this.numPages,
      //             //显示条数
      //             // s: this.Pages,
      //             //专业名或学校
      //             // kw: this.value,
      //             // k: "计算机",
      //             //选择(学校：1，专业：2，分数：3)  2
      //             pv: "北京",
      //             // token: this.token || "", //	登录后返回
      //             // token: "登录后才有"
      //             // sign: 'rzh2021.sign.test'
      //           },
      //         });
      // }

      // console.log(AjaxSchoolAndMajor)

      // console.log(this.sieve);
      // console.log("ssssssssssssssssssss", this.MajorArr);
      // Object.keys(this.MajorArr).filter((i, index) => {
      //   console.log(i, this.MajorArr[index]);

      // });
      // this.sieve.forEach((s, inde) => {
      //   console.log(s, inde);
      // });
      // let Arr = this.MajorArr.filter((item ) => {

      //   console.log(item)
      //   // item.indexOf("广东") < 0
      // });

      // for (let i of this.MajorArr) {
      //   console.log(i);
      // }

      // console.log(Arr);
      //     this.MajorArr.forEach((item) => {
      //   console.log(item);
      //   Object.keys(item).forEach((Val) => {
      //     // console.log(item[Val]);
      //     console.log(Val);
      //   });
      // });

      console.log("提交筛选");
    },

    onScreen() {
      this.show = true;
    },
    //高亮
    highilght(KeywordHighlight) {
      // new RegExp(KeywordHighlight, "gi");
      return KeywordHighlight.replace(
        new RegExp(this.value, "gi"),
        `<span style="color:#90BBFD">${this.value}</span>`
      );
    },
    //当点击搜索按钮触发
    onSearch() {
      if (!this.value) {
        this.oldvalue = [];
        return Toast("请输入搜索内容");
      }
      if (this.SwitchId == "2") {
        this.SchoolArr = [];
        this.MajorArr = [];
        AjaxMajorList({
          params: {
            pv: sessionStorage.getItem("Latlong"),
            mj: this.value,
            token: this.token,
          },
        }).then((result) => {
          console.log(result);
        });
        // this.onLoad();
        console.log("点击搜索按钮触发");
      } else {
        this.Keywords(this.value);
        this.Associa = false;
        this.onLoad();
        console.log("点击搜索按钮触发");
      }
    },
    onfocus() {
      this.Associa = true;
      // this.WordClick = false;
      this.finished = true;
      this.numPages = 1;

      //清空搜索记录
      // this.Word = [];
      this.SchoolArr = [];
      this.MajorArr = [];
    },
    //向下滑动自动加载
    async onLoad() {
      // console.log(this.value);
      // 异步更新数据
      if (this.SwitchId == "2") {
        console.log("sss");
        let AjaxSchoolAndMajordata = AjaxMajorList({
          params: {
            //当前页码 不能写死
            p: this.numPages,
            //显示条数
            s: this.Pages,
            //专业名或学校
            kw: this.value,
            // k: "计算机",
            //选择(学校：1，专业：2，分数：3)  2
            pv: sessionStorage.getItem("Latlong"),
            // token: this.token || "", //	登录后返回
            // token: "登录后才有"
            // sign: 'rzh2021.sign.test'
          },
        });

        if (AjaxSchoolAndMajordata.code === 200) {
          this.SchoolArr.push(...AjaxSchoolAndMajordata.data);
          this.MajorArr.push(...AjaxSchoolAndMajordata.data);
          console.log(this.SchoolArr);
        }
        this.loading = false;

        console.log(this.numPages);
        if (AjaxSchoolAndMajordata.totalCount) {
          this.numPages++;
          this.finished = false;
        } else {
          this.finished = true;
        }
      } else {
        let AjaxSchoolAndMajordata = await AjaxSchoolAndMajor({
          params: {
            //当前页码 不能写死
            p: this.numPages,
            //显示条数
            s: this.Pages,
            //专业名或学校
            kw: this.sieve[0] || this.value,
            // k: "计算机",
            //选择(学校：1，专业：2，分数：3)  2
            pv: this.sieve[0] || sessionStorage.getItem("Latlong"),
            // token: this.token || "", //	登录后返回
            // token: "登录后才有"
            // sign: 'rzh2021.sign.test'
          },
        });
        if (AjaxSchoolAndMajordata.code === 200) {
          this.SchoolArr.push(...AjaxSchoolAndMajordata.data);
          this.MajorArr.push(...AjaxSchoolAndMajordata.data);
          console.log(this.SchoolArr);
        }
        this.loading = false;

        console.log(this.numPages);
        if (AjaxSchoolAndMajordata.totalCount) {
          this.numPages++;
          this.finished = false;
        } else {
          this.finished = true;
        }
      }
    },

    //请求的关键字搜索
    Keywords(Keyword) {
      // let Keyword = window.document.getElementById("Keyword").innerHTML;
      console.log("dKeyword");

      this.value = Keyword;
      this.Associa = false;
      //开启滑动加载
      this.finished = false;

      // this.WordClick = true;

      //做取消监听

      // var unwatch = this.$watch("value", this.value);
      // // 之后取消观察
      // unwatch();
    },

    //学校
    // School() {
    //   let Schoolname = window.document.getElementById("School").innerHTML;
    //   console.log(Schoolname);
    //   this.$router.push({
    //     path: "/School",
    //     query: {
    //       School: Schoolname,
    //     },
    //   });
    // },
    //专业
    // Major() {
    //   let Majorname = window.document.getElementById("Major").innerHTML;
    //   console.log(Majorname);
    //   this.$router.push({
    //     path: "/Major",
    //     query: {
    //       Major: Majorname,
    //     },
    //   });
    // },
  },

  //监视数据变化   学校和专业的联想关键词 words
  watch: {
    value: {
      //当数据发生变化时，会立即调用
      handler: debounce(async function (Val, oldVal) {
        if (Val == oldVal) {
          console.log("bub1");
          return;
        }
        //清空搜索记录
        this.Word = [];
        this.SchoolArr = [];
        this.MajorArr = [];

        if (this.SwitchId === "2") {
          console.log("sss");
        } else {
          let Words = await SearchWords({
            params: {
              //分页
              // page: 100,
              // 高校/专业名称
              m: this.value,
              //查询类型 "1"：高校名称，"2": 专业名称
              // t: this.SwitchId,
              t: 1,
            },
          });
          if (Words.code === 200) {
            this.Word = Words.data;
            if (!Words.data.length) {
              //处理显示状态
              this.Associa = false;
              //关闭滑动加载
              Toast.fail(
                this.SwitchId == "1" ? "输入正确的学校名" : "输入正确的专业名"
              );
            }
          }
        }
      }, 80),
      immediate: true,
      // deep: true,
    },
  },
};
</script>

<style lang="less">
.Search {
  .van-search {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .SearchAll {
    display: flex;
    align-items: center;
    justify-content: center;
    .Searchbut {
      margin: 0 10px;
      padding: 0 10px;
    }
  }

  .ScreenAll {
    width: 80%;
    height: 87%;
    .ResultAll {
      //   display: flex;
      //   flex-direction: row;
    }
    .Screen {
      padding: 10px 0;
      width: 100%;
      // background: pink;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      .van-button {
        width: 60px;
      }
    }
    .van-sticky {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .van-popup--right {
    top: 50%;
  }

  .Associa {
    border-radius: 5px;
    // background-color: #eff0f5;
    .van-cell {
      // position:fixed;
      border-bottom: 1px solid #eff0f5;
      padding: 10px 20px;
      // background: transparent;
      .AssociaIcon {
        display: flex;
        text-align: center;
        i {
          padding: 0 !important;
          margin: 0 !important;
        }
      }
      .Association {
        color: #74767d;
      }
      .van-cell__title {
        padding: 0 10px;
        // 文字居中
        // text-align: center;
      }
    }
  }
  .SearhBackground {
    // height: 84vh;
    height: calc(100vh - 150px);
    .Listbottom {
      margin-bottom: 50px;
    }

    background-color: #ced4cd30 !important;
    .SearchContent {
      text-align: center;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .van-ellipsis {
        padding: 10px 10px;
      }
    }
    .van-badge {
      margin: 7px;
      opacity: 0.8;
    }
  }
}
</style>
