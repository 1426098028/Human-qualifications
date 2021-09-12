import Dialog from '@vant/weapp/dialog/dialog'
import Toast from '@vant/weapp/toast/toast';
let app = getApp()

const { GetVip } = require('../../utils/Api/config/Flymain-wx.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    LeftValue: "Vip账号",
    RightValue: "一对一服务",
    activeName: '',
    expert: "",
    valueActivation: '',
    MemberInformation: "",
    ExpertInformation: "",
    // 获取激活码
    getVip: true,
    // 马上激活码
    setVip: false,
    //已激活
    Power: false,
    Activation: "暂无信息",
    beOverdue: "暂无信息"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //未登录提示
    if (wx.getStorageSync('UserInformation') === '' || wx.getStorageSync('UserInformation') === null) {
      Toast("请您先登录再激活")
      return false;
    }
    //新用户
    if (wx.getStorageSync('UserInformation').user_level.length === 0) {
      this.setData({
        // 获取激活码
        getVip: true,
        // 马上激活码
        setVip: false,
        //已激活
        Power: false,
      })
      return false;
    }
    //会员过期
    if (wx.getStorageSync('UserInformation').user_level[0].type === "普通用户") {
      this.setData({
        // 获取激活码
        getVip: true,
        // 马上激活码
        setVip: false,
        //已激活
        Power: false,
      })
      return false;
    }
    //是会员
    if (wx.getStorageSync('UserInformation').user_level[0].type === "vip用户") {
      this.setData({
        // 获取激活码
        getVip: false,
        // 马上激活码
        setVip: false,
        //已激活
        Power: true,
        Activation: wx.getStorageSync('UserInformation').user_level[0].pay_time !== ""
          ? wx.getStorageSync('UserInformation').user_level[0].pay_time
          : "暂无信息",
        beOverdue: wx.getStorageSync('UserInformation').user_level[0].expire_date !== ""
          ? wx.getStorageSync('UserInformation').user_level[0].expire_date
          : "暂无信息"
      })
      return false;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onExpert(event) {
    this.setData({
      expert: event.detail,
    });
  },
  onMemberInformation(event) {
    this.setData({
      MemberInformation: event.detail,
    });
  },
  onExpertInformation(event) {
    this.setData({
      ExpertInformation: event.detail,
    });
  },
  onChangeTab(event) {
    console.log(event.detail.detail.index)
    this.setData({
      valueActivation: ""
    })
  },
  //获取激活码
  ongetActivation() {
    this.setData({
      show: true,
      // 获取激活码
      getVip: false,
      // 马上激活码
      setVip: true,
      //已激活
      Power: false,
    })
  },
  //关闭弹窗提示
  onClose() {
    this.setData({
      show: false,
    })
  },
  //获取输入框内容
  onvVlueActivation(e) {
    console.log(e.detail)
    this.setData({
      valueActivation: e.detail
    })
  },
  //激活Vip
  async onVIPAccount() {
    if (this.data.valueActivation === '') {
      Toast("请输入激活码");
      return false
    }
    //未登录提示
    if (wx.getStorageSync('UserInformation') === '' || wx.getStorageSync('UserInformation') === null) {
      Dialog.confirm({
        title: "登录",
        message: "请您先登录再激活",
        confirmButtonText: "去登录",
      })
        .then(() => {
          wx.navigateTo({
            url: "/pages/Login/Login",
          })
          return false;
        })
        .catch(() => {
          this.setData({
            // 获取激活码
            getVip: true,
            // 马上激活码
            setVip: false,
            //已激活
            Power: false,
          })
          return false;
        });
      return false;
    }
    //已登录
    try {
      let GetVipdata = await GetVip({
        body: {
          code: this.data.valueActivation,
          token: wx.getStorageSync('token'),
        },
        params: {},
      });
      if (GetVipdata.data.code == 200) {
        let YesVip = wx.getStorageSync('UserInformation');
        YesVip = {
          token: wx.getStorageSync('token'),
          username: wx.getStorageSync('username'),
          user_level: [...GetVipdata.data.data],
        };
        wx.setStorage({
          key: "UserInformation",
          data: YesVip
        })
        // 设置是Vip
        app.globalData.isVip = false
        app.globalData.isTable = true
        console.log(app)
        this.setData({
          // 获取激活码
          getVip: false,
          // 马上激活码
          setVip: false,
          //已激活
          Power: true,
        })
        await Toast(GetVipdata.data.message);
        await wx.reLaunch({
          url: "/pages/Member/Member",
        })
        return false;
      }
      if (GetVipdata.data.code !== 200) {
        // 获取激活码
        this.getVip = true;
        // 马上激活码
        this.setVip = false;
        //已激活
        this.Power = false;
        Toast("请输入效的激活码");
        return false;
      }
    } catch (GetVipdata) {
      if (GetVipdata.data.code !== 200) {
        // 获取激活码
        this.getVip = true;
        // 马上激活码
        this.setVip = false;
        //已激活
        this.Power = false;
        Toast("请输入效的激活码");
        return false;
      }
    }
  },
})