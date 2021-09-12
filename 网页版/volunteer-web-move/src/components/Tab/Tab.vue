<template>
  <div class="Tab">
    <van-tabs type="card" v-model="active" color="#00C6E0" :border="true">
      <van-tab :title="LeftValue">
        <slot name="Left"> </slot>
      </van-tab>
      <van-tab :title="RightValue">
        <slot name="Right"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  props: {
    LeftValue: String,
    RightValue: String,
  },
  name: "Tab",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="less">
.Tab {
  // height: 100vh;
  background: #fff;
  .van-tabs__wrap {
    height: 40px;
  }
  .van-tabs__nav--card {
    padding: 0px;
    margin: 0px;
    height: 40px;
  }
}
</style>
