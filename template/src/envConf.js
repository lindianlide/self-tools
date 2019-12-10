/**
 * Created by root on 2019/2/11.
 */
module.exports = function cliEnvConf(base) {
  if (process.env.SELF_ENV === 'DEV') {
    //有更好的写法 比如webpack tpl插件
    console.log(`${process.env.SELF_ENV}环境下，self-tools替换ftl变量为可用script标签。`)
    for (let i = 0, len = base.length; i < len; i++) {
      if (base[i] === '<script type="text/javascript" async src="${commonJs}"></script>') {
        base[i] = '<script type="text/javascript" async src="https://common/js/common.js"></script>'
      }
    }
  }
  return base
}