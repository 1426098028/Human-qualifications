<template>
  <div class="Evaluation">
    <van-sticky>
      <van-nav-bar
        :title="EvaluationName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <div>我的测评</div>
  </div>
</template>
<script>
export default {
  name: "Evaluation",
  data() {
    return {
      EvaluationName: "我的测评",
      // value: "",
    };
  },
  created() {},
};
</script>
<style lang="less">
.Evaluation {
}
</style>
