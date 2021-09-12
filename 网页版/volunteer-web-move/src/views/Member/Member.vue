<template>
  <div class="Member">
    <van-sticky>
      <van-nav-bar
        :title="MemberName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <Tab :LeftValue="LeftValue" :RightValue="RightValue">
      <template #Left>
        <div class="cell-Line Line"></div>
        <van-collapse v-model="activeNames" accordion>
          <div class="cell-Line Line"></div>
          <van-collapse-item title="会员权益" value="了解详情">
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">专家级测评体系</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">解锁能上的大学</div>
              <div slot="label" class="Label">全部院校、专业数据信息</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">全面院校录取分析</div>
              <div slot="label" class="Label">让报考更有依据</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">志愿院校专业录取评估</div>
              <div slot="label" class="Label">录取评估（“冲、稳、保、垫”）</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">快速查找招生院校</div>
              <div slot="label" class="Label">历年录取数据</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">各专业就业前景分析</div>
              <div slot="label" class="Label">
                专业对口岗位种类、各岗位数量及薪酬情况
              </div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">节约志愿填报时间</div>
              <div slot="label" class="Label">
                将期望专业按录取分数线从高到低进行院校排列，一目了然
              </div>
            </van-cell>
            <div class="cell-Line Line"></div>
          </van-collapse-item>
        </van-collapse>
        <div class="cell-Line Line"></div>
        <!-- 流程图片 -->
        <div class="process">账号获取激活码</div>
        <div class="VipBackground">
          <van-image
            class="Vipprocess"
            radius="10px"
            lazy-load
            :src="require('/static/img/Vipprocess.png')"
          />
        </div>
        <!-- 会员图片 -->
        <div class="VipBackground">
          <van-image
            radius="10px"
            lazy-load
            :src="require('/static/img/Vipimg.jpg')"
          />

          <div class="VipLocation">
            <van-button
              v-model="but"
              v-if="getVip"
              slot="label"
              @click="ongetActivation"
              class="Mybut"
            >
              获取激活码
            </van-button>
            <van-field
              v-if="setVip"
              slot="label"
              v-model="Activation"
              placeholder="请输入激活码"
            >
              <template #button>
                <van-button
                  size="small"
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  @click="onVIPAccount"
                >
                  马上激活
                </van-button>
              </template>
            </van-field>

            <div slot="label" v-if="Power">Vip权益</div>
          </div>
        </div>
        <div class="cell-Line Line"></div>
        <van-collapse v-model="isVip">
          <van-collapse-item title="我的会员信息" name="1">
            <div class="Editcontent">
              <div class="Edl">激活时间:</div>
              <div class="Ed">{{ Exciting }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">过期时间:</div>
              <div class="Ed">{{ stage }}</div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div class="cell-Line Line"></div>
      </template>
      <template #Right>
        <div class="cell-Line Line"></div>

        <van-collapse v-model="activeNames" accordion>
          <div class="cell-Line Line"></div>
          <van-collapse-item title="会员权益" value="了解详情">
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">专家级测评体系</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">解锁能上的大学</div>
              <div slot="label" class="Label">全部院校、专业数据信息</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">全面院校录取分析</div>
              <div slot="label" class="Label">让报考更有依据</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">志愿院校专业录取评估</div>
              <div slot="label" class="Label">录取评估（“冲、稳、保、垫”）</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">快速查找招生院校</div>
              <div slot="label" class="Label">历年录取数据</div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">各专业就业前景分析</div>
              <div slot="label" class="Label">
                专业对口岗位种类、各岗位数量及薪酬情况
              </div>
            </van-cell>
            <div class="cell-Line Line"></div>
            <van-cell>
              <div slot="title" class="tit">节约志愿填报时间</div>
              <div slot="label" class="Label">
                将期望专业按录取分数线从高到低进行院校排列，一目了然
              </div>
            </van-cell>
            <div class="cell-Line Line"></div>
          </van-collapse-item>
          <div class="cell-Line Line"></div>

          <van-collapse-item value="了解详情">
            <div slot="title">专家一对一</div>
            <!-- <div slot="title" class="red">以下省份考生享有权益</div> -->

            <van-cell border clickable>
              <div slot="title"></div>
            </van-cell>

            <van-cell>
              <div slot="title" class="tit onetit">特约专家一对一服务</div>
              <div slot="label" class="Label oneLabel">
                为你定制个性化志愿，专家助你圆梦心仪大学!
              </div>
            </van-cell>
          </van-collapse-item>
          <div class="cell-Line Line"></div>
        </van-collapse>

        <div class="process">获取一对一流程</div>

        <div class="VipBackground">
          <van-image
            class="Vipprocess"
            radius="10px"
            lazy-load
            :src="require('/static/img/Vipprocess.png')"
          />
        </div>
        <!-- 会员图片 -->
        <div class="VipBackground">
          <van-image
            radius="10px"
            lazy-load
            :src="require('/static/img/Vipimg.jpg')"
          />

          <div class="VipLocation">
            <van-button
              v-if="getVip"
              slot="label"
              @click="ongetActivation"
              class="Mybut"
            >
              获取激活码
            </van-button>
            <van-field
              v-if="setVip"
              slot="label"
              v-model="Activation"
              placeholder="请输入激活码"
            >
              <template #button>
                <van-button
                  size="small"
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  @click="onVIPAccount"
                >
                  马上激活
                </van-button>
              </template>
            </van-field>
            <div slot="label" v-if="Power">一对一权益</div>
          </div>
        </div>
        <div class="cell-Line Line"></div>

        <van-collapse v-model="isVip">
          <van-collapse-item title="我的会员信息" name="1">
            <div class="Editcontent">
              <div class="Edl">激活时间:</div>
              <div class="Ed">{{ Exciting }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">过期时间:</div>
              <div class="Ed">{{ stage }}</div>
            </div>
          </van-collapse-item>
        </van-collapse>

        <div class="cell-Line Line"></div>
      </template>
    </Tab>
    <van-cell />
    <van-cell />
    <van-cell />
    <van-cell />
    <van-dialog v-model="show">
      <div slot="title" class="Diatit">获取激活码途径</div>
      <div slot="default" class="DivDialog">
        <div class="Dia">
          (1).已有激活码(激活卡)请直接点击确定，输入激活码，进行激活。
        </div>
        <div class="Dia">
          (2).没有激活码请对该页面的下方二维码进行截图，前去微信扫一扫，添加好友，进行获取激活码。
        </div>
        <van-image
          width="4rem"
          height="4rem"
          fit="cover"
          lazy-load
          :src="require('/static/img/老板微信号.jpg')"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { GetVip } from "../../NewApi/Flymain";
import Tab from "@/components/Tab/Tab";
import { mapState } from "vuex";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "Member",
  data() {
    return {
      province: "",
      but: "",
      show: false,
      Exciting: "暂无信息",
      stage: "暂无信息",
      LeftValue: "Vip账号",
      RightValue: "一对一服务",
      isVip: ["1"],
      //查看会员权益
      activeNames: ["1"],
      // 获取激活码
      getVip: true,
      // 马上激活码
      setVip: false,
      //已激活
      Power: false,
      MemberName: "我的会员",
      value: "",
      //激活码
      Activation: "",
    };
  },
  created() {
    let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));
    if (VipInformation === null) {
      return false;
    }
    if (Object.keys(VipInformation.user_level).length === 0) {
      // 获取激活码
      this.getVip = true;
      // 马上激活码
      this.setVip = false;
      //已激活
      this.Power = false;
      return false;
    }
    if (VipInformation.user_level[0].type === "普通用户") {
      // 获取激活码
      this.getVip = true;
      // 马上激活码
      this.setVip = false;
      //已激活
      this.Power = false;
      return false;
    }
    if (VipInformation.user_level[0].type === "vip用户") {
      // 获取激活码
      this.getVip = false;
      // 马上激活码
      this.setVip = false;
      //已激活
      this.Power = true;
      this.Exciting =
        VipInformation.user_level[0].pay_time !== ""
          ? VipInformation.user_level[0].pay_time
          : "暂无信息";
      this.stage =
        VipInformation.user_level[0].expire_date !== ""
          ? VipInformation.user_level[0].expire_date
          : "暂无信息";
      return false;
    }
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  mounted() {},
  methods: {
    //切换
    onClick(index, title) {
      if (index === 0) {
        console.log("Vip");
        console.log(title);
        return false;
      }
      if (index === 1) {
        console.log("一对一");
        console.log(title);
        return false;
      }
    },
    //获取激活码
    ongetActivation() {
      this.show = true;
      // 获取激活码
      this.getVip = false;
      // 马上激活码
      this.setVip = true;
      //已激活
      this.Power = false;
    },
    //激活Vip
    async onVIPAccount() {
      let VipInformation = JSON.parse(localStorage.getItem("UserInformation"));

      //未登录提示
      if (VipInformation === null) {
        Dialog.confirm({
          title: "登录",
          message: "请您先登录再激活",
          confirmButtonText: "去登录",
        })
          .then(() => {
            this.$router.push({
              path: "/Login",
            });
          })
          .catch(() => {
            // 获取激活码
            this.getVip = true;
            // 马上激活码
            this.setVip = false;
            //已激活
            this.Power = false;
          });
        return false;
      }
      //已登录
      console.log(this.Activation);
      if (this.Activation !== "") {
        try {
          let GetVipdata = await GetVip({
            body: {
              code: this.Activation,
              token: this.token,
            },
            params: {},
          });
          console.log(GetVipdata);
          console.log(GetVipdata.data.code);

          if (GetVipdata.data.code == 200) {
            let YesVip = JSON.parse(localStorage.getItem("UserInformation"));
            YesVip = {
              token: this.token,
              username: this.username,
              user_level: [...GetVipdata.data.data],
            };
            console.log(YesVip);
            Toast(GetVipdata.data.message);
            localStorage.setItem("UserInformation", YesVip);

            this.$store.commit("setUserInformation", YesVip);
            this.$router.go(0);
            // Toast(data.message);
            // 获取激活码
            this.getVip = false;
            // 马上激活码
            this.setVip = false;
            //已激活
            this.Power = true;
            this.$router.go();
            return false;
          }
        } catch (GetVipdata) {
          console.log(GetVipdata);
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

        // VipCode({
        //   code: this.Activation,
        //   token: this.token,
        // }).then((data) => {
        //   console.log(data);

        //   let YesVip = JSON.parse(localStorage.getItem("UserInformation"));
        //   if (data.code == 200) {
        //     console.log(data);
        //     YesVip = {
        //       token: this.token,
        //       username: this.username,
        //       user_level: [...data.data],
        //     };
        //     Toast(data.message);
        //     this.$store.commit("setUserInformation", YesVip);
        //     this.$router.go(0);
        //     Toast(data.message);
        //     // 获取激活码
        //     this.getVip = false;
        //     // 马上激活码
        //     this.setVip = false;
        //     //已激活
        //     this.Power = true;
        //     this.$router.go();
        //   } else if (data.code != 200) {
        //     // 获取激活码
        //     this.getVip = true;
        //     // 马上激活码
        //     this.setVip = false;
        //     //已激活
        //     this.Power = false;
        //     Toast("请输入效的激活码");
        //   }
        // });
      } else {
        Dialog.close;
        // 获取激活码
        this.getVip = true;
        // 马上激活码
        this.setVip = false;
        //已激活
        this.Power = false;
        Toast("请输入激活码");
      }
    },
  },
  components: {
    Tab,
  },
};
</script>
<style lang="less">
.Member {
  // height: 100vh;
  // height: 1000px;
  background: #fff;
  .process {
    font-size: 20px !important;
    margin: 10px auto;
    text-align: center;
  }
  .VipBackground {
    margin: auto;
    width: 375px;
    // background: pink;
    position: relative;
    text-align: center;
    .van-image {
      margin: auto;
      width: 90%;
      vertical-align: bottom;
    }

    .Vipprocess {
      margin: 10px 0;
      border: 1px solid #c3c3cc;
    }
    .VipLocation {
      width: 90%;
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
      .van-button {
        text-align: center;
        height: 28px;
        line-height: 28px;
        border-radius: 20px;
        border: 1px solid #c3c3c3;
      }
      .van-field {
        width: 80%;
        padding: 0 0 0 10px;
        margin: 0 auto;
        opacity: 0.8;
        input {
          padding: 0;
          margin: 0;
          text-align: center;
        }
        .van-button {
          border-radius: 0;
          // padding: 0;
          // margin: 0;
        }
      }
    }
  }
  .van-collapse-item__wrapper {
    .van-collapse-item__content {
      // background-color: #4d4949 !important;
    }
    background-color: #eff0f5 !important;
  }
  .Editcontent {
    margin: 10px 10px 0 10px;
    border-radius: 10px;
    box-shadow: -1px -1px 6px #a0bfd8 !important;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    background: #fff;

    .Edl {
      text-align: right;
      color: rgb(53, 47, 53, 0.1);
    }
    .Ed {
      color: #9b9292;
      text-align: right;
      // background: #f5f2f2;
      height: 20px;
      line-height: 20px;
    }
  }

  .VIPAccount {
    width: 90%;
    margin: auto;
    text-align: center;
    color: #2196f3;
    // padding: 40px 20px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #00bcd4 20%, #b2ebf2);
    .MyLoginimg {
      // opacity: 0;
      // width: 100%;
      // height: 60px;
      background-color: pink;
      border: 1px solid #fff;
    }
    .Mylabel {
      top: 50%;
      font-size: 18px;
      color: #fff;
    }
    .Mybut {
      padding: 10px;
      height: 24px;
      line-height: 24px;
      border-radius: 50px;

      border: 1px solid #fff;
      // background: #00BCD4;
    }
    .van-cell {
      opacity: 0.9;
      padding: 0;
      border-radius: 4px;
      input {
        opacity: 0.7;
        padding: 0 0 0 10px;
      }
    }
  }
  .Diatit {
    color: rgb(236, 60, 60);
  }
  .DivDialog {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    .van-image {
      margin: 10px;
    }
    .Dia {
      padding: 10px;
      text-indent: 10px;

      color: #adadb1;
    }
  }
  .Span {
    color: rgb(252, 67, 67);
    padding-right: 10px;
  }
  .tit {
    font-size: 16px;
  }
  .Label {
    font-size: 14px;
  }
  .onetit {
    font-size: 16px;
  }
  .oneLabel {
    font-size: 14px;
  }

  .red {
    color: rgb(252, 67, 67);
  }
}
</style>
