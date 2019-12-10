const loading = require('../template/src/loading')
const path = require('path')
const parentModFilename = process.cwd()
const projectConfig = require(path.resolve(parentModFilename, 'project.config.js'))
//根据用户配置来是否加载公用js
const JS_MANAGE_CONF = projectConfig.JS_MANAGE_CONF
let js1 = false
const envConf = require('./src/envConf')
checkJSManageConf(JS_MANAGE_CONF)
function checkJSManageConf(JS_MANAGE_CONF) {
  if (!JS_MANAGE_CONF) return
  if (JS_MANAGE_CONF.js1 == true) {
    js1 = true
  }
}

let base = [
  '<meta charset="UTF-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<link rel="dns-prefetch" href="//res.xx.cn">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black">',
  '<meta content="telephone=no" name="format-detection">',
  '<meta name="wap-font-scale" content="no">',
  '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">',
  '<meta name="keywords" content="xx">',
  '<meta name="description"content="xx">',
  '<link rel="stylesheet" type="text/css" href="https://res.xx.cn/common/common.css">',

  projectConfig.customLoading ? '' : loading,

  '<script>function pageInit(){if($&&$.base&&$.base.getQueryString("self_debug")==="prd"){var ERUDA=document.createElement("script");ERUDA.type="text/javascript";ERUDA.src="https://cdn.bootcss.com/eruda/1.4.1/eruda.min.js";window.localStorage.setItem("eruda-dev-tools",JSON.stringify({"transparency":"95%","displaySize":"50%","tinyNavBar":true,"activeEruda":false}));ERUDA.onload=function(){window.eruda&&eruda.init();window.eruda.show()};document.head.appendChild(ERUDA)}window.SELF_ENV=$&&$.base&&$.base.getEnvName()||"PRD"}</script>',

  js1 ? '<script type="text/javascript" src="${js1}"></script>' : '',

  '<script type="text/javascript" src="https://res.xx.cn/public/??js/zepto.js,js/modal.js" onload="pageInit()"></script>',

]


module.exports = envConf(base)

