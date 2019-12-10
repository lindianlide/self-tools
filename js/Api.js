/**
 * [请求接口方法]
 * @param  {[type]} url            url: 请求地址
 * @param  {[type]} data           data: 请求参数
 * @param  {[type]} customConfig   customConfig: 配置项
 * @return {[type]}                返回Promise
 * @description 
 *  兼容zepto参数回调也支持promise方法
 *  customConfig参数说明 规定时间内以及请求没完成时不会重复请求
 *  avoidDuplicateId: 页面防止点击id, 一个请求唯一id;
 *  avoidDuplicateTime: 指定多长时间内不可点击，false为请求完才 可以点击; 默认false
 * @example
 *  import Api from './Api.js'
 *  const memFetch = new Api()
 *  memFetch.get(url, data, config, errorCb)
 *  memFetch.post(url, data, config, errorCb)
**/ 
import { guid } from './common'

const onlineListener = (offlineCb, onlineCb) => {
  window.addEventListener('online', () => {
    // 离线变为联网
    onlineCb()
  })
  window.addEventListener('offline', () => {
    // 离线事件
    offlineCb()
  })
}

const memFetch = function (type) { 
  // 储存id map
  let avoidDuplicateMap = new Map()
  return (url, data = {}, customConfig = {}, errorCb) => {
    let { 
      avoidDuplicateId, 
      avoidDuplicateTime = false,
      timeout = 10000,
      ...rest
    } = customConfig
    // 设置防重发送请求, 第一次状态设为waiting, 根据设置的间隔时间重置
    if (avoidDuplicateId) {
      !avoidDuplicateMap.get(avoidDuplicateId) && avoidDuplicateMap.set(avoidDuplicateId, 'waiting')
      avoidDuplicateTime && setTimeout(() => {
        avoidDuplicateMap.set(avoidDuplicateId, 'waiting')
      }, avoidDuplicateTime)
    }

    return (() => new Promise((resolve, reject) => {
      if (avoidDuplicateId) {
        let status = avoidDuplicateMap.get(avoidDuplicateId)
        // 已经请求过或者正在请求中，阻止请求发送
        if (status === 'pedding') {
          return reject({memMsg: 'duplicate click'})
        }
        // 状态改为pedding
        avoidDuplicateMap.set(avoidDuplicateId, 'pedding')
      }
      let sendTime = Date.now()
      $.ajax({
        type,
        url,
        data,
        timeout,
        headers: {
          traceId: guid()
        },
        ...rest
      }).then(res => {
        // 成功
        avoidDuplicateId && (() => {
          avoidDuplicateMap.set(avoidDuplicateId, 'done')
          return 1
        })() && !avoidDuplicateTime && avoidDuplicateMap.set(avoidDuplicateId, 'waiting')
        resolve(res)
      }).fail(err => {
        // 失败
        errorCb && errorCb()
        avoidDuplicateId && avoidDuplicateMap.set(avoidDuplicateId, 'waiting')
        console.log('请求失败,此处上报')
        reject(err)
      }).always(r => {
        let costTime = Date.now() - sendTime
        costTime > 2000 && console.log('请求时间超过两秒,此处上报')
      })

    }))()
  }
}

export default class Api {
  constructor() {
    this.get = memFetch.bind(this)('GET')
    this.post = memFetch.bind(this)('POST')
    this.onlineListener = onlineListener
  }
}
