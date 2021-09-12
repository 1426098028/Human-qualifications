<template>
  <keep-alive>
    <div>
      <van-sticky>
        <van-nav-bar
          title="MBTI职业性格测评"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
        <van-tabs v-model="switch_value" @click="switch_change">
          <van-tab title="精简版" name="false"></van-tab>
          <van-tab title="详细版" name="true"></van-tab>
          <!-- <van-tab title="详细版" badge="Vip" name="true"></van-tab> -->
        </van-tabs>
      </van-sticky>
      <div class="content display">
        <el-card class="box-card" v-for="(item, index) in detail" :key="index">
          <div slot="header" class="clearfix">
            <div class="questionTitle">
              <span style="color: #f56c6c">
                <span v-if="item.must">*</span>
                <span v-else>&nbsp;</span>
              </span>
              {{ index + 1 + " " + item.title }}
            </div>
          </div>
          <div
            class="text item"
            v-if="item.type == 'radio'"
            v-for="(optionItem, index) in item.options"
            :key="index"
          >
            <el-radio
              v-model="item.radioValue"
              :label="optionItem.code"
              style="margin: 5px"
            >
              <div
                v-if="optionItem.title.indexOf('|') != -1"
                v-for="(item, index) in optionItem.title.split('|')"
                :key="index"
              >
                <p>{{ item }}</p>
                <br />
              </div>
              <span v-else>
                {{ optionItem.title }}
              </span>
            </el-radio>
          </div>
        </el-card>
        <el-button
          type="primary"
          style="margin: 5px"
          @click="submit"
          :loading="submitLoading"
        >
          {{ submitText }}
        </el-button>
      </div>
      <van-cell><div class="cellsssss"></div></van-cell>
    </div>
  </keep-alive>
