<template>
  <div class="PitchingLine">
    <van-sticky>
      <van-nav-bar
        :title="PitchingLineName"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <vxePitchingLine
      v-bind:onPage="onPage"
      :tablePage="tablePage"
      :columns="columnsdata"
      :Tabledata="Tabledata"
      :onClick="onClick"
    >
    </vxePitchingLine>
    <div class="vxePitchingLine"></div>
  </div>
</template>
<script>
import vxePitchingLine from "@/components/vxeTable/vxeTable";
import { mapState } from "vuex";
export default {
  name: "PitchingLine",
  data() {
    return {
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      PitchingLineName: "学校投档线",
      // value: "",
      Arr: [],
      //数据加载
      loading: false,
      //收藏数据
      tableData: [],
      //表头数据  --原来的表
      // columnsdata: [
      //   {
      //     field: "schoolName",
      //     title: "学校",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "education",
      //     title: "学历",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "schoolMajor",
      //     title: "专业",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "Enrollment",
      //     title: "录取人数",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "AdmissionScoreLine",
      //     title: "录取分数线",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "LowestRanking",
      //     title: "最低排名",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "PitchingLine",
      //     title: "收藏",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      // ],
      //查专业
      schoolName: "",
      columnsdata: [
        {
          field: "type",
          title: "学科",
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "min",
          title: "最低录取分数线",
          width: "150",
          sortable: true,

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "year",
          title: "年份",
          sortable: true,

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "name",
          title: "学籍地",
          showHeaderOverflow: true, //一行省略 加点击提示
        },
      ],
      //表中数据
      Tabledata: [],
    };
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  created() {
    let NeArr;
    this.PitchingLineName = this.$route.query.PitchingLine;

    let Pitching = JSON.parse(sessionStorage.getItem("Throw"));
    Pitching.forEach((item, index) => {
      NeArr = {
        ...Pitching[index],
        name: Pitching[index].province_name.name,
      };
      this.Arr.push(NeArr);
    });
    console.log(this.Arr);
    this.Tabledata = this.Arr;
  },

  methods: {
    onPage() {},
    onClick() {},
  },

  components: {
    vxePitchingLine,
  },
};
</script>
<style lang="less">
.PitchingLine {
  .vxePitchingLine {
    height: 50px;
  }
}
</style>
