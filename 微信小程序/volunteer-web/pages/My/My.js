import Dialog from '@vant/weapp/dialog/dialog'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
let app = getApp()
import Toast from '@vant/weapp/toast/toast'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        My: true,
        user: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user: wx.getStorageSync('username')
        })
    },

    // /**
    //  * 生命周期函数--监听页面初次渲染完成
    //  */
    onReady: function () {
        if (wx.getStorageSync('UserInformation') === '') {
            this.setData({
                My: true
            })
            return false;
        }
        if (wx.getStorageSync('UserInformation') !== '' || wx.getStorageSync('UserInformation') === null) {
            this.setData({
                My: false
            })
            return false;
        }
    },
    /**
     * 点击事件处理
     */
    //登录
    onLogin() {
        wx.navigateTo({
            url: "/pages/Login/Login",
        })
    },

    //我的会员
    onMember() {
        if (wx.getStorageSync('UserInformation') === '') {
            Toast("请先登录")
            return false
        }
        wx.navigateTo({
            url: '/pages/Member/Member',
        })
    },
    // 我的收藏
    onCollection() {
        if (wx.getStorageSync('UserInformation') === '') {
            Toast("请先登录")
            return false
        }
        wx.navigateTo({
            url: '/pages/Collection/Collection',
        })
    },
    // 我的测评
    onEvaluation() {
        console.log(wx.getStorageSync('AddEvaluationdata') === '')
        // if (wx.getStorageSync('AddEvaluationdata') === '' && wx.getStorageSync('MBTI') === '' && wx.getStorageSync('MBTI') === 'Analysis') {
        if (wx.getStorageSync('AddEvaluationdata') === '' ) {
            Toast("请先答题")
            wx.navigateTo({
                url: `/pages/Evaluation/Evaluation`,
            })
            return false
        }
        wx.navigateTo({
            url: `/pages/MBTIResult/MBTIResult?MBTI=${JSON.stringify(wx.getStorageSync('MBTI'))}&Analysis=${wx.getStorageSync('Analysis')}`,
        })
    },
    //编辑资料
    // onEdit() {
    //     if (
    //         this.username !== null &&
    //         this.token !== null &&
    //         this.UserInformation !== null
    //     ) {
    //         // this.$router.push({
    //         //   path: "/Edit",
    //         // });
    //     } else {
    //         this.$toast("请先登录");
    //     }
    // },
    //退出登录
    ondropOut() {
        Dialog
            .confirm({
                title: "提出提示",
                message: "确认退出吗？",
            })
            .then(() => {
                //清空页面数据
                wx.removeStorageSync('UserInformation')
                wx.removeStorageSync('username')
                wx.removeStorageSync('token')

                // wx.clearStorage()
                // wx.clearStorageSync()
                this.setData({
                    My: true
                })
                Toast.success("退出成功");

            })
            .catch(() => {
                Toast.success("已取消退出");

            });
    },

    //底部按钮切换  --onShow是生命周期
    onShow: function () {
        this.getTabBar().init();
    },

})



