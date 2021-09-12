<template>
  <div class="Search">
    <van-sticky>
      <van-nav-bar
        :title="titleName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <van-search
        v-model="value"
        show-action
        :placeholder="`请输入${titleName}关键词`"
        input-align="center"
        @input="oninput"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>

    <div class="SearhBackground">
      <van-cell
        v-for="(Majors, index) in NewArr"
        :key="index + 'Major'"
        @click="Keywords((Keyword = Majors.major))"
        center
      >
        <div slot="default" class="in">
          <div>
            <div>
              {{ Majors.major }}
            </div>
            <div class="wordSize">
              {{ Majors.education }}
            </div>
          </div>
          <div class="in">
            <div class="wordSize">{{ Majors.year }}</div>
          </div>
        </div>
      </van-cell>

      <!-- 联想词语开始 -->
      <!-- //联想 有数据显示，没有隐藏 -->
      <van-list
        v-model="loading"
        :finished="true"
        finished-text="没有更多了"
        v-if="Associa"
      >
        <div class="Associa">
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
      </van-list>
      <!-- 联想词语结束 -->
      <!-- 联想点击或失去焦点或点击搜索按钮触发 -->

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
        v-if="SchoolVip"
        :tablePage="tablePage"
        :loading="loading"
        v-bind:onClick="onClick"
        :columns="columnsdata"
        :Tabledata="Majordata"
        v-bind:onCollection="onCollection"
        v-bind:onPage="onPage"
        v-bind:onCheckbox="onCheckbox"
        :starO="starO"
      >
      </vxeSchool>

      <van-cell />
      <van-cell />
      <van-cell />
      <van-cell />
    </div>
  </div>
</template>
<script>
import vxeSchool from "@/components/vxeTable/vxeTable";
import { debounce, throttle } from "lodash";
import datam from "../../Json/schoolmajor.json";
import {
  HotSearch,
  VipMajor,
  AddCollection,
  DeleteCollection,
} from "../../NewApi/Flymain";

//工具函数 --节流防抖 --按需加载
import { mapState } from "vuex";

