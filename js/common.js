import hosts from './../config/hosts'

export const runFun = () => {
  //一般用于判断全局是否加载完了某个js，然后执行里面的函数
  if (typeof _runFun == "function") {
    _runFun("a");
  } else {
    setTimeout(runFun, 1000)
  }
}
// 判断登录
export const goLogin = () => {
  console.warn('非通用，请自己实现goLogin')
  location.href = hosts.loginUrl + "/ids/login?service=" + encodeURIComponent(hosts.loginUrl + "?targetUrl=" + encodeURIComponent(location.href)) + "&loginTheme=wap_new";
}

export const preloadImage = (path) => {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}

//截取url中参数?a=1&b=2
export const getUrlParams = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

/**
 * [网速测试]
 * @param  {[type]} pic            参数 { url: 图片地址, size: 文件字节数}
 * @return {[type]}                { speed, desc, success }
 * @example                        let speed = await getSpeed({url: ‘’, size: 19203})
 */
export const getSpeed = pic => new Promise(resolve => {
  if (pic && (!pic.url || !pic.size)) {
    resolve({
      speed: 0,
      desc: `参数错误`,
      success: false
    })
  }
  const picList = [{
    url: 'http://image3.cn/img/1.jpg',
    size: 347610
  }, {
    url: 'http://image3.cn/img/3.jpg',
    size: 165856
  }]
  let image = new Image()
  let testImg = pic || picList[Math.floor(Math.random() * 7)]
  let startTime = Date.now()
  image.src = `${testImg.url}?v=${startTime}`
  image.onload = () => {
    let time = (Date.now() - startTime) / 1000
    let speed = (testImg.size / time / 1024).toFixed(2)
    resolve({
      speed,
      desc: `~${speed}kb/秒`,
      success: true
    })
  }
  image.onerror = () => {
    resolve({
      speed: 0,
      desc: `加载失败`,
      success: false
    })
  }
})


function u4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
//生成唯一标示
export const uuid  = () => {
  return u4() + u4() + '-' + u4() + '-' + u4() + '-' + u4() + '-' + u4() + u4() + u4();
}