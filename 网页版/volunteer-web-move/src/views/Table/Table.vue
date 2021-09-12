<template>
  <keep-alive>
    <div class="SearchAll">
      <van-sticky>
        <van-nav-bar
          :title="titleName"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
        <Search
          @onInput="onInput($event)"
          :modelValue="modelValue"
          :Placeholder="Placeholder"
          :onSearch="onSearch"
          :onScreen="onScreen"
        >
        </Search>
      </van-sticky>
      <div class="SearhBackground">
        <!-- 联想词语开始 -->
        <!-- //联想 有数据显示，没有隐藏 -->
        <div class="Associa" v-if="Associa">
          <van-list
            v-model="loadingWord"
            :finished="finishedWord"
            finished-text="没有更多了"
            @load="onLoad"
          >
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
          </van-list>
        </div>
        <!-- 联想词语结束 -->

        <!-- 联想点击或失去焦点或点击搜索按钮触发 -->
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        > -->
        <van-list
          v-if="School"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
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

      <van-popup
        v-model="show"
        class="ScreenAll"
        position="right"
        round
        @close="onClose"
      >
        <van-divider dashed>筛选</van-divider>
        <van-divider content-position="left">热门标签</van-divider>
        <van-checkbox-group
          v-model="ScreenResult"
          class="Screen"
          icon-size="0px"
          border="false"
          @change="onCheckboxScreen($event)"
        >
          <van-grid :column-num="3" center>
            <van-grid-item center>
              <van-checkbox name="双一流">
                <van-button plain size="mini" hairline type="info">
                  双一流
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item>
              <van-checkbox name="985">
                <van-button plain size="mini" hairline type="info">
                  985
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item>
              <van-checkbox name="211">
                <van-button plain size="mini" hairline type="info">
                  211
                </van-button>
              </van-checkbox>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-divider content-position="left">所在地</van-divider>

        <van-checkbox-group
          v-model="ScreenRadio"
          :max="1"
          class="Screen"
          icon-size="0px"
          border="false"
          @change="onRadioScreen($event)"
        >
          <van-grid :column-num="3" center>
            <van-grid-item @click="onChange">
              <van-checkbox name="全国">
                <van-button plain size="mini" hairline type="info">
                  全国
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="北京">
                <van-button plain size="mini" hairline type="info">
                  北京
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="广东">
                <van-button plain size="mini" hairline type="info">
                  广东
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="江苏">
                <van-button plain size="mini" hairline type="info">
                  江苏
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="上海">
                <van-button plain size="mini" hairline type="info">
                  上海
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="重庆">
                <van-button plain size="mini" hairline type="info">
                  重庆
                </van-button>
              </van-checkbox>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-divider dashed>筛选结果</van-divider>
        <van-cell center>
          <div slot="default" class="ResultAll">
            <van-field
              v-model="ScreeningResults"
              disabled
              input-align="center"
              rows="2"
              type="textarea"
              placeholder="筛选结果"
            />
          </div>
        </van-cell>

        <van-divider dashed>提交</van-divider>
        <van-sticky>
          <van-button round size="small" @click="onResetFilter" type="danger">
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
import { SearchSchools } from "../../NewApi/Flymain";
import Search from "@/components/Search/Search";
// import { List } from "vant";
import { AjaxSchoolAndMajor, SearchWords, AjaxMajorList } from "@/api/api.js";
//工具函数 --节流防抖 --按需加载
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  name: "SearchAll",
  data() {
    return {
      ScreenResult: [], //标签
      ScreenRadio: [], //省份
      Text: "", //保存输入框内容  省份
      ArrText: "", //保存输入框内容   标签
      ScreeningResults: "", //结果输入框
      //省份
      mun: 1,
      NewmodelValue: "",
      Placeholder: "请输入学校名字",
      modelValue: "",
      show: false,
      dual: true,
      f211: true,
      f985: true,
      //联想     有数据显示，没有隐藏
      Associa: true,
      School: true,
      //请求返回的数据
      Word: "",
      //点击联想和失去焦点时错误 有数据显示，没有隐藏
      // WordClick: false,
      //滑动加载数据
      list: [],
      SchoolArr: [],
      MajorArr: [],
      //加载状态
      loadingWord: true,
      finishedWord: true,
      // loading: true,
      // finished: true,
      loading: false,
      finished: false,
      //显示条数
      Pages: 10,
      //显示页数
      numPages: 1,
      //搜索类型名字
      titleName: "",
      //搜索类型
      SwitchId: "",
      //搜索关键字
      value: "",
      oldvalue: [],
    };
  },
  components: {
    Search,
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
    // this.modelValue = sessionStorage.getItem("Latlong");
    this.SwitchId = this.$route.query.id;
    this.titleName = this.$route.query.name;
  },
  async mounted() {
    // this.onSearch();
  },
  methods: {
    //高亮  --完成
    highilght(KeywordHighlight) {
      return KeywordHighlight.replace(
        new RegExp(this.modelValue, "gi"),
        `<span style="color:#90BBFD">${this.modelValue}</span>`
      );
    },
    //输入框变化时发送请求  ---完成
    async onInput(modelValue) {
      this.School = false;
      if ((await modelValue) === "") {
        this.Associa = await true;
        this.finishedWord = await true;
        return await false;
      }
      console.log("输入框变化", modelValue);
      this.Word = await [];
      this.SchoolArr = await [];
      this.modelValue = await modelValue;
      this.Associa = await true;
      this.finishedWord = await false;
      await this.onLoad();
    },
    //点击请求到的关键字进行搜索  --完成
    async Keywords(Keyword) {
      this.modelValue = Keyword;
      await this.onSearch(Keyword);
    },
    //输入框搜索发送请求  ---完成
    async onSearch() {
      this.Associa = await false;
      this.School = await true;
      this.finished = false;
      if ((await this.modelValue) === "") {
        this.finished = await true; //关闭自动加载
        await Toast("请输入学校名字");
        return true;
      }
      if (
        (await this.NewmodelValue) === (await this.modelValue) ||
        (await this.ScreenRadioText) === (await this.modelValue)
      ) {
        // this.finished = true; //关闭自动加载
        if (this.mun === 1) {
          let clear = setTimeout(() => {
            this.mun = 2;
            this.finished = true; //关闭自动加载
            // Toast.fail("暂无相关数据");
            clearTimeout(clear);
            return false;
          }, 2000);
        }
        if (this.mun === 2) {
          let clear = setTimeout(() => {
            this.finished = true; //关闭自动加载
            this.mun = 1;
            // Toast.fail("暂无相关数据");
            clearTimeout(clear);

            return false;
          }, 2000);
        }
        return false;
      }
      console.log("搜索", this.modelValue);
      this.SchoolArr = await [];
      this.Word = await [];
      this.NewmodelValue = await this.modelValue;
      this.ScreenRadioText = await this.modelValue;
      this.numPages = 1;
      this.Pages = 10;
      await this.onLoad();
    },

    /**
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */

    //下拉自动加载    --没做异常处理404--426
    async onLoad() {
      console.log("自动加载");
      let newArr = [];
      let Arr = [];
      // 把筛选到的标签转成对象    -----数组转对象
      let obj = {};
      if (this.ScreenResult.length !== 0) {
        this.ScreenResult.forEach((item) => {
          if (item === "双一流" ? "双一流" : "") {
            obj = {
              dual_class_name: item === "双一流" ? "双一流" : "",
            };
          }
          if (item === "211" ? 1 : "") {
            obj = {
              ...obj,
              f211: item === "211" ? 1 : "",
            };
          }
          if (item === "985" ? 1 : "") {
            obj = {
              ...obj,
              f985: item === "985" ? 1 : "",
            };
          }
        });
      }
      if (this.Associa === true && this.School === false) {
        console.log("热搜索");
        //发送请求
        let Words = await SearchWords({
          params: {
            m: this.modelValue,
            t: 1,
          },
        });
        if (Words.code === 200) {
          this.finishedWord = true;
          this.Word = Words.data;
          if (!Words.data.length) {
            //处理显示状态
            this.Associa = true;
            //关闭滑动加载
            Toast.fail(
              this.SwitchId == "1" ? "输入正确的学校名" : "输入正确的专业名"
            );
          }
        }
        return false;
      }
      console.log("搜索");
      if (this.School === true) {
        try {
          let SearchSchoolsdata = await SearchSchools({
            body: {
              p: this.numPages,
              s: this.Pages,
              //专业名或学校
              kw: this.ScreenRadioText || this.modelValue,
              pv: sessionStorage.getItem("Latlong"),
            },
            params: {},
          });
          console.log("---------------------", SearchSchoolsdata);
          if (SearchSchoolsdata.data.code === 200) {
            //判断是否筛选到标签-------没筛选到
            if (this.ScreenResult.length === 0) {
              this.SchoolArr.push(...SearchSchoolsdata.data.data);
              console.log("不用筛选", this.SchoolArr);

              // 加载状态结束
              this.loading = false;
            }
            //判断是否筛选到标签-------筛选到
            if (this.ScreenResult.length !== 0) {
              for (
                var i = 0, len = SearchSchoolsdata.data.data.length;
                i < len;
                i++
              ) {
                Object.keys(SearchSchoolsdata.data.data[i]).filter(
                  (AllLabels) => {
                    Object.keys(obj).filter((Label, key) => {
                      if (
                        Label + "--" + obj[Label] ===
                        AllLabels +
                          "--" +
                          SearchSchoolsdata.data.data[i][AllLabels]
                      ) {
                        Arr.push(SearchSchoolsdata.data.data[i]);
                        return SearchSchoolsdata.data.data[i];
                      }
                    });
                  }
                );
              }
              newArr.push(...Arr);
              let duplicateRemoval = [...new Set(newArr)];
              this.SchoolArr.push(...duplicateRemoval);
              console.log("已进行筛选", this.SchoolArr);
            }
          }
          if (
            SearchSchoolsdata.data.code === 200 &&
            !SearchSchoolsdata.data.data.length
          ) {
            await Toast.fail("暂无相关数据");
            return false;
          }
          if (SearchSchoolsdata.data.totalCount) {
            try {
              this.numPages++;

              console.log(this.numPages);
              console.log(this.numPages);
            } catch (SearchSchoolsdata) {
              if (SearchSchoolsdata.response.data.code === 429) {
                Toast.fail("请刷新页面，等待5秒后使用");
                return false;
              }
              if (SearchSchoolsdata.response.data.code === 404) {
                Toast.fail("数据加载完毕");
                return false;
              }
            }
          } else {
          }
        } catch (SearchSchoolsdata) {
          console.log(SearchSchoolsdata);

          if (SearchSchoolsdata.response.data.code === 429) {
            Toast.fail("请刷新页面，等待5秒后使用");
            return false;
          }
          if (SearchSchoolsdata.response.data.code === 404) {
            Toast.fail("数据加载完毕");
            return false;
          }
          if (SearchSchoolsdata.status === 0) {
            Toast.fail("你的网络出错了");
            return false;
          }
        }
        return false;
      }
    },

    /**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 





 */

    //打开筛选   ---完成
    async onScreen() {
      this.show = true;
      console.log("筛选");
    },
    //关闭筛选   ---完成
    onClose() {
      console.log("关闭筛选");
      this.show = false;
    },
    //筛选标签   ---完成
    onCheckboxScreen(ScreenResult) {
      this.ScreeningResults = "";
      this.ArrText = "";
      ScreenResult.forEach((res) => {
        console.log(res);
        this.ArrText += res + " / ";
      });
      // this.ArrText = this.ScreeningResults;
      sessionStorage.setItem("ArrText", this.ArrText);
      sessionStorage.setItem("Text", this.Text);
      this.ScreeningResults =
        sessionStorage.getItem("ArrText") + sessionStorage.getItem("Text");
      console.log("标签", this.ArrText);
    },

    //筛选省份    ---完成
    onRadioScreen(ScreenRadio) {
      this.ScreeningResults = "";
      this.Text = "";
      this.ScreenRadioText = ScreenRadio[0];
      ScreenRadio.forEach((res) => {
        console.log(res);
        this.Text += res + " / ";
      });
      sessionStorage.setItem("ArrText", this.ArrText);
      sessionStorage.setItem("Text", this.Text);
      this.ScreeningResults =
        sessionStorage.getItem("ArrText") + sessionStorage.getItem("Text");
    },
    //用户选择提示    ---完成
    onChange(event) {
      //提示用户只能选择一个
      if (
        this.ScreenRadioText !== undefined &&
        this.ScreenRadioText !== "" &&
        this.ScreenRadioText !== event.target.innerText
      ) {
        Toast.fail("只能选择一个,请取消上次选择");
        return false;
      }
      //当用户在再次点击时，取消选择
      if (this.ScreenRadioText === event.target.innerText) {
        this.ScreenRadioText = "";
        return false;
      }
      //提示用户当前不支持全国选择
      if ("全国" === event.target.innerText) {
        Toast.fail("当前不支持全国筛选，请取消选择");
        this.ScreenRadioText = "";
        return false;
      }
    },
    //重置筛选结果     ---完成
    async onResetFilter() {
      this.ScreenResult = [];
      this.ScreenRadio = [];
      this.ScreeningResults = "";
      this.Text = "";
      this.ArrText = "";
      this.ScreenRadioText;
      Toast.success("重置成功");
      console.log("重置筛选");
    },
    //提交筛选结果   --重复添加bug
    async onSubmitFilter() {
      this.numPages = 1;
      this.Pages = 10;
      this.show = false;
      if (this.Text === "" && this.ArrText === "") {
        Toast("您暂未选择相关筛选");
        return false;
      }
      //筛选省份不变
      if (this.modelValue === this.ScreenRadioText && this.ArrText === "") {
        // this.finished = true; //关闭自动加载
        if (this.mun === 1) {
          console.log("搜索不变", this.mun);
          let clear = setTimeout(() => {
            this.mun = 2;
            this.finished = true; //关闭自动加载
            // Toast.fail("暂无相关数据");
            clearTimeout(clear);
            return false;
          }, 2000);
        }
        if (this.mun === 2) {
          let clear = setTimeout(() => {
            this.finished = true; //关闭自动加载
            this.mun = 1;
            // Toast.fail("暂无相关数据");
            clearTimeout(clear);
            return false;
          }, 2000);
        }
        return false;
      }
      //标签不为空
      if (this.ArrText !== "" && this.Text === "") {
        this.finished = false;
        this.SchoolArr = [];
        this.Word = [];
        this.numPages = 1;
        this.Pages = 10;
        this.ScreenRadioText = sessionStorage.getItem("Latlong").toString();
        this.modelValue = sessionStorage.getItem("Latlong").toString();
        this.NewmodelValue = sessionStorage.getItem("Latlong").toString();
        this.Associa = false;
        this.School = true;
        this.onLoad();
        return false;
      }
      //省份不为空
      if (this.ArrText === "" && this.Text !== "") {
        this.finished = false;
        this.SchoolArr = [];
        this.Word = [];
        this.numPages = 1;
        this.Pages = 10;
        this.modelValue = this.ScreenRadioText;
        this.NewmodelValue = this.ScreenRadioText;
        this.Associa = false;
        this.School = true;
        this.onLoad();
        return false;
      }
      //省份和标签不为空
      if (this.ArrText !== "" && this.Text !== "") {
        this.finished = false;
        this.SchoolArr = [];
        this.Word = [];
        this.numPages = 1;
        this.Pages = 10;
        this.modelValue = this.ScreenRadioText;
        this.NewmodelValue = this.ScreenRadioText;
        this.Associa = false;
        this.School = true;
        this.onLoad();
        return false;
      }
    },
  },
};
</script>

<style lang="less">
.SearchAll {
  .SearhBackground {
    .Associa {
      border-radius: 5px;
      .van-cell {
        border-bottom: 1px solid #eff0f5;
        padding: 10px 20px;
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
        }
      }
    }
  }
  .ScreenAll {
    width: 80%;
    height: 87%;
    .ResultAll {
      padding: 0;
      height: 30px;
    }
    .Screen {
      width: 100%;
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
  .van-grid {
    .van-grid-item {
      i {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
