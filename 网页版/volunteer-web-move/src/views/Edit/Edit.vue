<template>
  <div class="Edit">
    <van-sticky>
      <van-nav-bar
        title="用户信息"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <div>
      <van-collapse v-model="activeName" accordion>
        <div class="cell-Line"></div>

        <van-collapse-item title="用户信息" name="1">
          <div class="Editcontent">
            <div class="Edl">昵称:</div>
            <div class="Ed">{{ nickname }}</div>
          </div>
          <div class="Editcontent">
            <div class="Edl">邮箱:</div>
            <div class="Ed">{{ email }}</div>
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>

        <van-collapse-item title="个人信息" name="2">
          <div class="Editcontent">
            <div class="Edl">真实姓名:</div>
            <div class="Ed">{{ real_name }}</div>
          </div>
          <div class="Editcontent">
            <div class="Edl">性别:</div>
            <div class="Ed">{{ gender }}</div>
          </div>
          <div class="Editcontent">
            <div class="Edl">手机号码:</div>
            <div class="Ed">{{ telephone }}</div>
          </div>

          <div class="Editcontent">
            <div class="Edl">民族:</div>
            <div class="Ed">{{ nationality }}</div>
          </div>
          <div class="Editcontent">
            <div class="Edl">出生日期:</div>
            <div class="Ed">{{ birthday }}</div>
          </div>
          <div class="Editcontent">
            <div class="Edl">家庭地址:</div>
            <div class="Ed van-ellipsis">{{ adress }}</div>
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>

        <van-collapse-item title="我的成绩" name="3">
          <div slot="default">
            <!-- <div class="Editcontent">
              <div>
                <van-dropdown-menu>
                  <van-dropdown-item
                    v-model="value"
                    @change="onChange"
                    :options="option"
                  />
                </van-dropdown-menu>
              </div>
            </div> -->
            <div class="Editcontent">
              <div class="Edl">科类:</div>
              <div class="Ed">{{ score_type }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">综合分数:</div>
              <div class="Ed">{{ score }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">语文成绩:</div>
              <div class="Ed">{{ yuwen }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">数学成绩:</div>
              <div class="Ed">{{ shuxue }}</div>
            </div>
            <div class="Editcontent">
              <div class="Edl">英语成绩:</div>
              <div class="Ed">{{ yingyu }}</div>
            </div>
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import { setgetInformation } from "../../NewApi/Flymain";
import { setItem, removeItem } from "@/utils/Storage.js";

// import { setgetInformation } from "@/api/api.js";

import { mapState } from "vuex";
export default {
  name: "Edit",
  data() {
    return {
      activeName: "1",
      nickname: "", //昵称
      gender: "", //性别
      email: "", //邮箱
      telephone: "", //手机号码
      real_name: "", //真实姓名
      nationality: "", //民族
      birthday: "", //出生日期
      adress: "", //家庭地址
      score_type: "", //科类
      score: "", //综合分数
      yuwen: "", //语文成绩
      shuxue: "", //数学成绩
      yingyu: "", //英语成绩
      value: 0,
      option: [
        { text: "科类", value: 0 },
        { text: "文科", value: 1 },
        { text: "理科", value: 2 },
        { text: "综合改革", value: 3 },
      ],
    };
  },

  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  async created() {
    let getInformation = await setgetInformation({
      body: {
        token: this.token,
      },
      params: {},
    });
    console.log(
      "getInformation-----------------------",
      getInformation.data.data[0]
    );
    console.log(getInformation.data.data[0].adress);
    this.nickname =
      getInformation.data.data[0].nickname !== ""
        ? getInformation.data.data[0].nickname
        : "暂无信息";
    this.gender =
      getInformation.data.data[0].gender !== ""
        ? getInformation.data.data[0].gender
        : "暂无信息";
    this.email =
      getInformation.data.data[0].email !== ""
        ? getInformation.data.data[0].email
        : "暂无信息";
    this.telephone =
      getInformation.data.data[0].telephone !== ""
        ? getInformation.data.data[0].telephone
        : "暂无信息";
    this.real_name =
      getInformation.data.data[0].real_name !== ""
        ? getInformation.data.data[0].real_name
        : "暂无信息";
    this.nationality =
      getInformation.data.data[0].nationality !== ""
        ? getInformation.data.data[0].nationality
        : "暂无信息";
    this.birthday =
      getInformation.data.data[0].birthday !== ""
        ? getInformation.data.data[0].birthday
        : "暂无信息";
    this.adress =
      getInformation.data.data[0].adress === null ||
      getInformation.data.data[0].adress === "" ||
      getInformation.data.data[0].adress === "点击选择地址"
        ? "暂无信息"
        : getInformation.data.data[0].adress;
    this.score_type =
      getInformation.data.data[0].score_type !== ""
        ? getInformation.data.data[0].score_type
        : "尚未选择科类";
    this.score =
      getInformation.data.data[0].score !== 0
        ? getInformation.data.data[0].score
        : "暂无分数";
    this.yuwen =
      getInformation.data.data[0].yuwen !== 0
        ? getInformation.data.data[0].yuwen
        : "暂无分数";
    this.shuxue =
      getInformation.data.data[0].shuxue !== 0
        ? getInformation.data.data[0].shuxue
        : "暂无分数";
    this.yingyu =
      getInformation.data.data[0].yingyu !== 0
        ? getInformation.data.data[0].yingyu
        : "暂无分数";
  },
  methods: {
    async onChange() {
      console.log(this.option[this.value].text);
      this.Families = this.option[this.value].text;
      console.log(this.value);
    },
  },
};
</script>
<style lang="less">
.Edit {
  .van-collapse-item__wrapper {
    .van-collapse-item__content {
      background-color: #f8f8f8 !important;
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
    .van-dropdown-menu__bar {
      box-shadow: none;
      height: 30px;
      margin: 10px 10px 0 10px;
    }
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
      max-width: 200px;
    }
  }
}
</style>
