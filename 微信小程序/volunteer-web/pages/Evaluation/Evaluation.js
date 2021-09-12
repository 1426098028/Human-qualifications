// import subjectdata from '../../Json/subject.json';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
const { AddEvaluation } = require('../../utils/Api/config/Flymain-wx.js')
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //切换
    active: 0,
    LeftValue: '精简版',
    RightValue: '详细版',
    // 每个答案
    Answer: [],
    //简单题目
    Lite: [
      {
        "subjectTopic": "我更倾向于",
        "answer": {
          "A": `
          <p>与他人相处时精力充沛</p>
          <p>喜欢边想边说出声</p>
          <p>说的多于听的</p>
          <p>高度热情地社交</p>
          <p>反应快，喜欢快节奏</p>
          `,
          "B": `
          <p>独处时精力充沛</p>
          <p>在心中思考问题</p>
          <p>听的比说的多</p>
          <p>不把兴奋说出来</p>
          <p>仔细考虑后，才有所反应</p>
          `,
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "我更倾向于",
        "answer": {
          "A": `
          <p>相信确定和有形的东西</p>
          <p>对概念和理论兴趣不大，除非它们有着实际的效用</p>
          <p>重视现实性和常情</p>
          <p>循序渐进地讲述有关情况</p>
          <p>着眼于现实</p>
          `,
          "B": `
          <p>相信灵感或推理</p>
          <p>对概念和理论感兴趣</p>
          <p>重视可能性和独创性</p>
          <p>跳跃性地展现事实</p>
          <p>着眼于未来，留意事物的变化趋势，惯于从长远角度看待事物</p>
          `,
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "我更倾向于",
        "answer": {
          "A": `
          <p>对问题进行客观的、非个人立场的分析</p>
          <p>重视符合逻辑、公正、公平的价值；一视同仁</p>
          <p>被“获取成就”所激励</p>
          <p>被认为冷酷、麻木、漠不关心</p>
          <p>很自然地看到缺点，倾向于批评</p>
          `,
          "B": `
          <p>考虑行为对他人的影响</p>
          <p>重视同情与和睦：重视准则的例外性</p>
          <p>被认为感情过多，缺少逻辑性，软弱</p>
          <p>被“获得欣赏”所激励</p>
          <p>惯于迎合他人，着重维护人脉资源</p>
          `,
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "我更倾向于",
        "answer": {
          "A": `
          <p>做了决定后最为高兴</p>
          <p>有“工作原则”：工作第一，玩其次（如果有时间的话）</p>
          <p>建立目标，准时地完成</p>
          <p>着重结果（重点在于完成任务）</p>
          <p>满足感来源于完成计划</p>
          `,
          "B": `
          <p>当各种选择都存在时，感到高兴</p>
          <p>有“玩的原则”：现在享受，然后再完成工作（如果有时间的话）</p>
          <p>随着新信息的获取，不断改变目标</p>
          <p>着重过程（重点在于如何完成工作）</p>
          <p>满足感来源于计划的开始</p>
          `,
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
    ],
    // 困难题目 
    Detailed: [
      {
        "subjectTopic": "当你要外出一整天，你会",
        "answer": {
          "A": "计划你要做什么和在什么时候做",
          "B": "说去就去",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "你认为自己是一个",
        "answer": {
          "A": "较为随兴所至的人",
          "B": "较为有条理的人",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "假如你是一位老师，你会选教",
        "answer": {
          "A": "以事实为主的课程",
          "B": "涉及理论的课程",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你通常",
        "answer": {
          "A": "与人容易混熟",
          "B": "比较沉静或矜持",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "一般来说，你和哪些人比较合得来？",
        "answer": {
          "A": "富于想象力的人",
          "B": "现实的人",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你是否经常让",
        "answer": {
          "A": "你的情感支配你的理智",
          "B": "你的理智主宰你的情感",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "处理许多事情上，你会喜欢",
        "answer": {
          "A": "凭兴所至行事",
          "B": "按照计划行事",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "你是否",
        "answer": {
          "A": "容易让人了解",
          "B": "难于让人了解",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "按照程序表做事",
        "answer": {
          "A": "合你心意",
          "B": "令你感到束缚",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "当你有一份特别的任务，你会喜欢",
        "answer": {
          "A": "开始前小心组织计划",
          "B": "边做边找须做什么",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在大多数情况下，你会选择",
        "answer": {
          "A": "顺其自然",
          "B": "按程序表做事",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "大多数人会说你是一个",
        "answer": {
          "A": "重视自我隐私的人",
          "B": "非常坦率开放的人",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你宁愿被人认为是一个",
        "answer": {
          "A": "实事求是的人",
          "B": "机灵的人",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在一大群人当中，通常是",
        "answer": {
          "A": "你介绍大家认识",
          "B": "别人介绍你",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你会跟哪些人做朋友？",
        "answer": {
          "A": "常提出新注意的",
          "B": "脚踏实地的",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你倾向",
        "answer": {
          "A": "重视感情多于逻辑",
          "B": "重视逻辑多于感情",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你比较喜欢",
        "answer": {
          "A": "坐观事情发展才作计划",
          "B": "很早就作计划",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "你喜欢花很多的时间",
        "answer": {
          "A": "一个人独处",
          "B": "和别人在一起",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "与很多人一起会",
        "answer": {
          "A": "令你活力培增",
          "B": "常常令你心力憔悴",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你比较喜欢",
        "answer": {
          "A": "很早便把约会、社交聚集等事情安排妥当",
          "B": "无拘无束，看当时有什么好玩就做什么",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "计划一个旅程时，你较喜欢",
        "answer": {
          "A": "大部分的时间都是跟当天的感觉行事",
          "B": "事先知道大部分的日子会做什么",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "在社交聚会中，你",
        "answer": {
          "A": "有时感到郁闷",
          "B": "常常乐在其中",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你通常",
        "answer": {
          "A": "和别人容易混熟",
          "B": "趋向自处一隅",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "哪些人会更吸引你？",
        "answer": {
          "A": "一个思想敏捷及非常聪颖的人",
          "B": "实事求是，具丰富常识的人",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在日常工作中，你会",
        "answer": {
          "A": "颇为喜欢处理迫使你分秒必争的突发",
          "B": "通常预先计划，以免要在压力下工作",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "你认为别人一般",
        "answer": {
          "A": "要花很长时间才认识你",
          "B": "用很短的时间便认识你",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "注重隐私",
          "B": "坦率开放",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "预先安排的",
          "B": "无计划的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "抽象",
          "B": "具体",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "温柔",
          "B": "坚定",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "思考",
          "B": "感受",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "事实",
          "B": "意念",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "冲动",
          "B": "决定",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "热衷",
          "B": "文静",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "文静",
          "B": "外向",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "有系统",
          "B": "随意",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "理论",
          "B": "肯定",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "敏感",
          "B": "公正",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "令人信服",
          "B": "感人的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "声明",
          "B": "概念",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "不受约束",
          "B": "预先安排",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "矜持",
          "B": "健谈",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "有条不紊",
          "B": "不拘小节",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "意念",
          "B": "实况",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "同情怜悯",
          "B": "远见",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "利益",
          "B": "祝福",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "务实的",
          "B": "理论的",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "朋友不多",
          "B": "朋友众多",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "有系统",
          "B": "即兴",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "富想象的",
          "B": "以事论事",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "亲切的",
          "B": "客观的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "客观的",
          "B": "热情的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "建造",
          "B": "发明",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "文静",
          "B": "爱合群",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "理论",
          "B": "事实",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "富同情",
          "B": "合逻辑",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "具分析力",
          "B": "多愁善感",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "合情合理",
          "B": "令人着迷",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "当你要在一个星期内完成一个大项目，你在开始的时候会",
        "answer": {
          "A": "把要做的不同工作依次列出",
          "B": "马上动工",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "在社交场合中，你经常会感到",
        "answer": {
          "A": "与某些人很难打开话匣儿和保持对话",
          "B": "与多数人都能从容地长谈",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "要做许多人也做的事，你比较喜欢",
        "answer": {
          "A": "按照一般认可的方法去做",
          "B": "构想一个自己的想法",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你刚认识的朋友能否说出你的兴趣？",
        "answer": {
          "A": "马上可以",
          "B": "要待他们真正了解你之后才可以",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你通常较喜欢的科目是",
        "answer": {
          "A": "讲授概念和原则的",
          "B": "讲授事实和数据的",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "哪个是较高的赞誉，或称许为",
        "answer": {
          "A": "一贯感性的人",
          "B": "一贯理性的人",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你认为按照程序表做事",
        "answer": {
          "A": "有时是需要的，但一般来说你不大喜欢这样做",
          "B": "大多数情况下是有帮助而且是你喜欢做的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "和一群人在一起，你通常会选",
        "answer": {
          "A": "跟你很熟悉的个别人谈话",
          "B": "参与大伙的谈话",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在社交聚会上，你会",
        "answer": {
          "A": "是说话很多的一个",
          "B": "让别人多说话",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "把周末期间要完成的事列成清单，这个主意会",
        "answer": {
          "A": "合你意",
          "B": "使你提不起劲",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "哪个是较高的赞誉，或称许为",
        "answer": {
          "A": "能干的",
          "B": "富有同情心",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你通常喜欢",
        "answer": {
          "A": "事先安排你的社交约会",
          "B": "随兴之所至做事",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "A",
          "P": "B"
        }
      },
      {
        "subjectTopic": "总的说来，要做一个大型作业时，你会选",
        "answer": {
          "A": "边做边想该做什么",
          "B": "首先把工作按步细分",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "你能否滔滔不绝地与人聊天",
        "answer": {
          "A": "只限于跟你有共同兴趣的人",
          "B": "几乎跟任何人都可以",
          "E": "B",
          "I": "A",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你会",
        "answer": {
          "A": "跟随一些证明有效的方法",
          "B": "分析还有什么毛病，及针对尚未解决的难题",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "为乐趣而阅读时，你会",
        "answer": {
          "A": "喜欢奇特或创新的表达方式",
          "B": "喜欢作者直话直说",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你宁愿替哪一类上司（或者老师）工作？",
        "answer": {
          "A": "天性淳良，但常常前后不一的",
          "B": "言词尖锐但永远合乎逻辑的",
          "E": "",
          "I": "",
          "S": "",
          "N": "B",
          "T": "A",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "你做事多数是",
        "answer": {
          "A": "按当天心情去做",
          "B": "照拟好的程序表去做",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "B",
          "P": "A"
        }
      },
      {
        "subjectTopic": "你是否",
        "answer": {
          "A": "可以和任何人按需求从容地交谈",
          "B": "只是对某些人或在某种情况下才可以畅所欲言",
          "E": "A",
          "I": "B",
          "S": "",
          "N": "",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "要作决定时，你认为比较重要的是",
        "answer": {
          "A": "据事实衡量",
          "B": "考虑他人的感受和意见",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "想象的",
          "B": "真实的",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "仁慈慷慨的",
          "B": "意志坚定的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "公正的",
          "B": "有关怀心",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "制作",
          "B": "设计",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "可能性",
          "B": "必然性",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "温柔",
          "B": "力量",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "实际",
          "B": "多愁善感",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "制造",
          "B": "创造",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "新颖的",
          "B": "已知的",
          "E": "",
          "I": "",
          "S": "B",
          "N": "A",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "同情",
          "B": "分析",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "坚持己见",
          "B": "温柔有爱心",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "具体的",
          "B": "抽象的",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "全心投入",
          "B": "有决心的",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "B",
          "F": "A",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "能干",
          "B": "仁慈",
          "E": "",
          "I": "",
          "S": "",
          "N": "",
          "T": "A",
          "F": "B",
          "J": "",
          "P": ""
        }
      },
      {
        "subjectTopic": "在下列每一对词语中，哪一个词语更合你心意？",
        "answer": {
          "A": "实际",
          "B": "创新",
          "E": "",
          "I": "",
          "S": "A",
          "N": "B",
          "T": "",
          "F": "",
          "J": "",
          "P": ""
        }
      }
    ],
    AllLiteAnswer: [],//保存简单答案
    AllDetailedAnswer: [],//保存困难答案
    LiteMBTIArr: [],//保存简单最后答案
    DetailedMBTIArr: [],//保存最后答案
    //分析答案   雷达图需要
    MBTI: {
      E: 1,
      I: 1,
      S: 1,
      N: 1,
      T: 1,
      F: 1,
      J: 1,
      P: 1
    },
    // 确定类型的规则
    Analysis: '',
    //记录没有做的题目
    Statistics: []
  },
  //切换模式
  onChangeTab(event) {
    // let that=this
    // wx.navigateTo({
    //   url: '/pages/Evaluation/Evaluation',
    // })
    // console.log(event)
    // console.log(event.detail.detail.index)
    // this.setData({
    //   Answer: [],
    //   Statistics: [],
    //   Analysis: "",
    //   AllLiteAnswer: [],//保存简单答案
    //   AllDetailedAnswer: [],//保存困难答案
    //   LiteMBTIArr: [],//保存简单最后答案
    //   DetailedMBTIArr: [],//保存最后答案
    // })
  },
  //简单选择答案
  onLite(event) {
    console.log(event.detail.value)
    console.log(event.currentTarget.dataset.index)
    //当前选择题目的答案
    console.log("当前选择题目的答案", this.data.Lite[event.currentTarget.dataset.index])
    console.log("当前选择题目的答案", this.data.Lite[event.currentTarget.dataset.index].answer)//进行遍历获取正确答案
    Object.keys(this.data.Lite[event.currentTarget.dataset.index].answer).length
    console.log(Object.keys(this.data.Lite[event.currentTarget.dataset.index].answer).length)
    Object.keys(this.data.Lite[event.currentTarget.dataset.index].answer).forEach((item, index) => {
      // console.log(item, index)
      console.log(this.data.Lite[event.currentTarget.dataset.index].answer[item] === event.detail.value)
      if (this.data.Lite[event.currentTarget.dataset.index].answer[item] === event.detail.value) {
        // console.log(this.data.Lite[event.currentTarget.dataset.index].answer[item])
        console.log(`当前选择题目的答案---${item}:${this.data.Lite[event.currentTarget.dataset.index].answer[item]}`)
        this.data.LiteMBTIArr[event.currentTarget.dataset.index] = item
      }
    })
    //保存答案
    this.data.AllLiteAnswer[event.currentTarget.dataset.index] = event.detail
    // console.log("全部已选择答案", this.data.AllLiteAnswer, this.data.Arr)
    // console.log("全部题目", this.data.Lite)
    //清空没有做的题目
    this.setData({
      Statistics: [],
      Analysis: "",
      MBTI: {
        E: 1,
        I: 1,
        S: 1,
        N: 1,
        T: 1,
        F: 1,
        J: 1,
        P: 1
      },//分析答案
    })
  },
  //简单提交答案
  async LiteCarry() {
    await this.setData({
      Statistics: [],
      Analysis: "",
      //要清空不然答不对
      MBTI: {
        E: 1,
        I: 1,
        S: 1,
        N: 1,
        T: 1,
        F: 1,
        J: 1,
        P: 1
      },
    })
    //记录没有做的题目
    for (const Liteindex in await this.data.Lite) {
      // console.log(this.data.LiteMBTIArr[Number(Liteindex)])
      if (this.data.LiteMBTIArr[Number(Liteindex)] === undefined) {
        this.setData({
          Statistics: this.data.Statistics.concat([Number(Liteindex)+1]),
        })
      }
    }

    //判断是否有没完成的题目
    if (this.data.Statistics.length !== 0) {
      Dialog.alert({
        title: '请完成以下题目',
        message: `${this.data.Statistics}`,
      }).then(() => {
        // on close
      });

      return false
    }


    //分析答题结果     评分规则
    await this.data.LiteMBTIArr.forEach((item, index) => {
      if (item === "E") { this.data.MBTI.E += 1 }
      if (item === "I") { this.data.MBTI.I += 1 }

      if (item === "S") { this.data.MBTI.S += 1 }
      if (item === "N") { this.data.MBTI.N += 1 }

      if (item === "T") { this.data.MBTI.T += 1 }
      if (item === "F") { this.data.MBTI.F += 1 }

      if (item === "J") { this.data.MBTI.J += 1 }
      if (item === "P") { this.data.MBTI.P += 1 }
    })
    console.log((this.data.MBTI.E / (this.data.MBTI.E + this.data.MBTI.I)) * 100)
    //     把得到的评分转换百分比----雷达图需要的
    this.data.MBTI.E = await ((this.data.MBTI.E / (this.data.MBTI.E + this.data.MBTI.I)) * 100).toFixed(0);
    this.data.MBTI.I = await (100 - this.data.MBTI.E).toFixed(0);

    this.data.MBTI.S = await ((this.data.MBTI.S / (this.data.MBTI.S + this.data.MBTI.N)) * 100).toFixed(0);
    this.data.MBTI.N = await (100 - this.data.MBTI.S).toFixed(0); 

    this.data.MBTI.T = await ((this.data.MBTI.T / (this.data.MBTI.T + this.data.MBTI.F)) * 100).toFixed(0);
    this.data.MBTI.F = await (100 - this.data.MBTI.T).toFixed(0);

    this.data.MBTI.J = await ((this.data.MBTI.J / (this.data.MBTI.J + this.data.MBTI.P)) * 100).toFixed(0);
    this.data.MBTI.P = await (100 - this.data.MBTI.J).toFixed(0);

    //    确定类型的规则  
    if (this.data.MBTI.E <= this.data.MBTI.I) { this.data.Analysis += "I"; } else { this.data.Analysis += "E"; }
    if (this.data.MBTI.S <= this.data.MBTI.N) { this.data.Analysis += "N"; } else { this.data.Analysis += "S"; }
    if (this.data.MBTI.T <= this.data.MBTI.F) { this.data.Analysis += "F"; } else { this.data.Analysis += "T"; }
    if (this.data.MBTI.J <= this.data.MBTI.P) { this.data.Analysis += "P"; } else { this.data.Analysis += "J"; }
    console.log("简单提交答案", this.data.AllLiteAnswer, this.data.LiteMBTIArr, this.data.MBTI, this.data.Analysis)
    // console.log("提交答案", this.data.AllLiteAnswer, this.data.LiteMBTIArr, this.data.Statistics)
    this.AddMBTI()
  },
  //困难选择答案
  onDetailed(event) {
    console.log(event.detail.value)
    console.log(event.currentTarget.dataset.index)
    //当前选择题目的答案
    console.log("当前选择题目的答案", this.data.Detailed[event.currentTarget.dataset.index])
    console.log("当前选择题目的答案", this.data.Detailed[event.currentTarget.dataset.index].answer)//进行遍历获取正确答案
    Object.keys(this.data.Detailed[event.currentTarget.dataset.index].answer).length
    console.log(Object.keys(this.data.Detailed[event.currentTarget.dataset.index].answer).length)
    Object.keys(this.data.Detailed[event.currentTarget.dataset.index].answer).forEach((item, index) => {
      // console.log(item, index)
      console.log(this.data.Detailed[event.currentTarget.dataset.index].answer[item] === event.detail.value)
      if (this.data.Detailed[event.currentTarget.dataset.index].answer[item] === event.detail.value) {

        // console.log(this.data.Detailed[event.currentTarget.dataset.index].answer[item])
        console.log(`当前选择题目的答案---${item}:${this.data.Detailed[event.currentTarget.dataset.index].answer[item]}`)
        this.data.DetailedMBTIArr[event.currentTarget.dataset.index] = item
      }
    })
    //保存答案
    this.data.AllDetailedAnswer[event.currentTarget.dataset.index] = event.detail
    // console.log("全部已选择答案", this.data.AllDetailedAnswer, this.data.Arr)
    // console.log("全部题目", this.data.Detailed)
    //清空没有做的题目
    this.setData({
      Statistics: [],
      Analysis: "",
      MBTI: {
        E: 1,
        I: 1,
        S: 1,
        N: 1,
        T: 1,
        F: 1,
        J: 1,
        P: 1
      },//分析答案
    })


  },
  //困难提交答案
  async DetailedCarry() {
    await this.setData({
      Statistics: [],
      Analysis: "",
      //要清空不然答不对
      MBTI: {
        E: 1,
        I: 1,
        S: 1,
        N: 1,
        T: 1,
        F: 1,
        J: 1,
        P: 1
      },
    })
    //记录没有做的题目
    for (const Detailedindex in await this.data.Detailed) {
      // console.log(this.data.DetailedMBTIArr[Number(Detailedindex)])
      if (this.data.DetailedMBTIArr[Number(Detailedindex)] === undefined) {
        this.setData({
          Statistics: this.data.Statistics.concat([Number(Detailedindex)+1]),
        })
      }
    }

    //判断是否有没完成的题目
    if (this.data.Statistics.length !== 0) {
      Dialog.alert({
        title: '请完成以下题目',
        message: `${this.data.Statistics}`,
      }).then(() => {
        // on close
      });
      return false
    }

    //分析答题结果     评分规则
    await this.data.DetailedMBTIArr.forEach((item, index) => {
      if (item === "E") { this.data.MBTI.E += 1 }
      if (item === "I") { this.data.MBTI.I += 1 }

      if (item === "S") { this.data.MBTI.S += 1 }
      if (item === "N") { this.data.MBTI.N += 1 }

      if (item === "T") { this.data.MBTI.T += 1 }
      if (item === "F") { this.data.MBTI.F += 1 }

      if (item === "J") { this.data.MBTI.J += 1 }
      if (item === "P") { this.data.MBTI.P += 1 }
    })
    console.log((this.data.MBTI.E / (this.data.MBTI.E + this.data.MBTI.I)) * 100)
    //     把得到的评分转换百分比----雷达图需要的
    this.data.MBTI.E = await ((this.data.MBTI.E / (this.data.MBTI.E + this.data.MBTI.I)) * 100).toFixed(0);
    this.data.MBTI.I = await (100 - this.data.MBTI.E).toFixed(0);

    this.data.MBTI.S = await ((this.data.MBTI.S / (this.data.MBTI.S + this.data.MBTI.N)) * 100).toFixed(0);
    this.data.MBTI.N = await (100 - this.data.MBTI.S).toFixed(0);

    this.data.MBTI.T = await ((this.data.MBTI.T / (this.data.MBTI.T + this.data.MBTI.F)) * 100).toFixed(0);
    this.data.MBTI.F = await (100 - this.data.MBTI.T).toFixed(0);

    this.data.MBTI.J = await ((this.data.MBTI.J / (this.data.MBTI.J + this.data.MBTI.P)) * 100).toFixed(0);
    this.data.MBTI.P = await (100 - this.data.MBTI.J).toFixed(0);

    //   确定类型的规则 
    if (this.data.MBTI.E <= this.data.MBTI.I) { this.data.Analysis += "I"; } else { this.data.Analysis += "E"; }
    if (this.data.MBTI.S <= this.data.MBTI.N) { this.data.Analysis += "N"; } else { this.data.Analysis += "S"; }
    if (this.data.MBTI.T <= this.data.MBTI.F) { this.data.Analysis += "F"; } else { this.data.Analysis += "T"; }
    if (this.data.MBTI.J <= this.data.MBTI.P) { this.data.Analysis += "P"; } else { this.data.Analysis += "J"; }
    console.log("困难提交答案", this.data.AllDetailedAnswer, this.data.DetailedMBTIArr, this.data.MBTI, this.data.Analysis)
    // console.log("提交答案", this.data.AllDetailedAnswer, this.data.DetailedMBTIArr, this.data.Statistics)
    this.AddMBTI()

  },

  //发送请求获取分析结果
  async AddMBTI() {
    let AddEvaluationdata = await AddEvaluation({
      body: {
        opera_type: "submit_wj",
        useTime: "2021 年 06 月 20 日 ",
        code: this.data.Analysis,
        token: wx.getStorageSync('token') || "",
        mbti_code: this.data.MBTI,
        // username: sessionStorage.getItem("username") || "",
        username: wx.getStorageSync('username') || "",
        // sign: sessionStorage.getItem("sign") || ""
      },
      params: {},
    })
    if (AddEvaluationdata.data.code === 200) {
//答题完成时间


      wx.setStorageSync("AnswerTime", this.getdate())
      wx.setStorageSync("AddEvaluationdata", AddEvaluationdata.data.data)
      wx.setStorageSync("MBTI", this.data.MBTI)//雷达图需要的
      wx.setStorageSync("Analysis", this.data.Analysis)//确定类型的规则
      wx.navigateTo({
        url: `/pages/MBTIResult/MBTIResult?MBTI=${JSON.stringify(this.data.MBTI)}&Analysis=${this.data.Analysis}&AnswerTime=${wx.getStorageSync('AnswerTime')}`,
      })
    }
  },
//答题完成时间
   getdate() {
    var now = new Date(),
        y = now.getFullYear(),
        m = ("0" + (now.getMonth() + 1)).slice(-2),
        d = ("0" + now.getDate()).slice(-2);
    return y + "-" + m + "-" + d + " " + now.toTimeString().substr(0, 8);
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("生命周期函数--监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("生命周期函数--监听页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载")

  },

})
