/**
 * @description 
  将Self注册为全局变量，并提供注册方法，使用者可直接使用。
 * @example
 * //第一个参数为一个回调函数，组件内部获取到数据后，会执行该回调
  Self.Gis((meta) => {
    console.log(meta.provinceCode)
    console.log(meta.cityCode)
  }, false)
**/ 

!function(e, o) {
    e.PROVINCE_MAP = [{
        provinceCode: "10",
        provinceName: "北京"
    }],
    e.CITY_MAP = [{
        cName: "北京市",
        pCode: "10",
        pName: "北京",
        cCode: "010"
    }],
    e.Gis = function(o, c) {
        var N = function(o, c) {
            var N = this;
            this.callback = o,
            this._postDataDefault = {
                location: {
                    lng: 118,
                    lat: 32
                },
                cityCode: "025",
                provinceCode: "100",
                cityName: "南京市",
                provinceName: "江苏省",
                gisType: "default"
            },
            navigator.geolocation ? $.wechat ? $.loadMod("//weixin/sdk.js").done(function() {
                wxSDK().done(function(e) {
                    e.getLocation({
                        type: "wgs84",
                        success: function(e) {
                            var o = {};
                            e.latitude,
                            e.longitude,
                            o.coords = e,
                            N.showPosition(o, "wechat")
                        }
                    })
                }).fail(function() {
                    navigator.geolocation.getCurrentPosition(N.showPosition, N.locationError, {
                        timeout: 3e3,
                        maximumAge: 864e5
                    })
                })
            }) : $.isApp ? $.AppReady(function(o) {
                o.api.getPositionInfo(function(c) {
                    var p = {};
                    p.cityCode = c.cCode,
                    p.gisType = "app",
                    N.callback(p)
                })
            }) : navigator.geolocation.getCurrentPosition($.proxy(this.showPosition, this), $.proxy(this.locationError, this), {
                timeout: 3e3,
                maximumAge: 864e5
            }) : this.getPositionByIp(this.alertFlag),
            this.navError()
        };
        return N.prototype = {
            locationError: function(e) {
                switch (this.isGis = !0, e.code) {
                case e.TIMEOUT:
                case e.POSITION_UNAVAILABLE:
                    this.getPositionByIp(this.alertFlag);
                    break;
                case e.PERMISSION_DENIED:
                    this.getPositionByIp(!1);
                    break;
                case e.UNKNOWN_ERROR:
                default:
                    this.getPositionByIp(this.alertFlag)
                }
            },
            showPosition: function(o, c) {
                var N = this;
                N.isGis = !0;
                var a = o.coords.latitude
                  , p = o.coords.longitude;
                N._postDataDefault.location.lng = o.coords.longitude,
                N._postDataDefault.location.lat = o.coords.latitude,
                $.ajax({
                    type: "GET",
                    url: "https://api.map.baidu.com/reverse_geocoding/v3/?ak=2222&output=json&coordtype=wgs84ll&location=" + a + "," + p + "&callback=jsonpCallbackBaidu",
                    cache: !0,
                    async: !0,
                    timeout: 3e3,
                    dataType: "jsonp",
                    jsonp: !1,
                    jsonpCallback: "jsonpCallbackBaidu",
                    success: function(o) {
                        1 == N.alertFlag && alert("当前定位的城市为" + o.result.addressComponent.city),
                        $(e.CITY_MAP).each(function(e, a) {
                            if (a.cName.indexOf(p) > -1)
                                return o.result.cityNo = a.cNo,
                                o.result.cityName = a.cName,
                                o.result.gisType = c || "gps",
                                N.callback(o.result),
                                !1
                        })
                    },
                    error: function(e, o, c) {
                        N.getPositionByIp(N.alertFlag)
                    }
                })
            },
            getPositionByIp: function(e) {
                this.isGis = !0;
                var o = this;
                setTimeout(function() {
                    $.ajax({
                        type: "GET",
                        url: "//ipservice.com/ipQuery.do",
                        cache: !0,
                        dataType: "jsonp",
                        jsonpCallback: "jsonpCallbackIp",
                        success: function(c) {
                            0 != c.status && (
                            o._postDataDefault.cityCode = c.cityLESId,
                            o._postDataDefault.gisType = "ip"),
                            1 == e && alert("当前定位城市为" + o._postDataDefault.cityName),
                            o.callback(o._postDataDefault)
                        },
                        error: function() {
                            1 == e && alert("很抱歉无法定位当前城市"),
                            o.callback(o._postDataDefault)
                        }
                    })
                }, 100)
            },
            navError: function() {
                var e = this;
                setTimeout(function() {
                    e.isGis || (console.log("您的手机浏览器无法正确获取定位信息"),
                    e.getPositionByIp(e.alertFlag))
                }, 5e3)
            }
        },
        new N(o,c)
    }
}(window.Self = window.Self || {}, window);
