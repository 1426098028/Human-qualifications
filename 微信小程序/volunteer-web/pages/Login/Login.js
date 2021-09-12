const CryptoJS = require("../../utils/CryptoJs/Crypto-js.js");
const { Login } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
Page({
  //使用多个插槽
  options: {
    //样式独立hua
    styleIsolation: 'shared',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  //表单验证通过登录
  async onLogin(e) {
    if (e.detail.value.username === '' || e.detail.value.password === '') {
      Toast.fail("账号或密码不能为空")
      return false
    }
    // 发送请求
    let Timedate = new Date();
    // let Times = Timedate.getTime();
    let Times = Timedate.getTime();
    let Logindata = await Login({
      body: {
        opera_type: "login",
        username: e.detail.value.username,
        password: CryptoJS.MD5(e.detail.value.password).toString(), //密码md5加密
        remeber: 60 * 24*7, //Token过期
      },
      params: {},
    });
    if (Logindata.data.code === 200) {
      console.log(Logindata.data.data[0]);
      await  Toast.success("登录成功");
      wx.setStorage({
        key: "UserInformation",
        data: Logindata.data.data[0]
      })
      wx.setStorage({
        key: "username",
        data: Logindata.data.data[0].username
      })
      wx.setStorage({
        key: "token",
        data: Logindata.data.data[0].token
      })
      wx.setStorage({
        key: "Times",
        data:Times
      })
      console.log(app.globalData.user)
    await  wx.reLaunch({
        url: "/pages/index/index",
      })
      return false;
    }
    if (Logindata.data.code === 403) {
      Toast.fail("网络出错了,请刷新网络重试");
      return false;
    }
    console.log(typeof Logindata.data.message.username);
    if (Logindata.data.code === 400 && typeof Logindata.data.message.username === "object") {
      Toast.fail(Logindata.data.message.username[0] !== "你太短了" ? Logindata.data.message.username[0] : Logindata.data.message.username[1]
      );
      return false;
    }
    if (Logindata.data.code === 400 && typeof Logindata.data.message.username === "undefined") {
      Toast.fail(Logindata.data.message);
      return false;
    }
  },
  //马上注册 

  async onRegister() {
    wx.reLaunch({
      url: "/pages/Register/Register",
    })
  },
})