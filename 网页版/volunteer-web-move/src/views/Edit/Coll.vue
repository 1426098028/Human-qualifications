<template>
  <div class="Coll">
    <van-sticky>
      <van-nav-bar
        title="编辑资料"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>

    <!-- <van-form @submit="onSubmit"> -->
    <div class="Collh">
      <van-collapse v-model="activeName" accordion>
        <div class="cell-Line"></div>
        <van-collapse-item title="用户信息" name="1">
          <div class="Collcontent">
            <div class="Edl">昵称:</div>
            <div class="Ed">
              <van-field v-model="nickname" placeholder="请输入昵称" />
            </div>
            <!-- <div class="Ed">{{ nickname }}</div> -->
          </div>
          <div class="Collcontent">
            <div class="Edl">邮箱:</div>
            <div class="Ed">
              <van-field v-model="email" placeholder="请输入邮箱" />
            </div>
            <!-- <div class="Ed">{{ email }}</div> -->
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>

        <van-collapse-item title="个人信息" name="2">
          <div class="Collcontent">
            <div class="Edl">真实姓名:</div>
            <div class="Ed">
              <van-field
                :rules="[{ required: true, message: '请输入真实姓名' }]"
                maxlength="6"
                v-model="real_name"
                placeholder="请输入真实姓名"
              />
            </div>
            <!-- <div class="Ed">{{ real_name }}</div> -->
          </div>
          <div class="Collcontent">
            <div class="Edl">性别:</div>
            <div class="Ed">
              <van-radio-group
                v-model="radio"
                direction="horizontal"
                @change="onRadio"
              >
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </div>
            <!-- <div class="Ed">{{ gender }}</div> -->
          </div>
          <div class="Collcontent">
            <div class="Edl">手机号码:</div>
            <div class="Ed">
              <van-field v-model="telephone" placeholder="请输入手机号码" />
            </div>
            <!-- <div class="Ed">{{ telephone }}</div> -->
          </div>

          <div class="Collcontent">
            <div class="Edl">民族:</div>
            <div class="Ed">
              <van-field v-model="nationality" placeholder="请输入民族" />
            </div>
            <!-- <div class="Ed">{{ nationality }}</div> -->
          </div>
          <div class="Collcontent">
            <div class="Edl">出生日期:</div>
            <div class="Ed">
              <van-field v-model="birthday" placeholder="请输入出生日期" />
            </div>
            <!-- <div class="Ed">{{ birthday }}</div> -->
          </div>
          <div class="Collcontent">
            <div class="Edl">家庭地址:</div>
            <div class="Ed">
              <!-- <van-field v-model="adress" placeholder="请输入地址" /> -->

              <van-field
                readonly
                clickable
                name="area"
                :value="adress"
                :placeholder="pla"
                @click="showArea = true"
              />

              <van-popup v-model="showArea" position="bottom">
                <van-area
                  :area-list="areaList"
                  @confirm="onConfirm"
                  @cancel="showArea = false"
                />
              </van-popup>

              <!-- <van-area title="标题" :area-list="areaList.province_list" /> -->
            </div>
            <!-- <div class="Ed">{{ adress }}</div> -->
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>

        <van-collapse-item title="我的成绩" name="3">
          <div slot="default">
            <div class="Collcontent">
              <div>
                <van-dropdown-menu>
                  <van-dropdown-item
                    v-model="value"
                    @change="onChange"
                    :options="option"
                  />
                </van-dropdown-menu>
              </div>
            </div>
            <!-- <div class="Collcontent">
              <div class="Edl">科类:</div>
              <div class="Ed">{{ score_type }}</div>
            </div> -->
            <div class="Collcontent">
              <div class="Edl">综合分数:</div>

              <div class="Ed">
                <van-field v-model="score" placeholder="请输入综合分数" />
              </div>
              <!-- <div class="Ed">{{ score }}</div> -->
            </div>
            <div class="Collcontent">
              <div class="Edl">语文成绩:</div>
              <div class="Ed">
                <van-field v-model="yuwen" placeholder="请输入语文成绩" />
              </div>
              <!-- <div class="Ed">{{ yuwen }}</div> -->
            </div>
            <div class="Collcontent">
              <div class="Edl">数学成绩:</div>
              <div class="Ed">
                <van-field v-model="shuxue" placeholder="请输入数学成绩" />
              </div>
              <!-- <div class="Ed">{{ shuxue }}</div> -->
            </div>
            <div class="Collcontent">
              <div class="Edl">英语成绩:</div>
              <div class="Ed">
                <van-field v-model="yingyu" placeholder="请输入英语成绩" />
              </div>
              <!-- <div class="Ed">{{ yingyu }}</div> -->
            </div>
          </div>
        </van-collapse-item>
        <div class="cell-Line"></div>
        <div class="cell-Line"></div>

        <van-button type="info" @click="onValue" round block>
          提交资料
        </van-button>

        <div class="cell-Line"></div>
      </van-collapse>
    </div>
    <!-- </van-form> -->
  </div>
