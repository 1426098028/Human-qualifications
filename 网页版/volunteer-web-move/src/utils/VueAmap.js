import { Dialog } from 'vant'
import { Toast } from 'vant'

export default function VueAmap(Val) {
    Location()

    function Location() {
        var map = new AMap.Map("container", {
            zoom: 13
        });
        //获取用户所在城市信息
        //实例化城市查询类

        AMap.plugin('AMap.CitySearch', function () {
            var citysearch = new AMap.CitySearch();
            console.log(citysearch)
            //自动获取用户IP，返回当前城市 等
            citysearch.getLocalCity(function (status, result) {

                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        var citybounds = result.bounds;

                        console.log("citybounds", citybounds)
                        let DeviceLogin = result.province
                        if (/广西/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "广西"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/西藏/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "西藏"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/宁夏/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "宁夏"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/新疆/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "新疆"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/香港/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "香港"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/澳门/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "澳门"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/内蒙古/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            let province = "内蒙古"
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/省/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            // 广东省
                            let province = DeviceLogin.split('省')[0]
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                        if (/市/gm.test(`${DeviceLogin}`)) {
                            let City = result.city
                            // 广东省
                            let province = DeviceLogin.split('市')[0]
                            sessionStorage.setItem("Latlong", province);
                            sessionStorage.setItem("City", City);
                            // 读取
                            console.log("定位成功", sessionStorage.getItem("Latlong"))
                            console.log("定位成功", sessionStorage.getItem("City"))
                            //地图显示当前城市
                            console.log(sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '')
                            return map.setBounds(citybounds);
                        }
                    }
                } else {
                    //自动定位后失败弹出窗
                    return Pop()
                    // console.log(result.info)
                }
            })

        })
        var options = {
            'showButton': true,//是否显示定位按钮
            'buttonPosition': 'LT',//定位按钮的位置
            /* LT LB RT RB */
            'buttonOffset': new AMap.Pixel(10, 200),//定位按钮距离对应角落的距离
            'showMarker': true,//是否显示定位点
            'markerOptions': {//自定义定位点样式，同Marker的Options
                'offset': new AMap.Pixel(0, 0),
                'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
            },
            'showCircle': true,//是否显示定位精度圈
            'circleOptions': {//定位精度圈的样式
                'strokeColor': '#0093FF',
                'noSelect': true,
                'strokeOpacity': 0.5,
                'strokeWeight': 1,
                'fillColor': '#02B0FF',
                'fillOpacity': 0.25
            }
        }
        AMap.plugin(["AMap.Geolocation"], function () {
            var geolocation = new AMap.Geolocation(options);
            map.addControl(geolocation);
            geolocation.getCurrentPosition()
        });


    }
    //自动定位后失败弹出窗
    function Pop() {
        Dialog.confirm({
            title: '自动定位',
            message: '定位失败请重新定位,请确保已打开定位',
            confirmButtonText: "重新定位",
            cancelButtonText: "手动定位",
        })
            .then(async () => {
                // sessionStorage.clear("Latlong");
                Location()
                // if (sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '') {
                Toast("重新定位中...")
                // }
            })
            .catch(() => {
                // on cancel
                // Toast("您已取消定位，部分功能无法正常使用");
                window.location.href = "/#/Location"
            });
    }
}