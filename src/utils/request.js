

/**
 * http配置
 */
import axios from 'axios'
// import jsonpAdapter from 'axios-jsonp'
import jsonpFunder from './fundJsonp'
// import { dealParams, createSecret } from './utils'
import qs from 'qs'
// import {isOnlineEvn} from './utils'
function dealFundApi(params = {}) {
    params = {
        ...params,
        version: '5.2.5',
        plat: 'Android',
        appType: 'ttjj',
        RANGE: 'y',
        deviceid: '6dd15fab1af8051b949b1abd3e498064||103118330217668',
        product: 'EFund'
    }
    return params
}
// http请求拦截器
axios.interceptors.request.use(
    config => {
        // 解决IE中请求缓存的问题
        // config.headers.common['If-Modified-Since'] = '0'
        return config
    },
    err => {
        alert(err)
        return Promise.reject(err)
    }
)
const request = options => axios.request(options)

request.get = (url, params = {}) => {
    if (url.includes('FundMApi')) {
        params = dealFundApi(params)
    }
    return new Promise((resolve, reject) => {
        axios.get(
            url, {params},
        ).then((res) => {
            resolve(res.data)
        }).catch((res) => {
            reject(res.data)
        })
    })
}
request.post = (url, params = {}) => {
    // const reqCsrfToken = Cookie.getItem('Csrf_token') || '8555sdaafafsadsa'
/*     if (_.isObject(params)) {
        params['Csrf_token'] = reqCsrfToken
    } else {
        params = params + '&Csrf_token=' + reqCsrfToken
    } */
    return new Promise((resolve, reject) => {
        axios.post(
            url, qs.stringify(params)
        ).then((res) => {
            resolve(res.data)
        }).catch((res) => {
            reject(res.data)
        })
    })
}

request.importPost = (url, params = {}) => {
    const reqCsrfToken = Cookie.getItem('Csrf_token') || ''
    params.Csrf_token = reqCsrfToken
    return new Promise((resolve, reject) => {
        axios.post(
            url, params,
        ).then((res) => {
            resolve(res.data)
        }).catch((res) => {
            reject(res.data)
        })
    })
}
request.aclJsonp = async (url, params = {}) => {
    let tokenUrl = `http://acltest.tf56.com/tfaclWeb/csrfTokenServlet`
    // let csrfType = 'cloudStorehouse' + createSecret()
    let data = await request.jsonp(tokenUrl, {csrfType: csrfType})
    if (data.result === 'error') {
        return data
    }
    Object.assign(params, {csrfType: csrfType, csrfToken: data.data})
    let finData = await request.jsonp(url, params)
    return finData
}

request.jsonp = (url, params = {}, callbackParamName = 'callback') => {
    if (callbackParamName === 'jsonpgz') {
        url = 'http://fundgz.1234567.com.cn/js/' + url
    }
    return new Promise((resolve, reject) => {
        return axios({
            url,
            adapter: jsonpFunder,
            params,
            callbackParamName               // optional, 'callback' by default
        }).then((res) => {
            resolve(res.data)
        }).catch((res) => {
            reject(res.data)
        })
    })
}
window.request = request
// export default request

