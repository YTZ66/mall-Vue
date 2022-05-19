let proxyObj = {}

proxyObj['/'] = {
    //websocket
    ws: false,
    //目标地址
    target: 'http://localhost:8686',
    //发送请求头host会被设置target
    changeOrigin: true,
    //不重写请求地址
    pathRewrite: {
        '^/': '/'
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj//通过nodejs根据这个代理对象请求转发到8081
    }
}

module.exports = {
    devServer: {
        proxy: 'http://localhost:8686'
    }
}