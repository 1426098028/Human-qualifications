const { VipMajor, AddCollection, DeleteCollection } = require('../../utils/Api/config/Flymain-wx.js')
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

    numPages: 1,//页码
    Pages: 20,//显示条数
    //表内容
    rows: [
      // { name: 1, level_name: 'dick', MajorScore: 25, Pitching: '60', },
    ],
    //设置表头
    headers: ['收藏', '专业', '最低分', '最低分位次', '分析评估'],
    //设置表头字段
    keys: ['Collection', 'school_majob', 'min', 'min_rank', 'Fx'],
    tableConfig: {
      //设置单元格的宽
      columnWidths: ['', '', '', '', ''],
      border: true,
      scroll: true,
    },
    Fraction: "",
    RangeVal1: "",
    RangeVal2: "",
    SchoolName: "",
    //保存当前请求状态码
    StatusCode: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    console.log(options)
    this.setData({
      Fraction: options.Fraction,
      RangeVal1: options.RangeVal1,
      RangeVal2: options.RangeVal2,
      SchoolName: options.SchoolName,
    })

    wx.setNavigationBarTitle({
      title:  options.SchoolName
    })



  await  this.OnisVip()
  await  this.onVipMajor(this.data.Fraction, this.data.RangeVal1, this.data.RangeVal2, this.data.SchoolName)
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
  async onVipMajor(Fraction, RangeVal1, RangeVal2, SchoolName) {
    let VipMajordata = await VipMajor({
      body: {
        p: this.data.numPages,
        s: this.data.Pages,
        gt: RangeVal1 || 0,
        lt: RangeVal2 || 0,
        kw: SchoolName,
        token: wx.getStorageSync('token'),
        pv: wx.getStorageSync('Latlong'),
      },
      params: {},
    })
    this.setData({
      StatusCode: VipMajordata.status
    })
    //"上海交通大学"   "上海交通大学医学院"
    console.log(VipMajordata)
    if (VipMajordata.data.code === 200) {
      for (const item in VipMajordata.data.data) {
        if (VipMajordata.data.data[item].school === SchoolName) {
          console.log(item)
          console.log(VipMajordata.data.data[item].school)
          let num = Number(VipMajordata.data.data[item].min);
          let Val = Number(Fraction);
          let Fx = Val - num;
          if (Fx < -5) {
            console.log(num, Val);
            this.setData({
              // rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "冲(险)" })
              rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "<p class='Risk'>冲(险)</p>" })
            })
          } else {
            if (Fx >= -5 && Fx < 0) {
              console.log(num, Val);
              this.setData({
                // rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "冲" })
                rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "<p class='punching'>冲</p>" })
              })
            } else {
              if (Fx >= 0 && Fx < 5) {
                console.log(num, Val);
                this.setData({
                  // rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "稳" })
                  rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "<p class='stable'>稳</p>" })
                })
              } else {
                if (Fx >= 5 && Fx < 10) {
                  console.log(num, Val);
                  this.setData({
                    // rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "保" })
                    rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "<p class='protect'>保</p>" })
                  })
                } else {
                  console.log(num, Val);
                  this.setData({
                    // rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "垫" })
                    rows: this.data.rows.concat({ ...VipMajordata.data.data[item], Fx: "<p class='pad'>垫</p>" })
                  })
                }
              }
            }
          }
        }
        console.log(this.data.rows)
      }
    }
  },

  //表格功能
  async onClick(e) {
    //收藏功能
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

  onReachBottom: async function () {
    //判断数据是否加载完毕
    if (this.data.StatusCode === 404) {
      return false
    }
    await this.data.numPages++
    //搜索
    this.onVipMajor(this.data.Fraction, this.data.RangeVal1, this.data.RangeVal2, this.data.SchoolName)
    console.log(this.data.rows)
    console.log("页面上拉触底事件的处理函数")
  },
})