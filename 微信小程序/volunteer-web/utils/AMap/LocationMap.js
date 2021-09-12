var qqmapsdk = require('../QQMapWX/qqmap-wx-jssdk.min');
//自动获取定位
function onGetLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      isHighAccuracy: true,
      highAccuracyExpireTime: "8000ms",
    }).then((response) => {
      //结合腾讯地图通过获取到的经纬度进行获取位置信息
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: response.latitude, //回调的纬度
          longitude: response.longitude //回调的经度
        },
        success(Add) {
          onProvince(Add)
        },
      })
      resolve(response);
    })
  })
}
//点击获取定位
function onClickLocation() {
  return new Promise((resolve, reject) => {
    wx.chooseLocation().then((response) => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: response.latitude, //回调的纬度
          longitude: response.longitude //回调的经度
        },
        success(Add) {
          onProvince(Add)
        },
      })



    //   wx.switchTab({
    //     url: '/pages/index/index',
    // })
      resolve(response);
    })
  })
}

//自定义图标样式
function onMarkers(longitude, latitude, address) {
  return [{
    id: 0,
    longitude: longitude,
    latitude: latitude,
    title: address || "",
    iconPath: '../../static/img/location.png',
    anchor: { x: .5, y: 0.5 },
    width: 50,
    height: 50
  }]
}
//保存获取到的省份和城市 结果
function onProvince(result) {
  console.log(result.result.address)
  let DeviceLogin = result.result.address_component.province;
  if (/广西/gm.test(`${DeviceLogin}`)) {
    let province = "广西";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/西藏/gm.test(`${DeviceLogin}`)) {
    let province = "西藏";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/宁夏/gm.test(`${DeviceLogin}`)) {
    let province = "宁夏";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/新疆/gm.test(`${DeviceLogin}`)) {
    let province = "新疆";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/香港/gm.test(`${DeviceLogin}`)) {
    let province = "香港";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/澳门/gm.test(`${DeviceLogin}`)) {
    let province = "澳门";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/内蒙古/gm.test(`${DeviceLogin}`)) {
    let province = "内蒙古";
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
  if (/省/gm.test(`${DeviceLogin}`)) {
    // 广东省
    console.log(DeviceLogin.indexOf("省"));
    let province = DeviceLogin.split("省")[0];
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));

    return false;
  }
  if (/市/gm.test(`${DeviceLogin}`)) {
    let province = DeviceLogin.split("市")[0];
    wx.setStorageSync("Latlong", province)
    wx.setStorageSync("City", result.result.address)
    // 读取
    console.log("定位成功", wx.getStorageSync("Latlong"));
    console.log("定位成功", wx.getStorageSync("City"));
    return false;
  }
}

export const Location = {
  onGetLocation,
  onClickLocation,
  onMarkers,
  onProvince
}