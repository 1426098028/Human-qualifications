import Dialog from '@vant/weapp/dialog/dialog'
// import Toast from '@vant/weapp/toast/toast';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
let app = getApp()
import Toast from '@vant/weapp/toast/toast'
const { CollectionList, DeleteCollection } = require('../../utils/Api/config/Flymain-wx.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        StatusCode: '',
        numPages: 1,//页码
        Pages: 15,//显示条数
        // 图标显示状态
        VanIcon: "star-o",
        starO: false,
        //表内容
        rows: [
        ],
        //设置表头
        headers: ['学校', '专业', '最低分', '最低分排名', '收藏'],
        //设置表头字段
        keys: ['school', 'school_majob', 'min', 'min_rank', 'Collection'],
        tableConfig: {
            //设置单元格的宽
            columnWidths: ['', '', '', '', '100rpx'],
            border: true,
            scroll: true,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //收藏
        this.setData({
            rows: []
        })
        this.onCollectionList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
    //获取收藏列表
    async onCollectionList() {
        let getCollectiondata = await CollectionList({
            body: {
                p: this.data.numPages,
                s: this.data.Pages,
                token: wx.getStorageSync('token'),
            },
            params: {},
        });
        this.setData({
            StatusCode: getCollectiondata.status
        })
        let Arr = []
        if (getCollectiondata.data.code === 200) {
            for (let item of getCollectiondata.data.data) {

                this.setData({
                    rows: this.data.rows.concat({ id: item.id, ...JSON.parse(item.data) })
                })



                // Arr.push({ id: item.id, ...JSON.parse(item.data) });
            }
            // this.setData({
            //     rows: this.data.rows.concat(Arr)
            // })
        }

        console.log(this.data.rows)

    },

    //表单功能
    async onClick(e) {
        console.log("专业", e.detail.currentTarget.dataset)
        console.log("专业", e.detail.currentTarget.dataset.majob)
        console.log("学校", e.detail.currentTarget.dataset.school)
        console.log("学校", e.detail.currentTarget.dataset.grid)
        console.log("学校", e.detail.currentTarget.dataset.outindex)
        console.log("学校", `${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid)
        //学校跳转
        if (`${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid) {
            console.log("学校名", e.detail.currentTarget.dataset.school)
            wx.navigateTo({
                url: `/pages/School/School?SchoolName=${e.detail.currentTarget.dataset.school}`,
            })
        }
        //专业跳转
        if (`${e.detail.currentTarget.dataset.outindex}-1` === e.detail.currentTarget.dataset.grid) {
            console.log("专业名", e.detail.currentTarget.dataset.majob)
            wx.navigateTo({
                url: `/pages/SearchMajor/SearchMajor?MajobName=${e.detail.currentTarget.dataset.majob}`,
            })
        }
        //收藏功能
        if (`${e.detail.currentTarget.dataset.outindex}-4` === e.detail.currentTarget.dataset.grid) {
            console.log("收藏", this.data.rows[e.detail.currentTarget.dataset.outindex])
            let DeleteCollectiondata = await DeleteCollection({
                url: `auth2/collection/${this.data.rows[e.detail.currentTarget.dataset.outindex].id}/`,
                body: {
                    token: wx.getStorageSync('token'),
                },
                params: {},
            });
            if (DeleteCollectiondata.data.code === 200) {
                Toast("取消收藏");
                this.setData({
                    rows: [],
                    StatusCode: '',
                    numPages: 1
                })
                this.onCollectionList()
            }
        }
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
      * 页面上拉触底事件的处理函数
      */
    onReachBottom: async function () {
        //判断数据是否加载完毕
        if (this.data.StatusCode === 404) {
            return false
        }
        await this.data.numPages++
        //搜索
        this.onCollectionList()
        console.log(this.data.rows)
        console.log("页面上拉触底事件的处理函数")
    },
})