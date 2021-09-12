<template>
  <div class="School">
    <van-sticky>
      <van-nav-bar
        :title="SchoolName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>

    <Tab :LeftValue="LeftValue" :RightValue="RightValue">
      <template #Left>
        <van-grid :column-num="1" center>
          <van-grid-item center>
            <h1 slot="icon">{{ SchoolNamedata }}</h1>
            <!-- <div slot="icon">{{ SchoolNamedata }}</div> -->
            <div slot="text" class="place">
              地点:{{ province_name }} / {{ city_name }}
            </div>
            <div slot="text">
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ school_type_name }}
              </van-tag>
              &nbsp;
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ type_name }}
              </van-tag>
              &nbsp;
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ school_nature_name }}
              </van-tag>
              &nbsp;
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ dual_class_name }}
              </van-tag>
              &nbsp;
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ f985 === 1 ? "985" : "无" }}
              </van-tag>
              &nbsp;
              <van-tag color="#ffe1e1" text-color="#ad0000">
                {{ f211 === 1 ? "211" : "无" }}
              </van-tag>
              &nbsp;
            </div>
          </van-grid-item>
        </van-grid>
        <div class="cell-Line Line"></div>

        <van-cell-group center v-if="isJob">
          <van-cell>
            <div slot="title">
              <h1>就业率统计</h1>
            </div>
          </van-cell>
          <van-cell>
            <van-grid :column-num="3" :border="false">
              <van-grid-item>
                <div slot="icon">
                  <van-circle
                    v-model="jobRate"
                    :rate="jobRate"
                    :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
                    :text="jobRate + '%'"
                    size="90"
                  />
                </div>
                <div slot="text">就业率</div>
              </van-grid-item>
              <van-grid-item>
                <div slot="icon">
                  <van-circle
                    v-model="abroadRate"
                    :rate="abroadRate"
                    :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
                    size="90"
                    :text="abroadRate + '%'"
                  />
                </div>
                <div slot="text">出国率</div>
              </van-grid-item>
              <van-grid-item>
                <div slot="icon">
                  <van-circle
                    v-model="postgraduateRate"
                    :rate="postgraduateRate"
                    :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
                    :text="postgraduateRate + '%'"
                    size="90"
                  />
                </div>
                <div slot="text">国内升学率</div>
              </van-grid-item>
            </van-grid>
          </van-cell>
        </van-cell-group>

        <div class="cell-Line Line"></div>
        <van-cell title="前去招生地址了解详细" is-link :url="Recruit" />
        <div class="cell-Line Line"></div>
        <van-cell>
          <div slot="title">招生电话：{{ Telephone }}</div>
        </van-cell>
        <div class="cell-Line Line"></div>
        <div
          class="Vhtml"
          v-html="content === '' ? '暂无相关简介信息' : content"
        ></div>

        <!-- <van-row type="flex" justify="center">
          <van-col class="Vhtml" v-html="content"> </van-col>
        </van-row> -->

        <div class="Left"></div>
        <!-- </van-sticky> -->
      </template>

      <template #Right>
        <div class="onVip" v-if="Vip">
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

        <vxeSchool
          v-else
          :loading="loading"
          :columns="columnsdata"
          :Tabledata="Schooldata"
          v-bind:onCollection="onCollection"
          v-bind:onCheckbox="onCheckbox"
          :starO="starO"
          v-bind:onPage="onPage"
          :onClick="onClick"
          :tablePage="tablePage"
        >
        </vxeSchool>
        <div class="Right"></div>
      </template>
    </Tab>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" type="spinner" color="#1989fa" vertical>
          加载中...
        </van-loading>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import {
  VipMajor,
  SearchSchools,
  AddCollection,
  DeleteCollection,
} from "../../NewApi/Flymain";
import Tab from "@/components/Tab/Tab";
import vxeSchool from "@/components/vxeTable/vxeTable";
import { mapState } from "vuex";
import { Toast } from "vant";
import { debounce, throttle } from "lodash";
import { Dialog } from "vant";
export default {
  name: "School",
  data() {
    return {
      show: true,

      Telephone: "",
      Recruit: "",
      Vip: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loading: false,
      LeftValue: "学校信息",
      RightValue: "专业分数线",
      //学校简介
      content: "",

      //
      starO: true,

      //查专业

      columnsdata: [
        {
          field: "Collection",
          title: "收藏",
          width: "50",
          showHeaderOverflow: true, //一行省略 加点击提示
          // slots: { default: "Collection" }, //插槽
          type: "checkbox",
          slots: { default: "checkbox" }, //插槽
        },
        // {
        //   field: "school",
        //   title: "学校",
        //   width: "100",
        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "school_majob",
          title: "专业名",
          width: "100",
          showHeaderOverflow: true, //一行省略 加点击提示
        },

        {
          field: "min",
          title: "最低分",
          width: "100",
          sortable: true,
          showHeaderOverflow: true, //一行省略 加点击提示
        },

        {
          field: "min_rank",
          title: "最低分排位",
          width: "120",
          sortable: true,
          showHeaderOverflow: true, //一行省略 加点击提示
        },

        {
          field: "type",
          title: "科类",
          width: "70",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "batch",
          title: "批次",
          width: "80",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        //不要删除
        // {
        //   field: "count",
        //   title: "录取人数",
        //   width: "120",
        //   sortable: true,
        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "remarks",
          title: "备注",
          width: "90",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
      ],
      //表中数据
      Schooldata: [],

      SchoolName: "",

      SchoolNamedata: "",
      province_name: "",
      city_name: "",
      dual_class_name: "",
      f985: "",
      f211: "",
      type_name: "",
      school_nature_name: "",
      school_type_name: "",
      isJob: true,
      jobRate: "", //就业率
      postgraduateRate: "", //国内升学率
      abroadRate: "", //出国率

      value: 0,
    };
  },

  created() {
    console.log(this.$route.query.School);
  },

  async mounted() {
    let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
    // this.loading = true;
    //未登录提示
    if (VipInformation === null) {
      Dialog.confirm({
        title: "登录",
        message: "请您先登录再使用",
        confirmButtonText: "去登录",
      })
        .then(() => {
          this.getdata();
          this.show = false;
          this.$router.push({
            path: "/Login",
          });
        })
        .catch(() => {
          this.getdata();
          this.show = false;
          Toast("已取消重新登录,部分功能无法使用");
        });
      this.loading = false;
      this.Vip = true;
      await this.getdata();
      return false;
    }

    if (Object.keys(VipInformation.user_level).length === 0) {
      Toast("请成为会员");
      this.Vip = true;
      await this.getdata();

      return false;
    }
    if (VipInformation.user_level[0].type === "普通用户") {
      Toast("请成为会员");
      this.Vip = true;
      await this.getdata();
      return false;
    }
    if (VipInformation.user_level[0].type === "vip用户") {
      this.Vip = false;
      await this.getdata();
      return false;
    }
  },

  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  methods: {
    async getdata() {
      this.SchoolName = this.$route.query.School;
      try {
        let SearchSchoolsdata = await SearchSchools({
          body: {
            pv: sessionStorage.getItem("Latlong"),
            kw: this.SchoolName, //	高校/专业名称
            // token: this.token,
          },
          params: {},
        });

        console.log(SearchSchoolsdata);

        if (SearchSchoolsdata.data.code === 200) {
          console.log(SearchSchoolsdata.data);
          this.loading = false;
          if (SearchSchoolsdata.data.data.length === 0) {
            this.show = false;
            Toast("暂无相关信息");
            return false;
          }

          for (const item in SearchSchoolsdata.data.data) {
            if (
              SearchSchoolsdata.data.data[item].name ===
              this.$route.query.School
            ) {
              //就业率
              this.jobRate = Number(SearchSchoolsdata.data.data[item].job);
              //国内升学率
              this.postgraduateRate = Number(
                SearchSchoolsdata.data.data[item].postgraduate
              );
              //出国率
              this.abroadRate = Number(
                SearchSchoolsdata.data.data[item].abroad
              );
              this.SchoolNamedata = await SearchSchoolsdata.data.data[item]
                .name;
              this.province_name = await SearchSchoolsdata.data.data[item]
                .province_name;
              this.city_name = await SearchSchoolsdata.data.data[item]
                .city_name;
              this.dual_class_name = await SearchSchoolsdata.data.data[item]
                .dual_class_name;
              this.f985 = await SearchSchoolsdata.data.data[item].f985;
              this.f211 = await SearchSchoolsdata.data.data[item].f211;
              this.type_name = await SearchSchoolsdata.data.data[item]
                .type_name;
              this.school_nature_name = await SearchSchoolsdata.data.data[item]
                .school_nature_name;
              this.school_type_name = await SearchSchoolsdata.data.data[item]
                .school_type_name;
              this.Recruit = await SearchSchoolsdata.data.data[item]
                .school_site;

              console.log(this.jobRate);
              console.log(this.postgraduateRate);
              console.log(this.abroadRate);
              if (
                this.jobRate === null ||
                this.postgraduateRate === null ||
                this.abroadRate === null ||
                this.jobRate === 0 ||
                this.postgraduateRate === 0 ||
                this.abroadRate === 0
              ) {
                this.isJob = false;
                console.log("信息");
              }

              this.Telephone = await SearchSchoolsdata.data.data[item].phone;
              this.content = await SearchSchoolsdata.data.data[
                item
              ].content.replace(/\\/g, "");
              // this.content = await SearchSchoolsdata.data.data[item].content;

              // console.log(SearchSchoolsdata.data.data[item].content);
            }
            this.show = false;
          }
        }
        if (SearchSchoolsdata.data.code === 429) {
          this.loading = false;
          this.show = false;
          return false;
        }
      } catch (SearchSchoolsdata) {
        this.loading = false;
        this.show = false;
        if (SearchSchoolsdata.status === 429) {
          // Toast.fail("等待5秒后使用,请刷新页面");
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");
          this.loading = false;
          this.show = false;

          return false;
        }
      }
      //Vip学校分数
      try {
        let VipMajordata = await VipMajor({
          body: {
            kw: this.SchoolName,
            pv: sessionStorage.getItem("Latlong"),
            token: this.token,
          },
          params: {},
        });
        if (VipMajordata.data.code === 200) {
          this.loading = false;

          for (const item in VipMajordata.data.data) {
            if (
              VipMajordata.data.data[item].school === this.$route.query.School
            ) {
              this.Schooldata.push(VipMajordata.data.data[item]);
            }
          }
          // this.Schooldata = VipMajordata.data.data;
          this.tablePage.pageSize = VipMajordata.data.pageSize;
          this.tablePage.total = VipMajordata.data.totalCount;
        }
      } catch (VipMajordata) {
        this.loading = false;
        this.show = false;
        if (VipMajordata.status === 429) {
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");
          this.loading = false;
          this.show = false;
          return false;
        }
      }
    },
    //收藏
    onCheckbox: throttle(async function (row, column, checked) {
      if (!checked) {
        try {
          let AddCollectiondata = await AddCollection({
            body: {
              data: JSON.stringify(row),
              user: this.username,
              token: this.token,
            },
            params: {},
          });
          if (AddCollectiondata.data.code === 200) {
            Toast("收藏成功");
            return false;
          }
        } catch (AddCollectiondata) {
          // Toast("操作过于频繁");
          console.log(AddCollectiondata);
          console.log(AddCollectiondata.response);
          if (AddCollectiondata.data.code === "429") {
            Toast("操作过于频繁");
            return false;
          }
          if (AddCollectiondata.data.code === 401) {
            Toast.fail("收藏过多,请前去收藏页面清理记录");
            return false;
          }
        }
      } else {
        let AddCollectiondata = await AddCollection({
          body: {
            data: JSON.stringify(row),
            user: this.username,
            token: this.token,
          },
          params: {},
        });
        console.log(AddCollectiondata.data.data);
        try {
          console.log(AddCollectiondata.data.data[0].id);
          let DeleteCollectiondata = await DeleteCollection({
            url: `auth2/collection/${AddCollectiondata.data.data[0].id}/`,
            body: {
              token: this.token,
            },
            params: {},
          });
          console.log(DeleteCollectiondata);
          if (DeleteCollectiondata.data.code === 200) {
            Toast("取消收藏");
          }
        } catch (DeleteCollectiondata) {
          // Toast("操作过于频繁");
          console.log(DeleteCollectiondata);

          if (DeleteCollectiondata.data.code === 429) {
            Toast("操作过于频繁");
            return false;
          }
        }
      }
    }, 100),
    async onPage(type, currentPage, pageSize, $event) {
      this.loading = true;

      this.Schooldata = [];

      try {
        let VipMajordata = await VipMajor({
          body: {
            p: $event.currentPage,
            s: $event.pageSize || 10,
            kw: this.SchoolName,
            pv: sessionStorage.getItem("Latlong"),
            token: this.token,
          },
          params: {},
        });

        if (VipMajordata.data.code === 200) {
          this.loading = false;
          for (const item in VipMajordata.data.data) {
            if (
              VipMajordata.data.data[item].school === this.$route.query.School
            ) {
              this.Schooldata.push(VipMajordata.data.data[item]);
            }
          }
          this.tablePage.pageSize = VipMajordata.data.pageSize;
          this.tablePage.total = VipMajordata.data.totalCount;

          console.log("Schooldata", this.Schooldata);
        }
      } catch (VipMajordata) {
        if (VipMajordata.data.code === 429) {
          Toast.fail("请刷新页面，等待5秒后使用");
          this.loading = false;
          return false;
        }
      }
    },

    //添加收藏和删除收藏
    onCollection(row, column, cell, event) {},
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
      }
    },
    onClick() {},
  },

  components: {
    Tab,
    vxeSchool,
  },
};
</script>
<style lang="less">
.School {
  .place {
    font-size: 16px;
    margin: 0 0 10px;
    color: #acaaaa;
  }
  .Left {
    margin-bottom: 100px;
  }
  .Right {
    margin-bottom: 100px;
  }
  .center {
  }
  .Vhtml {
    text-align: justify;
    text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
    padding: 20px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
