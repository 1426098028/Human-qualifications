<template>
  <keep-alive>
    <div class="Prospect">
      <van-sticky>
        <van-nav-bar
          title="就业前景分析报告"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
      </van-sticky>

      <div v-if="Vip">
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
    </div>
  </keep-alive>
</template>
<script>
//旧接口
import Prospect from "@/components/Prospect/Prospect";
import { Toast, Dialog } from "vant";
import { mapState } from "vuex";

export default {
  data() {
    return {
      Vip: true,
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
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
      this.Vip = true;

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
      return false;
    }

    // if (
    //   this.username === null &&
    //   this.token === null &&
    //   JSON.parse(this.UserInformation) === null
    // ) {
    //   this.$toast("请先登录");
    //   return true;
    // } else {
    //   if (VipInformation.user_level[0].type === "vip用户") {
    //     this.Vip = false;
    //   } else {
    //     Toast("请成为会员");
    //     this.Vip = true;
    //     return false;
    //   }
    // }
  },
  methods: {
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
  },
  components: {
    Prospect,
  },
};
</script>
<style lang="less">
.Prospect {
  .van-empty {
    height: 90vh;
  }
  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>
