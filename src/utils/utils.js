/**
 * Created by Kevin Zhang on 2017/10/17.
 */
import moment from 'moment'
import {devAcl, onlineAcl} from '/share/js/utils/const'

//  获取url中的参数
export function getQueryStringArgs() {
    //  取得查询字符串并去掉开头的问号
    let qs = (location.search.length > 0 ? location.search.substring(1) : '')
    //  保存数据的对象
    let args = {}
    //  取得每一项
    let items = qs.length ? qs.split('&') : []
    let item = null
    let name = null
    let value = null
    //  在for 循环中使用
    let i = 0
    let len = items.length
    //  逐个将每一项添加到args 对象中
    for (i = 0; i < len; i++) {
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length) {
            args[name] = value
        }
    }
    return args
}

export function getDataFormat (thisDate, fmt) {
    if (!_.isDate(thisDate)) {
        return null
    }
    if (!fmt) {
        fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    let o = {
        'M+': thisDate.getMonth() + 1,                 //   月份
        'd+': thisDate.getDate(),                    // 日
        'h+': thisDate.getHours(),                   // 小时
        'm+': thisDate.getMinutes(),                 // 分
        's+': thisDate.getSeconds(),                 // 秒
        'q+': Math.floor((thisDate.getMonth() + 3) / 3), // 季度
        'S': thisDate.getMilliseconds()             //  毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
            (thisDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(
                    ('' + o[k]).length)))
        }
    }
    return fmt
}

export function getAdvancePrams (data) {
    let obj = {}
    for (let i = 0, l = data.length; i < l; i++) {
        if (data[i].value || data[i].value === 0) {
            obj[data[i].field] = data[i].value
        }
    }
    return obj
}

export function dealParams (params) {
    let obj = {}
    for (let k in params) {
        if (params[k] || params[k] === 0 || params[k] === false) {
            obj[k] = params[k]
        }
    }
    return obj
}

export function formatPublicDictData (arr = []) {
    let res = {}
    for (let i = 0, l = arr.length; i < l; i++) {
        res[arr[i].dictCode] = arr[i].dictItemVOList
    }
    return res
}

export function formatTreeData (data = []) {
    let children = []
    for (let i = 0, l = data.length; i < l; i++) {
        children.push({title: data[i].name, code: data[i].goodsCategoryId, ...data[i]})
    }
    let treeData = [{title: '商品类别', code: '', expand: true, children}]
    return treeData
}

/**
 * 动态表单
 * @param String url 表单的action
 * @param String target 表单提交的目标窗口名
 * @param String method 表单提交方法（GET/POST）
 * @param Object params 表单元素集
 * @param Boolean isAutoSubmit 是否自动提交，默认为true
 * @return String 表单的ID
 */
export function _doForm (url, target, method, param = {}, isAutoSubmit) {
    const reqCsrfToken = Cookie.getItem('Csrf_token') || ''
    let params = {
        Csrf_token: reqCsrfToken,
        ...param
    }
    var form = document.createElement('form')
    var sInput = ''
    var idStr = 'dynamic_form_' + (new Date().getTime())

    form.action = url
    form.target = target
    form.method = method
    form.id = idStr
    form.name = idStr
    isAutoSubmit = isAutoSubmit || true

    /*  if(typeof(params) == 'string') {
     params = splitStr(params);
     }  */
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            sInput += '<input type="hidden" name="' + key + '" value="' +
                      params[key] + '" />'
        }
    }
    form.innerHTML = sInput
    document.body.appendChild(form)

    if (isAutoSubmit) {
        form.submit()
        document.body.removeChild(form)
    }
    form = null

    return idStr
}

// numberAndUnit 的异步校验
export async function checkGridEditPromise (rowNodes, message) {
    for (let i = 0, l = rowNodes.length; i < l; i++) {
        if (_.isObject(rowNodes[i].editPromise)) {
            for (let k in rowNodes[i].editPromise) {
                let result = await rowNodes[i].editPromise[k]
                if (result !== true) {
                    message({desc: `第${i + 1}行的'${k}'字段的处理操作未完成`})
                    return false
                }
            }
        }
    }
    return true
}

/* 格式化时间 getDataFormat
 *  date 必须是一个 Date对象
 *  fmt 需要的时间格式，不传时 默认'yyyy-MM-dd hh:mm:ss' (后端一般接口需要的格式)
 */

export function getDataFormat (thisDate, fmt) {
    if (!_.isDate(thisDate)) {
        return null
    }
    if (!fmt) {
        fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    let o = {
        'M+': thisDate.getMonth() + 1,                 //   月份
        'd+': thisDate.getDate(),                    // 日
        'h+': thisDate.getHours(),                   // 小时
        'm+': thisDate.getMinutes(),                 // 分
        's+': thisDate.getSeconds(),                 // 秒
        'q+': Math.floor((thisDate.getMonth() + 3) / 3), // 季度
        'S': thisDate.getMilliseconds()             //  毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
            (thisDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(
                    ('' + o[k]).length)))
        }
    }
    return fmt
}

/**
 * 重设置一下表格
 * @param grid{Object}              表格实例
 * @param columnDefs{Array}         列集合
 * @param sortModelStr{string}      当前排序字段
 */
export function reSetAgTable (grid, columnDefs, sortModelStr = '') {

    if (grid.api) {

        // 滚动位置后回退后表格列混乱
        document.querySelector('.ag-header-container').style.left = '0px'
        grid.api.setColumnDefs(columnDefs)
        // 在重设列的时候导致排序为保存
        // 重设排序
        let orderByClause = sortModelStr.split(':')
        orderByClause.length === 2 &&
        grid.api.setSortModel([{
            colId: orderByClause[0],
            sort: orderByClause[1].toLocaleLowerCase()
        }])
        grid.api.sizeColumnsToFit()
        window.onresize = () => {
            grid.api.sizeColumnsToFit()
        }
    }
}

/**
 *  url拼接参数
 * @param url
 * @param params
 * @returns {*}
 */
export function addUrlParams (url, params = {}) {
    function encodeUriQuery (val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%3B/gi, ';').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'))
    }

    function serializeValue (v) {
        if (_.isObject(v)) {
            return _.isDate(v) ? v.toISOString() : JSON.stringify(v)
        }
        return v
    }

    if (!params) return ''
    var urlPart = []
    for (let k in params) {
        let value = params[k]
        if (value === null || _.isUndefined(value) || value === '') continue
        if (_.isArray(value)) {
            value.length > 0 && urlPart.push(encodeUriQuery(k) + '=' + encodeUriQuery(serializeValue(value.join(','))))
        } else {
            urlPart.push(encodeUriQuery(k) + '=' + encodeUriQuery(serializeValue(value)))
        }
    }
    return urlPart.length > 0 ? url + '?' + urlPart.join('&') : url
}

export function isOnlineEvn () {
    var isOnline = location.href.indexOf('test.tf56.com') == -1 ? true : false;
    return isOnline
}

export function createSecret () {
    return +new Date() + '-' + Math.floor(Math.random() * Math.pow(10,18)).toString(16);
}
//  获取菜单权限
export async function getAclNavData(notice) {
    //  协议类型：http || https
    const isOnline = location.href.indexOf('test.tf56.com') === -1
    let protocol = location.protocol
    let url
    if (isOnline) {
        url = protocol + onlineAcl.getNav
    } else {
        url = protocol + devAcl.getNav
    }
    console.log(url)
    let res = await request.aclJsonp(url)
    if (res.result === 'success') {
        return res.data
    }
}