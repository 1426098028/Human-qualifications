<template >
  <div class="SearchAll">
    <van-sticky>
      <van-nav-bar
        :title="$route.query.name"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <van-search
        v-model="value"
        show-action
        input-align="center"
        placeholder="请输入搜索关键词"
        @input="onInput"
      >
        <template #action>
          <van-button round type="info" size="mini" @click="onSearch">
            搜索
          </van-button>
          <van-button
            type="info"
            plain
            hairline
            icon="filter-o"
            size="mini"
            @click="onScreen"
          >
            筛选
          </van-button>
        </template>
      </van-search>
    </van-sticky>
    <van-cell-group center v-for="(item, index) in WordArr" :key="index">
      <van-cell center icon="search" @click="Keywords(item.value)">
        <div slot="default" v-html="highilght(item.value)"></div>
      </van-cell>
    </van-cell-group>
    <van-list
      v-if="List"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group center v-for="(Schools, index) in SchoolArr" :key="index">
        <van-cell
          center
          :to="{ path: '/School', query: { School: Schools.name } }"
        >
          <div slot="default" class="in">
            <div>
              <div>
                <span v-html="highilght(Schools.name)">&nbsp;</span>&nbsp;
                <!-- {{ Schools.name }} -->
                <van-tag round plain type="danger">
                  &nbsp;{{
                    Schools.dual_class_name === null ||
                    Schools.dual_class_name === ""
                      ? "无"
                      : Schools.dual_class_name
                  }}
                </van-tag>
                &nbsp;
                <van-tag round plain type="danger">
                  {{ Schools.f211 === 1 ? "211" : "无" }}
                </van-tag>
                &nbsp;
                <van-tag round plain type="danger">
                  {{ Schools.f985 === 1 ? "985" : "无" }}
                </van-tag>
                &nbsp;
              </div>
              <van-tag plain round type="primary">
                &nbsp;{{ Schools.school_nature_name }}&nbsp;/&nbsp;{{
                  Schools.type_name
                }}&nbsp;/&nbsp;{{ Schools.belong }}&nbsp;
              </van-tag>
            </div>

            <van-tag plain type="primary" class="wz">
              <div class="in">
                <van-icon name="location-o" size="22" />
                <div>{{ Schools.province_name }}</div>
              </div>
            </van-tag>

            <!-- <van-grid center="true" direction="horizontal">
            <van-grid-item icon="location-o" :text="Schools.province_name" />
          </van-grid> -->
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>

    <van-popup
      v-model="show"
      class="ScreenAll"
      position="right"
      round
      @close="onClose"
    >
      <van-divider dashed>筛选</van-divider>
      <van-divider content-position="left">热门标签</van-divider>
      <van-checkbox-group
        v-model="HotTagArr"
        class="Screen"
        icon-size="0px"
        border="false"
        @change="onHotTagArr($event)"
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
      <van-divider content-position="left">所在地</van-divider>

      <van-checkbox-group
        v-model="ProvinceArr"
        :max="1"
        class="Screen"
        icon-size="0px"
        border="false"
        @change="onProvinceArr($event)"
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
          <van-grid-item @click="onChange">
            <van-checkbox name="天津">
              <van-button plain size="mini" hairline type="info">
                天津
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="河北">
              <van-button plain size="mini" hairline type="info">
                河北
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="山西">
              <van-button plain size="mini" hairline type="info">
                山西
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="辽宁">
              <van-button plain size="mini" hairline type="info">
                辽宁
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="吉林">
              <van-button plain size="mini" hairline type="info">
                吉林
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="香港">
              <van-button plain size="mini" hairline type="info">
                香港
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="内蒙古">
              <van-button plain size="mini" hairline type="info">
                内蒙古
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="黑龙江">
              <van-button plain size="mini" hairline type="info">
                黑龙江
              </van-button>
            </van-checkbox>
          </van-grid-item>
          <van-grid-item @click="onChange">
            <van-checkbox name="宁夏">
              <van-button plain size="mini" hairline type="info">
                宁夏
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

      <!-- <van-divider dashed>提交</van-divider> -->
      <van-divider dashed></van-divider>
      <van-sticky>
        <van-button round size="small" @click="onResetFilter" type="danger">
          重置筛选
        </van-button>
        <van-button round size="small" @click="onSubmitFilter" type="info">
          提交
        </van-button>
      </van-sticky>
      <van-divider dashed></van-divider>
    </van-popup>
  </div>
