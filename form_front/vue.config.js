module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/former/' :
        '/',
    chainWebpack: config => {
        config.devServer
            .disableHostCheck(true)
    },
    devServer : {
        host:'0.0.0.0'
    }
}