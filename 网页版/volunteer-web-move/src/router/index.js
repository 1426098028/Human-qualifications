import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

//子路由懒加载总表
const Home = () =>
    import('@/views/Home/Home/')
const Location = () =>
    import('@/views/Location/Location/')
const Search = () =>
    import('@/views/Search/Search/')
const SearchAll = () =>
    import('@/views/Search/SearchAll/')
const SearchMajor = () =>
    import('@/views/Search/SearchMajor/')
const School = () =>
    import('@/views/School/School/')
const Major = () =>
    import('@/views/Major/Major/')
const Fraction = () =>
    import('@/views/Fraction/Fraction/')
const Occupation = () =>
    import('@/views/Occupation/Occupation/')
const EvaluationResults = () =>
    import('@/views/Occupation/EvaluationResults/')
const PitchingLine = () =>
    import('@/views/PitchingLine/PitchingLine/')
// const PitchingLine = () =>
//     import ('@/views/PitchingLine/PitchingLine/')
const Pc = () =>
    import('@/views/Pc/Pc/')

const Prospect = () =>
    import('@/views/Prospect/Prospect/')
const My = () =>
    import('@/views/My/My/')
const Member = () =>
    import('@/views/Member/Member/')
const Collection = () =>
    import('@/views/Collection/Collection/')
const Evaluation = () =>
    import('@/views/Evaluation/Evaluation/')
const Table = () =>
    import('@/views/Table/Table/')
const Edit = () =>
    import('@/views/Edit/Edit/')
const Coll = () =>
    import('@/views/Edit/Coll/')

//主路由
const Tabbar = () =>
    import('@/components/Tabbar/Tabbar')
const Login = () =>
    import('@/views/Login/Login')
const Register = () =>
    import('@/views/Register/Register')











//路由表
const routes = [
    //Pc电脑
    {
        //访问路径
        path: '/Pc',
        name: "Pc",
        //路由懒加载
        component: Pc,
    },
    //登录
    {
        //访问路径
        path: '/Login',
        name: "Login",
        //路由懒加载
        component: Login,
    },
    //注册
    {
        //访问路径
        path: '/Register',
        name: "Register",
        //路由懒加载
        component: Register,
    },
    //底部
    {
        //访问路径
        path: '/',
        //路由懒加载
        component: Tabbar,
        //子路由
        children: [
            //首页
            {
                //访问路径
                path: '/',
                name: "Home",
                //路由懒加载
                component: Home,
                keepAlive: true,
                isBack: false
            },
            //定位
            {
                //访问路径
                path: '/Location',
                name: "Location",
                //路由懒加载
                component: Location,
            },
            //表格
            {
                //访问路径
                path: '/Table',
                name: "Table",
                //路由懒加载
                component: Table,
            },
            //搜索
            {
                //访问路径
                path: '/School',
                name: "School",
                //路由懒加载
                component: School,

                meta: {
                    keepAlive: true //需要被缓存
                }
            },
            {
                //访问路径
                path: '/SearchAll',
                name: "SearchAll",
                //路由懒加载
                component: SearchAll,
                meta: {
                    keepAlive: true,
                    isBack: false
                },

            },
            //搜索学校
            {
                //访问路径
                path: '/Major',
                name: "Major",
                //路由懒加载
                component: Major,
                meta: {
                    keepAlive: true //需要被缓存
                }
            },
            //搜索专业
            {
                //访问路径
                path: '/Search',
                name: "Search",
                //路由懒加载
                component: Search,
                meta: {
                    keepAlive: true //需要被缓存
                }
            },
            //搜索专业SearchMajor
            {
                //访问路径
                path: '/SearchMajor',
                name: "SearchMajor",
                //路由懒加载
                component: SearchMajor,
                meta: {
                    keepAlive: true //需要被缓存
                }
            },
            //查分数
            {
                //访问路径
                path: '/Fraction',
                name: "Fraction",
                //路由懒加载
                component: Fraction,
            },
            //投档线
            {
                //访问路径
                path: '/PitchingLine',
                name: "PitchingLine",
                //路由懒加载
                component: PitchingLine,
            },
            //职业测评
            {
                //访问路径
                path: '/Occupation',
                name: "Occupation",
                //路由懒加载
                component: Occupation,
            },
            {
                //访问路径
                path: '/EvaluationResults',
                name: "EvaluationResults",
                //路由懒加载
                component: EvaluationResults,
            },
            //就业前景
            {
                //访问路径
                path: '/Prospect',
                name: "Prospect",
                //路由懒加载
                component: Prospect,
                // meta: {
                //     keepAlive: true //需要被缓存
                // }
            },
            //我的
            {
                name: "My",
                //访问路径
                path: '/My',
                //路由懒加载
                component: My,
            },
            //信息
            {
                name: "Edit",
                //访问路径
                path: '/Edit',
                //路由懒加载
                component: Edit,
            },
            //编辑
            {
                name: "Coll",
                //访问路径
                path: '/Coll',
                //路由懒加载
                component: Coll,
            },
            //我的会员
            {
                name: "Member",
                //访问路径
                path: '/Member',
                //路由懒加载
                component: Member,
            },
            //我的收藏
            {
                name: "Collection",
                //访问路径
                path: '/Collection',
                //路由懒加载
                component: Collection,
            },
            //我的测评
            {
                name: "Evaluation",
                //访问路径
                path: '/Evaluation',
                //路由懒加载
                component: Evaluation,
            },
        ]
    },
]

const router = new VueRouter({
    routes
})



// 全局路由守卫 拦截所有路由
// router.beforeEach((to, from, next) => {
//     let UserAgent = navigator.userAgent;
//     let Agents = [
//         "iPhone",
//         "Android",
//         "iPad",
//         "iPod",
//         "SymbianOS",
//         "WebOS",
//         "BlackBerry",
//     ];
//     console.log(UserAgent);
//     let flag = false;
//     for (let i = 0; i < Agents.length; i++) {
//         if (UserAgent.indexOf(Agents[i]) > 0) {
//             flag = true;
//             break;
//         }
//     }
//     if (flag) {
//         next();
//     } else {
//         if (to.path === '/pc') {
//             next();
//         } else {
//             return next({ "path": "/pc" })
//         }
//     }
// })

export default router