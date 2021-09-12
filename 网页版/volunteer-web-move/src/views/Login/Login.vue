<template>
  <div class="Login">
    <van-nav-bar
      title="登录"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    />
    <!-- 导航 -->

    <!-- 登录表单 -->
    <div class="LoginField">
      <h2 class="Loginh2 log">登录</h2>
      <van-form
        :show-error="false"
        :show-error-message="false"
        validate-first
        @submit="onLogin"
        @failed="onFailed"
      >
        <van-cell-group>
          <van-field
            class="Loginfield"
            v-model="user.username"
            type="text"
            required
            input-align="center"
            error-message-align="center"
            clearable
            label-align="center"
            maxlength="10"
            left-icon="user-o"
            placeholder="请输入用户"
            name="账号"
            :rules="FormAuthen.username"
          />
          <van-field
            class="Loginfield"
            v-model="user.password"
            type="password"
            required
            input-align="center"
            error-message-align="center"
            clearable
            maxlength="20"
            left-icon="closed-eye"
            placeholder="请输入密码"
            name="密码"
            :rules="FormAuthen.password"
          />
        </van-cell-group>
        <van-button class="Loginbutton" round block color="#3697FF">
          登录
        </van-button>
      </van-form>
      <div class="Registerdiv" @click="onRegister">马上注册</div>
    </div>
  </div>
</template>
<script>
import { Login } from "../../NewApi/Flymain";

// import { AjaxLogin } from "@/api/api.js";
import { setItem, removeItem } from "@/utils/Storage.js";
import md5 from "js-md5";
import { Toast, Dialog } from "vant";
import { color } from "echarts";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      FormAuthen: {
        username: [
          { required: true, message: "请填写用户名" },
          // {
          //   pattern: /^[A-Za-z0-9_]{2,14}$/,
          //   message: "账号长度不能小于2位大于14位",
          // },
        ],
        password: [
          { required: true, message: "请填写密码" },
          // {
          //   pattern: /^[A-Za-z0-9_]{6,20}$/,
          //   message: "密码长度不能小于6位大于20位",
          // },
        ],
      },
    };
  },
  created() {
    let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
    //未登录提示
    if (VipInformation === null) {
      Dialog.confirm({
        title: "登录信息",
        message: "如果您没有账号请点击注册,已有账号请点击登录",
        confirmButtonText: "登录",
        cancelButtonText: "注册",
      })
        .then(() => {
          // this.$router.push({
          //   path: "/Login",
          // });
          console.log("登录");
        })
        .catch(() => {
          this.$router.push({
            path: "/Register",
          });
        });
      this.Vip = true;

      return false;
    }
    console.log(this.FormAuthen);
  },
  methods: {
    //表单验证失败提示
    onFailed(error) {
      if (error.errors[0]) {
        Toast(error.errors[0]);
      }
    },
    //表单验证通过登录
    async onLogin() {
      this.$forceUpdate();
      // 发送请求
      let Timedate = new Date();
      let Times = Timedate.getTime();
      try {
        let Logindata = await Login({
          body: {
            opera_type: "login",
            username: this.user.username,
            password: md5(this.user.password), //密码md5加密
            remeber: 60 * 24 * 7, //Token过期以
          },
          params: {},
        });
        if (Logindata.data.code === 200) {
          console.log(Logindata.data);
          console.log(this.$store);
          this.$store.commit("setuser", Logindata.data.data[0].username);
          this.$store.commit("setTimes", Times);
          this.$store.commit("settoken", Logindata.data.data[0].token);
          this.$store.commit("setUserInformation", Logindata.data.data[0]);
          sessionStorage.setItem("username", Logindata.data.data[0].username);
          sessionStorage.setItem("Times", Times);
          localStorage.setItem("Times", Times);
          await sessionStorage.setItem("token", Logindata.data.data[0].token);
          await this.$forceUpdate();
          // this.$router.go();
          Toast.success("登录成功");
          // this.$router.back();
          this.$router.push({ path: "/" });
          return false;
        }
      } catch (Logindata) {
        if (Logindata.data.code === 403) {
          Toast.fail("网络出错了,请刷新网络重试");
          return false;
        }
        console.log(typeof Logindata.data.message.username);
        if (
          Logindata.data.code === 400 &&
          typeof Logindata.data.message.username === "object"
        ) {
          Toast.fail(
            Logindata.data.message.username[0] !== "你太短了"
              ? Logindata.data.message.username[0]
              : Logindata.data.message.username[1]
          );
          return false;
        }
        if (
          Logindata.data.code === 400 &&
          typeof Logindata.data.message.username === "undefined"
        ) {
          Toast.fail(Logindata.data.message);

          return false;
        }
      }
    },
    //马上注册
    async onRegister() {
      // await window.location.reload();
      await this.$router.push({
        path: "/Register",
      });
    },
  },
};
</script>
<style lang="less">
.Login {
  background: #fff;
  height: 100vh;
  .LoginField {
    margin: 0 20px;
    .Loginh2 {
      text-align: center;
      margin: 78px auto;
      font-size: 30px;
      background: linear-gradient(136deg, #8bc5c7 20%, #3697ff);
      padding: 30px 0;
      width: 100px;
      border-radius: 50%;
      border: 1px solid #8bc5c7;
      box-shadow: 1px 1px 20px #8bc5c7;
      // height: 100px;
    }

    .Registerdiv {
      text-align: center;
      margin: 20px auto;
      color: #007ed8;
    }
    .Loginfield {
      padding: 20px 0 12px 0;
      //   margin-bottom: 20px;
      text-align: center;

      i {
        font-size: 24px;
        padding: 0px 10px 10px 20px;
        text-align: center;
      }
    }
    .Loginbutton {
      margin: 40px 0;
    }
  }
}
</style>
