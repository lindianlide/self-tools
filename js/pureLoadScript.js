
/**
 * 无需依赖加载脚本
 * @param position dom
 * @param src string
 * @param async boolen
 * @param onload fn
 * @param onerror fn
 * @example
 pureLoadScript({
  src:"https://xx.cn/javascript/xx.js",
  async:true,
  onerror:function(oError){console.error("The script " + oError.target.src + " didn't load correctly.")}
  })
 *
 */
const pureLoadScript = ({position, src, async, onload, onerror}) => {
  try {
    if (!src) return
    if (window && window.document) {
      const dom = position || window.document.head || window.document.getElementsByTagName("head")[0];
      const script = window.document.createElement("script")
      script.src = src
      script.type = "text/javascript"
      if (async) script.async = "async"
      if (onload && typeof onload === 'function') script.onload = onload
      if (onerror && typeof onerror === 'function') script.onerror = onerror
      dom.appendChild(script)
    }
  } catch (err) {
    console.error('pureLoadScript', {postion, src, async, onload, onerror})
  }
}

export default pureLoadScript