import { Toast, Dialog } from "vant";
export default {
  name: "Search",
  data() {
    return {
      SchoolVip: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      newValue: "",
      Vip: false,
      loading: false,
      starO: true,

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
        {
          field: "school_majob",
          title: "专业",
          width: "120",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "school",
          title: "学校",
          width: "100",

          sortable: true,
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "min",
          title: "最低分",
          width: "90",
          sortable: true,
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "min_rank",
          title: "最低分位次",
          width: "90",

          sortable: true,
          showHeaderOverflow: false, //一行省略 加点击提示
        },
        // {
        //   field: "count",
        //   title: "录取人数",
        //   width: "110",
        //   sortable: true,

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
      ],
      Majordata: [],

      Associa: true,
      //请求返回的数据
      Word: "",
      //点击联想和失去焦点时错误 有数据显示，没有隐藏
      // WordClick: false,
      //滑动加载数据

      list: [],
      SchoolArr: [],
      MajorArr: [],
      //加载状态
      loading: false,

      //显示条数
      Pages: 10,
      //总条数
      totalCount: "",

      //搜索类型名字
      titleName: "",
      //搜索类型
      SwitchId: "",
      //搜索关键字
      value: "",
      NewArr: [],
      oldvalue: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
    console.log(datam.RECORDS);
    for (let i = 0; i < 200; i++) {
      this.NewArr.push(datam.RECORDS[i]);
      console.log(datam.RECORDS[i]);
    }
    console.log(this.NewArr);
  },
  mounted() {
    this.SwitchId = this.$route.query.id;
    this.titleName = this.$route.query.name;
    let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
    //未登录提示
    if (VipInformation === null) {
      Dialog.confirm({
        title: "登录",
        message: "请您先登录再使用",
        confirmButtonText: "去登录",
      })
        .then(() => {
          this.loading = false;
          this.$router.push({
            path: "/Login",
          });
        })
        .catch(() => {
          this.loading = false;

          Toast("已取消重新登录,部分功能无法使用");
        });
      // this.Vip = true;
      return false;
    }

    if (Object.keys(VipInformation.user_level).length === 0) {
      Toast("请成为会员");
      // this.Vip = true;

      return false;
    }
    if (VipInformation.user_level[0].type === "普通用户") {
      Toast("请成为会员");
      // this.Vip = true;
      return false;
    }
    if (VipInformation.user_level[0].type === "vip用户") {
      this.Vip = false;
      this.SchoolArr = true;
      return false;
    }
  },
  methods: {
    //热搜索 请求
    async onHotSearch(Keyword) {
      let HotSearchdata = await HotSearch({
        body: {
          m: Keyword,
          t: 2,
        },
        params: {},
      });
      if (HotSearchdata.data.code === 200) {
        //有空格无法去重
        // let duplicateRemoval = [...new Set(HotSearchdata.data.data)];
        this.Word = HotSearchdata.data.data;
        // console.log(this.Word);
        this.Associa = true;
        if (Object.keys(HotSearchdata.data.data).length == 1) {
          //处理显示状态
          this.Associa = false;
        } else {
          this.NewArr = [];
        }
        if (!HotSearchdata.data.data.length) {
          //处理显示状态
          this.Associa = false;
          //关闭滑动加载
          Toast.fail("输入正确的专业名");
        }
      }
    },
    //热搜索
    oninput(e) {
      this.NewArr = [];
      console.log(e);
      this.onHotSearch(e);
      this.Vip = false;
      this.SchoolVip = false;
    },
    //高亮
    highilght(KeywordHighlight) {
      // new RegExp(KeywordHighlight, "gi");
      return KeywordHighlight.replace(
        new RegExp(this.value, "gi"),
        `<span style="color:#90BBFD">${this.value}</span>`
      );
    },
    //专业请求
    async Major(value) {
      try {
        let VipMajordata = await VipMajor({
          body: {
            p: this.tablePage.currentPage,
            s: this.tablePage.pageSize,
            mj: value,
            pv: sessionStorage.getItem("Latlong"),
            token: this.token,
          },
          params: {},
        });

        if (VipMajordata.data.data.length === 0) {
          this.loading = false;
          this.show = false;
          this.SchoolVip = false;
          Toast("暂无相关信息，请重新搜索");
          return false;
        }

        this.loading = false;
        this.tablePage.pageSize = VipMajordata.data.pageSize;
        this.tablePage.total = VipMajordata.data.totalCount;
        this.SchoolVip = true;
        console.log(VipMajordata);
        console.log(this.tablePage.pageSize);
        console.log(this.tablePage.total);
        this.Majordata = VipMajordata.data.data;
      } catch (VipMajordata) {
        this.loading = false;
        this.show = false;
        this.SchoolVip = true;
        if (VipMajordata.status === 404) {
          this.loading = false;
          this.show = false;
          this.SchoolVip = false;
          Toast("暂无相关信息，请重新搜索");

          return false;
        }
        if (VipMajordata.status === 429) {
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");
          return false;
        }
      }
    },

    //请求的关键字搜索
    async Keywords(Keyword) {
      this.NewArr = [];
      this.Associa = false;
      console.log(Keyword);
      this.value = Keyword.trim();
      this.Vip = true;
      let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
      if (VipInformation.user_level[0].type === "vip用户") {
        this.Vip = false;
        this.SchoolVip = true;
        this.loading = true;
        this.Major(Keyword);
      }
    },

    //当点击搜索按钮触发
    onSearch() {
      if (this.value === "") {
        Toast("请输入专业名");
        return false;
      }

      this.NewArr = [];
      this.Associa = false;
      this.Vip = true;
      let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
      if (VipInformation.user_level[0].type === "vip用户") {
        this.Vip = false;
        this.SchoolVip = true;
        this.loading = true;
        this.Major(this.value);
      }

      // this.loading = true;
      // this.SchoolVip = true;
      // console.log(this.value);
      // this.NewArr = [];
      // this.Associa = false;
      // this.Major(this.value);
    },
    async onPage(type, currentPage, pageSize, $event) {
      console.log($event.pageSize);
      console.log($event.currentPage);
      this.loading = true;
      try {
        let VipMajordata = await VipMajor({
          body: {
            p: $event.currentPage,
            s: $event.pageSize,
            mj: this.value,
            pv: sessionStorage.getItem("Latlong"),
            token: this.token,
          },
          params: {},
        });
        this.loading = false;
        this.Majordata = VipMajordata.data.data;
      } catch (VipMajordata) {
        if (VipMajordata.status === 429) {
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");
          this.loading = false;
          this.show = false;
          return false;
        }
      }
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
        Dialog.confirm({
          title: "登录",
          message: "请您先登录再使用",
          confirmButtonText: "去登录",
        })
          .then(() => {
            (this.loading = false),
              this.$router.push({
                path: "/Login",
              });
          })
          .catch(() => {
            (this.loading = false), Toast("已取消重新登录,部分功能无法使用");
          });
      }
    },
    onClick(row) {
      console.log(row.row.school);
      console.log(row.row.school_majob);
      if (row.column.property === "school") {
        this.$router.push({
          path: "/School",
          query: {
            School: row.row.school,
          },
        });
      }
    },

    onCheckbox: throttle(async function (row, column, checked) {
      if (!checked) {
        let AddCollectiondata = await AddCollection({
          body: {
            data: JSON.stringify(row),
            user: this.username,
            token: this.token,
          },
          params: {},
        });

        console.log(AddCollectiondata.data.code);

        if (AddCollectiondata.data.code === "429") {
          Toast("操作过于频繁");
          return false;
        }
        if (AddCollectiondata.data.code === 401) {
          Toast.fail("收藏过多,请前去收藏页面清理记录");
          return false;
        }
        if (AddCollectiondata.data.code === 200) {
          Toast("收藏成功");
          return false;
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

        let DeleteCollectiondata = await DeleteCollection({
          url: `auth2/collection/${AddCollectiondata.data.data[0].id}/`,
          body: {
            token: this.token,
          },
          params: {},
        });

        if (DeleteCollectiondata.data.code === 200) {
          Toast("取消收藏");
        }
        console.log(DeleteCollectiondata.data.code);
        if (DeleteCollectiondata.data.code === 429) {
          Toast("操作过于频繁");
          return false;
        }
      }
    }, 100),

    //添加收藏和删除收藏
    onCollection(row, column, cell, event) {
      console.log(row, column);

      // if (column.label == "收藏") {
      // 添加收藏
      AddCollection({
        body: {
          data: JSON.stringify(row),
          user: this.username,
          token: this.token,
        },
        params: {},
      }).then((res) => {
        if (
          res.data.code == 200 &&
          res.data.message != "已收藏，数据获取成功"
        ) {
          console.log(res);
          Toast("收藏成功");
          return;
        }
        if (res.data.message == "已收藏，数据获取成功") {
          console.log("已收藏");
          //删除收藏
          DeleteCollectiondata(
            `/api/v1/auth2/collection/${res.data.data[0].id}/`,
            {
              body: {
                token: this.token,
              },
              params: {},
            }
          ).then((del) => {
            console.log(del);
            if (del.data.code === 200) {
              Toast("取消收藏");
            }
          });
        }
      });
      // }
    },
  },

  components: {
    vxeSchool,
  },
};
</script>

<style lang="less">
.Search {
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
  .vxeSchool {
    height: 60px;
  }
}
</style>