</template>
<script>
import { HotSearch, SearchSchools, ScreenSchools } from "../../NewApi/Flymain";
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  name: "SearchAll",
  data() {
    return {
      //显示条数
      Pages: 10,
      //显示页数
      numPages: 1,
      HotTagArr: [], //标签
      ProvinceArr: [], //省份
      ProvinceinnerText: "", //保存当前选择的省份
      ScreeningResults: "", //筛选结果
      show: false,
      List: false,
      loading: false,
      finished: true,
      Search: false,
      Screen: false,
      value: "", //输入框
      Newvalue: "", //保存输入框内容
      WordArr: [], //热搜索
      SchoolArr: [
        {
          name: "清华大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "华南理工大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "广东",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京工业大学",
          f985: 2,
          f211: 1,
          belong: "北京市",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "内蒙古大学",
          f985: 2,
          f211: 1,
          belong: "内蒙古自治区",
          province_name: "内蒙古",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "大连海事大学",
          f985: 2,
          f211: 1,
          belong: "交通运输部",
          province_name: "辽宁",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "哈尔滨工业大学",
          f985: 1,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "黑龙江",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "云南大学",
          f985: 2,
          f211: 1,
          belong: "云南省",
          province_name: "云南",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "西北大学",
          f985: 2,
          f211: 1,
          belong: "陕西省",
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "北京交通大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京外国语大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "语言类",
          dual_class_name: "双一流",
        },
        {
          name: "中央音乐学院",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "艺术类",
          dual_class_name: "双一流",
        },
        {
          name: "河北工业大学",
          f985: 2,
          f211: 1,
          belong: "河北省",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "武汉大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "湖北",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "北京林业大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "湖南大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "湖南",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "中央民族大学",
          f985: 1,
          f211: 1,
          belong: "国家民委",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "民族类",
          dual_class_name: "双一流",
        },
        {
          name: "中国人民大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "北京航空航天大学",
          f985: 1,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京邮电大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京中医药大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "辽宁大学",
          f985: 2,
          f211: 1,
          belong: "辽宁省",
          province_name: "辽宁",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "北京师范大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "对外经济贸易大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "财经类",
          dual_class_name: "双一流",
        },
        {
          name: "西安电子科技大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "湖南师范大学",
          f985: 2,
          f211: 1,
          belong: "湖南省",
          province_name: "湖南",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "南开大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "天津大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "合肥工业大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "安徽",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "中国科学技术大学",
          f985: 1,
          f211: 1,
          belong: "中国科学院",
          province_name: "安徽",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "安徽大学",
          f985: 2,
          f211: 1,
          belong: "安徽省",
          province_name: "安徽",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "新疆大学",
          f985: 2,
          f211: 1,
          belong: "新疆维吾尔自治区",
          province_name: "新疆",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "上海大学",
          f985: 2,
          f211: 1,
          belong: "上海市",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "南京航空航天大学",
          f985: 2,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "天津医科大学",
          f985: 2,
          f211: 1,
          belong: "天津市",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "天津工业大学",
          f985: 2,
          f211: 2,
          belong: "天津市",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "江南大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "天津中医药大学",
          f985: 2,
          f211: 2,
          belong: "天津市",
          province_name: "天津",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "广西大学",
          f985: 2,
          f211: 1,
          belong: "广西壮族自治区",
          province_name: "广西",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "兰州大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "甘肃",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "华南师范大学",
          f985: 2,
          f211: 1,
          belong: "广东省",
          province_name: "广东",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "四川大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "四川农业大学",
          f985: 2,
          f211: 1,
          belong: "四川省",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "西南财经大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "财经类",
          dual_class_name: "双一流",
        },
        {
          name: "厦门大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "福建",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "福州大学",
          f985: 2,
          f211: 1,
          belong: "福建省",
          province_name: "福建",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "中山大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "广东",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "暨南大学",
          f985: 2,
          f211: 1,
          belong: "中央统战部",
          province_name: "广东",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "西北工业大学",
          f985: 1,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "南昌大学",
          f985: 2,
          f211: 1,
          belong: "江西省",
          province_name: "江西",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "中国矿业大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "南京大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "南京理工大学",
          f985: 2,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "南京农业大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "浙江大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "浙江",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "南京师范大学",
          f985: 2,
          f211: 1,
          belong: "江苏省",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "河海大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "中国药科大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "中国石油大学（华东）",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "山东",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "中国地质大学（武汉）",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "湖北",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "中南大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "湖南",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "哈尔滨工程大学",
          f985: 2,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "黑龙江",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "上海交通大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "山东大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "山东",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "武汉理工大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "湖北",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "延边大学",
          f985: 2,
          f211: 1,
          belong: "吉林省",
          province_name: "吉林",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "上海财经大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "财经类",
          dual_class_name: "双一流",
        },
        {
          name: "华东师范大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "华东理工大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "东北大学",
          f985: 1,
          f211: 1,
          belong: "教育部",
          province_name: "辽宁",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "东华大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "上海外国语大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "语言类",
          dual_class_name: "双一流",
        },
        {
          name: "东北农业大学",
          f985: 2,
          f211: 1,
          belong: "黑龙江省",
          province_name: "黑龙江",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "太原理工大学",
          f985: 2,
          f211: 1,
          belong: "山西省",
          province_name: "山西",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "东北师范大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "吉林",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "北京理工大学",
          f985: 1,
          f211: 1,
          belong: "工业和信息化部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "北京科技大学",
          f985: 2,
          f211: 1,
          belong: "教育部",
          province_name: "北京",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "南京邮电大学",
          f985: 2,
          f211: 2,
          belong: "江苏省",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "南京中医药大学",
          f985: 2,
          f211: 2,
          belong: "江苏省",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "南京信息工程大学",
          f985: 2,
          f211: 2,
          belong: "江苏省",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "南京林业大学",
          f985: 2,
          f211: 2,
          belong: "江苏省",
          province_name: "江苏",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "石河子大学",
          f985: 2,
          f211: 1,
          belong: "新疆生产建设兵团",
          province_name: "新疆",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "成都理工大学",
          f985: 2,
          f211: 2,
          belong: "四川省",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "理工类",
          dual_class_name: "双一流",
        },
        {
          name: "宁波大学",
          f985: 2,
          f211: 2,
          belong: "浙江省",
          province_name: "浙江",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "中国美术学院",
          f985: 2,
          f211: 2,
          belong: "浙江省",
          province_name: "浙江",
          school_nature_name: "公办",
          type_name: "艺术类",
          dual_class_name: "双一流",
        },
        {
          name: "成都中医药大学",
          f985: 2,
          f211: 2,
          belong: "四川省",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "西南石油大学",
          f985: 2,
          f211: 2,
          belong: "四川省",
          province_name: "四川",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "广州中医药大学",
          f985: 2,
          f211: 2,
          belong: "广东省",
          province_name: "广东",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "上海海洋大学",
          f985: 2,
          f211: 2,
          belong: "上海市",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "上海中医药大学",
          f985: 2,
          f211: 2,
          belong: "上海市",
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "医药类",
          dual_class_name: "双一流",
        },
        {
          name: "上海体育学院",
          f985: 2,
          f211: 2,
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "体育类",
          dual_class_name: "双一流",
        },
        {
          name: "上海音乐学院",
          f985: 2,
          f211: 2,
          province_name: "上海",
          school_nature_name: "公办",
          type_name: "艺术类",
          dual_class_name: "双一流",
        },
        {
          name: "西安交通大学",
          f985: 1,
          f211: 1,
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "西北农林科技大学",
          f985: 1,
          f211: 1,
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "陕西师范大学",
          f985: 2,
          f211: 1,
          province_name: "陕西",
          school_nature_name: "公办",
          type_name: "师范类",
          dual_class_name: "双一流",
        },
        {
          name: "西藏大学",
          f985: 2,
          f211: 1,
          province_name: "西藏",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "青海大学",
          f985: 2,
          f211: 1,
          province_name: "青海",
          school_nature_name: "公办",
          type_name: "综合类",
          dual_class_name: "双一流",
        },
        {
          name: "中南财经政法大学",
          f985: 2,
          f211: 1,
          province_name: "湖北",
          school_nature_name: "公办",
          type_name: "财经类",
          dual_class_name: "双一流",
        },
        {
          name: "华中农业大学",
          f985: 2,
          f211: 1,
          province_name: "湖北",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
        {
          name: "东北林业大学",
          f985: 2,
          f211: 1,
          province_name: "黑龙江",
          school_nature_name: "公办",
          type_name: "农林类",
          dual_class_name: "双一流",
        },
      ], //搜索学校数据
    };
  },
  created() {
    console.log(this.$route.query.id, this.$route.query.name);
  },
  //计算属性 --获取当前状态
  computed: {
    ...mapState(["username", "token", "UserInformation"]),
  },
  mounted() {
    // this.onClickback();

    this.List = true;
    if (
      localStorage.getItem(`SchoolTips`) !== null &&
      localStorage.getItem(`SchoolTips`) !== undefined &&
      localStorage.getItem(`SchoolTips`) !== ""
    ) {
      // console.log(JSON.parse( sessionStorage.getItem(`${sessionStorage.getItem("Latlong")}`)))
      this.SchoolArr = JSON.parse(localStorage.getItem(`SchoolTips`));
    }
  },

  beforeRouteEnter(to, from, next) {
    // this.onClickback();
    if (from.path == "/") {
      // to.meta.isBack = true;
      // console.log(this);
      // console.log(to, from);
    } else {
      // to.meta.isBack = false;
    }
    next();
  },

  methods: {
    onClickback() {
      console.log(this.$route);
    },

    //高亮  --完成
    highilght(e) {
      // console.log("11111111");
      return e.replace(
        new RegExp(this.value, "gi"),
        `<span style="color:#90BBFD">${this.value}</span>`
      );
    },
    // 进行热搜索数据搜索
    Keywords(e) {
      console.log("进行热搜索数据搜索", e);
      this.value = e;
      this.Newvalue = e;
      this.List = true;
      // 加载状态开启
      this.loading = true;
      this.finished = false;
      if (this.numPages !== 1) {
        this.numPages = 1;
      }
      this.WordArr = [];
      this.SchoolArr = [];
      this.Search = true;
      this.Screen = false;
      this.onLoad();
    },
    async onInput(e) {
      this.List = false;
      this.value = e;
      this.WordArr = [];
      console.log("输入框", e);
      let HotSearchdata = await HotSearch({
        body: {
          m: this.value,
          t: 1,
          pv: sessionStorage.getItem("Latlong"),
        },
        params: {},
      });
      console.log(HotSearchdata.data.data);
      this.WordArr.push(...HotSearchdata.data.data);
      if (HotSearchdata.data.data.length === 0) {
        Toast.fail("输入正确的学校名");
      }
    },
    onSearch() {
      this.List = true;
      this.WordArr = [];
      console.log("搜索", this.value);
      // 加载状态开启
      this.loading = true;
      this.finished = false;
      if (this.Newvalue === this.value) {
        // Toast("请输入学校名字111");
        // 加载状态开启
        this.loading = false;
        this.finished = true;
        return false;
      }
      this.Newvalue = this.value;
      if (this.Newvalue === "") {
        Toast("请输入学校名字");
        // 加载状态开启
        this.loading = false;
        this.finished = true;
        return false;
      }
      if (this.numPages !== 1) {
        this.numPages = 1;
      }
      this.SchoolArr = [];
      this.Search = true;
      this.Screen = false;
      this.onLoad();
    },
    //开启筛选
    onScreen() {
      console.log("筛选");
      this.show = true;
    },
    //关闭筛选
    onClose() {
      console.log("关闭筛选");
      this.show = false;
    },
    //用户选择提示
    onChange(e) {
      console.log("提示", e.target.innerText);
      this.ProvinceinnerText = e.target.innerText;
      if (this.ProvinceArr[0] === e.target.innerText) {
        Toast.success("已取消当前选择");
        return false;
      }
      console.log("保存", this.ProvinceinnerText);
      if (
        this.ProvinceArr[0] !== this.ProvinceinnerText &&
        this.ProvinceArr[0]
      ) {
        Toast.fail("只能选择一个,请取消上次选择");
        return false;
      }
    },
    //筛选标签
    onHotTagArr() {
      console.log("标签", this.HotTagArr);
      this.ScreeningResults = `${this.HotTagArr},${this.ProvinceArr}`;
    },
    //筛选省份
    onProvinceArr() {
      console.log("省份", this.ProvinceArr);

      // if (this.ProvinceArr == "全国") {
      //   Toast.fail("当前不支持全国搜索");
      //   // this.ProvinceArr = "";
      // }

      this.ScreeningResults = `${this.HotTagArr},${this.ProvinceArr}`;
    },
    //重置筛选结果     ---完成
    async onResetFilter() {
      this.ProvinceinnerText = ""; //保存当前选择的省份
      this.ProvinceArr = [];
      this.HotTagArr = [];
      this.ScreeningResults = "筛选结果"; //筛选结果
      Toast.success("重置成功");
      console.log("重置筛选");
    },
    //提交筛选结果   --重复添加bug
    async onSubmitFilter() {
      if (this.numPages !== 1) {
        this.numPages = 1;
      }
      this.value = "";
      this.List = true;
      this.WordArr = [];
      console.log("省份", this.ProvinceArr);
      console.log("标签", this.HotTagArr);
      // 加载状态开启
      this.loading = true;
      this.finished = false;
      this.show = false;
      this.Search = false;
      this.Screen = true;
      this.SchoolArr = [];
      this.onLoad();
    },
    //获取数据
    async onLoad() {
      // 把筛选到的标签转成对象    -----数组转对象
      let obj = {};
      if (this.HotTagArr.length !== 0) {
        for (let i = 0; this.HotTagArr.length - 1 >= i; i++) {
          if (this.HotTagArr[i] === "双一流" ? "双一流" : "") {
            obj = {
              ...obj,
              dual_class_name: this.HotTagArr[i] === "双一流" ? "双一流" : "",
            };
          }
          if (this.HotTagArr[i] === "211" ? 1 : "") {
            obj = {
              ...obj,
              f211: this.HotTagArr[i] === "211" ? 1 : "",
            };
          }
          if (this.HotTagArr[i] === "985" ? 1 : "") {
            obj = {
              ...obj,
              f985: this.HotTagArr[i] === "985" ? 1 : "",
            };
          }
        }
      }
      console.log(obj, obj.dual_class_name, obj.f211, obj.f985);
      //搜索请求
      if (this.Search === true) {
        console.log("搜索请求");
        try {
          let SearchSchoolsdata = await SearchSchools({
            body: {
              p: this.numPages,
              s: this.Pages,
              kw: this.Newvalue,
              pv: sessionStorage.getItem("Latlong"),
            },
            params: {},
          });
          if (SearchSchoolsdata.data.code === 200) {
            this.SchoolArr.push(...SearchSchoolsdata.data.data);
            // 加载状态结束
            this.loading = false;
            console.log(SearchSchoolsdata.data.totalCount);
            console.log(this.numPages * this.Pages);
            // 数据未加载完成 开启加载状态
            if (
              SearchSchoolsdata.data.totalCount >=
              this.numPages * this.Pages
            ) {
              try {
                this.numPages++;
                this.finished = false;
                return false;
              } catch (SearchSchoolsdata) {
                if (SearchSchoolsdata.response.data.code === 404) {
                  // Toast.fail("数据加载完毕");
                  this.finished = true;
                  return false;
                }
              }
            }
            // 数据全部加载完成 关闭加载状态
            this.finished = true;
            return false;
          }
          return false;
        } catch (SearchSchoolsdata) {
          this.finished = true;
          if (SearchSchoolsdata.response.data.code === 404) {
            // Toast.fail("数据加载完毕");
            this.finished = true;
            return false;
          }
        }
      }
      //筛选请求
      if (this.Screen === true) {
        console.log("筛选请求");
        try {
          let ScreenSchoolsdata = await ScreenSchools({
            body: {
              p: this.numPages,
              s: this.Pages,
              dual: obj.dual_class_name == undefined ? "" : obj.dual_class_name,
              f985: obj.f985 == undefined ? "" : 1,
              f211: obj.f211 == undefined ? "" : 1,
              pv: this.ProvinceArr[0] == "全国" ? "" : this.ProvinceArr[0],

              // pv:
              //   this.ProvinceArr.length === 1
              //     ? this.ProvinceArr[0] == "全国"
              //       ? "北京"
              //       : this.ProvinceArr[0]
              //     : sessionStorage.getItem("Latlong"),
            },
            params: {},
          });
          if (ScreenSchoolsdata.data.code === 200) {
            //判断是否筛选到标签-------没筛选到
            // if (obj.dual_class_name === undefined) {
            //   this.SchoolArr.push(...ScreenSchoolsdata.data.data);
            //   console.log("不用筛选", this.SchoolArr);
            // }
            this.SchoolArr.push(...ScreenSchoolsdata.data.data);
            console.log("不用筛选", this.SchoolArr);
            // let Arr = [];
            //判断是否筛选到标签-------筛选到
            // if (obj.dual_class_name !== undefined) {
            //   setTimeout(() => {
            //     for (
            //       var i = 0, len = ScreenSchoolsdata.data.data.length;
            //       i < len;
            //       i++
            //     ) {
            //       Object.keys(ScreenSchoolsdata.data.data[i]).filter(
            //         (AllLabels) => {
            //           Object.keys(obj).filter((Label, key) => {
            //             if (
            //               Label + "--" + obj.dual_class_name ===
            //               AllLabels +
            //                 "--" +
            //                 ScreenSchoolsdata.data.data[i][AllLabels]
            //             ) {
            //               this.SchoolArr.push(ScreenSchoolsdata.data.data[i]);
            //               // return ScreenSchoolsdata.data.data[i];
            //             }
            //           });
            //         }
            //       );
            //     }
            //     // 加载状态结束
            //     this.loading = false;
            //     // 数据未加载完成 开启加载状态
            //     if (ScreenSchoolsdata.data.pageSize === this.Pages) {
            //       try {
            //         this.numPages++;
            //         this.finished = false;
            //         return false;
            //       } catch (ScreenSchoolsdata) {
            //         if (ScreenSchoolsdata.response.data.code === 404) {
            //           // Toast.fail("数据加载完毕");
            //           this.finished = true;
            //           return false;
            //         }
            //       }
            //     }
            //     // 数据全部加载完成 关闭加载状态
            //     this.finished = true;
            //     return false;
            //   }, 3000);

            //   console.log("已进行筛选", this.SchoolArr);
            //   return false;
            // }
            // 加载状态结束
            this.loading = false;
            // 数据未加载完成 开启加载状态
            if (ScreenSchoolsdata.data.pageSize === this.Pages) {
              try {
                this.numPages++;
                this.finished = false;
                return false;
              } catch (ScreenSchoolsdata) {
                if (ScreenSchoolsdata.response.data.code === 404) {
                  // Toast.fail("数据加载完毕");
                  this.finished = true;
                  return false;
                }
              }
            }
            // 数据全部加载完成 关闭加载状态
            this.finished = true;
            return false;
          }
        } catch (ScreenSchoolsdata) {
          this.finished = true;
          if (ScreenSchoolsdata.response.data.code === 404) {
            // Toast.fail("数据加载完毕");
            this.finished = true;
            return false;
          }
        }
      }
    },
  },
};
</script>
<style lang="less">
.SearchAll {
  .van-search {
    .van-search__action {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        margin: 0 0 0 10px;
      }
    }
  }

  .wz::before {
    border: none !important;
  }

  .in {
    .van-grid {
      .van-grid-item {
        .van-grid-item__content {
          margin: 0;
          padding: 0;
          .van-grid-item__text {
            margin-top: 4px;
          }
        }
      }
    }
  }
  .ScreenAll {
    width: 80%;
    height: 87%;
    .ResultAll {
      padding: 0;
      height: 30px;
    }
    .Screen {
      width: 100%;
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
}
</style>