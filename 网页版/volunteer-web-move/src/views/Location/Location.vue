<template>
  <div class="Location">
    <van-sticky>
      <van-nav-bar
        title="定位"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <van-search
        v-model="Address"
        show-action
        :label="Ip"
        input-align="center"
        placeholder="请输入当前省份名"
        @search="onSearch"
        left-icon="location-o"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <div class="group" v-if="group">
      <van-cell-group v-for="(item, index) in LatlongArr" :key="index">
        <van-cell center @click="Keywords(item)">
          <div slot="title" class="title">
            <van-icon slot="icon" size="20" color="#1989fa" name="location-o" />
            &nbsp;&nbsp;
            <span>
              {{ item.district === "" ? item.name : item.district }}
              <!-- {{ item.name }} -->
            </span>
          </div>
          <div slot="label" class="title">
            {{ item.address.length === 0 ? "" : item.address }}
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div>
      <div id="container"></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { time } from "echarts";

export default {
  name: "Location",
  data() {
    return {
      group: true,
      LatlongArr: [],
      active: "",
      Address: "",
      Ip: sessionStorage.getItem("Latlong"),
    };
  },
  created() {},
  mounted() {
    this.$VueAmap();
    if (
      localStorage.getItem(`SchoolTips`) !== null ||
      localStorage.getItem(`SchoolTips`) !== undefined ||
      localStorage.getItem(`SchoolTips`) !== ""
    ) {
      localStorage.removeItem("SchoolTips");
    }
  },

  methods: {
    async onSearch() {
      this.group = true;
      console.log(this.Address);
      if (this.Address === "") {
        Toast.fail("搜索内容不能为空");
        return false;
      }
      await this.NewLocation(this.Address);
      await this.Amapdata();
    },

    async NewLocation(Val) {
      // 获取输入提示信息
      AMap.plugin("AMap.Autocomplete", async function () {
        // 实例化Autocomplete
        var autoOptions = {
          city: "全国",
        };
        new AMap.Autocomplete(autoOptions).search(
          Val,
          async function (status, result) {
            window.Amapdata = result.tips;
            console.log(result.tips);
          }
        );
      });

      // AMap.plugin(["AMap.PlaceSearch"], function () {
      //   //构造地点查询类
      //   var placeSearch = new AMap.PlaceSearch({
      //     pageSize: 5, // 单页显示结果条数
      //     pageIndex: 1, // 页码
      //     city: "010", // 兴趣点城市
      //     citylimit: true, //是否强制限制在设置的城市内搜索
      //     map: map, // 展现结果的地图实例

      //     autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      //   });
      //   //关键字查询
      //   placeSearch.search(Val);
      // });
    },
    Keywords(event) {
      // console.log(event);
      // console.log(event.district);
      // console.log(event.location.lat);
      // console.log(event.location.lng);
      if (event.location !== "") {
        let centerdata = [event.location.lng, event.location.lat];
        console.log(centerdata);
        //初始化地图
        var map = new AMap.Map("container", {
          resizeEnable: true,
          center: [event.location.lng, event.location.lat],
          zoom: 13,
        });
        // AMap.plugin("AMap.Geolocation", function () {
        //   var geolocation = new AMap.Geolocation({
        //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
        //     buttonPosition: "LT", //定位按钮的位置
        //     buttonOffset: new AMap.Pixel(10, 200), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //     zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        //     zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //     // showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        //     markerOptions: {
        //       //自定义定位点样式，同Marker的Options
        //       offset: new AMap.Pixel(0, 0),
        //       content:
        //         '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>',
        //     },
        //   });
        //   map.addControl(geolocation);
        //   geolocation.getCurrentPosition();
        // });
      }

      this.group = false;
      this.Address =
        event.address.length === 0 ? event.district : event.address;
      let DeviceLogin = event.district;

      // this.Tagging(this.Address);

      if (/广西/gm.test(`${DeviceLogin}`)) {
        let province = "广西";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/西藏/gm.test(`${DeviceLogin}`)) {
        let province = "西藏";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/宁夏/gm.test(`${DeviceLogin}`)) {
        let province = "宁夏";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/新疆/gm.test(`${DeviceLogin}`)) {
        let province = "新疆";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/香港/gm.test(`${DeviceLogin}`)) {
        let province = "香港";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/澳门/gm.test(`${DeviceLogin}`)) {
        let province = "澳门";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/内蒙古/gm.test(`${DeviceLogin}`)) {
        let province = "内蒙古";
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
      if (/省/gm.test(`${DeviceLogin}`)) {
        // 广东省
        console.log(DeviceLogin.indexOf("省"));
        let province = DeviceLogin.split("省")[0];
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));

        return false;
      }
      if (/市/gm.test(`${DeviceLogin}`)) {
        let province = DeviceLogin.split("市")[0];
        sessionStorage.setItem("Latlong", province);
        sessionStorage.setItem("City", event.address);
        // 读取
        console.log("定位成功", sessionStorage.getItem("Latlong"));
        console.log("定位成功", sessionStorage.getItem("City"));
        return false;
      }
    },

    // 标注

    Tagging(AddIp) {},

    Amapdata() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中",
      });
      const timer = setInterval(() => {
        this.LatlongArr = window.Amapdata;
        clearInterval(timer);
        // 手动清除 Toast
        Toast.clear();
      }, 1000);
    },
  },
};
</script>
<style lang="less" >
.Location {
  position: relative;
  #container {
    width: 100vw;
    height: 76vh;
  }
  .group {
    z-index: 100;
    position: fixed;
    top: 100px;
    width: 100%;

    height: 50%;
    overflow: auto;
    .title {
      display: flex;
      text-align: center;
    }
  }
}
</style>
