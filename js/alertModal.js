/**
 * @description 
  弹框 ，入参this指window
 * @example
   AlertModal({
        type: 'doubleBtn',
        msg: "确定吗?",
        cancelText: "取消",
        confirmText: "确认",
        confirm: () => {},
        cancel: function () {}
    });
**/ 

!function(t, e, i) {
    ("undefined" != typeof module && module.exports) ? module.exports = e(t, i) :
    ("function" == typeof define && define.amd) ? define(e(t, i)) : t.AlertModal = e.call(t, t, i)
}(this, function(t, e) {
    "use strict";
    var i = 0;
    function s(t) {
        if (!(this instanceof s))
            return new s(t).init();
        this.opts = t || {},
        this.uuid = i,
        this.type = this.opts.type || "doubleBtn",
        this.alertType = this.opts.alertType || "",
        this.alertCls = this.opts.alertCls || "",
        this.title = this.opts.title || "",
        this.msg = this.opts.msg || "",
        this.cancelText = this.opts.cancelText || "取消",
        this.confirmText = this.opts.confirmText || "确定",
        this.cancel = this.opts.cancel || "",
        this.confirm = this.opts.confirm || "",
        this.callback = this.opts.callback || "",
        this.delay = this.opts.delay || 2e3
    }
    return s.prototype = {
        constructor: s,
        getEl: function(t, e) {
            return t.querySelector(e)
        },
        init: function() {
            return i++,
            this.setStyle(),
            this.addAlertModal(),
            "mini" == this.type ? this.minEvent() : this.alertEvent(),
            this
        },
        addAlertModal: function() {
            var i = this.getPos();
            "fixed" == this.alertType ? this.getFixedMask() : this.getMask(),
            "fixed" == this.alertType ? this.getEl(e, "#alertMask_" + this.uuid).insertAdjacentHTML("beforeend", this.getHtml()) : this.getEl(e, "body").insertAdjacentHTML("beforeend", this.getHtml()),
            this.alertModal = this.getEl(e, "#alertModal_" + this.uuid),
            "fixed" == this.alertType ? this.alertModal.style.cssText = "width:" + parseInt(i.width - 50) + "px;left:25px;top:50%;-webkit-transform:translate3d(0,-50%,0);" : this.alertModal.style.cssText = "width:" + parseInt(i.width - 50) + "px;left:25px;top:" + parseInt(i.sTop + t.innerHeight / 2 - this.alertModal.offsetHeight / 2) + "px;",
            this.callback && "function" == typeof this.callback && "mini" != this.type && this.callback()
        },
        setStyle: function() {
            var t = e.createElement("style");
            t.type = "text/css",
            t.innerText = ".alert-modal{position:absolute;left:0;top:0;border-radius:0.2rem;background:#FFF;-webkit-box-sizing:border-box;z-index:100;font-size:0.6rem;}.alert-msg{padding:0.4rem 0.6rem 0.6rem;text-align:center;line-height:1.8;word-break:break-all;}.alert-title{padding:0.6rem 0.6rem 0;text-align:center;}.alert-btn{display:-webkit-flex !important;display:-webkit-box;border-top:1px solid #DCDCDC;}.alert-btn a{display:block;-webkit-flex:1 !important;-webkit-box-flex:1;height:1.68rem;line-height:1.68rem;text-align:center;}.alert-btn a.alert-confirm{border-left:1px solid #DCDCDC;color:#EDA200;}.alert-btn a.alert-confirm.single{border-left:none;}.alert-mini-box{border-radius:0.2rem;background:rgba(0,0,0,.7);color:#fff;}",
            this.getEl(e, "head").appendChild(t)
        },
        getPos: function() {
            var i = e.documentElement.offsetWidth || e.body.offsetWidth
              , s = e.documentElement.offsetHeight || e.body.offsetHeight
              , a = e.documentElement.scrollTop || e.body.scrollTop;
            return t.innerHeight > s && (s = t.innerHeight),
            {
                width: i,
                height: s,
                sTop: a
            }
        },
        getHtml: function() {
            var t = "";
            if ("mini" != this.type) {
                switch (t += '<div class="alert-modal ' + this.alertCls + '" id="alertModal_' + this.uuid + '"><div class="alert-title">' + this.title + '</div><div class="alert-msg">' + this.msg + '</div><div class="alert-btn">',
                this.type) {
                case "doubleBtn":
                    t += '<a href="javascript:;" class="alert-cancel mr10">' + this.cancelText + '</a><a href="javascript:;" class="alert-confirm">' + this.confirmText + "</a>";
                    break;
                case "onceCancel":
                    t += '<a href="javascript:;" class="alert-cancel">' + this.cancelText + "</a>";
                    break;
                case "onceConfirm":
                    t += '<a href="javascript:;" class="alert-confirm single">' + this.confirmText + "</a>"
                }
                t += "</div></div>"
            } else
                t += '<div class="alert-modal alert-mini-box ' + this.alertCls + '"  id="alertModal_' + this.uuid + '"><div class="alert-msg">' + this.msg + "</div></div>";
            return t
        },
        getMask: function() {
            var t = this.getPos()
              , i = e.createElement("div");
            i.id = "alertMask_" + this.uuid,
            this.getEl(e, "body").appendChild(i),
            i.style.cssText = "position:absolute;left:0;top:0;width:" + t.width + "px;height:" + t.height + "px;background:rgba(0,0,0,0.3);z-index:99",
            "mini" == this.type && (i.style.backgroundColor = "rgba(255, 255, 255, 0)")
        },
        getFixedMask: function() {
            var t = e.createElement("div");
            t.id = "alertMask_" + this.uuid,
            this.getEl(e, "body").appendChild(t),
            t.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.3);z-index:99;"
        },
        minEvent: function() {
            var t = this;
            setTimeout(function() {
                navigator.userAgent.match(/iPhone/i) && "undefined" != typeof Zepto ? $(t.alertModal).fadeOut(500, function() {
                    t.getEl(e, "body").removeChild(t.alertModal),
                    t.callback && "function" == typeof t.callback && t.callback()
                }) : (t.remove(t.alertModal),
                t.callback && "function" == typeof t.callback && t.callback()),
                t.remove(t.getEl(e, "#alertMask_" + t.uuid))
            }, t.delay)
        },
        alertEvent: function() {
            if (this.alertModal) {
                var t = this.getEl(this.alertModal, ".alert-cancel")
                  , e = this.getEl(this.alertModal, ".alert-confirm");
                t && this.reset(t, this.cancel),
                e && this.reset(e, this.confirm)
            }
        },
        reset: function(t, i) {
            var s = this;
            t.onclick = function() {
                !1 !== (i && "function" == typeof i && i(this)) && ("fixed" != s.alertType && s.remove(s.alertModal),
                s.remove(s.getEl(e, "#alertMask_" + s.uuid)))
            }
        },
        remove: function(t) {
            this.getEl(e, "body").removeChild(t)
        },
        destroy: function() {
            this.remove(this.alertModal),
            this.remove(this.getEl(e, "#alertMask_" + this.uuid))
        }
    },
    s
}, document);