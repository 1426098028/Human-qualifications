<template>
  <div class="TabbarTab">
    <!-- <router-view></router-view> -->
    <keep-alive
      :include="['SearchAll', 'SearchMajor', 'Search', 'Fraction', 'Prospect']"
    >
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="less">
.TabbarTab {
  z-index: 10;
  .van-tabbar {
    // opacity: 0;
  }
}
</style>
