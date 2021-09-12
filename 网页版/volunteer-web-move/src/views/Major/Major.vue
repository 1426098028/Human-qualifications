<template>
  <div class="Major">
    <van-sticky>
      <van-nav-bar
        :title="MajorName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <!-- <div class="Risk">冲(险)</div>
    <div class="punching">冲</div>
    <div class="protect">保</div>
    <div class="pad">垫</div> -->
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
      :tablePage="tablePage"
      v-bind:onPage="onPage"
      :loading="loading"
      v-bind:onClick="onClick"
      :columns="columnsdata"
      :Tabledata="Majordata"
      :starO="starO"
      v-bind:onCheckbox="onCheckbox"
    >
    </vxeSchool>
    <!-- <Tab :LeftValue="LeftValue" :loading="loading" :RightValue="RightValue">
      <template #Left>
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
          :Tabledata="Majordata"
          v-bind:onCollection="onCollection"
          :starO="starO"
        >


        
        </vxeSchool>
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

        <Prospect v-else></Prospect>
      </template>
    </Tab> -->
    <div class="vxeSchool"></div>
  </div>
</template>
<script>
import {
  VipMajor,
  AddCollection,
  DeleteCollection,
} from "../../NewApi/Flymain";
import Tab from "@/components/Tab/Tab";
import Prospect from "@/components/Prospect/Prospect";
import vxeSchool from "@/components/vxeTable/vxeTable";

import { mapState } from "vuex";
import { Toast, Dialog } from "vant";

