//Es6引入
// import FlyAjax from './FlyAjaxPromise.js'
const CryptoJS = require('crypto-js')
var fly = require("flyio")
// import fly from 'flyio/dist/npm/fly'

// 引入二次封装Fly模块
import FlyAjax from '../NewApi/FlyAjaxPromise'
//引入fly实例
fly.config.baseURL = "http://gkzy.renzihang.cn/api/v1/"

/*
请求总结
    get和delete方式 body和params到可以获取到数据
    post方式 只能在body中获取到数据，params不能

*/
//登录接口      --免费
export const Login = function (LoginObj) { return FlyAjax({ url: "auth2/login/", method: "post", ...LoginObj, }) }

//注册接口      --免费
export const Register = function (RegisterObj) { return FlyAjax({ url: "auth2/register/", method: "post", ...RegisterObj, }) }

//获取和更新用户信息        --免费
export const setgetInformation = function (setgetInformationObj) { return FlyAjax({ url: "auth2/userinfo/", method: "post", ...setgetInformationObj, }) }

//获取激活码        --免费
export const GetVip = function (GetVipObj) { return FlyAjax({ url: "auth2/paybycode/", method: "post", ...GetVipObj, }) }

//获取收藏列表      --免费
export const CollectionList = function (CollectionListObj) { return FlyAjax({ url: "auth2/collection/", method: "get", ...CollectionListObj, }) }

//添加收藏      --免费
export const AddCollection = function (AddCollectionObj) { return FlyAjax({ url: "auth2/collection/", method: "post", ...AddCollectionObj, }) }

//删除收藏      --免费
export const DeleteCollection = function (DeleteCollectionObj) { return FlyAjax({ method: "DELETE", ...DeleteCollectionObj, }) }

//查学校      --免费
export const SearchSchools = function (SearchSchoolsObj) { return FlyAjax({ url: "school/search/", method: "get", ...SearchSchoolsObj, }) }

//查专业      --免费
export const SearchMajors = function (SearchMajorsObj) { return FlyAjax({ url: "school/search/", method: "get", ...SearchMajorsObj, }) }

//筛选      --免费
export const ScreenSchools = function (ScreenSchoolsObj) { return FlyAjax({ url: "school/filters/school/", method: "get", ...ScreenSchoolsObj, }) }

//热搜索 
export const HotSearch = function (HotSearchObj) { return FlyAjax({ url: "position/jyqj/majob/", method: "get", ...HotSearchObj, }) }


//查分数        --免费
export const SearchFraction = function (SearchFractionObj) { return FlyAjax({ url: "school/search/", method: "get", ...SearchFractionObj, }) }

//获取分数     一分一段     --免费
export const SearchRFraction = function (SearchRFractionObj) { return FlyAjax({ url: "school/piecebypiece/", method: "get", ...SearchRFractionObj, }) }

//获取排名     一分一段     --免费
export const SearchRanking = function (SearchRankingObj) { return FlyAjax({ url: "school/piecebypiece/", method: "get", ...SearchRankingObj, }) }

// Vip查学校
export const VipSchool = function (VipSchoolObj) { return FlyAjax({ url: "school/major/search/", method: "get", ...VipSchoolObj, }) }

// Vip查专业
export const VipMajor = function (VipMajorObj) { return FlyAjax({ url: "school/major/search/", method: "get", ...VipMajorObj, }) }

// Vip就业前景
export const VipProspect = function (VipProspectObj) { return FlyAjax({ url: "position/jyqj/report/", method: "get", ...VipProspectObj, }) }




// export const Homedata = function () {
//     return FlyAjax(
//         {
//             url: "v1/school/search/",
//             method: "GET",
//             body: {
//                 p: "2",
//                 kw: "北京",
//                 s: "20",
//                 pv: "广东"
//             },
//             params: {

//             }
//         }
//     )
// }

// function Homedata(Flydata) { return FlyAjax(Flydata) }

// module.exports = { Homedata };
