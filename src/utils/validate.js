export default class wmsValidate {
    static publicRules (fullField) {
        //  所有的规则写在这个对象中
        let ruleObj = {
            mobile: {reg: '^1[0-9]{10}$', msg: '手机号码格式不正确'},
            telephone: {reg: '^[0-9]{3,4}-[0-9]{7,8}$', msg: '电话号码格式不正确'},
            linkNumber: {reg: /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$|^0?1[3|4|5|7|8][0-9]{9}$/, msg: '手机或固定电话输入有误'},
            code: {reg: '^[0-9a-zA-Z]*$', msg: '编码只能是字母或数字'},
            stockCode: {reg: /^([a-zA-Z]{0,16}[0-9]{1,3}|[0-9]{1,3})$/, msg: '16位以内字母+3位以内数字'},
            stockNum: {reg: /^[1-9]{1}[0-9]{0,2}$/, msg: '数量范围0-999'},
            barcode: {reg: '^[0-9a-zA-Z-]*$', msg: '编码只能是字母,数字,-'},
            goodsNumber: {reg: '^[0-9]+([.]{1}[0-9]+){0,1}$', msg: '只能填写整数或小数'},
            xiaoshu: {reg: /^\d+(\.\d{1})?$/, msg: '请输入不超过一位小数的数字'},
            xiaoshu2: {reg: /^\d+(\.\d{1,2})?$/, msg: '请输入不超过2位小数的数字'},
            intNumber: {reg: '^[1-9]*[1-9][0-9]*$', msg: '只能填写正整数'},
            xiaoshu3: {reg: /^\d+(\.\d{1,3})?$/, msg: '请输入不超过3位小数的数字'},
            receiptPercentage: {reg: '^(?:[0-9]{1,3}|1000)$', msg: '超收额百分比只能是1-1000'}
        }
        return ruleObj[fullField]
    }

    // 直接调用 publicValidate 方法即可， 定义fullField  正则里面添加对应fullField 的规则
    /*
     *   默认不校验空值情况， 若是必输  添加 {required:true, message:"手机号码不能为空"}

     例子： mobileNumber: [{validator: wmsValidate.publicValidate , trigger: 'blur', fullField:'mobile' }]
     */
    //  公用校验方法

    static publicValidate (rule, value, callback) {
        let m = wmsValidate.publicRules(rule.fullField)
        if (new RegExp(m.reg).test(value) || !value) {
            return callback()
        } else {
            let msg = rule.message || m.msg
            return callback(new Error(msg))
        }
    }

    // 校验地址控件选择 必填, 不能双向绑定 改变数据
    static proviinceValidate (rule, value, callback) {
        if (_.isArray(value) && value.length === 3) {
            return callback()
        } else {
            return callback(new Error('地址不能为空'))
        }
    }

}
