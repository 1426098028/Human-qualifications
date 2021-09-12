
const { Location } = require('./utils/AMap/LocationMap')
import regeneratorRuntime, { async } from './lib/runtime/runtime';
App({
     onLaunch() {
         this.checkUpdate()
        //建立自动定位
        let Latlong = wx.getStorageSync('Latlong')
        //判断是否获取定位
        if (Latlong === "" || Latlong === null) {
            console.log("定位失败重新定位")
            //自动获取定位
            this.onGetLocation()
        }
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    //自动获取定位
    async onGetLocation() {
        let onGetLocationdata = await Location.onGetLocation()
        // this.setData({
        //     latitude: onGetLocationdata.latitude,
        //     longitude: onGetLocationdata.longitude,
        //     Markers: Location.onMarkers(onGetLocationdata.longitude, onGetLocationdata.latitude),
        // })
    },

    /**
     * 版本更新机制兼容低版本代码
     */
    checkUpdate() {
        // 判断当前微信版本是否支持检测更新接口,注：（基础库版本大于v1.9.90才可以使用getUpdateManager接口所以要做低版本兼容处理）
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager();
            // 请求完新版本信息的回调
            updateManager.onCheckForUpdate(function (res) {
                // 如有新版本则进行静默下载更新并提示
                if (res.hasUpdate) {
                    // 新版本下载成功
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '发现版本更新，已经准备好请重启应用~',
                            showCancel: false,
                            success(res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                                    updateManager.applyUpdate();
                                }
                            }
                        })
                    });
                    // 新版本下载失败
                    updateManager.onUpdateFailed(function () {
                        console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                            showCancel: false
                        })
                    })
                }
            });
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                success(res) {
                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                    if (res.confirm) {
                        // 使用此接口可直接跳转至微信客户端更新下载页面
                        wx.updateWeChatApp();
                    }
                }
            })
        }
    },

    //全局变量
    globalData: {
        user: {
            UserInformation: wx.getStorageSync('UserInformation'),
            username: wx.getStorageSync('username'),
            token: wx.getStorageSync('token'),
        },
        //不是Vip
        isVip: true,
        isTable: false,

    Tips:1



    }
})

