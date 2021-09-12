<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },

  created() {
    // console.log(this.isMobile());
    // if (this.isMobile()) {
    //   this.$router.replace("/");
    //   console.log("移动端");
    // } else {
    //   this.$router.replace("/pc");
    //   console.log("pc端");
    // }
  },
  mounted() {},

  methods: {
    // isMobile() {
    //   let UserAgent = navigator.userAgent;
    //   let Agents = [
    //     "iPhone",
    //     "Android",
    //     "iPad",
    //     "iPod",
    //     "SymbianOS",
    //     "WebOS",
    //     "BlackBerry",
    //   ];
    //   console.log(UserAgent);
    //   let flag = false;
    //   for (let i = 0; i < Agents.length; i++) {
    //     if (UserAgent.indexOf(Agents[i]) > 0) {
    //       flag = true;
    //       break;
    //     }
    //   }
    //   return flag;
    // },
  },
};
</script>
<style lang="less"></style>
