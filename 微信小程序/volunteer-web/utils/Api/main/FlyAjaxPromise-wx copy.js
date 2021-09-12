const CryptoJS = require("../../CryptoJs/Crypto-js.js");
const { JSEncrypt } = require('../../Jsencrypt/jsencrypt.min.js')
//引入fly实例
const Fly = require("../../Flyio/wx_flyio.min.js")
const fly = new Fly()
//配置请求基地址
fly.config.baseURL = "http://gkzy.renzihang.cn/api/v1/"

module.exports = function FlyAjaxPromise(obj) {
    return new Promise((resolve, reject) => {
        // 保存fly.request返回值：promise对象 直接得到数据
        let RequestResults
        // 转换 method值为小写
        obj.method = obj.method.toUpperCase().toString()
        console.log(obj.method)
        if (obj.method == "GET" || obj.method == "DELETE") {
            // 判断body是否带有数据
            if (typeof obj.body == "object" && Object.keys(obj.body).length != 0 || typeof obj.params == "object" && Object.keys(obj.params).length != 0) {//当obj.body数据为对象时
                // if (typeof obj.body == "object" && obj.body != null || typeof obj.params == "object" && obj.params != null) {//当obj.body数据为对象时
                console.log("当obj.bod或obj.params数据为对象时")

                // console.log(Object.keys(obj.body).length != 0 ? obj.body : obj.params)
                //添加请求拦截器
                RequestInterception()
                //添加响应拦截器，响应拦截器会在then/catch处理之前执行
                ResponseInterception()
                // RequestInterception(Object.keys(obj.body).length != 0 ? obj.body : obj.params)
                // Object.keys(obj.body).forEach(item => {
                //     obj.url = `${obj.url}?${item}=${obj.body[item]}`
                //     console.log("body")
                // });
                // Object.keys(obj.params).forEach(item => {
                //     obj.url = `${obj.url}?${item}=${obj.params[item]}`
                //     console.log("params")
                // });
                // console.log({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
                RequestResults = fly.request({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
                // } else if (typeof obj.body == "string" || obj.body != null) {//当obj.body数据为字符串时
            } else if (typeof obj.body == "string" && JSON.stringify(obj.body) != "{}" || typeof obj.params == "string" || JSON.stringify(obj.params) != "{}") {//当obj.body数据为字符串时
                //添加请求拦截器
                RequestInterception()
                //添加响应拦截器，响应拦截器会在then/catch处理之前执行
                ResponseInterception()
                // console.log("当obj.bod或obj.params数据为字符串时")
                // console.log(JSON.stringify(obj.body) != "{}" ? obj.body : obj.params)
                if (JSON.stringify(obj.body) != "{}") {
                    obj.url += "?" + obj.body
                }
                if (JSON.stringify(obj.params) != "{}") {
                    obj.url += "?" + obj.params
                }
                console.log({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
                RequestResults = fly.request({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
            } else {//当obj.body数据为空时
                console.log("当obj.bod或obj.params数据为空时")
                //添加请求拦截器
                RequestInterception()
                //添加响应拦截器，响应拦截器会在then/catch处理之前执行
                ResponseInterception()
                // console.log(obj.url)
                console.log({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
                RequestResults = fly.request({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
            }
        } else if (obj.method == "POST" || obj.method == "PUT") {
            //添加请求拦截器
            RequestInterception()
            //添加响应拦截器，响应拦截器会在then/catch处理之前执行
            ResponseInterception()
            // console.log(obj.url)
            console.log({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
            RequestResults = fly.request({ url: obj.url, method: obj.method, body: obj.body, params: obj.params })
        }
        RequestResults
            .then((response) => {
                console.log("请求数据成功", response)
                resolve(response);
            })
            .catch((err) => {
                try {
                    console.log("请求数据失败  --自动处理完成", err)
                    resolve(err);
                } catch (err) {
                    console.log("请求数据失败  --请手动处理", err)
                    reject(err)
                }
            })
    })
}
//添加请求拦截器
function RequestInterception() {
    fly.interceptors.request.use((request) => {
        return new Promise((resolve, reject) => {
            console.log("拦截成功  --开始", request)

            // 进行验证Token是否过期
            let Token
            Token = true

            if (Token === true) {   //没有过期
                console.log("没有过期")
            } else {  //已过期重新登录
                console.log("已过期重新登录")
                return reject(request)
            }
            // 获取RSA秘钥中的私钥
            let getRsaObjPrivateKey = RsaSecretKey().PrivateKey
            dataDecryption(getRsaObjPrivateKey)
            // 进行判断 body和params那个有值
            let Flydata = Object.keys(request.body).length != 0 ? request.body : request.params
            console.log(Flydata)
            //加密和生成Sign签名      --开始
            //生成时间戳 
            let getGTime = GenerationTime()
            console.log(getGTime)
            // 对Url进行ASCII码排序
            let getUrl = AsciiSort(Flydata, getGTime)
            console.log("请求链接", getUrl)
            //对处理完的Url进行Md5加密
            let getToken = CryptoJS.MD5(getUrl).toString().toUpperCase();
            console.log(getToken)
            // 获取RSA秘钥中的公钥
            let getRsaObjPubkey = RsaSecretKey().PublicKey
            // console.log(getRsaObjPubkey)
            //进行Token加密和生成Sing
            let Sign = TokenEncryption(`${getToken}|${getGTime}`, getRsaObjPubkey)
            //加密和生成Sign签名      --结束
            request.body.sign = Sign
            request.params.sign = Sign
            console.log("拦截成功  --结束", request)
            resolve(request)
        })
    })
}

//添加响应拦截器
function ResponseInterception() {
    //添加响应拦截器，响应拦截器会在then/catch处理之前执行
    fly.interceptors.response.use((response) => {
        return new Promise((resolve, reject) => {
             // 获取RSA秘钥中的私钥
             let getRsaObjPrivateKey = RsaSecretKey().PrivateKey
             dataDecryption(getRsaObjPrivateKey)
            console.log("响应成功   --开始", response)
            let responseData = TokenDecrypt(response.data.data.join(''))
            response.data.data = JSON.parse(responseData)
            console.log("响应成功   --结束", response)
            if (response.engine.readyState === 4) {
                if (response.engine.status >= 200 && response.engine.status < 300 && response.data.code === 200) {
                    console.log("请求数据成功", response)
                    resolve(response)
                } else {
                    console.log("响应失败   --结束", response)
                    reject(response)
                }
            }
        })
    })
}

//RSA加密和生成Sign签名      --开始


//RSA秘钥
//可以这样获取到的对象中指定的值 let RsaObj = RsaSecretKey().pubkey
function RsaSecretKey() {
    //公钥  --PublicKey      私钥   ---PrivateKey   
    return {
        PublicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCI0mdivPG2ogup5PQo9OwOhQ85
  ZtaQJWkO0QQzi+aQOVAFkqhxuA0V0HI6tWSDGw2iIJ9JOnH6pPLROOhnk45xpA9k
  yQLeEsUDfL0sX4FYQUp37kBPpZLj/GOyB7XWe7db9q1vc7gBb7x4sTEhD7FRaw1M
  trmdaeJ46Upe6K2VZwIDAQAB
  -----END PUBLIC KEY-----`,
        PrivateKey: `eab8325abc5a1440b7708431e83f79acbb6d93e754ffb97db9a3e909336ebc6fa5c77d03767d43a902fe34554e069f3ef108ec973e20e97d0c32be7356d22a1f6e8ea837a9814ec86c6859fb3b96d3fb0da6d88616db0814424cc90ed7173d4d3a521ffa49f8fef38c96a9e0d48942af1098faabeffce6ce9396349e781b0121bb138ee2e5071203596892769def218b6b92cdf41ddd6826cb9bc7041a1768a414d5beac5ef77825890f7d60902cc3241406eb8e7d7e2ea5144243969c5674c69dc00ac1d7d2202b63956fed0a6aba2dc2309a113c57d679728340626595e2ed049dd99c6fe4570ed96453ffd7797ed3c593f46ffb6f00e92c92f7f8dee2418ff140b52d70d0fe79a64811e3beccd85f324b5a8469b5de7b66da1df6a1aff83686b3d393d97991454fadb15975f80d542af1b9ce2c0dc1fe256d31fc57562d7c41bc9da2f90fbb16e35914724b7c3d40d90c3f9da0ec3bc46d97f352d10654b92f0d7e84127d417aa6bf103a7f100ef3b4ab87065bb15d9c399af49cba1922a1c8e4f62908501c163bc75be78cfca8c4cc1af0c7120c48587e3a3feba06af1e49cd8b595969ebe44bcbec4fd0418b2f750b52c22f23a82775d2638d259aad4dfe6adc036538fa3ac450d013961baeffc52e0f59a7523d27be873478b07c4caf74601057b1f409f17e57151cf5ffba9b60e83f51a74e3af07147ffaef1928a24b098c03d74077616bc888f5c7076a941b15ee679ce830ca9873a458aade87a2510dfa971cac3a9f4714e308363a27430f70f7cd88ae040bb3da5ed0cb4d3dec9d8eeb5bb267329a1132a302f02edc6edff733e793dea68dd6d4409cb14aa53a7a44f330230bc70a54850f4575c9464bd1ae3cf92e08d8dc68cf17a8c84adf82debad0bd9a410178e78ebe809f7edde36f5c1f96b14e54bf4e3b524b13b3e02831838e5c1a96278cc06a628aee9ae771a0ae53d380b0bf985a8c80c85c062152a357151a60665e96a5c6c06f388121726fc3272b10d9e5abbb9de581342d4f06c9710874ab0f255a71091deca815c30064e0c0a35f9cbd3badd028e3e1bf8a5518dab4c5fc4ae041bcabdee665eb472ff21e49536f0e472f7917b115ee03d9ed494dd7c17fbd34462673ede12ba871b1472ace7657e805a466fdeaaa4a1051a5b0a9c6979cd9a71e494e7f0f78bb37de453eb67c4ded1d793100ee54f32c05c8c601d4dbd5102efd01678fbdb648cec709aa0bf7222d98d3b4c95eb519c8c898c19a2b2b2a893db90ac8ec46570ac76eb0c2a23b8ca849a3ae1183172bffa4cfe385e0413a27c0f0bc8420f0cfed86bbe5ffd172eb5dfc6281f8adc767a41c6c731a741bcf5a4c8a7fab13082e125a450c8cd9207e8dd572373a67f58afeef700b241b22299a09aa32a1399d6e4fe423ca08f324d4c7d568d9a01525da2cd571bbce20a140fce56f92a7e2d92c89625d337870323dadc5258f00736e1c15d8e22426a7a1742c3d93bd60d395dcebe79e769786534003782a54c3f448e21b515df49feeb368a2e7e97faf45e97ee0e6a64b645ea0937c1c5d30451427b67bb93a870c3f34f436e9922a85d6b85a0c593e0628eac6ec744f3858e2a2bc5603c5b6dfdc68ec64c8ba90f1743dc9e862ba20e660581b101387b86487936f6b9b3a152fccaabae7e58c7fc907b28dd43919672bbc1c6ed2c711f653686bb760dbad90bc697374945ef3a02daea37aea8fa843339d22f4ab91cf9aa5aae9cded995993949145331bc301894dace57d1683271c925a072dd15ec96364a8f00b2cb2dbc4d3e8bddcd6a0ecf62528019c6857d866699375ef111dbcdcd830e437f9edeb57e272b0ad8f07868fa2d0fe112296b1efd7b11603b2e6010eab7914b6421dd07e97c008150fb56d6b63b8c2b19f689fe36175e4a8e9915382b060e4524d709fe83d835c1d9c2fb32774e5e5a1280e167f285169fc04a737f331ae301e16c905f64593293129f19b26706830a43e4e3117ffc2a83b41c6ba06557b56fb91613955abe8c9101d1934bc5b41fca51f794a1c9e1f33d3d740afddf30ae603c51ced1eec8af1e3fdb663f94ed490aa9cd1f87bc266c235c721061c1786afe25865820c70bc88c685cd0eb5b9f16fe16d1d5fbd4f7fde2d291d59ae6a8d87b2f93496f7e06892ef3e58faf77982395018b46408fa8b06f4e7f746f566c32a9fd07661305aba151dee9553160508eb466232a30700ce5ecb63fad8cbdeca032088028f9037c187c5963f83b7a79ba94dc1af8bdb684d4edce24dc16f742b07bf274a28577695e205553ef99fa15b3b23ce8ce7481f42de9f7f1089d680898eaf0cf44a92980e600f8a21bf3bcff7d640b9b3421760a0736e88bbc4d3fe8e9001e21dd189ca7453f92c7e71fd1fb5f4cbcf94854e286856b8af612c2a296607f1a37e31df11a5f5fda54df2aae0158de6fd7341ac86b2bc6a65cb67180ac8ab0aab0ac0ad44dce7f66f7be1a6847b8dc7cd610e155ee09282e6f411f143da9731dfe07e2f39ae682a5b023b4da1b61bba8cf704b3c5672f971e8eb5487cf1ce8b2959975fcd0f71d847328b935b759f888bdaa0453a8590a27b6cb3974a5f21331f7fd11c7eb90b3171b3218924f17eedf23f6fdf97233c77c567239d81bbe668d6b1cf8f35487e77491d2c0e781cf0ccff9ab6e16e694c8579a76aa820d2f41bf58e51e72e0ceb39fde342cef9ec47bad78925fea98cdcd86e2d4ed48feb873b01f52347618f7ceecf1e5b6dcc4d371ae7dd5a07d54f0185094db0b7ab3750cb4371bf001a13491affff99c7b935c972e8885a2842cf6a34bd16707d8dd018e565d9a8844a6add6421e839e6f7e6dd2f0310036212c3a7b3aae88392ceae8dad3bfe61143e2d8aae57887a9705c128bfa2563fbd7ccca2aa2e92938c8f66c2c94ca62bb5a00b2a8d319362cd7afc1f851386ebca38ec685c5fec9e992c165a184650f65d8c79568c36146a8af60f901d4dc554a9ee1c9110530781b33dba3b73423eae921ab3a554df2e591d70d24a28da1863e5c32eaa3e434257e731f7c1da4359430930166341e113469ff0e9820dbb641958462794a7b89bd941554e5a6027310c1917b7ce51b122de13514fff1961049fa162d1d8f108ef30a1e49b42028c11ac493759216eb95b9211766161a1f6bbce0c2ea0fc5c89d8d45b6ba787e3bb2cb96a84031b28117f875504c7937ee0b2560ee813d880fbdec87ca80c7cd6f53e81cf5292f2bf5d7e2aa28e7bc4b64dd9d0ba7df92cbae1f702b41e77b09fd945c401335dab143473b483bcdaaa339637d2821b71801349b9297b884671e6d26d5a0a19f72dfa51423e4e36591f7c22125ea32fc332b7c065fd22d98e4658320814749f2b2b29f56df264399a93d74626e4bfec89c92c0ab9784550b9431e44ec265524ece7f8cd74da887ee268b3d80225741e1980a3941cae67c5f97189e6dc964f31b4671945d73e56124aa3f8c44d5327b6f56d383400ed37687760e859a9fb7e873d87cff8eeada3352ca04fd7ec2cc03343acd730aa6a8cf5e5fcaa15878cfef250201333ad8c16832b60344fc19b3bb70456f1ced2ed98d484d71598e9134a542a61bdfd4883984ccc672223c3c28aae594c97ccb0094c16d6e3a62d0825dafe3b350f6a45068127e52d6de9ef4c017fd02c68d8710355a864028413b6aa87c52ae4829943536101990dddccac54cf374eb7c7d1ce9eb9e649a9e1eb98fe1066e851e1a32d595a49fd4e64942e43de17d308fe900b96c850f7d4247f66f2c50ce68b1f8da45e1df4c968927ef91ddbd42f0fa960ad6537124cd54447a02214d0259643ae5cac932e30615847230ca3d3d18d3f9089e2a0f1f7e007116aaed7efdb43d60a24580ab68f707e6235e300d0e18f0b671366c8dd76d980726e361479f4fd9de9e9848a9f46440359715f25049dbed4b6ef622d2247e27624a242d70b7fc09bdba3ace9ac9898a5055dcc2613ff886aa05c9830a4cd9f3c24b5cbee5c8d0d97efe0681f14958e272b08c0f7e9c6d5cb01027e0a9911a4316f3b1a17431dc337e2a808b5900c346a89e365de3649d6ae72add70394ae5ed9a5a06fff1eeed7d9ae639deaba8e1eedd1109c406284de7262796f33f032d9449609ae5ddc1fef47be47490e288f7e15ab19d24bda70d115ec31251773c5df4423430fa05d4bb4044fc50733c7c2e8b5aa1867e82e8e368a2a8fa622de1e6421a5a0557379f44d245a5eb8806c7357441dfbec7941aad68781206c84b68d160bafee4b0edad9b48f04b8c9a875f56b375a262251c6ed76c1d917093a5a835ca4fb502dead6cd29a3d337dcbbf0e4b96bc716a780e3152991f9bcaf107a8f287308e93e090a94a9e8420675752008194bc69fdda332fbfa1b8c1e60c72694adfea6d798b4608ffbd7c1a98bd65e3021a94dd65f7277dc3bde411915feb505d6be1f4460eecac85f95eb87301b0c69286a716ab14ee68c510307af148275d06c0acb7381805e474c1627a55aa5021ac6657d03c98ecb8b76f3fdd9fb305177de1a8db771c7b95a54d7224e51dd1e597729fe577bccfa96497ac9e015ce8f168d1e019d96ba00f91cc77ff5b9f0f92b862b59d656eec985a91bbc345dafcf389ea03a94f5b588a6998ac9c3446b9d88fbb2a2b1d9d8d23442fab8064b599e4e2e40f3032ab51e3d12f3c3ddd8674db1ab0746520db94be57b69dab0a31a27eae4c8f1366e29f687723e92d4e002de5f0f0f1ee234a0e05afe98f17fb67d210e813b551f7d33ac1226fc3cd3ff9d9d471497d95424ee4419107f444b903058abcda671734c5180c68e6a13f82331a8ec6ec233d2cd8af76332ff035c58dfc32340dde91246b276d1804859d8ccc8db15736b0c415266e74f5e5f6877667ae16e5d9abdbac5e1e2d73a41403e7156b50758f8380e657cf7e8bc1b9cd7688d0dac86828b18e2c3f80181ce654a7bcd5bf8d59a7715d16668f2289df52d1a4bc0ebe433f40af6fc266167c32f00fbaddffbf58b0e93ed76fd06e96128751cba2764ed4f8b503e43821d462c3e2039bbc3781b2b3c20927502bf6d2fb0de31b71f85d97a9804dc8876910be9c2e2ff6a94ccee5f241b253b6cb9ae5019a0f17f02ede78575f29cd169850a55eb95df9d5927f7edb35b9b4729de2037036fc598d7f8a7b389b7cd2238d1068c2048fe9acd0aafd4fd74afaba772d3af2bc77e7ed8eb5f7ecdd887173a5845c6cdd5340816c26b66a0d504976c569bf996fca3cd1bdf17e64af5684fed9c822482d67b1f82902e7965926f8d2318ff514c48e8be5d271691bcbcd80fbf6884b9e15808592d6a2916451becdcbd30779beb57128fa24cd61a6fbe757264a18b5c2f23f5a09bc56847b034f1d2cd426d6459750b3c9944eadc4933484888e0e0c7b3f08d2e5aa8ca6e3359b7c6a1623a85509df7bb51f631b43e4620da6612f4fb0394329bc0dbc9140b9f53378b2fe87a4681d8f684054911be6a644d9a6e396ae192ed4c9b0e83b19761dc42ca5da2a4509e5aa5abf2309c6d8431314af9d6b29afba8a3930419a3e92c4213f8ec35b923b4fa939a87242f4dfc7a96c6e159a6b3f680fd6f53717bad0a52d18ce9a3af613ecd83d803af9e4539f03959106c3a838c3db1bd6b552a981872f914c28060abf2b77a5ff03903d90dc8c8d3c609ab01d2934a06173cf9fa3ba3019fc9ae0900cb00cdb0a22e633d41dfe3e8640741e07708c1dea7d6e907aa59724f4d87749ae5f29cb8f81aedb8880c65c727821f557b08e3c6bf60a4c6704c2a475d17f06d369afa3f3957cbadc0dfdccb4e7b290394634a60b44781fba39059a364fe9e0124bba90c1aea00ace64f9447dcbf67640c3e74cc8d2e48c1eea3996d0d7a7e155c0a93815274189060213ed1023f18165ddd815004708483b8da7815304423b4de4a377d99db8b85a269120985edb630346fb56e5d1662201f0effbcfe1ede41df212a778eecd46a2f4dd6d45860f4691023939a5ed0c40481b5db953c449ce2543004ce42e88ffad4546159bc3eb6e897689a59d6528ccfa12cad4fe3214f4416ce349c8ff6b8d8534c0bdd99625c04bf6164c1a9b610e96f6141f0330654f347ee3aac240b2a37a05c49772aaf96deb78f0c22413959b0fa1ee7692c405141af871c1dc3ce61410c69473551d0854f6741e0af3b84dfa2ca0fa6061f7e8824bbe53353b00ac96d6c0c2b23d5651a7b8a796af2ced48700187819d27f9af324e0e66aebbcce4bc9c22084811077f16f9e156c9cc75ff4c57b671c9d05f25389bbcc01a18bff6b6d9ce1144bfc3bd64d7838dacc406990f3faeed31d83368331fd025e7409855c297844aaa338c645156c03ed3b93f058bc19bdd5274478b210ebc471fbb4803dc58c500180e45f1d50f1d54d92415324109d1541d9ee5d935f77744c7dfc73e7c68bef295132a8d341a4b14583a872cfe796af1cb3010ce41689d289e6f9d10cafa4f8594e2b372180d879fd2e148c4740c85ffe7bdc1e4f0c4c3edd0f361666fa6521ea9f05317076e747785538ad19ea8b556d9b809d01ae27dfb7f02b8b9a37416273987de5080472a202681e39fa0ad5b0e05d8faf6bffc4023a4b5a1fda4205dbc80cda3215fe3c4577638a51d301c0551ca1b78d3e6c991a2a0e5e04e9bae17911f95b3b030ce7c3cc0de0af7e3d31c229571771b1d09b4321e41fd7ac844b4bdf241cdd8c4066c73a7ccdd5d1ac37ec6657dd5076b085668a48f4e49229349ac86a7813b3a617755604ec5b8b5cf7c675d16ead8f4e4dd467332b3baee40918d693bb089d55b863736e7f1e82bda6d5509b4b84b2784bab2ad4f5f07c398458888eee3f0cc0d0ce20c6d85b52a769277ea70250bb894a7320a709ff38486f4b8f343f0a7e962353aab35b2c0c2886429418971ad03238d150f5b5f06812cb0ad22acb32a3519968d6ddb334c1e25281a8869bb4c942f660ebd03d945e7ea942d21cf8df10d6e0e1fe138367eeb7cf8c442d25cbba319320b24dbec09609d29bf589aff084adf8c03e72d364798ec3c2dce1eb40fcae5dbbc2d55f6ae9abc0b45e6f08512b53407bdbeb9d081f2d501280ae79012108d3ad6c9d041cfda3ab351c4188ed9a36fd74654b7f7dbfb88154cce9e3e8e3124d16fe128ee256b5309b812c`,
    }
}

//对Url进行ASCII码排序
/**
*  bodyObj     传入body或params的参数对象
* 
*/
function AsciiSort(bodyObj, getGTime) {
    const rzhAppKey = 'rzh2021';
    const rzhAppSecret = 'db426a9829e4b49a0dcac7b4162da6b6';
    let res = Object.keys(bodyObj).sort();
    try {
        let tempArr = [];
        for (let key in res) {
            let _key = (res[key]);
            let value = (bodyObj[res[key]]);
            if (typeof value === typeof {}) {
                // 特殊处理一下对象， 避免参数过长
                value = 'EISNTFJP'
            }
            tempArr.push(_key + '=' + value);
        }

        let getUrl = tempArr.join('&') + '&'
        getUrl += `rzhAppKey=${rzhAppKey}&rzhAppSecret=${rzhAppSecret}&timestramp=${getGTime}`
        return getUrl;
    } catch (err) {
        let getUrl
        getUrl += `rzhAppKey=${rzhAppKey}&rzhAppSecret=${rzhAppSecret}&timestramp=${getGTime}`
        return getUrl;
        // return '';
    }
}
//生成时间戳
function GenerationTime() {
    let d = new Date();
    let time = d.getTime() / 1000;
    return time.toFixed().toString();
}
//Token加密和生成Sign签名认证
/**
*  RsaObjPubkey的值要从RsaSecretKey函数中获取
*  Token是从AsciiSort排序后得到的值        --要加密Md5
*/
function TokenEncryption(Token, getRsaObjPubkey) {
    //创建JSEncrypt实例对象
    let EncryPtion = new JSEncrypt();
    //设置公钥
    EncryPtion.setPublicKey(getRsaObjPubkey); //获取公钥  RsaObjPubkey
    //对Token进行加密
    return EncryPtion.encrypt(Token);
}
//RSA加密和生成Sign签名      --结束


//解密数据      --开始
function TokenDecrypt(Responsedata) {
    //密钥
    const key = CryptoJS.enc.Utf8.parse('ONxYDyNaCoyTzsp83JoQ3YYuMPHxk3j7')
    //偏移量
    const iv = CryptoJS.enc.Utf8.parse('yNaCoyTzsp83JoQ3')
    //对获取到的数据进行分割合并
    Responsedata = Responsedata.replace(/\-/g, '+').replace(/_/g, '/');
    //开始解密
    let DecryptData = CryptoJS.AES.decrypt(Responsedata, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    //把解密得到的数据进行Utf-8编码转换
    return CryptoJS.enc.Utf8.stringify(DecryptData);
}
//进行数据解密   获取正确的数据
function dataDecryption (getRsaObjPrivateKey) {
    const key = CryptoJS.enc.Hex.parse("4587dc9b6a7c3e9ef3b920f994edc3a210c460977528138d41e58b9b02c94ffd")
    const iv = CryptoJS.enc.Hex.parse("6aa677d0f4d6646eec5e9a82aedb60b0")
    let H = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(getRsaObjPrivateKey)
    })
    let B = CryptoJS.AES.decrypt(H, key, {
        iv: iv
    })
    // console.log(CryptoJS.enc.Utf8.stringify(B));
}
//解密数据      --结束


//Token过期提示   --一天过期
function TiemToken() {
    console.log(-3600000 * 23); //一天
    let currentTime = -3600000 * 23;
    let Timedate = new Date();
    let Times = Timedate.getTime();
    let oldTimes = localStorage.getItem("Times")
    if (Number(oldTimes) - Times < currentTime && localStorage.getItem("username") !== null) {
        console.log('登录过期');
        Dialog.confirm({
            title: "登录过久",
            message: "请重新登录",
        })
            .then(() => {
                window.location.href = "/#/Login"
                window.location.reload()
                localStorage.clear();
                sessionStorage.clear();
                console.log("重新登录");
                return false;
            })
            .catch(() => {
                localStorage.clear();
                sessionStorage.clear();
                // window.location.reload()
                Toast("已取消重新登录,部分功能无法使用");
                return false;
            });
        // return config;
    }
}

// 用户设备信息   --403
function UserDeviceInformation(responseObj) {
    let DeviceLogin = /进行登录\n请确保你的账号没有泄露或者重新登录/gm
    if (responseObj.data.data.code === 403 && DeviceLogin.test(`${responseObj.data.data.detail}`)) {
        Dialog.confirm({
            title: "登录信息",
            message: "responseObj.data.data.detail",
            confirmButtonText: "去登录",
        })
            .then(() => {
                this.$router.push({
                    path: "/Login",
                });
            })
            .catch(() => {
                removeItem("username");
                removeItem("token");
                removeItem("UserInformation");
                sessionStorage.clear();
                Toast("已取消重新登录,部分功能无法使用");
            });
        return false
    }
    return false
}


// 用户Vip信息  --403
function UserVipInformation(responseObj) {
    let YesVip = /会员已到期/gm
    if (responseObj.data.data.code === 403 && YesVip.test(`${responseObj.data.data.detail}`)) {
        Dialog.confirm({
            title: "会员信息",
            message: "是否重新激活使用",
            confirmButtonText: "去激活",
        })
            .then(() => {
                this.$router.push({
                    path: "/Member",
                });
            })
            .catch(() => {
                Toast("已取消重新激活,部分功能无法使用");
            });
        return false

    }
    return false
}

//操作频繁  --429
function Frequently429() {
    console.log("操作频繁请等待5秒后,刷新页面重试")
}

//数据加载完毕  404   --也会是无页面
function Complete404() {
    console.log("数据加载完毕")
}

//收藏过多  --401
function Collection401() {
    console.log("收藏过多,请前去收藏页面进行清理")
}

//网络错误  --0
function NetworkError() {
    console.log("当前您的网络出错了,刷新页面重试！！！")
}


// //请求超时   --1
// function NetworkError() {
//   console.log("请求超时,刷新页面重试！！！")
// }








