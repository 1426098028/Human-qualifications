<template>
  <div class="Register">
    <van-nav-bar
      title="注册"
      left-arrow
      left-text="返回"
      @click-left="$router.back()"
    />
    <!-- 导航 -->

    <!-- 注册表单 -->
    <div class="RegisterField">
      <h2 class="Registerh2">注册</h2>
      <van-form
        :show-error="false"
        :show-error-message="false"
        validate-first
        @submit="onRegister"
        @failed="onFailed"
      >
        <van-cell-group>
          <van-field
            class="Registerfield"
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
            class="Registerfield"
            v-model="user.tel"
            type="number"
            required
            input-align="center"
            error-message-align="center"
            clearable
            maxlength="11"
            left-icon="phone-o"
            placeholder="请输入手机号"
            name="手机号"
            :rules="FormAuthen.tel"
          />
          <van-field
            class="Registerfield"
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
          <van-field
            class="Registerfield"
            v-model="user.password2"
            type="password"
            required
            input-align="center"
            error-message-align="center"
            clearable
            maxlength="20"
            left-icon="closed-eye"
            placeholder="请再输入密码"
            name="密码"
            :rules="FormAuthen.password2"
          />
        </van-cell-group>
        <van-button class="Registerbutton" round block color="#3697FF">
          注册
        </van-button>
      </van-form>
      <div class="Logindiv" @click="onLogin">已有账号，马上登录</div>
    </div>
  </div>
</template>
<script>
import { Register } from "../../NewApi/Flymain";
import md5 from "js-md5";
import { Toast } from "vant";
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        password2: "",
        tel: "",
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
        password2: [
          { required: true, message: "请填写密码" },
          // {
          //   pattern: /^[A-Za-z0-9_]{6,20}$/,
          //   message: "密码长度不能小于6位大于20位",
          // },
        ],
        tel: [
          { required: true, message: "请填写手机号" },
          // {
          //   pattern: /^1[3|4|5|7|8]\d{9}$/,
          //   // pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          //   message: "手机号不正确",
          // },
        ],
      },
    };
  },
  created() {
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
    async onRegister() {
      // console.log(this.user.username);
      // console.log(this.user.password);
      // 发送请求

      try {
        let Registerdata = await Register({
          body: {
            opera_type: "Register",
            username: this.user.username,
            password: md5(this.user.password), //密码md5加密
            password2: md5(this.user.password2), //密码md5加密
            telephone: this.user.tel,
          },
          params: {},
        });
        if (Registerdata.data.code == 200) {
          this.$router.push({ path: "/Login" });
          Toast.success(Registerdata.data.message);
        }
      } catch (Registerdata) {
        if (Registerdata.data.code === 500) {
          Toast.fail("请输入正确的注册信息");
        } else {
          let key;
          for (let val in Registerdata.data.message) {
            key = await Registerdata.data.message[val][0];
          }
          Toast.fail(key);
        }
      }
    },
    //马上登录
    onLogin() {
      this.$router.push({
        path: "/Login",
      });
    },
  },
};
</script>
<style lang="less">
.Register {
  background: #fff;
  height: 100vh;
  .RegisterField {
    margin: 0 20px;
    .Registerh2 {
      text-align: center;
      margin: 40px auto;
      font-size: 30px;
      padding: 30px 0;
      width: 100px;
      border-radius: 50%;
      background: linear-gradient(136deg, #8bc5c7 20%, #3697ff);
      border: 1px solid #8bc5c7;
      box-shadow: 1px 1px 20px #8bc5c7;
    }
    .Logindiv {
      text-align: center;
      margin: 20px auto;
      color: #007ed8;
    }
    .Registerfield {
      padding: 20px 0 12px 0;
      //   margin-bottom: 20px;
      text-align: center;

      i {
        font-size: 24px;
        padding: 0px 10px 10px 20px;
        text-align: center;
      }
    }
    .Registerbutton {
      margin: 40px 0;
    }
  }
}
</style>
