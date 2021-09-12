const { SearchSchools, VipMajor, AddCollection, DeleteCollection } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast';
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 判断是否为Vip
        isVip: true,
        isTable: false,
        // 图标显示状态
        VanIcon: "star-o",
        starO: true,
        active: 1,
        LeftValue: "学校简介",
        RightValue: "专业分数线",
        Recruit: '',
        Telephone: '',
        content: '',
        numPages: 1,//页码
        Pages: 20,//显示条数
        //表内容
        rows: [
            // { Collection: 4, school_majob: 'mike', min: 26, min_rank: '60', type: '175', count: "12", remarks: "222222", batch: '121' },
        ],
        //设置表头
        headers: ['收藏', '专业名', '最低分', '最低分排位', '科类', '批次', "备注"],
        // headers: ['收藏', '专业名', '最低分', '最低分排位', '科类', '批次', '录取人数', "备注"],//不要删除
        //设置表头字段
        keys: ['Collection', 'school_majob', 'min', 'min_rank', 'type', 'batch', "remarks"],
        // keys: ['Collection', 'school_majob', 'min', 'min_rank', 'type', 'batch', 'count', "remarks"],//不要删除
        tableConfig: {
            //设置单元格的宽
            columnWidths: ['80rpx', '', '', '', '', '', '', ''],
            border: true,
            scroll: true,
        },
        //保存当前请求状态码
        StatusCode: '',
        SchoolName: "",
        province_name: "",
        city_name: "",
        school_type_name: "",
        type_name: "",
        school_nature_name: "",
        dual_class_name: "",
        f985: "",
        f211: "",

        isJob: true,
        jobRate: 0,
        postgraduateRate: 0,
        abroadRate: 0,







    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.SchoolName)
        this.setData({
            rows: [],
            SchoolName: options.SchoolName
        })


        wx.setNavigationBarTitle({
            title: options.SchoolName
        })


        this.SchoolInformation(options.SchoolName)
        this.OnisVip()
        // this.VipFraction(options.SchoolName)
    },
    //判断是否为Vip
    OnisVip() {
        let VipInformation = wx.getStorageSync("UserInformation")
        //未登录提示
        if (VipInformation === "") {
            Toast("请您先登录再使用");
            //不是Vip
            this.setData({
                isVip: true,
                isTable: false,
            })
            return false;
        }
        if (Object.keys(VipInformation.user_level).length === 0) {
            Toast("请成为会员");
            //不是Vip
            this.setData({
                isVip: true,
                isTable: false,
            })
            return false;
        }
        if (VipInformation.user_level[0].type === "普通用户") {
            Toast("请成为会员");
            //不是Vip
            this.setData({
                isVip: true,
                isTable: false,
            })
            return false;
        }
        if (VipInformation.user_level[0].type === "vip用户") {
            //是Vip
            this.setData({
                isVip: false,
                isTable: true,
            })
        }
    },
    // 学校信息
    async SchoolInformation(Name) {
        let SearchSchoolsdata = await SearchSchools({
            body: {
                kw: Name,
                pv: wx.getStorageSync('Latlong'),
            },
            params: {},
        });
        if (SearchSchoolsdata.data.code === 200) {
            // console.log(SearchSchoolsdata.data);
            this.loading = false;
            for (const item in SearchSchoolsdata.data.data) {
                if (
                    SearchSchoolsdata.data.data[item].name === Name
                ) {
                    await this.setData({
                        Recruit: SearchSchoolsdata.data.data[item].school_site.replace(/\\/g, ""),
                        Telephone: SearchSchoolsdata.data.data[item].phone,
                        content: SearchSchoolsdata.data.data[item].content.replace(/\\/g, ""),

                        province_name: SearchSchoolsdata.data.data[item].province_name,
                        city_name: SearchSchoolsdata.data.data[item].city_name,
                        school_type_name: SearchSchoolsdata.data.data[item].school_type_name,
                        type_name: SearchSchoolsdata.data.data[item].type_name,
                        school_nature_name: SearchSchoolsdata.data.data[item].school_nature_name,
                        dual_class_name: SearchSchoolsdata.data.data[item].dual_class_name,
                        f985: SearchSchoolsdata.data.data[item].f985,
                        f211: SearchSchoolsdata.data.data[item].f211,

                        jobRate: Number(SearchSchoolsdata.data.data[item].job),
                        postgraduateRate: Number(SearchSchoolsdata.data.data[item].postgraduate),
                        abroadRate: Number(SearchSchoolsdata.data.data[item].abroad),
                    })
                }
            }

            console.log(this.data.jobRate === 0)
            if (
                this.data.jobRate === 0 ||
                this.data.postgraduateRate === 0 ||
                this.data.abroadRate === 0 ||
                this.data.jobRate === null ||
                this.data.postgraduateRate === null ||
                this.data.abroadRate === null
            ) {
                this.setData({
                    isJob: false
                })
            }
        }
    },
    //Vip学校分数
    async VipFraction(Name) {
        let VipMajordata = await VipMajor({
            body: {
                p: this.data.numPages,
                s: this.data.Pages,
                kw: Name,
                pv: wx.getStorageSync('Latlong'),
                token: wx.getStorageSync('token'),
            },
            params: {},
        });
        this.setData({
            StatusCode: VipMajordata.status
        })
        let Arr = []
        if (VipMajordata.status === 404) {
            return false
        }
        if (VipMajordata.data.code === 200) {
            for (const item in VipMajordata.data.data) {
                console.log(VipMajordata.data.data[item].school, Name)
                if (VipMajordata.data.data[item].school == Name) {
                    Arr.push(VipMajordata.data.data[item])
                }
            }
            this.setData({
                rows: this.data.rows.concat(Arr)
            })
            console.log("rows", this.data.rows)
        }
    },
    //表格功能
    async onClick(e) {
        let Arr = []
        //收藏功能
        if (`${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid) {
            let AddCollectiondata = await AddCollection({
                body: {
                    data: JSON.stringify(this.data.rows[e.detail.currentTarget.dataset.outindex]),
                    user: wx.getStorageSync('username'),
                    token: wx.getStorageSync('token'),
                },
                params: {},
            });
            if (AddCollectiondata.data.code === 200 && AddCollectiondata.data.message === "数据收藏成功") {
                console.log("收藏", e.detail.currentTarget.dataset.outindex)
                Arr = {
                    ...this.data.rows[e.detail.currentTarget.dataset.outindex],
                    collect: "collect",
                }
                this.data.rows.splice(e.detail.currentTarget.dataset.outindex, 1, Arr)
                // console.log("收藏", this.data.rows)
                Toast("收藏成功");
                return false;
            }
            if (AddCollectiondata.data.code === 200 && AddCollectiondata.data.message === "已收藏，数据获取成功") {
                let DeleteCollectiondata = await DeleteCollection({
                    url: `auth2/collection/${AddCollectiondata.data.data[0].id}/`,
                    body: {
                        token: wx.getStorageSync('token'),
                    },
                    params: {},
                });
                console.log(DeleteCollectiondata);
                if (DeleteCollectiondata.data.code === 200) {
                    Toast("取消收藏");
                }
                return false;
            }
        }
    },
    Enrollment() {
        wx.navigateTo({
            url: `/pages/Extranet/Extranet?Address=${this.data.Recruit}`,
        })
    },
    //切换
    onChangeTab(event) {
        this.setData({
            numPages: 1,
        })
        console.log(event.detail.detail.index)
        if (event.detail.detail.index === 1 && this.data.rows.length === 0 || this.data.rows === []) {
            this.VipFraction(this.data.SchoolName)
        }
    },
    /**
      * 页面上拉触底事件的处理函数
      */
    onReachBottom: async function () {
        //判断数据是否加载完毕
        if (this.data.StatusCode !== 200) {
            return false
        }
        if (this.data.StatusCode >= 200 && this.data.StatusCode < 300 && this.data.StatusCode === 200) {
            await this.data.numPages++
            //搜索
            this.VipFraction(this.data.SchoolName)
            console.log(this.data.rows)
            console.log("页面上拉触底事件的处理函数")
            return false
        }
        if (this.data.StatusCode === 429) {
            const timer = setInterval(() => {
                this.VipFraction(this.data.SchoolName)
                clearInterval(timer);
                Toast.clear();
            }, 8000);
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})