</template>
<script>
import { mapState } from "vuex";
import { MbtiOpera } from "@/api/api";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      switch_value: 0,
      // switch_value: false,
      dialogShow: false,
      dialogTitle: "",
      dialogType: 1, //1添加 2修改
      oldItem: null, //编辑中问题的对象
      willAddQuestion: {
        type: "",
        title: "",
        options: [""],
        text: "",
        row: 1,
      },
      code: "",
      mbti_code: {
        E: 1,
        I: 1,
        S: 1,
        N: 1,
        T: 1,
        F: 1,
        J: 1,
        P: 1,
      },
      // title: "MBTI职业性格测评",
      title: "",
      desc: `
        <strong style="color: red">登录后可以保存测评结果</strong>
        <p>1、参加测试的人员请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。</p>
        <p>2、《性格分析报告》展示的是你的性格倾向，而不是你的知识、技能、经验。</p>
        <p>3、MBTI提供的性格类型描述仅供测试者确定自己的性格类型之用，性格类型没有好坏，只有不同。每一种性格特征都有其价值和优点，也有缺点和需要注意的地方。清楚地了解自己的性格优劣势，有利于更好地发挥自己的特长，而尽可能的在为人处事中避免自己性格中的劣势，更好地和他人相处，更好地作重要的决策。</p>
        <p>4、本测试分为四部分，共93题；需时约18分钟。所有题目没有对错之分，请根据自己的实际情况选择</p>
      `,
      // desc: `
      //   <strong style="color: red">登录后可以保存测评结果</strong>
      //   <p>1、参加测试的人员请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。</p>
      //   <p>2、《性格分析报告》展示的是你的性格倾向，而不是你的知识、技能、经验。</p>
      //   <p>3、MBTI提供的性格类型描述仅供测试者确定自己的性格类型之用，性格类型没有好坏，只有不同。每一种性格特征都有其价值和优点，也有缺点和需要注意的地方。清楚地了解自己的性格优劣势，有利于更好地发挥自己的特长，而尽可能的在为人处事中避免自己性格中的劣势，更好地和他人相处，更好地作重要的决策。</p>
      //   <p>4、本测试分为四部分，共93题；需时约18分钟。所有题目没有对错之分，请根据自己的实际情况选择</p>
      // `,
      detail: [
        {
          title: "我更倾向于：",
          type: "radio",
          must: true,
          radioValue: "",
          options: [
            {
              title:
                "与他人相处时精力充沛 | 喜欢边想边说出声 | 说的多于听的 | 高度热情地社交 | 反应快，喜欢快节奏",
              code: "E",
            },
            {
              title:
                "独处时精力充沛 | 在心中思考问题 | 听的比说的多 | 不把兴奋说出来 | 仔细考虑后，才有所反应",
              code: "I",
            },
          ],
        },
        {
          title: "我更倾向于：",
          type: "radio",
          must: true,
          radioValue: "",
          options: [
            {
              title:
                "相信确定和有形的东西 | " +
                "对概念和理论兴趣不大 | " +
                "重视现实性和常情 | " +
                "循序渐进地讲述有关情况 | " +
                "着眼于现实 | ",
              code: "S",
            },
            {
              title:
                "相信灵感或推理 | " +
                "对概念和理论感兴趣 | " +
                "重视可能性和独创性 | " +
                "跳跃性地展现事实 | " +
                "着眼于未来，留意事物的变化趋势 | ",
              code: "N",
            },
          ],
        },
        {
          title: "我更倾向于：",
          type: "radio",
          must: true,
          radioValue: "",
          options: [
            {
              title:
                "对问题进行客观的、非个人立场的分析 | " +
                "重视符合逻辑、公正、公平的价值；一视同仁 | " +
                "被认为冷酷、麻木、漠不关心 | " +
                "被“获取成就”所激励 | " +
                "很自然地看到缺点，倾向于批评 | ",
              code: "T",
            },
            {
              title:
                "考虑行为对他人的影响 | " +
                "重视同情与和睦：重视准则的例外性 | " +
                "被认为感情过多，缺少逻辑性，软弱 | " +
                "被“获得欣赏”所激励 | " +
                "惯于迎合他人，着重维护人脉资源 | ",
              code: "F",
            },
          ],
        },
        {
          title: "我更倾向于：",
          type: "radio",
          must: true,
          radioValue: "",
          options: [
            {
              title:
                "做了决定后最为高兴 | " +
                "建立目标，准时地完成 | " +
                "着重结果（重点在于完成任务） | " +
                "满足感来源于完成计划 | ",
              code: "J",
            },
            {
              title:
                "当各种选择都存在时，感到高兴 | " +
                "随着新信息的获取，不断改变目标 | " +
                "着重过程（重点在于如何完成工作） | " +
                "满足感来源于计划的开始 | ",
              code: "P",
            },
          ],
        },
      ],
      startTimestamp: 0, //填写问卷开始时间戳 毫秒
      submitLoading: false, //提交按钮 加载中状态
      submitText: "提交", //提交按钮文字
    };
  },

  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },

  mounted() {
    sessionStorage.getItem("username");
    // this.token = sessionStorage.getItem("token");
    this.sign = sessionStorage.getItem("sign");
    console.log(this.token, this.sign);
    Dialog.confirm({
      title: "MBTI测试前须知",
      message: this.desc,
      confirmButtonText: "登录测评",
      cancelButtonText: "免登录测评",
    })
      .then(() => {
        console.log(this.username);
        // if (sessionStorage.getItem("username") == null) {
        if (this.username == null) {
          this.$router.push({ path: "/Login" });
        } else {
          Toast("你已经登录了");
        }
      })
      .catch(() => {
        Toast("请按实际情况作答");
      });
  },

  methods: {
    // 专业版本题目测试切换
    switch_change(e) {
      let Newswitch_value = String(this.switch_value);
      // if (Number(Newswitch_value) === 0) {
      if (Newswitch_value === "true") {
        if (this.username !== null && this.username !== undefined) {
          console.log("vip");
          //专业
          // if (Number(Newswitch_value) === 0) {
          if (Newswitch_value === "true") {
            this.detail = [
              {
                title: "当你要外出一整天，你会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "计划你要做什么和在什么时候做",
                    code: "J",
                  },
                  {
                    title: "说去就去",
                    code: "P",
                  },
                ],
              },

              {
                title: "你认为自己是一个",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "较为随兴所至的人",
                    code: "P",
                  },
                  {
                    title: "较为有条理的人",
                    code: "J",
                  },
                ],
              },

              {
                title: "假如你是一位老师，你会选教",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "以事实为主的课程",
                    code: "S",
                  },
                  {
                    title: "涉及理论的课程",
                    code: "N",
                  },
                ],
              },

              {
                title: "你通常",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "与人容易混熟",
                    code: "E",
                  },
                  {
                    title: "比较沉静或矜持",
                    code: "I",
                  },
                ],
              },

              {
                title: "一般来说，你和哪些人比较合得来？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "富于想象力的人",
                    code: "N",
                  },
                  {
                    title: "现实的人",
                    code: "S",
                  },
                ],
              },

              {
                title: "你是否经常让",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "你的情感支配你的理智",
                    code: "F",
                  },
                  {
                    title: "你的理智主宰你的情感",
                    code: "T",
                  },
                ],
              },

              {
                title: "处理许多事情上，你会喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "凭兴所至行事",
                    code: "P",
                  },
                  {
                    title: "按照计划行事",
                    code: "J",
                  },
                ],
              },

              {
                title: "你是否",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "容易让人了解",
                    code: "E",
                  },
                  {
                    title: "难于让人了解",
                    code: "I",
                  },
                ],
              },

              {
                title: "按照程序表做事， ",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "合你心意",
                    code: "J",
                  },
                  {
                    title: "令你感到束缚",
                    code: "P",
                  },
                ],
              },

              {
                title: "当你有一份特别的任务，你会喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "开始前小心组织计划",
                    code: "J",
                  },
                  {
                    title: "边做边找须做什么",
                    code: "P",
                  },
                ],
              },

              {
                title: "在大多数情况下，你会选择",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "顺其自然",
                    code: "P",
                  },
                  {
                    title: "按程序表做事",
                    code: "J",
                  },
                ],
              },

              {
                title: "大多数人会说你是一个",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "重视自我隐私的人",
                    code: "I",
                  },
                  {
                    title: "非常坦率开放的人",
                    code: "E",
                  },
                ],
              },

              {
                title: "你宁愿被人认为是一个",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "实事求是的人",
                    code: "S",
                  },
                  {
                    title: "机灵的人",
                    code: "N",
                  },
                ],
              },

              {
                title: "在一大群人当中，通常是",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "你介绍大家认识",
                    code: "E",
                  },
                  {
                    title: "别人介绍你",
                    code: "I",
                  },
                ],
              },

              {
                title: "你会跟哪些人做朋友？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "常提出新注意的",
                    code: "N",
                  },
                  {
                    title: "脚踏实地的",
                    code: "S",
                  },
                ],
              },

              {
                title: "你倾向",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "重视感情多于逻辑，",
                    code: "F",
                  },
                  {
                    title: "重视逻辑多于感情",
                    code: "T",
                  },
                ],
              },

              {
                title: "你比较喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "坐观事情发展才作计划",
                    code: "P",
                  },
                  {
                    title: "很早就作计划",
                    code: "J",
                  },
                ],
              },

              {
                title: "你喜欢花很多的时间",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "一个人独处",
                    code: "I",
                  },
                  {
                    title: "合别人在一起",
                    code: "E",
                  },
                ],
              },

              {
                title: "与很多人一起会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "令你活力培增，",
                    code: "E",
                  },
                  {
                    title: "常常令你心力憔悴",
                    code: "I",
                  },
                ],
              },

              {
                title: "你比较喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "很早便把约会、社交聚集等事情安排妥当，",
                    code: "J",
                  },
                  {
                    title: "无拘无束，看当时有什么好玩就做什么",
                    code: "P",
                  },
                ],
              },

              {
                title: "计划一个旅程时，你较喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "大部分的时间都是跟当天的感觉行事，",
                    code: "P",
                  },
                  {
                    title: "事先知道大部分的日子会做什么",
                    code: "J",
                  },
                ],
              },

              {
                title: "在社交聚会中，你",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "有时感到郁闷",
                    code: "I",
                  },
                  {
                    title: "常常乐在其中",
                    code: "E",
                  },
                ],
              },

              {
                title: "你通常",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "和别人容易混熟",
                    code: "E",
                  },
                  {
                    title: "趋向自处一隅",
                    code: "I",
                  },
                ],
              },

              {
                title: "哪些人会更吸引你？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: " 一个思想敏捷及非常聪颖的人，",
                    code: "N",
                  },
                  {
                    title: "实事求是，具丰富常识的人",
                    code: "S",
                  },
                ],
              },

              {
                title: "在日常工作中，你会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "颇为喜欢处理迫使你分秒必争的突发",
                    code: "P",
                  },
                  {
                    title: "通常预先计划，以免要在压力下工作",
                    code: "J",
                  },
                ],
              },

              {
                title: "你认为别人一般",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "要花很长时间才认识你",
                    code: "I",
                  },
                  {
                    title: "用很短的时间便认识你",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "注重隐私",
                    code: "I",
                  },
                  {
                    title: "坦率开放",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "预先安排的",
                    code: "J",
                  },
                  {
                    title: "无计划的",
                    code: "P",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "抽象",
                    code: "N",
                  },
                  {
                    title: "具体",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "温柔",
                    code: "F",
                  },
                  {
                    title: "坚定",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "思考",
                    code: "T",
                  },
                  {
                    title: "感受",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "事实",
                    code: "S",
                  },
                  {
                    title: "意念",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "冲动 ",
                    code: "P",
                  },
                  {
                    title: "决定",
                    code: "J",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "热衷",
                    code: "E",
                  },
                  {
                    title: "文静",
                    code: "I",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "文静",
                    code: "I",
                  },
                  {
                    title: "外向",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "有系统",
                    code: "J",
                  },
                  {
                    title: "随意",
                    code: "P",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "理论",
                    code: "N",
                  },
                  {
                    title: "肯定",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "敏感",
                    code: "F",
                  },
                  {
                    title: "公正",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "令人信服",
                    code: "T",
                  },
                  {
                    title: "感人的",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "声明 ",
                    code: "S",
                  },
                  {
                    title: "概念",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "不受约束",
                    code: "P",
                  },
                  {
                    title: "预先安排",
                    code: "J",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "矜持 ",
                    code: "I",
                  },
                  {
                    title: "健谈",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "有条不紊",
                    code: "J",
                  },
                  {
                    title: "不拘小节",
                    code: "P",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "意念 ",
                    code: "N",
                  },
                  {
                    title: "实况",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "同情怜悯",
                    code: "F",
                  },
                  {
                    title: "远见",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "利益",
                    code: "T",
                  },
                  {
                    title: "祝福",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "理论的",
                    code: "S",
                  },
                  {
                    title: "远见",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "朋友不多",
                    code: "I",
                  },
                  {
                    title: "朋友众多",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "有系统",
                    code: "J",
                  },
                  {
                    title: "即兴",
                    code: "P",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "富想象的 ",
                    code: "N",
                  },
                  {
                    title: "以事论事",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "亲切的 ",
                    code: "F",
                  },
                  {
                    title: "客观的",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "客观的  ",
                    code: "T",
                  },
                  {
                    title: "热情的",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "建造  ",
                    code: "S",
                  },
                  {
                    title: "发明",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "文静  ",
                    code: "I",
                  },
                  {
                    title: "爱合群",
                    code: "E",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "理论 ",
                    code: "N",
                  },
                  {
                    title: "事实",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "富同情 ",
                    code: "F",
                  },
                  {
                    title: "合逻辑",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "具分析力 ",
                    code: "T",
                  },
                  {
                    title: "多愁善感",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "合情合理 ",
                    code: "S",
                  },
                  {
                    title: "令人着迷",
                    code: "N",
                  },
                ],
              },

              {
                title: "当你要在一个星期内完成一个大项目，你在开始的时候会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "把要做的不同工作依次列出 ",
                    code: "J",
                  },
                  {
                    title: "马上动工",
                    code: "P",
                  },
                ],
              },

              {
                title: "在社交场合中，你经常会感到",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "与某些人很难打开话匣儿和保持对话",
                    code: "I",
                  },
                  {
                    title: "与多数人都能从容地长谈",
                    code: "E",
                  },
                ],
              },

              {
                title: "要做许多人也做的事，你比较喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "按照一般认可的方法去做 ",
                    code: "S",
                  },
                  {
                    title: ".构想一个自己的想法",
                    code: "N",
                  },
                ],
              },

              {
                title: "你刚认识的朋友能否说出你的兴趣？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "马上可以, ",
                    code: "E",
                  },
                  {
                    title: "要待他们真正了解你之后才可以",
                    code: "I",
                  },
                ],
              },

              {
                title: "你通常较喜欢的科目是",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "讲授概念和原则的 ",
                    code: "N",
                  },
                  {
                    title: ".讲授事实和数据的",
                    code: "S",
                  },
                ],
              },

              {
                title: "哪个是较高的赞誉，或称许为？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "一贯感性的人 ",
                    code: "F",
                  },
                  {
                    title: "一贯理性的人",
                    code: "T",
                  },
                ],
              },

              {
                title: "你认为按照程序表做事",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "有时是需要的，但一般来说你不大喜欢这样做，或是",
                    code: "P",
                  },
                  {
                    title: "大多数情况下是有帮助而且是你喜欢做的",
                    code: "J",
                  },
                ],
              },

              {
                title: "和一群人在一起，你通常会选",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "跟你很熟悉的个别人谈话 ",
                    code: "I",
                  },
                  {
                    title: "参与大伙的谈话",
                    code: "E",
                  },
                ],
              },

              {
                title: "在社交聚会上，你会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: ".是说话很多的一个 ",
                    code: "E",
                  },
                  {
                    title: "让别人多说话",
                    code: "I",
                  },
                ],
              },

              {
                title: "把周末期间要完成的事列成清单，这个主意会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "合你意 ",
                    code: "J",
                  },
                  {
                    title: "使你提不起劲",
                    code: "P",
                  },
                ],
              },

              {
                title: "哪个是较高的赞誉，或称许为",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "能干的 ",
                    code: "T",
                  },
                  {
                    title: "富有同情心",
                    code: "F",
                  },
                ],
              },

              {
                title: "你通常喜欢",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "事先安排你的社交约会 ",
                    code: "J",
                  },
                  {
                    title: "随兴之所至做事",
                    code: "P",
                  },
                ],
              },

              {
                title: "总的说来，要做一个大型作业时，你会选",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "边做边想该做什么 ",
                    code: "P",
                  },
                  {
                    title: "首先把工作按步细分",
                    code: "J",
                  },
                ],
              },

              {
                title: "你能否滔滔不绝地与人聊天",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "只限于跟你有共同兴趣的人 ",
                    code: "I",
                  },
                  {
                    title: ".几乎跟任何人都可以",
                    code: "E",
                  },
                ],
              },

              {
                title: "你会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "跟随一些证明有效的方法，或是 ",
                    code: "S",
                  },
                  {
                    title: "..分析还有什么毛病，及针对尚未解决的难题",
                    code: "N",
                  },
                ],
              },

              {
                title: "为乐趣而阅读时，你会",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "喜欢奇特或创新的表达方式 ",
                    code: "N",
                  },
                  {
                    title: ".喜欢作者直话直说",
                    code: "S",
                  },
                ],
              },

              {
                title: "你宁愿替哪一类上司（或者老师）工作？",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "天性淳良，但常常前后不一的， ",
                    code: "F",
                  },
                  {
                    title: ".言词尖锐但永远合乎逻辑的",
                    code: "T",
                  },
                ],
              },

              {
                title: "你做事多数是",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "按当天心情去做， ",
                    code: "P",
                  },
                  {
                    title: ".照拟好的程序表去做",
                    code: "J",
                  },
                ],
              },

              {
                title: "你是否",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "可以和任何人按需求从容地交谈，或是 ",
                    code: "E",
                  },
                  {
                    title: ".只是对某些人或在某种情况下才可以畅所欲言",
                    code: "I",
                  },
                ],
              },

              {
                title: "要作决定时，你认为比较重要的是",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "据事实衡量， ",
                    code: "T",
                  },
                  {
                    title: ".考虑他人的感受和意见",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "想象的 ",
                    code: "N",
                  },
                  {
                    title: ".真实的",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "仁慈慷慨的 ",
                    code: "F",
                  },
                  {
                    title: ".意志坚定的",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "公正的 ",
                    code: "T",
                  },
                  {
                    title: ".有关怀心",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "制作 ",
                    code: "S",
                  },
                  {
                    title: ".设计",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "可能性 ",
                    code: "N",
                  },
                  {
                    title: ".必然性",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "温柔 ",
                    code: "F",
                  },
                  {
                    title: ".力量",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "实际 ",
                    code: "T",
                  },
                  {
                    title: ".多愁善感",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "制造 ",
                    code: "S",
                  },
                  {
                    title: ".创造",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "新颖的 ",
                    code: "N",
                  },
                  {
                    title: ".已知的",
                    code: "S",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "同情 ",
                    code: "F",
                  },
                  {
                    title: ".分析",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "坚持己见 ",
                    code: "T",
                  },
                  {
                    title: ".温柔有爱心",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "具体的 ",
                    code: "S",
                  },
                  {
                    title: ".抽象的",
                    code: "N",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "全心投入 ",
                    code: "F",
                  },
                  {
                    title: ".有决心的",
                    code: "T",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "能干 ",
                    code: "T",
                  },
                  {
                    title: ".仁慈",
                    code: "F",
                  },
                ],
              },

              {
                title: "在下列每一对词语中，哪一个词语更合你心意",
                type: "radio",
                must: true,
                radioValue: "",
                options: [
                  {
                    title: "实际 ",
                    code: "S",
                  },
                  {
                    title: ".创新",
                    code: "N",
                  },
                ],
              },
            ];
          }
        } else {
          // Toast("请成为Vip用户才能使用专业版")
          Toast("请先登录");
        }
      } else {
        this.detail = [
          {
            title: "我更倾向于：",
            type: "radio",
            must: true,
            radioValue: "",
            options: [
              {
                title:
                  "与他人相处时精力充沛 | 喜欢边想边说出声 | 说的多于听的 | 高度热情地社交 | 反应快，喜欢快节奏",
                code: "E",
              },
              {
                title:
                  "独处时精力充沛 | 在心中思考问题 | 听的比说的多 | 不把兴奋说出来 | 仔细考虑后，才有所反应",
                code: "I",
              },
            ],
          },
          {
            title: "我更倾向于：",
            type: "radio",
            must: true,
            radioValue: "",
            options: [
              {
                title:
                  "相信确定和有形的东西 | " +
                  "对概念和理论兴趣不大 | " +
                  "重视现实性和常情 | " +
                  "循序渐进地讲述有关情况 | " +
                  "着眼于现实 | ",
                code: "S",
              },
              {
                title:
                  "相信灵感或推理 | " +
                  "对概念和理论感兴趣 | " +
                  "重视可能性和独创性 | " +
                  "跳跃性地展现事实 | " +
                  "着眼于未来，留意事物的变化趋势 | ",
                code: "N",
              },
            ],
          },
          {
            title: "我更倾向于：",
            type: "radio",
            must: true,
            radioValue: "",
            options: [
              {
                title:
                  "对问题进行客观的、非个人立场的分析 | " +
                  "重视符合逻辑、公正、公平的价值；一视同仁 | " +
                  "被认为冷酷、麻木、漠不关心 | " +
                  "被“获取成就”所激励 | " +
                  "很自然地看到缺点，倾向于批评 | ",
                code: "T",
              },
              {
                title:
                  "考虑行为对他人的影响 | " +
                  "重视同情与和睦：重视准则的例外性 | " +
                  "被认为感情过多，缺少逻辑性，软弱 | " +
                  "被“获得欣赏”所激励 | " +
                  "惯于迎合他人，着重维护人脉资源 | ",
                code: "F",
              },
            ],
          },
          {
            title: "我更倾向于：",
            type: "radio",
            must: true,
            radioValue: "",
            options: [
              {
                title:
                  "做了决定后最为高兴 | " +
                  "建立目标，准时地完成 | " +
                  "着重结果（重点在于完成任务） | " +
                  "满足感来源于完成计划 | ",
                code: "J",
              },
              {
                title:
                  "当各种选择都存在时，感到高兴 | " +
                  "随着新信息的获取，不断改变目标 | " +
                  "着重过程（重点在于如何完成工作） | " +
                  "满足感来源于计划的开始 | ",
                code: "P",
              },
            ],
          },
        ];
      }
    },
    // 获取当前时间
    getdate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + " 年 " + month + " 月 " + strDate + " 日 ";
      return currentdate;
    },
    //提交
    submit() {
      this.submitLoading = true;
      this.submitText = "提交中";
      let useTime = parseInt(
        (new Date().getTime() - this.startTimestamp) / 1000
      ); //填写问卷用时 秒
      // 统计答案
      let empty_answer = [];
      let index = 0;
      for (let item of this.detail) {
        index += 1;
        console.log("item", item);
        let code = item.radioValue;
        console.log("code", code);
        this.mbti_code[code] += 1;
        console.log("this.mbti_code0", this.mbti_code);
        // 记录没选题号
        if (code == "") {
          empty_answer.push(index);
        }
      }
      console.log("this.mbti_code1  ", this.mbti_code);

      if (empty_answer.length !== 0) {
        this.$alert(`${empty_answer}`, "请完成以下题目", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.submitLoading = false;
            this.submitText = "提交";
          },
        });

        return false;
      }

      // 转换百分比
      this.mbti_code.E = (
        (this.mbti_code.E / (this.mbti_code.E + this.mbti_code.I)) *
        100
      ).toFixed(0);
      this.mbti_code.I = (100 - this.mbti_code.E).toFixed(0);

      this.mbti_code.S = (
        (this.mbti_code.S / (this.mbti_code.S + this.mbti_code.N)) *
        100
      ).toFixed(0);
      this.mbti_code.N = (100 - this.mbti_code.S).toFixed(0);

      this.mbti_code.T = (
        (this.mbti_code.T / (this.mbti_code.T + this.mbti_code.F)) *
        100
      ).toFixed(0);
      this.mbti_code.F = (100 - this.mbti_code.T).toFixed(0);

      this.mbti_code.J = (
        (this.mbti_code.J / (this.mbti_code.J + this.mbti_code.P)) *
        100
      ).toFixed(0);
      this.mbti_code.P = (100 - this.mbti_code.J).toFixed(0);

      // 测评逻辑
      if (this.mbti_code.E <= this.mbti_code.I) {
        this.code += "I";
      } else {
        this.code += "E";
      }
      if (this.mbti_code.S <= this.mbti_code.N) {
        this.code += "N";
      } else {
        this.code += "S";
      }
      if (this.mbti_code.T <= this.mbti_code.F) {
        this.code += "F";
      } else {
        this.code += "T";
      }
      if (this.mbti_code.J <= this.mbti_code.P) {
        this.code += "P";
      } else {
        this.code += "J";
      }
      console.log("mbti_code", this.mbti_code);
      console.log(this.code);

      MbtiOpera({
        opera_type: "submit_wj",
        useTime: useTime,
        code: this.code,
        token: this.token || "",
        mbti_code: this.mbti_code,
        // username: sessionStorage.getItem("username") || "",
        username: this.username || "",
        // sign: sessionStorage.getItem("sign") || ""
      }).then((data) => {
        if (data.code == 200) {
          //提交成功
          let content = data.data;
          console.log(content);
          sessionStorage.setItem("mbti_code", JSON.stringify(this.mbti_code)); // 保存对象先转字符串
          sessionStorage.setItem("personality", content.personality);
          sessionStorage.setItem("features", content.features);
          sessionStorage.setItem("profession", content.profession);
          sessionStorage.setItem("complete_time", this.getdate());
          sessionStorage.setItem("code", this.code);
          sessionStorage.setItem("real_name", content.real_name || "未知");
          sessionStorage.setItem("telephone", content.telephone || "未知");
          this.submitLoading = false;
          this.submitText = "提交";
          this.$router.push({ path: "/EvaluationResults" });
        } else {
          this.submitLoading = false;
          this.submitText = "提交";
          this.$notify.error({
            title: "错误",
            message: data.message,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.display {
  text-align: center;
  padding: 10px;
}
.display .top {
  color: #606266;
  padding: 0 10px 10px 10px;
  border-bottom: 3px solid #409eff;
  font-size: 15px;
  line-height: 22px;
  text-align: left;
}
.display .content {
  width: 100%;
  max-width: 800px;
  display: inline-block;
  text-align: center;
}
.display .box-card {
  text-align: left;
  width: 100%;
  margin: 10px 0 10px 0;
}

.display .bottom {
  margin: 20px 10px 20px 10px;
  color: #909399;
}

.display a:link,
a:visited,
a:active {
  color: #909399;
  text-decoration: none;
}
.cellsssss {
  height: 100px;
}
</style>
