const mongoose = require('mongoose')
var Schema = mongoose.Schema;
// 连接数据库
try {
    mongoose.connect('mongodb://127.0.0.1:27017/myfund')
} catch (error) {
    console.log(error)
}

// 建表
// 持仓列表
var holdFundList_Schema = new Schema(
    {
        name: { type: String },                 // 基金名称
        code: { type: Number },                 // 基金编码
        type: {type: String, default: '其他' }, // 理财产品类型
        buySource: { type: String },            // 购买平台
        createTime: { type: Date, default: Date.now },  // 创建时间
        UpdateTime: { type: Date, default: Date.now },  // 更新时间
        buyPrice: Number,   // 购买价格
        buyMoney: Number,   // 购买金额
        remark: String,     // 备注
        isDelete: Boolean,  // 是否删除-
        userID: String      // 所属用户
    }
)
module.exports = { holdFundList_Schema }

/* mongoose.connection
    .once('open', function() {
        console.log("数据库连接成功, 开始创建表模型...")

        var fundList = mongoose.model("holdFundList", holdFundList)
        var f = new fundList()
        f.save(function(err, res) {
            console.log(err, res);
        })
        // process.exit(1);
    })
    .on('error', function(error){
        throw error
    }) */

    