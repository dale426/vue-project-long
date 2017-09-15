var Mock = require('mockjs')
module.exports = {
    'POST /src/api' (res, req) {
        let data = Mock.mock({
            'data|15': [{
                code: '@string(5)',
                'orderStatus|1': ['已受理', '未受理'],
                orderTime: '2017-09-09',
                payTime: '2017/3/4',
                realPayFee: '445',
                remark: '白色红色',
                shipFee: '@number(4)',
                shouldPayFee: Math.random() * 100 >> 0,
                sourceCode: '@string(10)',
                sourceFrom: '中国',
                type: '类型'
            }]
        })
        setTimeout(() => {
            req.send(data.data)
        }, 1000)
    }
}
