<template>
  <div class="Home">
    <van-swipe class="my-swipe">
      <van-swipe-item>
        <van-image fit="contain" :src="require('/static/img/img.jpg')" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="con" @click="onLocation">
        <van-icon slot="icon" size="30" color="#1989fa" name="location-o" />
        <div class="box van-ellipsis">{{ location }}</div>
      </div>
      <div class="conbox CheckSchool" @click="CheckSchool">
        <div class="box">查学校</div>
        <div class="box1"><i class="box11 iconfont icon-xuexiao"> </i></div>
      </div>

      <div class="conbox CheckMajor" @click="CheckMajor">
        <div class="box">查专业</div>
        <div class="box1"><i class="box12 iconfont icon-zhuanye"> </i></div>
      </div>
      <div class="conbox CheckScore" @click="CheckScore">
        <div class="box">录取分析</div>
        <div class="box1"><i class="box13 iconfont icon-fenshuxian"> </i></div>
      </div>
      <div class="conbox Occupation" @click="onOccupation">
        <div class="box">职业测评</div>
        <div class="box1"><i class="box14 iconfont icon-zhuanyehua"> </i></div>
      </div>
      <div class="conbox Employment job" @click="onProspect">
        <div class="box">就业前景</div>
        <div class="box1">
          <i
            class="
              box15
              iconfont
              icon-tubiaozhizuomoban_linghuojiuyerenyuanzoushi-copy
            "
          >
          </i>
        </div>
      </div>
    </div>
    <div class="become" @click="onVipService">
      <div class="become1">会员</div>
      <div class="become2">服务</div>
    </div>
  </div>
</template>
<script>
let URl;

import { ScreenSchools, SearchSchools } from "../../NewApi/Flymain";