export default {
  name: "Major",
  data() {
    return {
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      Vip: true,
      loading: true,
      LeftValue: "分数线",
      RightValue: "就业前景",
      starO: true,
      gte: "",
      lte: "",
      inpval: "",
      MajorName: "",
      value: "",
      min: [],
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
          // width: "100",
          showHeaderOverflow: false, //一行省略 加点击提示
        },
        // {
        //   field: "max",
        //   title: "最高分",
        //   width: "90",
        //   sortable: true,

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "min",
          title: "最低分",
          width: "60",
          sortable: true,

          showHeaderOverflow: false, //一行省略 加点击提示
        },

        // {
        //   field: "avg",
        //   title: "平均分",
        //   width: "90",
        //   sortable: true,

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },

        {
          field: "min_rank",
          title: "最低分位次",
          // width: "60",
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
        {
          field: "Fx",
          title: "分析评估",
          // width: "60",

          // sortable: true,
          showHeaderOverflow: false, //一行省略 加点击提示
        },
      ],
      Majordata: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  async created() {
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
      // return false;
    }

    this.gte = this.$route.query.gte;
    this.lte = this.$route.query.lte;

    console.log(this.gte);
    console.log(this.lte);

    this.MajorName = this.$route.query.Major;
    try {
      let VipMajordata = await VipMajor({
        body: {
          gt: this.gte || 0,
          lt: this.lte || 0,
          kw: this.MajorName,
          t: this.$route.query.t,
          //当前省份 不能写死
          pv: sessionStorage.getItem("Latlong"),
          token: this.token,
        },
        params: {},
      });
      this.tablePage.pageSize = VipMajordata.data.pageSize;
      this.tablePage.total = VipMajordata.data.totalCount;
      this.loading = false;
      let Arr = [],
        Arr1 = [],
        Arr2 = [],
        Arr3 = [],
        Arr4 = [],
        Arr5 = [];
      console.log(VipMajordata);
      console.log(VipMajordata.data.code);
      // if (VipMajordata.data.code == 200) {
      VipMajordata.data.data.forEach((item, index) => {
        if (VipMajordata.data.data[index].school === this.MajorName) {
          console.log(VipMajordata.data.data[index].min);
          let num = Number(VipMajordata.data.data[index].min);
          let Val = Number(this.$route.query.inpval);
          let Fx = Val - num;
          if (Fx < -5) {
            console.log(num, Val);
            let str = "险";
            let obj = { ...VipMajordata.data.data[index], Fx: "冲(险)" };
            Arr.push(obj);
            console.log(str);
          } else {
            if (Fx >= -5 && Fx < 0) {
              console.log(num, Val);
              let str = "冲";
              let obj = { ...VipMajordata.data.data[index], Fx: "冲" };
              Arr1.push(obj);
              console.log(str);
            } else {
              if (Fx >= 0 && Fx < 5) {
                console.log(num, Val);
                let str = "稳";
                let obj = { ...VipMajordata.data.data[index], Fx: "稳" };
                Arr2.push(obj);
                console.log(str);
              } else {
                if (Fx >= 5 && Fx < 10) {
                  console.log(num, Val);
                  let str = "保";
                  let obj = { ...VipMajordata.data.data[index], Fx: "保" };
                  Arr3.push(obj);
                  console.log(str);
                } else {
                  console.log(num, Val);
                  let str = "垫";
                  let obj = { ...VipMajordata.data.data[index], Fx: "垫" };
                  Arr4.push(obj);
                  console.log(str);
                  // if (Fx <= 5 && Fx >= 10) {
                  //   let str = "无";
                  //   let obj = { ...VipMajordata.data.data[index], Fx: "无" };
                  //   Arr5.push(obj);
                  //   console.log(str);
                  // }
                }
              }
            }
          }
        }
      });
      this.Majordata.push(...Arr, ...Arr1, ...Arr2, ...Arr3, ...Arr4);
      console.log(VipMajordata.data);
      console.log(this.Majordata, Arr5);
      // }
    } catch (VipMajordata) {
      this.loading = false;
      this.show = false;

      if (VipMajordata.status === 429) {
        Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");

        return false;
      }
    }

    // AjaxMajorList({
    //   params: {
    //     gt: this.gte || 0,
    //     lt: this.lte || 0,
    //     kw: this.MajorName,
    //     //当前省份 不能写死
    //     pv: sessionStorage.getItem("Latlong"),
    //     token: this.token,
    //   },
    // }).then((res) => {
    //   this.tablePage.pageSize = res.pageSize;
    //   this.tablePage.total = res.totalCount;
    //   this.loading = false;
    //   let Arr = [],
    //     Arr1 = [],
    //     Arr2 = [],
    //     Arr3 = [],
    //     Arr4 = [];
    //   res.data.forEach((item, index) => {
    //     let num = Number(res.data[index].min);
    //     let Val = Number(this.$route.query.inpval);
    //     let Fx = Val - num;
    //     if (Fx < -5) {
    //       console.log(num, Val);
    //       let str = "险";
    //       let obj = { ...res.data[index], Fx: "冲(险)" };
    //       Arr.push(obj);
    //       console.log(str);
    //     } else {
    //       if (Fx >= -5 && Fx < 0) {
    //         console.log(num, Val);
    //         let str = "冲";
    //         let obj = { ...res.data[index], Fx: "冲" };
    //         Arr1.push(obj);
    //         console.log(str);
    //       } else {
    //         if (Fx >= 0 && Fx < 5) {
    //           console.log(num, Val);
    //           let str = "稳";
    //           let obj = { ...res.data[index], Fx: "稳" };
    //           Arr2.push(obj);
    //           console.log(str);
    //         } else {
    //           if (Fx >= 5 && Fx < 10) {
    //             console.log(num, Val);
    //             let str = "保";
    //             let obj = { ...res.data[index], Fx: "保" };
    //             Arr3.push(obj);
    //             console.log(str);
    //           } else {
    //             console.log(num, Val);
    //             let str = "垫";
    //             let obj = { ...res.data[index], Fx: "垫" };
    //             Arr4.push(obj);
    //             console.log(str);
    //           }
    //         }
    //       }
    //     }
    //   });
    //   this.Majordata.push(...Arr, ...Arr1, ...Arr2, ...Arr3, ...Arr4);
    //   console.log(res.data);
    //   console.log(this.Majordata);
    // });
  },

  methods: {
    onClick() {},
    //添加收藏和删除收藏
    async onCheckbox(row, column, checked) {
      console.log("row", row);
      if (!checked) {
        let AddCollectiondata = await AddCollection({
          body: {
            data: JSON.stringify(row),
            user: this.username,
            token: this.token,
          },
          params: {},
        });

        if (AddCollectiondata.data.code === 429) {
          Toast("操作关于频繁");
          return true;
        }
        if (AddCollectiondata.data.code === 401) {
          Toast.fail("收藏过多,请前去收藏页面清理记录");
          return true;
        }
        if (AddCollectiondata.data.code === 200) {
          Toast("收藏成功");
          return true;
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
        console.log("取消收藏");
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
        this.$toast("请先登录");
      }
    },
    async onPage(type, currentPage, pageSize, $event) {
      this.loading = true;
      console.log($event.pageSize);
      console.log($event.currentPage);
      this.Majordata = [];
      try {
        let VipMajordata = await VipMajor({
          body: {
            p: $event.currentPage,
            s: $event.pageSize || 10,
            gt: this.gte || 0,
            lt: this.lte || 0,
            kw: this.MajorName,
            //当前省份 不能写死
            pv: sessionStorage.getItem("Latlong"),
            token: this.token,
          },
          params: {},
        });
        let Arr = [],
          Arr1 = [],
          Arr2 = [],
          Arr3 = [],
          Arr4 = [];

        VipMajordata.data.data.forEach((item, index) => {
          let num = Number(VipMajordata.data.data[index].min);
          let Val = Number(this.$route.query.inpval);
          let Fx = Val - num;
          if (Fx < -5) {
            console.log(num, Val);
            let str = "险";
            let obj = { ...VipMajordata.data.data[index], Fx: "冲(险)" };
            Arr.push(obj);
            console.log(str);
          } else {
            if (Fx >= -5 && Fx < 0) {
              console.log(num, Val);
              let str = "冲";
              let obj = { ...VipMajordata.data.data[index], Fx: "冲" };
              Arr1.push(obj);
              console.log(str);
            } else {
              if (Fx >= 0 && Fx < 5) {
                console.log(num, Val);
                let str = "稳";
                let obj = { ...VipMajordata.data.data[index], Fx: "稳" };
                Arr2.push(obj);
                console.log(str);
              } else {
                if (Fx >= 5 && Fx < 10) {
                  console.log(num, Val);
                  let str = "保";
                  let obj = { ...VipMajordata.data.data[index], Fx: "保" };
                  Arr3.push(obj);
                  console.log(str);
                } else {
                  console.log(num, Val);
                  let str = "垫";
                  let obj = { ...VipMajordata.data.data[index], Fx: "垫" };
                  Arr4.push(obj);
                  console.log(str);
                }
              }
            }
          }
        });
        await this.Majordata.push(...Arr, ...Arr1, ...Arr2, ...Arr3, ...Arr4);
        this.loading = await false;
        console.log(this.Majordata);
      } catch (VipMajordata) {
        console.log(VipMajordata);

        this.loading = false;
        this.show = false;
        if (VipMajordata.status === 429) {
          Toast.fail("操作频繁，请休息一下,30秒后刷新网页重试");

          return false;
        }
      }
    },
  },

  components: {
    Tab,
    vxeSchool,
    Prospect,
  },
};
</script>
<style lang="less">
.Major {
  .onVip {
    height: 80vh;
  }

  .Risk {
  }
  .punching {
  }
  .protect {
  }
  .pad {
  }
}
.vxeSchool {
  height: 60px;
}
</style>
