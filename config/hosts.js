
const hosts = {
  'DEV': {
    imgDomain: '//uimgpre.com',
    zepto: `//preres.cn/public/js/zepto.js`
  },
  "PRD": {
    imgDomain: '//uimg.com',
    zepto: `//res.cn/public/js/zepto.js`
  }
}[SELF_ENV||"PRD"]
export default hosts