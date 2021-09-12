<template>
  <keep-alive>
    <div class="Collection">
      <van-sticky>
        <van-nav-bar
          :title="CollectionName"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
      </van-sticky>
      <!-- <h3>查专业</h3> -->
      <vxeCollection
        v-bind:onPage="onPage"
        :columns="columnsdata"
        :Tabledata="Tabledata"
        v-bind:onCollection="onCollection"
        :tablePage="tablePage"
      >
      </vxeCollection>
      <!-- <div class="box">
      <div class="box1">
        <el-table
          v-loading="loading"
          style="width: 100%"
          :data="tableData"
          :row-class-name="tableRowClassName"
          :header-cell-style="{ background: '#409EFF', color: '#303133' }"
          fit
          @cell-click="onCollection"
        >
          <el-table-column prop="school" fixed label="学校"> </el-table-column>
          <el-table-column prop="batch" label="学历"> </el-table-column>
          <el-table-column prop="school_majob" label="专业"> </el-table-column>
          <el-table-column label="录取人数"> </el-table-column>
          <el-table-column label="录取分数线" width="120" sortable>
          </el-table-column>
          <el-table-column label="最低排名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="date" label="收藏">
            <i class="el-icon-star-on"></i>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
      <div class="Right"></div>
    </div>
  </keep-alive>
</template>
<script>
import { CollectionList, DeleteCollection } from "../../NewApi/Flymain";

import { getCollection, DelCollection } from "@/api/api.js";
import vxeCollection from "@/components/vxeTable/vxeTable";
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  name: "Collection",
  data() {
    return {
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      CollectionName: "我的收藏",
      value: "",
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
      //     title: "最低分排名",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      //   {
      //     field: "Collection",
      //     title: "收藏",
      //     showHeaderOverflow: true, //一行省略 加点击提示
      //   },
      // ],
      //查专业
      schoolName: "",
      columnsdata: [
        {
          field: "school",
          title: "学校",
          width: "150",
          showHeaderOverflow: true, //一行省略 加点击提示
        },
        {
          field: "school_majob",
          title: "专业",
          width: "150",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        // {
        //   field: "max",
        //   title: "最高分",
        //   width: "70",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "min",
          title: "最低分",
          width: "70",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        // {
        //   field: "avg",
        //   title: "平均分",
        //   width: "70",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "min_rank",
          title: "最低分排名",
          width: "90",

          showHeaderOverflow: true, //一行省略 加点击提示
        },
        // {
        //   field: "count",
        //   title: "录取人数",
        //   width: "90",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        // {
        //   field: "analysis",
        //   title: "分析评估",
        //   width: "90",

        //   showHeaderOverflow: true, //一行省略 加点击提示
        // },
        {
          field: "Collection",
          title: "收藏",
          width: "50",
          showHeaderOverflow: true, //一行省略 加点击提示
          slots: { default: "Collection" }, //插槽
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
    if (
      this.username === null &&
      this.token === null &&
      this.UserInformation === null
    ) {
      this.$router.push({
        path: "/Login",
      });
      this.$toast("请先登录");
      return true;
    }
  },
  async mounted() {
    this.loading = true;
    // console.log(this.token);
    //收藏
    //获取收藏列表
    let getCollectiondata = await CollectionList({
      body: {
        token: this.token,
      },
      params: {},
    });
    this.tablePage.pageSize = getCollectiondata.data.pageSize;
    this.tablePage.total = getCollectiondata.data.totalCount;
    // console.log(this.tablePage.pageSize);
    // console.log(this.tablePage.total);
    if (getCollectiondata.data.code === 200) {
      for (let item of getCollectiondata.data.data) {
        // console.log(item);
        let newObject = {
          id: item.id,
          ...JSON.parse(item.data),
        };
        this.tableData.push(newObject);
        this.Tabledata.push(newObject);
      }
      this.loading = false;
    }
  },
  methods: {
    //删除所有选中的
    async delComplateTodos() {
      console.log("sss");
    },

    async onPage(type, currentPage, pageSize, $event) {
      this.Tabledata = [];
      this.tableData = [];
      console.log($event.pageSize);
      console.log($event.currentPage);
      this.loading = true;

      let getCollectiondata = await CollectionList({
        body: {
          p: $event.currentPage,
          s: $event.pageSize || 10,
          token: this.token,
        },
        params: {},
      });
      if (getCollectiondata.data.code === 200) {
        for (let item of getCollectiondata.data.data) {
          console.log(item);
          let newObject = {
            id: item.id,
            ...JSON.parse(item.data),
          };
          this.tableData.push(newObject);
          this.Tabledata.push(newObject);
        }
        this.loading = false;
        // console.log(this.tableData);
        this.schoolName = this.tableData[0].school;
        // console.log(this.schoolName);
      }
    },

    //删除收藏
    async onCollection(row, column, cell, event) {
      // console.log(row);
      // console.log(column);
      // if (column.label == "收藏") {
      console.log("row", row.id);
      this.tableData.splice(
        this.tableData.findIndex(
          async (value) =>
            value.name === row.name && value.address === row.address
        ),
        1
      );

      let DeleteCollectiondata = await DeleteCollection({
        url: `auth2/collection/${row.id}/`,
        body: {
          token: this.token,
        },
        params: {},
      });
      if (DeleteCollectiondata.data.code === 200) {
        Toast("取消收藏");
        this.$router.go(0);
      }
    },
    //隔行变色(完成)
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
  },
  components: {
    vxeCollection,
  },
};
</script>
<style lang="less">
.Collection {
  .Right {
    margin-bottom: 100px;
  }
  .warning-row {
    background: #fff;
  }
  .success-row {
    background: #b9d8fa;
  }
}
</style>
