const model = require('../models/index')

const FundHoldList = model.holdFundLists
module.exports = function(app) {
    // 查询持仓列表
    app.get('/fund/holdfund/list', function(req, res) {
        FundHoldList
            .find()
            .exec(function(err, data) {
                if (err) {
                    res.status(500).json({ msg: '后端出错' })
                }
                return res.json({ code: '0000', msg: '查询成功', success: true, data: data })
            })
    })

    app.post('/fund/holdfund/insert', function(req, res) {
        let { name, code, type, buySource, buyPrice, buyMoney, remark, userID, buyTime, rateFee, rate } = req.body
        let data = {
            name,
            code,
            type,
            buySource,
            buyPrice,
            buyMoney,
            remark,
            buyTime,
            rateFee: rateFee || 0,
            rate: rate || 0,
            userID: userID || 'long'
        }
        let model = new FundHoldList(data)
        model.save(function(error, data) {
            if (error || !data) {
                return res.status(500).json({ code: '0011', success: false, msg: "后端出错" })
            }
        })
        res.json({ code: '0000', msg: '新增成功', success: true, data: '' })
    })
}
