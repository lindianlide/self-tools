
class Perf {
  constructor(appCode) {
    if (window.performance) {
      window.addEventListener("load", (event) => {
        const { timing = {}, navigation = {}, memory = {} } = window.performance
        const { 
          responseStart,
          requestStart,
          responseEnd,
          fetchStart,
          domInteractive,
          domContentLoadedEventEnd,
          loadEventStart,
          domainLookupEnd,
          domainLookupStart,
          domComplete,
          domLoading
        } = timing
        const { totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit } = memory
        let ttfb = null // ⾸包时间，⽹络链路耗时
        let fpt = null // ⾸次渲染时间 / ⽩屏时间
        let tti = null // ⾸次可交互时间
        let DOMReady = null // HTML加载完成时间
        let load = null // ⻚⾯完全加载时间
        let dnslookup = null // dns查询时间
        let domLoad = null // DOM加载完成时间
        responseStart && requestStart && (ttfb = responseStart - requestStart)
        responseEnd && fetchStart && (fpt = responseEnd - fetchStart)
        domInteractive && fetchStart && (tti = domInteractive - fetchStart)
        domContentLoadedEventEnd && fetchStart && (DOMReady = domContentLoadedEventEnd - fetchStart)
        loadEventStart && fetchStart && (load = loadEventStart - fetchStart)
        domainLookupEnd && domainLookupStart && (dnslookup = domainLookupEnd - domainLookupStart)
        domComplete && domLoading && (domLoad = domComplete - domLoading)
        const performace = {
          ttfb,
          fpt,
          tti,
          DOMReady,
          load,
          dnslookup,
          domLoad,
          type: navigation.type, // 访问途径 0常规导航方式 1刷新 2后退按钮访问
          memory: { totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit }
        }
        console.log(performace, 'performace');
      });
    }
  }

}
export default Perf