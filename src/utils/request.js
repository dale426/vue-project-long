/**
 * Created by Kevin Zhang on 2017/10/17.
 */

/**
 * http配置
 */
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import { dealParams, createSecret } from './utils'
import qs from 'qs'
// import {isOnlineEvn} from './utils'
// http请求拦截器
axios.interceptors.request.use(
    config => {
        // 解决IE中请求缓存的问题
        config.headers.common['If-Modified-Since'] = '0'
        return config
    },
    err => {
        $.UI.tips(err)
        return Promise.reject(err)
    }
)
const request = options => axios.request(options)

request.get = (url, params = {}) => {
    params = dealParams(params)
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
    const reqCsrfToken = Cookie.getItem('Csrf_token') || ''
    if (_.isObject(params)) {
        params['Csrf_token'] = reqCsrfToken
    } else {
        params = params + '&Csrf_token=' + reqCsrfToken
    }
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
    let csrfType = 'cloudStorehouse' + createSecret()
    let data = await request.jsonp(tokenUrl, {csrfType: csrfType})
    if (data.result === 'error') {
        return data
    }
    Object.assign(params, {csrfType: csrfType, csrfToken: data.data})
    let finData = await request.jsonp(url, params)
    return finData
}

request.jsonp = (url, params = {}, callbackParamName = 'callback') => {
    return new Promise((resolve, reject) => {
        return axios({
            url,
            adapter: jsonpAdapter,
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

class Person {
    constructor (name, age) {
        this.namae = name
        this.age = age
    }
}
