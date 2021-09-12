// import Toast from 'path/to/@vant/weapp/dist/toast/toast';
import Toast from '@vant/weapp/toast/toast';
const { HotSearch, SearchSchools, ScreenSchools } = require('../../utils/Api/config/Flymain-wx.js')
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({
    //使用多个插槽
    options: {
        //样式独立hua
        styleIsolation: 'shared',
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    /**
     * 页面的初始数据
     */
    data: {
        MoreMajor: true,
        Associa: true,
        isSchool: true,
        SearchKeywords: '',//输入框内容
        SaveKeywords: '',//保存关键字
        WordArr: [],//热搜索数据
        //没优化
        SchoolArr: [
            {
                "name": "清华大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "华南理工大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "广东",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京工业大学",
                "f985": 2,
                "f211": 1,
                "belong": "北京市",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "内蒙古大学",
                "f985": 2,
                "f211": 1,
                "belong": "内蒙古自治区",
                "province_name": "内蒙古",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "大连海事大学",
                "f985": 2,
                "f211": 1,
                "belong": "交通运输部",
                "province_name": "辽宁",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "哈尔滨工业大学",
                "f985": 1,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "黑龙江",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "云南大学",
                "f985": 2,
                "f211": 1,
                "belong": "云南省",
                "province_name": "云南",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西北大学",
                "f985": 2,
                "f211": 1,
                "belong": "陕西省",
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京交通大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京外国语大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "语言类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中央音乐学院",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "艺术类",
                "dual_class_name": "双一流"
            },
            {
                "name": "河北工业大学",
                "f985": 2,
                "f211": 1,
                "belong": "河北省",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "武汉大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "湖北",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京林业大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "湖南大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "湖南",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中央民族大学",
                "f985": 1,
                "f211": 1,
                "belong": "国家民委",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "民族类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国人民大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京航空航天大学",
                "f985": 1,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京邮电大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京中医药大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "辽宁大学",
                "f985": 2,
                "f211": 1,
                "belong": "辽宁省",
                "province_name": "辽宁",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京师范大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "对外经济贸易大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "财经类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西安电子科技大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "湖南师范大学",
                "f985": 2,
                "f211": 1,
                "belong": "湖南省",
                "province_name": "湖南",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南开大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "天津大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "合肥工业大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "安徽",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国科学技术大学",
                "f985": 1,
                "f211": 1,
                "belong": "中国科学院",
                "province_name": "安徽",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "安徽大学",
                "f985": 2,
                "f211": 1,
                "belong": "安徽省",
                "province_name": "安徽",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "新疆大学",
                "f985": 2,
                "f211": 1,
                "belong": "新疆维吾尔自治区",
                "province_name": "新疆",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海大学",
                "f985": 2,
                "f211": 1,
                "belong": "上海市",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京航空航天大学",
                "f985": 2,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "天津医科大学",
                "f985": 2,
                "f211": 1,
                "belong": "天津市",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "天津工业大学",
                "f985": 2,
                "f211": 2,
                "belong": "天津市",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "江南大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "天津中医药大学",
                "f985": 2,
                "f211": 2,
                "belong": "天津市",
                "province_name": "天津",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "广西大学",
                "f985": 2,
                "f211": 1,
                "belong": "广西壮族自治区",
                "province_name": "广西",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "兰州大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "甘肃",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "华南师范大学",
                "f985": 2,
                "f211": 1,
                "belong": "广东省",
                "province_name": "广东",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "四川大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "四川农业大学",
                "f985": 2,
                "f211": 1,
                "belong": "四川省",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西南财经大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "财经类",
                "dual_class_name": "双一流"
            },
            {
                "name": "厦门大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "福建",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "福州大学",
                "f985": 2,
                "f211": 1,
                "belong": "福建省",
                "province_name": "福建",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中山大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "广东",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "暨南大学",
                "f985": 2,
                "f211": 1,
                "belong": "中央统战部",
                "province_name": "广东",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西北工业大学",
                "f985": 1,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南昌大学",
                "f985": 2,
                "f211": 1,
                "belong": "江西省",
                "province_name": "江西",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国矿业大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京理工大学",
                "f985": 2,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京农业大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "浙江大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "浙江",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京师范大学",
                "f985": 2,
                "f211": 1,
                "belong": "江苏省",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "河海大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国药科大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国石油大学（华东）",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "山东",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国地质大学（武汉）",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "湖北",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中南大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "湖南",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "哈尔滨工程大学",
                "f985": 2,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "黑龙江",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海交通大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "山东大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "山东",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "武汉理工大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "湖北",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "延边大学",
                "f985": 2,
                "f211": 1,
                "belong": "吉林省",
                "province_name": "吉林",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海财经大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "财经类",
                "dual_class_name": "双一流"
            },
            {
                "name": "华东师范大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "华东理工大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "东北大学",
                "f985": 1,
                "f211": 1,
                "belong": "教育部",
                "province_name": "辽宁",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "东华大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海外国语大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "语言类",
                "dual_class_name": "双一流"
            },
            {
                "name": "东北农业大学",
                "f985": 2,
                "f211": 1,
                "belong": "黑龙江省",
                "province_name": "黑龙江",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "太原理工大学",
                "f985": 2,
                "f211": 1,
                "belong": "山西省",
                "province_name": "山西",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "东北师范大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "吉林",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京理工大学",
                "f985": 1,
                "f211": 1,
                "belong": "工业和信息化部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "北京科技大学",
                "f985": 2,
                "f211": 1,
                "belong": "教育部",
                "province_name": "北京",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京邮电大学",
                "f985": 2,
                "f211": 2,
                "belong": "江苏省",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京中医药大学",
                "f985": 2,
                "f211": 2,
                "belong": "江苏省",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京信息工程大学",
                "f985": 2,
                "f211": 2,
                "belong": "江苏省",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "南京林业大学",
                "f985": 2,
                "f211": 2,
                "belong": "江苏省",
                "province_name": "江苏",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "石河子大学",
                "f985": 2,
                "f211": 1,
                "belong": "新疆生产建设兵团",
                "province_name": "新疆",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "成都理工大学",
                "f985": 2,
                "f211": 2,
                "belong": "四川省",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "理工类",
                "dual_class_name": "双一流"
            },
            {
                "name": "宁波大学",
                "f985": 2,
                "f211": 2,
                "belong": "浙江省",
                "province_name": "浙江",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中国美术学院",
                "f985": 2,
                "f211": 2,
                "belong": "浙江省",
                "province_name": "浙江",
                "school_nature_name": "公办",
                "type_name": "艺术类",
                "dual_class_name": "双一流"
            },
            {
                "name": "成都中医药大学",
                "f985": 2,
                "f211": 2,
                "belong": "四川省",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西南石油大学",
                "f985": 2,
                "f211": 2,
                "belong": "四川省",
                "province_name": "四川",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "广州中医药大学",
                "f985": 2,
                "f211": 2,
                "belong": "广东省",
                "province_name": "广东",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海海洋大学",
                "f985": 2,
                "f211": 2,
                "belong": "上海市",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海中医药大学",
                "f985": 2,
                "f211": 2,
                "belong": "上海市",
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "医药类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海体育学院",
                "f985": 2,
                "f211": 2,
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "体育类",
                "dual_class_name": "双一流"
            },
            {
                "name": "上海音乐学院",
                "f985": 2,
                "f211": 2,
                "province_name": "上海",
                "school_nature_name": "公办",
                "type_name": "艺术类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西安交通大学",
                "f985": 1,
                "f211": 1,
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西北农林科技大学",
                "f985": 1,
                "f211": 1,
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "陕西师范大学",
                "f985": 2,
                "f211": 1,
                "province_name": "陕西",
                "school_nature_name": "公办",
                "type_name": "师范类",
                "dual_class_name": "双一流"
            },
            {
                "name": "西藏大学",
                "f985": 2,
                "f211": 1,
                "province_name": "西藏",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "青海大学",
                "f985": 2,
                "f211": 1,
                "province_name": "青海",
                "school_nature_name": "公办",
                "type_name": "综合类",
                "dual_class_name": "双一流"
            },
            {
                "name": "中南财经政法大学",
                "f985": 2,
                "f211": 1,
                "province_name": "湖北",
                "school_nature_name": "公办",
                "type_name": "财经类",
                "dual_class_name": "双一流"
            },
            {
                "name": "华中农业大学",
                "f985": 2,
                "f211": 1,
                "province_name": "湖北",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            },
            {
                "name": "东北林业大学",
                "f985": 2,
                "f211": 1,
                "province_name": "黑龙江",
                "school_nature_name": "公办",
                "type_name": "农林类",
                "dual_class_name": "双一流"
            }
        ] ,//搜索学校数据
        //优化
        // SchoolArr: [[], [
        //     {
        //         "name": "清华大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "华南理工大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "广东",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京工业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "北京市",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "内蒙古大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "内蒙古自治区",
        //         "province_name": "内蒙古",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "大连海事大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "交通运输部",
        //         "province_name": "辽宁",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "哈尔滨工业大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "黑龙江",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "云南大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "云南省",
        //         "province_name": "云南",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西北大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "陕西省",
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京交通大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京外国语大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "语言类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中央音乐学院",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "艺术类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "河北工业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "河北省",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "武汉大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "湖北",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京林业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "湖南大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "湖南",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中央民族大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "国家民委",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "民族类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国人民大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京航空航天大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京邮电大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京中医药大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "辽宁大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "辽宁省",
        //         "province_name": "辽宁",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京师范大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "对外经济贸易大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "财经类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西安电子科技大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "湖南师范大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "湖南省",
        //         "province_name": "湖南",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南开大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "天津大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "合肥工业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "安徽",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国科学技术大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "中国科学院",
        //         "province_name": "安徽",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "安徽大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "安徽省",
        //         "province_name": "安徽",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "新疆大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "新疆维吾尔自治区",
        //         "province_name": "新疆",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "上海市",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京航空航天大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "天津医科大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "天津市",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "天津工业大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "天津市",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "江南大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "天津中医药大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "天津市",
        //         "province_name": "天津",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "广西大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "广西壮族自治区",
        //         "province_name": "广西",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "兰州大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "甘肃",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "华南师范大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "广东省",
        //         "province_name": "广东",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "四川大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "四川农业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "四川省",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西南财经大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "财经类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "厦门大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "福建",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "福州大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "福建省",
        //         "province_name": "福建",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中山大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "广东",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "暨南大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "中央统战部",
        //         "province_name": "广东",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西北工业大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南昌大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "江西省",
        //         "province_name": "江西",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国矿业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京理工大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京农业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "浙江大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "浙江",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京师范大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "江苏省",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "河海大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国药科大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国石油大学（华东）",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "山东",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国地质大学（武汉）",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "湖北",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中南大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "湖南",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "哈尔滨工程大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "黑龙江",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海交通大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "山东大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "山东",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "武汉理工大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "湖北",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "延边大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "吉林省",
        //         "province_name": "吉林",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海财经大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "财经类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "华东师范大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "华东理工大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "东北大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "辽宁",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "东华大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海外国语大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "语言类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "东北农业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "黑龙江省",
        //         "province_name": "黑龙江",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "太原理工大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "山西省",
        //         "province_name": "山西",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "东北师范大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "吉林",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京理工大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "belong": "工业和信息化部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "北京科技大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "教育部",
        //         "province_name": "北京",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京邮电大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "江苏省",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京中医药大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "江苏省",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京信息工程大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "江苏省",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "南京林业大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "江苏省",
        //         "province_name": "江苏",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "石河子大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "belong": "新疆生产建设兵团",
        //         "province_name": "新疆",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "成都理工大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "四川省",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "理工类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "宁波大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "浙江省",
        //         "province_name": "浙江",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中国美术学院",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "浙江省",
        //         "province_name": "浙江",
        //         "school_nature_name": "公办",
        //         "type_name": "艺术类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "成都中医药大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "四川省",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西南石油大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "四川省",
        //         "province_name": "四川",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "广州中医药大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "广东省",
        //         "province_name": "广东",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海海洋大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "上海市",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海中医药大学",
        //         "f985": 2,
        //         "f211": 2,
        //         "belong": "上海市",
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "医药类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海体育学院",
        //         "f985": 2,
        //         "f211": 2,
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "体育类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "上海音乐学院",
        //         "f985": 2,
        //         "f211": 2,
        //         "province_name": "上海",
        //         "school_nature_name": "公办",
        //         "type_name": "艺术类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西安交通大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西北农林科技大学",
        //         "f985": 1,
        //         "f211": 1,
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "陕西师范大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "陕西",
        //         "school_nature_name": "公办",
        //         "type_name": "师范类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "西藏大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "西藏",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "青海大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "青海",
        //         "school_nature_name": "公办",
        //         "type_name": "综合类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "中南财经政法大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "湖北",
        //         "school_nature_name": "公办",
        //         "type_name": "财经类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "华中农业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "湖北",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     },
        //     {
        //         "name": "东北林业大学",
        //         "f985": 2,
        //         "f211": 1,
        //         "province_name": "黑龙江",
        //         "school_nature_name": "公办",
        //         "type_name": "农林类",
        //         "dual_class_name": "双一流"
        //     }
        // ]],//搜索学校数据
        Popupshow: false,//是否显示筛选
        SaveScreenResult: [],//保存选择的标签
        SaveScreenRadio: '',//保存选择的省份
        ScreeningResults: '',//筛选结果
        numPages: 1,//页码
        Pages: 20,//显示条数
        Search: false,
        Screen: false,
        //显示隐藏加载
        More: true,
        //保存当前请求状态码
        StatusCode: '',
    },
    onLoad() {
// console.log(wx.getStorageSync('SchoolTips') !== "")
// console.log(wx.getStorageSync('SchoolTips') !== null)
        // console.log(wx.getStorageSync('SchoolTips') || this.data.SchoolArr)
        // console.log(wx.getStorageSync('SchoolTips').length === 0 ? this.data.SchoolArr : wx.getStorageSync('SchoolTips'))
        // console.log(typeof wx.getStorageSync('SchoolTips'))
        // console.log(wx.getStorageSync('SchoolTips'))
        if (wx.getStorageSync('SchoolTips') !== "" && wx.getStorageSync('SchoolTips') !== null) {
            this.setData({
                SchoolArr: wx.getStorageSync('SchoolTips')
            })
        }
    },




    //获取热搜索数据   ---请求获取数据
    async getHot(Hot) {
        let HotSearchdata = await HotSearch({
            body: {
                m: Hot,
                t: 1
            },
            params: {},
        })
        if (HotSearchdata.data.code === 200) {
            this.setData({
                WordArr: [],//热搜索数据
                SchoolArr: [],//搜索学校数据
            })
            if (HotSearchdata.data.data.length > 0) {
                this.setData({
                    WordArr: HotSearchdata.data.data,
                    Associa: false,
                })
                return false
            }
            if (HotSearchdata.data.data.length === 0) {
                Toast.fail("输入正确的学校名");
                return false
            }
        }
        return false
    },

    //获取学校搜索数据   ---请求获取数据
    async SchoolSearch() {
        // console.log(this.data.SearchKeywords)
        // console.log(this.data.SaveKeywords)
        let SearchSchoolsdata = await SearchSchools({
            body: {
                p: this.data.numPages,
                s: this.data.Pages,
                //专业名或学校
                kw: this.data.SearchKeywords,
                pv: wx.getStorageSync('Latlong'),
            },
            params: {},
        });
        //保存当前请求状态码
        this.setData({
            Search: true,
            Screen: false,
            StatusCode: SearchSchoolsdata.status,
        })
        console.log(SearchSchoolsdata.status)
        if (SearchSchoolsdata.status === 404) {
            this.setData({
                More: true
            })
            return false
        }
        if (SearchSchoolsdata.data.code === 200) {
            if (SearchSchoolsdata.data.data.length === 0) {
                Toast.fail("暂无相关学校");
                return false
            }
            await this.setData({
                // SchoolArr: this.data.SchoolArr.concat( SearchSchoolsdata.data.data),
                SaveKeywords: this.data.SearchKeywords,
                //没优化
                SchoolArr: this.data.SchoolArr.concat([...SearchSchoolsdata.data.data]),
                //优化
                // ['SchoolArr[' + this.data.numPages + ']']: SearchSchoolsdata.data.data,

                isSchool: false,
            })
            if (SearchSchoolsdata.data.totalCount < this.data.numPages * this.data.Pages) {
                this.setData({
                    More: true
                })
                return false
            }
            console.log(this.data.SchoolArr)
        }
    },

    //获取筛选学校数据   ---请求获取数据
    async SchoolScreen() {
        this.setData({
            Search: false,
            Screen: true,
        })
        // 把筛选到的标签转成对象    -----数组转对象
        console.log(this.data.SaveScreenRadio, "11111111111111111111111111111")
        let obj = {};
        if (this.data.SaveScreenResult.length !== 0) {
            for (let i = 0; this.data.SaveScreenResult.length - 1 >= i; i++) {
                if (this.data.SaveScreenResult[i] === "双一流" ? "双一流" : "") {
                    obj = {
                        ...obj,
                        dual_class_name: this.data.SaveScreenResult[i] === "双一流" ? "双一流" : "",
                    };
                }
                if (this.data.SaveScreenResult[i] === "211" ? 1 : "") {
                    obj = {
                        ...obj,
                        f211: this.data.SaveScreenResult[i] === "211" ? 1 : "",
                    };
                }
                if (this.data.SaveScreenResult[i] === "985" ? 1 : "") {
                    obj = {
                        ...obj,
                        f985: this.data.SaveScreenResult[i] === "985" ? 1 : "",
                    };
                }
            }
        }
        console.log(obj, obj.dual_class_name, obj.f211, obj.f985);
        let ScreenSchoolsdata = await ScreenSchools({
            body: {
                p: this.data.numPages,
                s: this.data.Pages,
                dual: obj.dual_class_name == undefined ? "" : obj.dual_class_name,
                f985: obj.f985 == undefined ? "" : 1,
                f211: obj.f211 == undefined ? "" : 1,
                pv: this.data.SaveScreenRadio === "全国" ? "" : this.data.SaveScreenRadio

                // pv:
                //     this.data.SaveScreenRadio !== ''
                //         ? this.data.SaveScreenRadio === "全国"
                //             ? "北京"
                //             : this.data.SaveScreenRadio
                //         : wx.getStorageSync('Latlong'),
            },
            params: {},
        });
        //保存当前请求状态码
        this.setData({

            StatusCode: ScreenSchoolsdata.status
        })
        if (ScreenSchoolsdata.status === 404) {
            this.setData({
                More: true
            })
            return false
        }
        if (ScreenSchoolsdata.data.code === 200) {
            this.setData({
                //优化
                // ['SchoolArr[' + this.data.numPages + ']']: ScreenSchoolsdata.data.data,
                //没优化
                SchoolArr: this.data.SchoolArr.concat(ScreenSchoolsdata.data.data),
                isSchool: false,
            })
            if (ScreenSchoolsdata.data.totalCount < this.data.numPages * this.data.Pages) {
                this.setData({
                    More: true
                })
                return false
            }
            console.log(this.data.SchoolArr)
        }
    },

    // 父组件-----输入内容变化时触发
    async onChange(event) {
        // console.log('热搜索数据 ', event.detail.detail)
        this.setData({
            SearchKeywords: event.detail.detail
        })
        // console.log(this.data.SaveKeywords)
        this.getHot(event.detail.detail)
    },

    // 父组件-----点击获取热搜索关键字
    async getWord(event) {
        console.log('热搜索数据 ', event.detail.currentTarget.dataset.word)
        this.setData({
            SearchKeywords: event.detail.currentTarget.dataset.word,
            // SaveKeywords: event.detail.currentTarget.dataset.word,
            More: false

        })
        await this.onSearch()
    },

    // 父组件-----点击搜索时触发
    async onSearch() {
        console.log("1111111111")
        if (this.data.SearchKeywords === "") {
            Toast.fail("请输入学校名字")
            return false
        }
        if (this.data.SearchKeywords === this.data.SaveKeywords) {
            return false
        }
        if (this.data.numPages !== 1) {
            this.setData({
                numPages: 1,
            })
        }
        this.setData({
            WordArr: [],//热搜索数据
            SchoolArr: [],//搜索学校数据
            More: false
            // SaveKeywords: this.data.SearchKeywords
        })
        await this.SchoolSearch()
    },

    // 父组件-----点击筛选时触发
    async onScreen() {
        this.setData({
            Popupshow: true
        })
        console.log("父组件-----点击筛选时触发")
    },

    // 父组件-----关闭弹出层时触发
    async onClose() {
        this.setData({
            Popupshow: false,
        })
        console.log("父组件-----关闭弹出层时触发")
    },

    // 父组件-----标签-----当绑定值变化时触发的事件
    async onCheckboxScreen(event) {
        console.log("标签", event.detail.detail)
        this.setData({
            SaveScreenResult: event.detail.detail,
            ScreeningResults: `${event.detail.detail},${this.data.SaveScreenRadio}`
        })
    },

    // 父组件-----省份未选中-----当绑定值变化时触发的事件
    async onProvince(event) {
        console.log(event.detail.currentTarget.dataset.province, this.data.ScreenRadio)
        // if (this.data.SaveScreenRadio === "全国") {
        //     Toast.fail("当前不支持全国搜索");
        //     return false;
        // }
        if (this.data.SaveScreenRadio !== event.detail.currentTarget.dataset.province && this.data.SaveScreenRadio !== "") {
            Toast.fail("只能选择一个,请取消上次选择");
            return false;
        }
    },

    // 父组件-----省份已选中-----当绑定值变化时触发的事件
    async onRadioScreen(event) {
        // console.log("省份已选中", event.detail.detail[0])
        if (event.detail.detail[0] === undefined) {
            Toast.success("已取消当前选择");
        }
        this.setData({
            SaveScreenRadio: event.detail.detail[0] === undefined ? '' : event.detail.detail[0],
            ScreeningResults: `${this.data.SaveScreenResult},${event.detail.detail[0] === undefined ? '' : event.detail.detail[0]}`
        })
    },

    // 父组件-----点击重置筛选时触发事件
    async onResetFilter() {
        this.setData({
            Popupshow: false,//是否显示筛选
            SaveScreenResult: [],//保存选择的标签
            SaveScreenRadio: '',//保存选择的省份
            ScreeningResults: '',//筛选结果
        })
        Toast.success("重置成功");
        console.log("父组件-----点击重置筛选时触发事件",)
    },

    // 父组件-----点击提交筛选时触发事件
    async onSubmitFilter() {
        if (this.data.numPages !== 1) {
            this.setData({
                numPages: 1,
            })
        }
        this.setData({
            SearchKeywords: "",
            SaveKeywords: '',
            Popupshow: false,
            WordArr: [],//热搜索数据
            SchoolArr: [],//搜索学校数据
            isSchool: false,
            More: false
        })
        console.log(this.data.SaveScreenResult, '保存选择的标签')
        console.log(this.data.SaveScreenRadio, '保存选择的省份')

        this.SchoolScreen()




    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("用户下拉动作")
    },

    /**
 * 页面上拉触底事件的处理函数
 */
    onReachBottom: async function () {
        //判断数据是否加载完毕
        if (this.data.StatusCode === 404) {
            return false
        }
        await this.data.numPages++
        //搜索
        if (this.data.Search === true) {
            this.SchoolSearch()
            return false
        }
        //筛选
        if (this.data.Screen === true) {
            await this.SchoolScreen()
            return false
        }
        console.log(this.data.WordArr)
        console.log("页面上拉触底事件的处理函数")
    },
})