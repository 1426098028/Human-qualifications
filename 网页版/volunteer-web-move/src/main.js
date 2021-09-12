import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入Vant Ui库
import Vant from 'vant';
import 'vant/lib/index.css';
//全局注册Vant组件库
Vue.use(Vant);
import { Toast } from "vant";
Vue.use(Toast);
import { Lazyload } from 'vant';

Vue.use(Lazyload, {
    lazyComponent: true,
});
import { List } from 'vant';

Vue.use(List);

import VueAmap from '@/utils/VueAmap'
Vue.prototype.$VueAmap = VueAmap;


//引入Element Ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入 vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)









//自动设置 Rem 自适应
import 'amfe-flexible'
//引入全局样式
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


// //自动定位
// if (sessionStorage.getItem("Latlong") !== null && sessionStorage.getItem("Latlong") !== undefined && sessionStorage.getItem("Latlong") !== '') {
//     // console.log("已定位")

// }
if (sessionStorage.getItem("Latlong") === null || sessionStorage.getItem("Latlong") === undefined || sessionStorage.getItem("Latlong") === '') {
    // console.log("定位失败")
    VueAmap()
}