<template>
  <div class="My">
    <van-sticky>
      <van-nav-bar
        title="我的"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <div>
      <!-- 未登录 -->
      <van-cell
        v-if="UserInformation == null"
        center
        class="not-Login"
        to="/Login"
      >
        <van-image
          class="MyLoginimg"
          slot="title"
          fit="cover"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        ></van-image>

        <div slot="label" class="Mylabel">登录/注册</div>
      </van-cell>
      <!-- 已登录 -->
      <van-cell v-else center class="MyCell">
        <van-image
          @click="onEdit"
          class="Myimg"
          slot="icon"
          fit="cover"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        >
          <!-- <div slot="default">水水水水水水水 水 水水水水</div> -->
        </van-image>

        <div slot="title" @click="onEdit" class="Mytitle Mytitlei">
          {{ userName }}
        </div>
        <div slot="label" @click="onEdit" class="Mytitle">查看信息</div>

        <van-button slot="default" class="Mybut" @click="onColl">
          编辑信息
        </van-button>
      </van-cell>

      <div class="cell-Line"></div>
      <van-cell center is-link @click="onMember">
        <van-icon slot="icon" size="24" color="#FBC02D" name="vip-card-o" />
        <div slot="title" class="Myicon">我的会员</div>
      </van-cell>
      <div class="cell-Line"></div>
      <van-cell center is-link @click="onCollection">
        <van-icon slot="icon" size="24" color="#FF5722" name="star-o" />
        <div slot="title" class="Myicon">我的收藏</div>
      </van-cell>
      <div class="cell-Line"></div>
      <van-cell center is-link @click="onEvaluation">
        <van-icon slot="icon" size="24" color="#1976D2" name="newspaper-o" />
        <div slot="title" class="Myicon">我的测评</div>
      </van-cell>
      <div class="cell-Line"></div>
      <van-cell
        v-if="UserInformation !== null"
        center
        title="退出登录"
        class="MydropOut"
        @click="ondropOut"
      >
      </van-cell>
    </div>
  </div>
</template>
<script>
import { setItem, removeItem } from "@/utils/Storage.js";
import { mapState } from "vuex";
import { Toast, Dialog } from "vant";
export default {
  name: "My",
  data() {
    return {
      userName: "用户名",
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation", "Times"]),
  },
  created() {
    // this.TokenStage();
  },
  mounted() {
    this.userName = this.username;

    // this.TokenStage();
  },
  methods: {
    // Token过期
    TokenStage() {
      console.log(localStorage.getItem("username")); //23小时间
      console.log(localStorage.getItem("token")); //23小时间
      console.log(localStorage.getItem("Times")); //23小时间
      //登录过期
      console.log(-3600000 * 23); //23小时间
      let currentTime = -3000;
      let Timedate = new Date();
      let Times = Timedate.getTime();
      console.log(this.username);
      console.log(Number(this.Times), Times, currentTime);
      if (Number(this.Times) - Times < currentTime && this.username !== null) {
        Dialog.confirm({
          title: "登录过期",
          message: "请重新登录",
        })
          .then(() => {
            this.$router.push({
              path: "/Login",
            });
            localStorage.clear();
            sessionStorage.clear();
            console.log("重新登录");
            return false;
          })
          .catch(() => {
            this.UserInformation == null;
            localStorage.clear();
            sessionStorage.clear();
            Toast("已取消重新登录");
            return false;
          });
        return false;
      }
    },

    //我的会员
    onMember() {
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
    // 我的收藏
    onCollection() {
      if (
        this.username !== null &&
        this.token !== null &&
        this.UserInformation !== null
      ) {
        this.$router.push({
          path: "/Collection",
        });
      } else {
        this.$toast("请先登录");
      }
    },
    // 我的测评
    onEvaluation() {
      if (
        this.username !== null &&
        this.token !== null &&
        this.UserInformation !== null
      ) {
        this.$router.push({
          path: "/EvaluationResults",
        });
      } else {
        this.$toast("请先登录");
      }
    },
    //信息资料
    onEdit() {
      if (
        this.username !== null &&
        this.token !== null &&
        this.UserInformation !== null
      ) {
        this.$router.push({
          path: "/Edit",
        });
      } else {
        this.$toast("请先登录");
      }
    },
    //编辑资料
    onColl() {
      if (
        this.username !== null &&
        this.token !== null &&
        this.UserInformation !== null
      ) {
        this.$router.push({
          path: "/Coll",
        });
      } else {
        this.$toast("请先登录");
      }
    },
    //退出登录
    ondropOut() {
      this.$dialog
        .confirm({
          title: "提出提示",
          message: "确认退出吗？",
        })
        .then(() => {
          //清空用户登录状态   state
          this.$store.commit("setuser", null);
          this.$store.commit("settoken", null);
          this.$store.commit("setUserInformation", null);
          removeItem("username");
          removeItem("token");
          removeItem("UserInformation");
          sessionStorage.clear();
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="less">
.My {
  box-sizing: border-box;
  div {
    .not-Login {
      text-align: center;
      color: #2196f3;
      padding: 18px 20px;

      background: linear-gradient(-45deg, #00bcd4 20%, #b2ebf2);

      .MyLoginimg {
        width: 60px;
        height: 60px;
        border: 1px solid #fff;
      }
      .Mylabel {
        font-size: 18px;
        color: #fff;
      }
    }
    .MyCell {
      opacity: 0.9;
      background: linear-gradient(-45deg, #00bcd4 20%, #b2ebf2);
      padding: 46px 20px;
      .Myimg {
        border: 1px solid #fff;
        width: 50px;
        height: 50px;
      }
      .Mytitle {
        padding-left: 10px;
      }
      .Mytitlei {
        font-size: 20px;
      }
      .Mybut {
        padding: 10px;
        height: 24px;
        line-height: 24px;
        border-radius: 50px;
        border: 1px solid #fff;
      }
      .Myicon {
      }
    }
    .MydropOut {
      text-align: center;
      color: #2196f3;
    }
  }
}
</style>
