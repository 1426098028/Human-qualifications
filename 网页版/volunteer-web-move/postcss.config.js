// postcss.config.js
//PostCSS 配置文件
//自动 px 转换 rem
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //37.5根据设置稿定
            // 设计稿 375:37.5
            // 设计稿：750:75
            // Vant 是基于 375
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};