export default {
  name: "Home",
  data() {
    return {
      datanum: 1,
      URl: "",
      lll: 2,
      location: sessionStorage.getItem("City")
        ? sessionStorage.getItem("City")
        : sessionStorage.getItem("Latlong") || "定位中...",
    };
  },
  created() {
    this.$forceUpdate();
    if (
      sessionStorage.getItem("Latlong") === null ||
      sessionStorage.getItem("Latlong") === undefined ||
      sessionStorage.getItem("Latlong") === ""
    ) {
      console.log("定位失败");
      this.$VueAmap();
    }
  },
  mounted() {
    if (
      localStorage.getItem(`SchoolTips`) === null ||
      localStorage.getItem(`SchoolTips`) === undefined ||
      localStorage.getItem(`SchoolTips`) === ""
    ) {
      this.getScreenSchoolsdata();
      // console.log(JSON.parse(localStorage.getItem(`SchoolTips`)));
    }

    // if (this.isMobile()) {
    //   this.$router.replace("/");
    //   console.log("移动端");
    //   return false;
    // } else {
    //   if (
    //     sessionStorage.getItem("URl") === null ||
    //     sessionStorage.getItem("URl") === undefined ||
    //     sessionStorage.getItem("URl") === ""
    //   ) {
    //     this.URl = "http://localhost:8080/#/";
    //     sessionStorage.setItem("URl", this.URl);

    //     window.open(this.URl, "_blank", "width=750");
    //     window.history.back(-1);

    //     // this.$router.replace("/pc");

    //     // //    参数解释：
    //     // //       window.open 弹出新窗口的命令；
    //     // // 'page.html' 弹出窗口的文件名；
    //     // // 'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替；
    //     // // height=100 窗口高度；
    //     // // width=400 窗口宽度；
    //     // // top=0 窗口距离屏幕上方的象素值；
    //     // // left=0 窗口距离屏幕左侧的象素值；
    //     // // toolbar=no 是否显示工具栏，yes为显示；
    //     // // menubar，scrollbars 表示菜单栏和滚动栏。
    //     // // resizable=no 是否允许改变窗口大小，yes为允许；
    //     // // location=no 是否显示地址栏，yes为允许；
    //     // // status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许

    //     console.log("pc端");
    //     return false;
    //   }
    // }

    // sessionStorage.setItem("Latlong", "广东");
    //开启自动定位
    // if (
    //   sessionStorage.getItem("Latlong") !== null &&
    //   sessionStorage.getItem("Latlong") !== undefined &&
    //   sessionStorage.getItem("Latlong") !== ""
    // ) {
    //   // this.$store.commit("Latlong", Latlongstore);
    //   this.location = location ? sessionStorage.getItem("City") : "定位中...";
    //   console.log("已定位");
    // }
    // if (
    //   sessionStorage.getItem("Latlong") === null ||
    //   sessionStorage.getItem("Latlong") === undefined ||
    //   sessionStorage.getItem("Latlong") === ""
    // ) {
    //   console.log("定位失败");
    //   this.$VueAmap();
    //   this.location = location
    //     ? sessionStorage.getItem("Latlong")
    //     : "定位中...";
    //   // this.$nextTick()
    //   if (
    //     sessionStorage.getItem("Latlong") !== null &&
    //     sessionStorage.getItem("Latlong") !== undefined &&
    //     sessionStorage.getItem("Latlong") !== ""
    //   ) {
    //     this.location = location
    //       ? sessionStorage.getItem("Latlong")
    //       : "定位中...";
    //   }
    // }
  },
  // beforeRouteEnter(to, from, next) {
  //   // this.onClickback();
  //   if (from.path == "/SearchAll") {
  //     // to.meta.isBack = true;
  //     // console.log(to, from);
  // window.location.reload()

  //     this.$router.go(0);
  //   } else {
  //     // to.meta.isBack = false;
  //   }
  //   next();
  // },
  methods: {
    onClickback() {
      console.log(this.$route);
    },

    async getScreenSchoolsdata() {
      let Arr = [];
      let ScreenSchoolsdata = await SearchSchools({
        body: {
          special: "index",
          p: this.datanum,
          s: 20,
          pv: sessionStorage.getItem("Latlong"),
        },
        params: {},
      });
      console.log(ScreenSchoolsdata);

      // for (const iterator of ScreenSchoolsdata.data.data) {
      //   Arr.push({
      //     name: iterator.name,
      //     f985: iterator.f985,
      //     f211: iterator.f211,
      //     belong: iterator.belong,
      //     province_name: iterator.province_name,
      //     school_nature_name: iterator.school_nature_name,
      //     type_name: iterator.type_name,
      //     dual_class_name: iterator.dual_class_name,
      //   });
      // }
      // console.log(Arr);
      // localStorage.setItem(
      //   `SchoolTips`,
      //   JSON.stringify(ScreenSchoolsdata.data.data)
      // );
      localStorage.setItem(`SchoolTips`, JSON.stringify(ScreenSchoolsdata));
    },

    isMobile() {
      if (
        sessionStorage.getItem("URl") === null ||
        sessionStorage.getItem("URl") === undefined ||
        sessionStorage.getItem("URl") === ""
      ) {
        let UserAgent = navigator.userAgent;
        let Agents = [
          "iPhone",
          "Android",
          "iPad",
          "iPod",
          "SymbianOS",
          "WebOS",
          "BlackBerry",
        ];
        console.log(UserAgent);
        let flag = false;
        for (let i = 0; i < Agents.length; i++) {
          if (UserAgent.indexOf(Agents[i]) > 0) {
            flag = true;
            break;
          }
        }
        return flag;
      }
    },

    onLocation() {
      console.log("sssss");
      this.$router.push({
        path: "/Location",
        query: {
          id: 0,
          name: "定位",
        },
      });
    },
    CheckSchool() {
      this.$router.push({
        path: "/SearchAll",
        query: {
          id: 1,
          name: "查学校",
        },
      });
    },
    CheckMajor() {
      this.$router.push({
        path: "/SearchMajor",
        query: {
          id: 2,
          name: "查专业",
        },
      });
    },
    CheckScore() {
      this.$router.push({
        path: "/Fraction",
        query: {
          id: 3,
          name: "查分数",
        },
      });
    },
    onOccupation() {
      this.$router.push({
        path: "/Occupation",
        query: {
          id: 4,
          name: "职业测评",
        },
      });
    },
    onProspect() {
      this.$router.push({
        path: "/Prospect",
        query: {
          id: 5,
          name: "就业前景",
        },
      });
    },
    onVipService() {
      this.$router.push({
        path: "/Member",
        query: {
          id: 6,
          name: "Vip服务",
        },
      });
    },
    onTable() {
      this.$router.push({
        path: "/Table",
        query: {
          id: 4,
        },
      });
    },
  },
};
</script>
<style lang="less">
.Home {
  position: relative;
  height: 100%;
  .my-swipe .van-swipe-item {
    z-index: 0;

    // opacity: 0.8;
    height: 226px;
    text-align: center;
    // background-color: #39a9ed;
    .van-image {
      width: 100vw;
      z-index: 0;
    }
  }

  .content {
    position: absolute;
    // opacity: 0.8;
    top: 70%;
    left: 50%;
    background-color: #eff0f5;
    // height: 100vh;
    // z-index: 10;

    transform: translate(-50%, 8%);
    width: 90vw;

    border: 1px solid #c3c3c3;
    border-radius: 6px;
    box-shadow: -1px -1px 10px #c3c3c3 !important;
    .con {
      width: 84vw;
      margin: 10px auto;
      display: flex;
      align-items: center;
      height: 50px;
      border-radius: 4px;
      line-height: 50px;
    }
    .conbox {
      width: 84vw;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      height: 55px;
      border-radius: 4px;
      line-height: 55px;
      border: 1px solid #c3c3c3;
      box-shadow: -1px -1px 10px #c3c3c3;
      .box {
        padding: 0px 20px;
      }
      .box1 {
        padding: 0px 50px 0px;
        i {
          font-size: 26px;
        }
      }
    }
    .job {
      margin: 0 auto 100px auto;
    }
  }
  .become {
    position: fixed;
    top: 74%;
    right: 0;
    width: 80px;
    margin: auto;
    // line-height: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(325deg, #d3b285 20%, #eee1ce);
    z-index: 20;
    text-align: center;
    .become1 {
      margin-top: 18px;
      font-size: 20px;
    }
    .become {
      font-size: 20px;
    }
  }

  .Defcon {
    position: relative;
    box-shadow: -1px -1px 10px #c3c3c3 !important;
    border-radius: 10px;
    width: 96%;
    padding: 10px 0;
    background: #fff;

    margin: -8px auto;
    .Def {
      margin: 30px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .divDef {
        display: flex;
        align-items: center;
        justify-content: space-around;
        // width: 30%;
        // box-shadow: 2px 4px 3px #b2ebf2;
        padding: 25px 20px;
        border-radius: 12px;
        .divDefText {
          border-bottom: 1px solid #6c97e6b8;
          // padding-bottom: 10px;
        }
      }
      .divDefwidth {
        width: 20% !important;
      }
      .DefVip {
        width: 86%;

        background: linear-gradient(325deg, #f9de91 20%, #eee1ce);
      }

      .CheckSchool {
        background: linear-gradient(325deg, #78cdd1 20%, #a4ace5);
      }
      .CheckMajor {
        background: linear-gradient(325deg, #37b8eb 20%, #78cdd1);
      }
      .CheckScore {
        background: linear-gradient(325deg, #78cdd1 20%, #90d7ec);
      }
      .Occupation {
        background: linear-gradient(325deg, #78cdd1 20%, #90d7ec);
      }
      .Employment {
        background: linear-gradient(325deg, #78cdd1 20%, #90d7ec);
      }
    }
    .divDefSchool {
      box-shadow: 2px 4px 3px #78cdd1 !important;
    }
    .divDefMajor {
      box-shadow: 2px 4px 3px #78cdd1 !important;
    }
    .divDefScore {
      box-shadow: 2px 4px 3px #78cdd1 !important;
    }
    .divDeftion {
      box-shadow: 2px 4px 3px #90d7ec !important;
    }
    .divDefment {
      box-shadow: 2px 4px 3px #90d7ec !important;
    }
    .divDefVip {
      box-shadow: 2px 4px 3px #d3b285 !important;
    }
  }

  .CheckSchool {
    background: linear-gradient(325deg, #fbca27 20%, #c7ccf0) !important;
  }
  .CheckMajor {
    background: linear-gradient(325deg, #48ce91 20%, #bde7e9) !important;
  }
  .CheckScore {
    background: linear-gradient(325deg, #5cc2ff 20%, #b6dce7) !important;
  }
  .Occupation {
    background: linear-gradient(325deg, #fd7879 20%, #b7d8e2) !important;
  }
  .Employment {
    background: linear-gradient(325deg, #78cdd1 20%, #90d7ec) !important;
  }
}
</style>
