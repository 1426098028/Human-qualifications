// pages/Register/Register.js
import Toast from '@vant/weapp/toast/toast';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
const CryptoJS = require("../../utils/CryptoJs/Crypto-js.js");
const { Register } = require('../../utils/Api/config/Flymain-wx.js')
Page({
  //使用多个插槽
  options: {
    //样式独立化
    styleIsolation: 'shared',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  //验证表单
  FormAuthen(e) {
    if (e.detail.value.username === "") {
      Toast.fail("请填写用户名")
      return false
    }
    if (e.detail.value.tel === "") {
      Toast.fail("请填写手机号")
      return false
    }
    if (e.detail.value.password === "") {
      Toast.fail("请填写密码")
      return false
    }
    if (e.detail.value.password2 === "") {
      Toast.fail("请再次填写密码")
      return false
    }
    return true
  },
  //马上注册
  async onRegister(e) {
    if (this.FormAuthen(e) === false) {
      return false
    }
    let Registerdata = await Register({
      body: {
        opera_type: "Register",
        username: e.detail.value.username,
        password: CryptoJS.MD5(e.detail.value.password).toString(), //密码md5加密
        password2: CryptoJS.MD5(e.detail.value.password2).toString(), //密码md5加密
        telephone: e.detail.value.tel,
      },
      params: {},
    });
    if (Registerdata.data.code == 200) {
      console.log(Registerdata.data.message)
      await Toast.success(Registerdata.data.message);
      await wx.reLaunch({
        url: "/pages/Login/Login",
      })
      return false
    }
    if (Registerdata.data.code === 500) {
      Toast.fail("请输入正确的注册信息");
    } else {
      let key;
      for (let val in Registerdata.data.message) {
        key = await Registerdata.data.message[val][0];
        console.log(val)
      }
      Toast.fail(key);
      return false
    }
  },
  //马上登录
  async onLogin() {
    wx.reLaunch({
      url: "/pages/Login/Login",
    })
  },
})