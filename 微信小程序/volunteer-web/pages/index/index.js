// 获取应用实例
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
const { Location } = require('../../utils/AMap/LocationMap')
const { SearchSchools } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        City: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: async function () {
    },
    async getScreenSchoolsdata() {
        let Arr = [];
        let ScreenSchoolsdata = await SearchSchools({
            body: {
                special: "index",
                p: 1,
                s: 20,
                pv: wx.getStorageSync('Latlong')
            },
            params: {},
        });
        console.log(ScreenSchoolsdata);
        wx.setStorageSync("SchoolTips", ScreenSchoolsdata)
        if (typeof ScreenSchoolsdata ===Array && ScreenSchoolsdata.length === 0) {
            wx.removeStorageSync('SchoolTips')
            return false
        }
        if ( ScreenSchoolsdata.data.code !== 200) {
            wx.removeStorageSync('SchoolTips')
            return false
        }
    },
    //自动获取定位
    async onGetLocation() {
        let onGetLocationdata = await Location.onGetLocation()
    },
    //底部按钮切换
    onShow: async function () {
        this.getTabBar().init();
        //建立自动定位
        let Latlong = wx.getStorageSync('Latlong')
        //判断是否获取定位
        if (Latlong === "" || Latlong === null) {
            console.log("定位失败重新定位")
            //自动获取定位
            this.onGetLocation()
        }
        await this.setData({
            City: wx.getStorageSync('City')
        })

        if (wx.getStorageSync('SchoolTips') === "" || wx.getStorageSync('SchoolTips') === null) {
            this.getScreenSchoolsdata();
        }
        // if (wx.getStorageSync('SchoolTips') === "" && app.globalData.Tips === 1 || wx.getStorageSync('SchoolTips') === null && app.globalData.Tips === 1) {
        //     this.getScreenSchoolsdata();

        // }
    },

    // 事件处理函数
    onLocation() {
        console.log("定位")
        wx.navigateTo({
            url: '/pages/Location/Location',
        })
    },
    onCheckSchool() {
        console.log("查学校")
        wx.navigateTo({
            url: '/pages/SearchAll/SearchAll',
        })
    },
    onCheckMajor() {
        wx.navigateTo({
            url: '/pages/SearchMajor/SearchMajor',
        })
        console.log("查专业")
    },
    onCheckScore() {
        wx.navigateTo({
            url: '/pages/Fraction/Fraction',
        })
        console.log("查分数")
    },
    onOccupation() {
        wx.navigateTo({
            url: "/pages/Evaluation/Evaluation",
        })
        console.log("职业测评")
    },
    onProspect() {
        wx.navigateTo({
            url: '/pages/Prospect/Prospect',
        })
        console.log("就业前景")
    },
    onVipService() {
        wx.navigateTo({
            url: '/pages/Member/Member',
        })
        console.log("会员服务")
    },
})