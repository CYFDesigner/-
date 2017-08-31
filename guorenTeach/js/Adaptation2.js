/**
 * Created by zy on 2017/6/14.
 */
//页面rem适配
!function (e) {
    function t(a) {
        if (i[a])return i[a].exports;
        var n = i[a] = {exports: {}, id: a, loaded: !1};
        return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
    }

    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}([function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var i = window;
    t["default"] = i.flex = function (e, t) {
        var a = e || 100, n = t || 1,
            r = i.document,
            o = navigator.userAgent,
            d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
            l = o.match(/U3\/((\d+|\.){5,})/i),
            c = l && parseInt(l[1].split(".").join(""), 10) >= 80,
            p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
            s = i.devicePixelRatio || 1;
        p || d && d[1] > 534 || c || (s = 1);
        var u = 1 / s,
            m = r.querySelector('meta[name="viewport"]');
        m || (m = r.createElement("meta"), m.setAttribute("name", "viewport"), r.head.appendChild(m)), m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + u + ",maximum-scale=" + u + ",minimum-scale=" + u), r.documentElement.style.fontSize = a / 2 * s * n + "px"

    }, e.exports = t["default"];
    if(navigator.userAgent.indexOf("Windows") > -1){
        document.getElementsByTagName("html")[0].style.boxSizing = "border-box";
        document.getElementsByTagName("html")[0].style.width = "700px";
        document.getElementsByTagName("html")[0].style.margin = "0 auto";
    }
}]);
flex(100, 1);

function getContentHeight(item) {
    if(navigator.userAgent.indexOf("Windows") > -1){
        for(var a = 0;a < item.length;a++){
            $("."+ item[a] +"").css({
                width:"700px",
                position:"fixed",
                left:"50%",
                bottom:"0",
                marginLeft:"-350px"
            });
        }
    }
}
//end 页面rem适配

var DOMAIN = "http://120.76.193.66:11110/edu";
var url = " http://erp-dev.blk.com.cn/edu";
var MLURL = " http://erp-dev.blk.com.cn/blkapi";

//储存排课发送信息
var classDataPost = {};
if(!window.localStorage.getItem("classDataPost") || window.localStorage.getItem("classDataPost") == null){
    window.localStorage.removeItem("classDataPost");
}else{
    getClassDataPost()
}
function getClassDataPost() {
    classDataPost = JSON.parse(window.localStorage.getItem("classDataPost"))
}
//end 储存排课发送信息

//提示框提示信息
var tip;
var adress;
function pageTip(txt,adr) {
    var pageTips = $(".pageTips");
    var pageTipsDom = document.getElementsByClassName("pageTips")[0];
    var pageTipsWidth;
    pageTips.text(txt);
    pageTips.show();
    pageTipsWidth = pageTipsDom.clientWidth;
    pageTips.css({
        left:"50%",
        marginLeft:pageTipsWidth / -2
    });
    setTimeout(function () {
        pageTips.fadeOut();
        if(adr){
            if(adr.indexOf("h") != 0 && adr.indexOf("t") != 1 && adr.indexOf("p") != 3){
                window.open(adr,"_self")
            }else{
                window.open(adr,"_self")
            }
        }else{

        }
    },1500);
}
//提示框提示信息

// //取值判断排课是否为课程包排课如果是取值课程包Id
// var isInPackage;
// var classPackageId;
// function getIsInPackage() {
//     //取值判断是否是课程包排课
//     var isInPackageIndex = location.search.indexOf("isInPackage")+12;
//     var isInPackageLastIndex = location.search.indexOf("&");
//     if(isInPackageLastIndex != -1){
//         isInPackage = location.search.substr(isInPackageIndex,isInPackageLastIndex-isInPackageIndex);
//     }else{
//         isInPackage = location.search.substr(isInPackageIndex);
//     }
//     //end 取值判断是否是课程包排课
//
//     //取值课程包的id
//     if(isInPackage == "yes"){
//         var twoUrl = location.search.substr(isInPackageLastIndex+2);
//         var classPackageIdIndex = twoUrl.indexOf("classPackageId")+15;
//         var classPackageIdLastIndex = twoUrl.indexOf("&");
//         if(classPackageIdLastIndex != -1){
//             classPackageId = twoUrl.substr(classPackageIdIndex,classPackageIdLastIndex-classPackageIdIndex);
//         }else{
//             classPackageId = twoUrl.substr(classPackageIdIndex);
//         }
//     }
//     //end 取值课程包的id
//     window.localStorage.setItem("isInPackage",isInPackage);
//     window.localStorage.setItem("classPackageId",classPackageId)
// }
// //end 取值判断排课是否为课程包排课如果是取值课程包Id