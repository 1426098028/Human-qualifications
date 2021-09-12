import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { setItem, getItem, removeItem } from "@/utils/Storage.js";

export default new Vuex.Store({
  //全局状态
  state: {
    //当前用户
    username: getItem("username") || null,
    token: getItem("token") || null,
    //当前用户全部信息
    UserInformation: getItem("UserInformation") || null,
    Times:getItem("Times") || null,



  },
  //修改状态
  mutations: {
    //用户信息
    setuser(state, usernamedata) {
      state.username = usernamedata
      setItem("username", usernamedata)
    },
    settoken(state, tokendata) {
      state.token = tokendata
      setItem("token", tokendata)
    },
    //用户全部信息
    setUserInformation(state, UserInformationdata) {
      state.UserInformation = UserInformationdata
      setItem("UserInformation", UserInformationdata)
    },
    //用户全部信息
    setTimes(state, setTimesdata) {
      state.Times = setTimesdata
      setItem("Times", setTimesdata)
    }
  },
  actions: {
  },
  modules: {
  }
})
