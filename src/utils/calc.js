/**
* 加法, 用来得到精确的加法结果
* @param  {Number|String} arg1 第一个加数
* @param  {Number|String} arg2 第二个加数
* @param  {Number}        d    要保留的小数位数（可以不传，如果不传则不处理小数位数）
* @return {Number} 两数相加的结果
*/
function add(arg1, arg2) {
    arg1 = arg1.toString(), arg2 = arg2.toString();

    var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."),
        d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";

    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number(result.toFixed(d)) : result;
};

/**
 * 减法
 * @param  参数与加法一致
 * @return {Number} 两数相减的结果
 */
function sub(arg1, arg2) {
    return add(arg1, -arg2, arguments[2]);
};

/**
 * 乘法
 * @param  参数与加法一致
 * @return {Number} 两数相乘的结果
 */
function mul(arg1, arg2) {
    var r1 = arg1.toString(), r2 = arg2.toString(), 
        m, resultVal, d = arguments[2];

    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) 
        + (r2.split(".")[1] ? r2.split(".")[1].length : 0);

    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d === "number" ?  Number(resultVal.toFixed(d)) : resultVal;
};

/**
 * 除法
 * @param  参数与加法一致
 * @return {Number} arg1 / arg2的结果
 */
function div(a, b) {
    var c, d, e = 0,f = 0;

    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}

    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};

export { add, sub, mul, div };

/*
测试：
    add(0.1, 0.2)
    add(2.1, 2.2)
    sub(0.24, 0.1)
    sub(2.2, 1.9)
    mul(7, 0.8)
    mul(2.2, 2.2)
    div(2.1, 0.3)
*/