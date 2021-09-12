<template>
  <div class="vxeTable">
    <keep-alive>
      <vxe-grid
        border
        :tablePage="tablePage"
        :loading="loading"
        :cell-style="cellStyle"
        :columns="columns"
        :data="Tabledata"
        v-bind="gridOptions"
        @cell-click="onClick"
        :scroll-y="{ enabled: false }"
        :seq-config="{
          startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,
        }"
      >
        <template #SeeMajor>
          <slot name="Major">
            <div class="SeeMajor">Vip查看</div>
          </slot>
        </template>
        <template #SeePitching>
          <slot name="Major">
            <div class="SeePitching">查看</div>
          </slot>
        </template>
        <!-- <template #cellClick="{ row,column }">
          <slot name="onCellClick">
            <div>点击</div>
          </slot>
        </template> -->

        <template #Collection="{ row, column }">
          <slot name="Received">
            <van-icon
              v-if="starO"
              name="star-o"
              color="#007ACC"
              size="24"
              @click="onCollection(row, column)"
            />
            <van-icon
              v-else
              name="star"
              color="#007ACC"
              size="24"
              @click="onCollection(row, column)"
            />
          </slot>
        </template>

        <template #checkbox="{ row, column, checked, indeterminate }">
          <span @click="onCheckbox(row, column, checked, indeterminate)">
            <van-icon v-if="!checked" name="star-o" color="#007ACC" size="24" />
            <van-icon v-else name="star" color="#007ACC" size="24" />
          </span>
        </template>

        <template #pager="{ type, currentPage, pageSize, $event }">
          <vxe-pager
            checked="false"
            align="center"
            :layouts="['PrevPage', 'Number', 'NextPage']"
            :current-page.sync="tablePage.currentPage"
            :page-size.sync="tablePage.pageSize"
            :total="tablePage.total"
            @page-change="onPage(type, currentPage, pageSize, $event)"
          >
          </vxe-pager>
        </template>
      </vxe-grid>
    </keep-alive>
  </div>
</template>
<script>
export default {
  //父组件传过来的数据
  props: {
    tablePage: Object,
    onPage: Function,
    onCollection: Function,
    onCheckbox: Function,
    starO: Boolean,
    columns: Array,
    Tabledata: Array,
    onClick: Function,
    loading: Boolean,
    // 收藏
  },
  data() {
    return {
      //表格样式
      gridOptions: {
        showHeader: true, //是否显示表头
        highlightCurrentRow: true, //是否要高亮当前行
        highlightHoverColumn: true, //鼠标移到列是否要高亮显示
        loading: false, //数据加载
        stripe: true, //隔行变色
        // border: true, //边框线
        // height: "100%", //固定表头

        showOverflow: false, //表内容一行省略 加点击提示
        align: "center", //居中
        showHeaderOverflow: false, //表头一行省略 加点击提示
      },
      //表头数据  --样本
      // columns: [
      //   {
      //     field: "name",
      //     title: "表头",
      //     showHeaderOverflow: false, //一行省略 加点击提示
      //   },
      // ],
      // // 表内容数据  --样本
      // Tabledata: [
      //   {
      //     name: "Test1",
      //     address: "Shenzhen",
      //   },
      // ],
    };
  },
  created() {
    console.log(this.columns);
    console.log(this.Tabledata);
  },
  methods: {
    //隔行变色(完成)
    cellStyle({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return {
          background: "#fff",
        };
      } else {
        return {
          background: "#b9d8fa",
        };
      }
    },
  },
};
</script>
<style lang="less">
.vxeTable {
  position: relative;
  width: 100vw;

  // height: 100vh;
  .SeeMajor {
    color: red;
  }
  .SeePitching {
    color: #52a5fa;
  }
  //表头背景颜色
  .vxe-table--header-wrapper {
    background: #409eff !important;
    color: #3a5033;
    font-weight: 500;
    .vxe-cell {
      margin: 0;
      padding: 0;
    }
  }

  .vxe-cell--title {
    .vxe-cell--checkbox {
      color: #3a5033;
    }
  }

  .vxe-checkbox--icon {
    display: none;
    visibility: hidden;
    padding: 0px !important;
  }
  .vxe-checkbox--label {
    padding: 0px !important;
  }

  .vxe-cell--checkbox {
    padding: 0px !important;
  }
  .vxe-checkbox--icon::before {
    display: none;
    visibility: hidden;

    // content: unset !important;
    // position: unset !important;
    // height: 0px !important;
    // width: 0px !important;
    // top: 0;
    // left: 0;
    // background-color: pink !important;
    // // border-radius: ;
    // border: none !important;
  }
  .vxe-checkbox--checked-icon:after {
    display: none;
    visibility: hidden;
    // content: unset !important;
    // position: unset !important;
    // height: 0px !important;
    // width: 0px !important;
    // top: 0px !important;
    // left: 0px !important;
    // border: none !important;
    // border-left: 0;
    // border-top: 0;
  }
}
</style>
