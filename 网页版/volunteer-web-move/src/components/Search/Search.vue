<template>
  <div class="Search">
    <van-search
      show-action
      input-align="center"
      @input="onInput"
      :placeholder="Placeholder"
    >
      <!-- <van-search
      v-model="modelValue"
      show-action
      input-align="center"
      @input="onInput"
      :placeholder="Placeholder"
    > -->
      <div class="SearchAll" slot="action">
        <van-button
          class="Searchbut"
          round
          type="info"
          size="mini"
          @click="onSearch"
        >
          搜索
        </van-button>

        <!-- <van-button class="SearchAll"   size="mini" @click="onScreen" plain hairline type="info">    <van-icon size="20" name="filter-o" /> 筛选</van-button> -->

        <div class="SearchAll ScreenAll-bor" hairline @click="onScreen">
          <van-icon size="20" name="filter-o" /> 筛选
        </div>
      </div>
    </van-search>
    <!-- 
      <van-popup
        class="ScreenAll"
        v-model="show"
        position="right"
        round
        @close="onClose"
      >
        <van-divider dashed>筛选</van-divider>

        <div>
          <van-divider content-position="left">热门标签</van-divider>

          <van-checkbox-group
            class="Screen"
            icon-size="0px"
            @change="onCheckboxScreen"
            v-model="ScreenResult"
            border="false"
          >
            <van-grid :column-num="3" center>
              <van-grid-item center>
                <van-checkbox name="双一流">
                  <van-button plain size="mini" hairline type="info">
                    双一流
                  </van-button>
                </van-checkbox>
              </van-grid-item>
              <van-grid-item>
                <van-checkbox name="985">
                  <van-button plain size="mini" hairline type="info">
                    985
                  </van-button>
                </van-checkbox>
              </van-grid-item>
              <van-grid-item>
                <van-checkbox name="211">
                  <van-button plain size="mini" hairline type="info">
                    211
                  </van-button>
                </van-checkbox>
              </van-grid-item>
            </van-grid>
          </van-checkbox-group>
        </div>
        <van-divider content-position="left">所在地</van-divider>

        <van-checkbox-group
          :max="1"
          class="Screen"
          icon-size="0px"
          @change="onRadioScreen"
          v-model="ScreenRadio"
          border="false"
        >
          <van-grid :column-num="3" center>
            <van-grid-item @click="onChange">
              <van-checkbox name="全国">
                <van-button plain size="mini" hairline type="info">
                  全国
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="北京">
                <van-button plain size="mini" hairline type="info">
                  北京
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="广东">
                <van-button plain size="mini" hairline type="info">
                  广东
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="江苏">
                <van-button plain size="mini" hairline type="info">
                  江苏
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="上海">
                <van-button plain size="mini" hairline type="info">
                  上海
                </van-button>
              </van-checkbox>
            </van-grid-item>
            <van-grid-item @click="onChange">
              <van-checkbox name="重庆">
                <van-button plain size="mini" hairline type="info">
                  重庆
                </van-button>
              </van-checkbox>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-divider dashed>筛选结果</van-divider>
        <van-cell center>
          <div slot="default" class="ResultAll">
            <van-field
              v-model="ScreeningResults"
              disabled
              input-align="center"
              rows="2"
              type="textarea"
              placeholder="筛选结果"
            />
          </div>
        </van-cell>

        <van-divider dashed>提交</van-divider>
        <van-sticky>
          <van-button round size="small" @click="onResetFilter" type="danger">
            重置筛选
          </van-button>
          <van-button round size="small" @click="onSubmitFilter" type="info">
            提交筛选
          </van-button>
        </van-sticky>
        <van-divider dashed></van-divider>
      </van-popup> -->

    <!-- <van-cell center>
      <div slot="default" class="in">
        <div>
          <div>
            学校学校学校
            <span class="wordSize wordFrame">211</span>
            <span class="wordSize wordFrame">211</span>
            <span class="wordSize wordFrame">211</span>
          </div>
          <div class="wordSize">公办/教育</div>
        </div>
        <div class="in">
          <van-icon name="location-o" size="20" />
          <div class="wordSize">北京</div>
        </div>
      </div>
    </van-cell> -->
  </div>
</template>     
<script>
export default {
  //父组件传过来的数据
  props: {
    Value: String,
    Placeholder: String,
    onSearch: Function,
    onScreen: Function,
    // 收藏
  },

  name: "Tabbar",
  data() {
    return {
      value: this.Value,
    };
  },
  created() {},
  methods: {
    onInput(event) {
      this.$emit("onInput", event);
    },
    // onfocus() {
    //   console.log("搜索");
    // },
    // onSearch() {
    //   console.log("搜索");
    // },
    // onScreen() {
    //   this.show = true;
    //   console.log("筛选");
    // },
    // onResetFilter() {
    //   console.log("重置筛选");
    // },
    // onSubmitFilter() {
    //   console.log("提交筛选");
    // },
  },
};
</script>
<style lang="less">
.Search {
  .van-search {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .SearchAll {
    display: flex;
    align-items: center;
    justify-content: center;
    .Searchbut {
      margin: 0 10px;
      padding: 0 10px;
    }
  }
  .ScreenAll-bor {
    color: #1989fa;
    border: 1px solid #1989fa;
    padding: 0 6px 0 4px;
    margin: 0;
    height: 24px !important;
  }
  .ScreenAll {
    width: 80%;
    height: 87%;
    .ResultAll {
      //   display: flex;
      //   flex-direction: row;
    }
    .Screen {
      padding: 10px 0;
      width: 100%;
      // background: pink;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      .van-button {
        width: 60px;
      }
    }
    .van-sticky {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .van-popup--right {
    top: 50%;
  }
}
</style>