</template>
<script>
import { setItem, removeItem } from "@/utils/Storage.js";
import { Toast } from "vant";
import { setgetInformation } from "../../NewApi/Flymain";

// import { setgetInformation } from "@/api/api.js";
import { areaList } from "@vant/area-data";
import { mapState } from "vuex";
export default {
  name: "Coll",
  data() {
    return {
      FormAuthen: {
        real_name: [
          // { required: true, message: "请填写用户名" },
          {
            pattern: /^[A-Za-z0-9_]{2,5}$/,
            message: "请输入正确的名字",
          },
        ],
      },

      showArea: false,
      areaList: {}, // 数据格式见 Area 组件文档
      pla: "点击家庭地址",
      areaList: areaList,
      radio: "",
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
        { text: "科类选择", value: 0 },
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
    console.log(areaList.city_list);
    console.log(areaList.county_list);
    console.log(areaList.province_list);
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
    console.log();
    this.nickname =
      getInformation.data.data[0].nickname !== ""
        ? getInformation.data.data[0].nickname
        : "";
    this.gender =
      getInformation.data.data[0].gender !== ""
        ? getInformation.data.data[0].gender
        : "";
    this.email =
      getInformation.data.data[0].email !== ""
        ? getInformation.data.data[0].email
        : "";
    this.telephone =
      getInformation.data.data[0].telephone !== ""
        ? getInformation.data.data[0].telephone
        : "";
    this.real_name =
      getInformation.data.data[0].real_name !== ""
        ? getInformation.data.data[0].real_name
        : "";
    this.nationality =
      getInformation.data.data[0].nationality !== ""
        ? getInformation.data.data[0].nationality
        : "";
    this.birthday =
      getInformation.data.data[0].birthday !== ""
        ? getInformation.data.data[0].birthday
        : "";
    this.adress =
      getInformation.data.data[0].adress === "" || null
        ? getInformation.data.data[0].adress
        : "点击选择地址";
    this.pla =
      getInformation.data.data[0].adress === "" || null
        ? getInformation.data.data[0].adress
        : "";
    this.score_type =
      getInformation.data.data[0].score_type !== ""
        ? getInformation.data.data[0].score_type
        : "尚未选择科类";
    this.score =
      getInformation.data.data[0].score !== 0
        ? getInformation.data.data[0].score
        : "";
    this.yuwen =
      getInformation.data.data[0].yuwen !== 0
        ? getInformation.data.data[0].yuwen
        : "";
    this.shuxue =
      getInformation.data.data[0].shuxue !== 0
        ? getInformation.data.data[0].shuxue
        : "";
    this.yingyu =
      getInformation.data.data[0].yingyu !== 0
        ? getInformation.data.data[0].yingyu
        : "";
  },
  methods: {
    async onChange() {
      console.log(this.option[this.value].text);
      this.Families = this.option[this.value].text;
      console.log(this.value);
    },
    async onRadio(Event) {
      console.log(Event);
    },
    async onValue() {
      try {
        let setInformation = await setgetInformation({
          body: {
            gender: this.radio,
            nickname: this.nickname,
            email: this.email,
            telephone: this.telephone,
            real_name: this.real_name,
            nationality: this.nationality,
            birthday: this.birthday,
            adress: this.adress,
            score_type:
              this.option[this.value].text !== "科类选择"
                ? this.option[this.value].text
                : "",
            score: this.score,
            yuwen: this.yuwen,
            shuxue: this.shuxue,
            yingyu: this.yingyu,
            token: this.token,
          },
          params: {},
        });
        if (setInformation.data.code === 200) {
          Toast.success(setInformation.data.message);
          return false;
        }
      } catch (setInformation) {
        if (setInformation.data.code === 400) {
          Object.keys(setInformation.data.message).forEach((item, index) => {
            console.log(item);
            if (setInformation.data.message[item][0] === "输入整数。") {
              Toast.fail("分数请输入整数");
              return true;
            }
            if (setInformation.data.message[item][0] === "你太大了") {
              Toast.fail("单科成绩不能超过150分,综合分数不能成功300分");
              return true;
            }
            Toast.fail(setInformation.data.message[item][0]);
          });
        }
      }

      console.log(this.radio);
      console.log(this.nickname);
      console.log(this.gender);
      console.log(this.email);
      console.log(this.telephone);
      console.log(this.real_name);
      console.log(this.nationality);
      console.log(this.birthday);
      console.log(this.adress);
      console.log(this.option[this.value].text);
      console.log(this.score);
      console.log(this.yuwen);
      console.log(this.shuxue);
      console.log(this.yingyu);
    },

    onConfirm(values) {
      this.adress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
  },
};
</script>
<style lang="less">
.Coll {
  .van-collapse-item__wrapper {
    .van-collapse-item__content {
      background-color: #f8f8f8 !important;
    }
    background-color: #eff0f5 !important;
  }
  .Collcontent {
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
      .van-field {
        color: #9b9292;
        padding: 0;
      }
    }
  }
  .van-button {
    margin: auto;
    width: 90%;
  }
}
.Collh {
  height: 200%;
  .van-button {
    margin: 0 auto 100px auto;
  }
}
</style>
