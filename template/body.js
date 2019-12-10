const path = require('path')
//执行node命令时候的文件夹地址,一般为调用方的package.json所在目录
const parentModFilename = process.cwd()
const projectConfig = require(path.resolve(parentModFilename, 'project.config.js'))
const cliDebugEnvConf =require ('./src/envConf')

//公用加载等待效果和引用公用js
//${commonJs}为前后的合一部署时，后端配置的变量
let base = [
  projectConfig.customLoading ? '' : '<div class="page-loading"><div class="loading-wrap"><div class="loading"></div></div></div>',

  '<script type="text/javascript" async src="${commonJs}"></script>',
];


module.exports = envConf(base)