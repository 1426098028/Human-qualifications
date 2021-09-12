import Toast from '@vant/weapp/toast/toast';
const { HotSearch, VipMajor, AddCollection, DeleteCollection } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 判断是否为Vip
        isVip: true,
        isTable: false,

        Major: true,
        MoreMajor: false,
        Associa: true,
        isMajor: false,
        SearchKeywords: '',//输入框内容
        SaveKeywords: '',//保存关键字
        WordArr: [],//热搜索数据
        MajorArr: [
            { "major": "电子信息工程技术", "year": "三年", "education": "专科" },
            { "major": "电气自动化技术", "year": "三年", "education": "专科" },
            { "major": "软件技术", "year": "三年", "education": "专科" },
            { "major": "计算机网络技术", "year": "三年", "education": "专科" },
            { "major": "工程造价", "year": "四年", "education": "本科" },
            { "major": "会计", "year": "三年", "education": "专科" },
            {
                "major": "旅游管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "物流管理",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "互联网金融",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "金融工程",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "国际经济与贸易",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "商务英语",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "环境设计",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "视觉传达设计",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "音乐表演",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "艺术设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "播音与主持",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "舞蹈表演",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "数据科学与大数据技术",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "数字媒体艺术",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "空中乘务",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "民航空中安全保卫",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "国际邮轮乘务管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "高速铁路客运乘务",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "直升机驾驶技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "定翼机驾驶技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "飞行器制造技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "飞机机电设备维修",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "飞机电子设备维修",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "无人机应用技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "民航安全技术管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "民航运输",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "航空物流",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "服装与服饰设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "视觉传播设计与制作",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "产品艺术设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "机场运行",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "通用航空航务技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "通用航空器维修",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑工程技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建设工程监理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "道路桥梁工程技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "工程测量技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "市政工程技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑动画与模型制作",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建设项目信息化管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "计算机应用技术（UI方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "数字媒体应用技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "大数据技术与应用",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "工商企业管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑设备工程技术（建筑水电空调系统设计、造价与项目管理方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑设备工程技术（机电安装BIM工程师方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑智能化工程技术（楼宇自控、消防及安防系统的设计、施工及调试方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑电气工程技术（电气工程设计方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "应用电子技术（智慧社区方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "环境工程技术（环境工程设计、咨询与技术服务方向）",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑室内设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "家具艺术设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "园林工程技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建筑设计",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "古建筑工程技术",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "建设工程管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "房地产经营与管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "物业管理",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "应用韩语",
                "year": "三年",
                "education": "专科"
            },
            {
                "major": "广告学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "化学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "生物科学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "统计学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "数学与应用数学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "材料科学与工程",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "法学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "历史学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "海洋科学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "汉语言文学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "戏剧影视文学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "汉语言",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "考古学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "哲学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "人类学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "新闻学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "广播电视学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "传播学",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "英语",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "日语",
                "year": "四年",
                "education": "本科"
            },
            {
                "major": "法语",
                "year": "四年",
                "education": "本科"
            },







        ],//专业热搜索
        numPages: 1,//页码
        Pages: 20,//显示条数

        //表内容
        rows: [
            // { Collection: 1, school_majob: 'dick', school: 25, min: '60', min_rank: '170', count: '11' },
        ],
        //设置表头
        headers: ['收藏', '专业', '学校', '最低分', '最低分位次'],
        // headers: ['收藏', '专业', '学校', '最低分', '最低分位次', '录取人数'],//不要删除
        //设置表头字段
        keys: ['Collection', 'school_majob', 'school', 'min', 'min_rank'],
        // keys: ['Collection', 'school_majob', 'school', 'min', 'min_rank', 'count'],//不要删除
        tableConfig: {
            //设置单元格的宽
            columnWidths: ['80rpx', '', '', '', '', ''],
            border: true,
            scroll: true,
        },
        //保存当前请求状态码
        StatusCode: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.OnisVip()
        console.log("options", options.MajobName)
        if (options.MajobName !== undefined) {
            this.setData({
                Associa: true,//显示
                isMajor: true,//隐藏
                SaveKeywords: options.MajobName,//保存搜索关键字
                SearchKeywords: options.MajobName//保存搜索关键字
            })
            this.getonLoad(options.MajobName)
            return false
        }
  
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





    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    //获取数据
    async getonLoad(Keyword) {

        //热搜索请求
        if (this.data.SearchKeywords !== "" && this.data.Associa === false && this.data.isMajor === true) {
            console.log('关键字搜索')
            let HotSearchdata = await HotSearch({
                body: {
                    m: Keyword,
                    t: 2
                },
                params: {},
            })
            if (HotSearchdata.data.code === 200) {
                this.setData({
                    WordArr: [],//热搜索数据
                    SchoolArr: [],//搜索学校数据
                })
                if (HotSearchdata.data.data.length > 0) {
                    this.setData({
                        WordArr: HotSearchdata.data.data
                    })
                    return false
                }
                if (HotSearchdata.data.data.length === 0) {
                    Toast.fail("输入正确的专业名");
                    return false
                }
            }
            return false
        }
        //搜索专业请求
        if (this.data.isMajor === true && this.data.Associa === true) {
            this.setData({
                Major: false,
            })
            console.log("点击搜索,专业搜索")
            let VipMajordata = await VipMajor({
                body: {
                    p: this.data.numPages,
                    s: this.data.Pages,
                    mj: Keyword,
                    pv: wx.getStorageSync('Latlong'),
                    token: wx.getStorageSync('token'),
                },
                params: {},
            });
            this.setData({
                StatusCode: VipMajordata.status
            })
            // this.setData({
            //     WordArr: [],//热搜索数据
            //     rows: [],//搜索专业数据
            // })

            if (VipMajordata.status === 404) {
                return false
            }
            if (VipMajordata.data.code === 200) {
                if (VipMajordata.data.data.length > 0) {
                    // this.setData({
                    //     rows: VipMajordata.data.data
                    // })
                    this.setData({
                        rows: this.data.rows.concat(VipMajordata.data.data)
                    })
                    return false
                }
                if (VipMajordata.data.data.length === 0) {
                    Toast.fail("没有相关专业");
                    return false
                }
            }
            return false
        }
    },
    //高亮  --完成
    async highilght(KeywordHighlight) {
        console.log(KeywordHighlight)
        return KeywordHighlight.replace(
            new RegExp(this.data.SearchKeywords, "gi"),
            `<view style="color:#90BBFD">${this.data.SearchKeywords}</view>`
        );
    },
    // 父组件-----获取热搜索得到的数据
    async getWord(event) {
        console.log('热搜索数据 ', event.detail.currentTarget.dataset.word)
        if (this.data.SearchKeywords === event.detail.currentTarget.dataset.word) {
            return false
        }
        this.setData({
            Associa: true,//显示
            isMajor: true,//隐藏
            WordArr: [],//热搜索数据
            rows: [],//搜索专业数据
            SearchKeywords: event.detail.currentTarget.dataset.word,
        })
        this.getonLoad(event.detail.currentTarget.dataset.word)
    },
    // 父组件-----输入内容变化时触发
    async onChange(event) {
        console.log('热搜索数据 ', event.detail.detail)
        if (event.detail.detail === "") {
            this.setData({
                numPages: 1,
                WordArr: [],//热搜索数据
                Associa: false,//隐藏
                isMajor: false,//显示
            })
            return false
        }
        if (this.data.SearchKeywords === event.detail.detail) {
            return false
        }
        this.setData({
            numPages: 1,
            Associa: false,//显示
            isMajor: true,//隐藏
            SearchKeywords: event.detail.detail,
        })
        this.getonLoad(event.detail.detail)
    },
    // 父组件-----点击搜索时触发
    async onSearch() {
        if (this.data.SearchKeywords === "") {
            Toast.fail("请输入搜索内容");
        }
        if (this.data.SaveKeywords === this.data.SearchKeywords) {
            return false
        }
        console.log("父组件-----点击搜索时触发", this.data.SearchKeywords)
        this.setData({
            numPages: 1,
            Associa: true,//显示
            isMajor: true,//隐藏
            SaveKeywords: this.data.SearchKeywords,//保存搜索关键字
            WordArr: [],//热搜索数据
            rows: [],//搜索专业数据
        })
        this.getonLoad(this.data.SearchKeywords)
    },
    async onClick(e) {
        console.log("学校", e.detail.currentTarget.dataset.school)
        console.log("学校", e.detail.currentTarget.dataset.grid)
        console.log("学校", e.detail.currentTarget.dataset.outindex)
        console.log("学校", `${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid)
        // 学校跳转
        if (`${e.detail.currentTarget.dataset.outindex}-2` === e.detail.currentTarget.dataset.grid) {
            console.log("学校字", e.detail.currentTarget.dataset.school)
            wx.navigateTo({
                url: `/pages/School/School?SchoolName=${e.detail.currentTarget.dataset.school}`,
            })
        }

        // 收藏
        if (`${e.detail.currentTarget.dataset.outindex}-0` === e.detail.currentTarget.dataset.grid) {
            // console.log("收藏", this.data.rows[e.detail.currentTarget.dataset.outindex])
            let AddCollectiondata = await AddCollection({
                body: {
                    data: JSON.stringify(this.data.rows[e.detail.currentTarget.dataset.outindex]),
                    user: wx.getStorageSync('username'),
                    token: wx.getStorageSync('token'),
                },
                params: {},
            });
            if (AddCollectiondata.data.code === 200 && AddCollectiondata.data.message === "数据收藏成功") {
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
    /**
      * 页面上拉触底事件的处理函数
      */
    onReachBottom: async function () {
        //判断数据是否加载完毕
        if (this.data.StatusCode === 404) {
            return false
        }

        if (this.data.StatusCode >= 200 && this.data.StatusCode < 300 && this.data.StatusCode === 200) {
            await this.data.numPages++
            //搜索
            this.getonLoad(this.data.SearchKeywords)

            console.log(this.data.rows)
            console.log("页面上拉触底事件的处理函数")
            return false
        }


        if (this.data.StatusCode === 429) {
            const timer = setInterval(() => {
                this.getonLoad(this.data.SearchKeywords)
                  clearInterval(timer);
                  Toast.clear();
              },8000);
        }


    },
})