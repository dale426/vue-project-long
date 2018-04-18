// import mongoose, { Schema } from 'mongoose';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 持仓列表
var holdFundListSchema = new Schema(
    {
        name: { type: String },                 // 基金名称
        code: { type: String },                 // 基金编码
        type: { type: String, default: '其他' }, // 理财产品类型
        buySource: { type: String },            // 购买平台
        createTime: { type: Date, default: Date.now },  // 创建时间
        UpdateTime: { type: Date, default: Date.now },  // 更新时间
        buyTime: {type: Date, default: Date.now}, // 购买时间
        buyPrice: Number,   // 购买价格
        buyMoney: Number,   // 购买金额
        remark: String,     // 备注
        isDelete: Boolean,  // 是否删除-
        userID: String,      // 所属用户
        rate: Number, // 费率
        rateFee: Number // 手续费
    }
)
const holdFundLists = mongoose.model('holdFundList', holdFundListSchema)
module.exports = holdFundLists
