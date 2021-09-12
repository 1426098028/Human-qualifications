<template>
  <div class="Pc">
    <div class="Pcbox">
      <h2>当前页面只支持移动端</h2>
      <div class="pctit">请打开手机浏览输入该网址：{{ newUrl }}</div>
      <div class="pctit">如果手机浏览器打不开请更换其他浏览器</div>
      <div class="pctit">或打开手机浏览器扫一扫下方二维码</div>
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "Pc",
  data() {
    return {
      QrCodeUrl: "",
      newUrl: "",
    };
  },
  created() {
    let url = window.location.href;
    url.indexOf("#");
    this.newUrl = url.substring(0, url.indexOf("#"));
  },
  mounted() {
    let url = window.location.href;
    url.indexOf("#");
    url.substring(0, url.indexOf("#"));
    new QRCode(this.$refs.qrCodeUrl, {
      text: url.substring(0, url.indexOf("#")),
      width: "400",
      height: "400",
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  methods: {},
};
</script>
<style lang="less">
.Pc {
  position: relative;
  width: 100%;
  .Pcbox {
    width: 90%;
    height: 90%;
    text-align: center;
    position: absolute;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    .pctit {
      font-size: 10px;
    }
    .qrcode {
      font-size: 8px !important;
      width: 100%;
      height: 100%;
      img {
        width: 2rem;
        height: 2rem;
        margin: auto;
      }
    }
  }
}
</style>


