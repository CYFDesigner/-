/**
 * Created by zy on 2017/3/8.
 */
var url = "http://guoren.ueasier.com/";

// //验证是否在移动端进入
// (function () {
//     var userAgentInfo = navigator.userAgent;
//     var Agents = "MicroMessenger";
//     var Agents2 = "Windows";
//     if(userAgentInfo.indexOf(Agents) == -1 || userAgentInfo.indexOf(Agents2) != -1){
//         window.location.href = url + "guorenTeach/noPC.html";
//     }
// })(document, window);
// //end 验证是否在移动端进入

//适配移动端
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
//end 适配移动端


var tip;
var adress;
//提示框提示信息
function pageTip(txt,adr) {                     //参数Obj为提示信息内容
    var signOut = $(".signOutShow");
    var signOutDom = document.getElementsByClassName("signOutShow")[0];
    var singnOutWidth;
    signOut.text(txt);
    signOut.show();
    singnOutWidth = signOutDom.clientWidth;
    signOut.css({
        left:"50%",
        marginLeft:singnOutWidth / -2
    });
    setTimeout(function () {
        signOut.fadeOut();
        if(adr){
            if(adr.indexOf("h") != 0 && adr.indexOf("t") != 1 && adr.indexOf("p") != 3){
                window.open(url + adr,"_self")
            }else{
                window.open(adr,"_self")
            }
        }else{

        }
    },1000);
}
//提示框提示信息

//登录事件
function login(openUrl) {
    var loginBox = $(".loginBox");
    var loginBtn = $(".loginBtn");
    var closeBtn = $(".closePage");
    var mobilePhoneInput = $("#mobilePhone");
    var passWordInput = $("#passWord");

    //弹出登录页面
    loginBox.show();
    //end 弹出登录页面

    //监听登录按钮
    loginBtn.bind("click",function () {
        if(mobilePhoneInput.val().length == 0){
            tip = "手机号码/准考证号不能为空";
            pageTip(tip);
        }else if(passWordInput.val().length == 0){
            tip = "密码不能为空";
            pageTip(tip);
        }else{
            var mobilePhone = mobilePhoneInput.val();          //需要发送的手机号
            var password = passWordInput.val();                //需要发送的密码
            if(openUrl){
                adress = openUrl;
            }
            loginRequest(mobilePhone,password);
        }

    });
    //end 监听登录按钮

    //监听关闭按钮
    closeBtn.bind("click",function (e) {
        loginBox.hide();
        loginBox.find("#mobilePhone").val("");
        loginBox.find("#passWord").val("");
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    //end 监听关闭按钮
}
//end 登录事件

//当登录失败或者失效的时候清除浏览器缓存
function loginFalse(windowurl) {
    tip = "由于您长时间未操作，页面失效，请重试";
    pageTip(tip);

    //清楚登录信息
    window.localStorage.removeItem("status");
    //end 清楚登录信息

    //清楚用户信息
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("provinceId");
    window.localStorage.removeItem("provinceName");
    window.localStorage.removeItem("cityId");
    window.localStorage.removeItem("cityName");
    window.localStorage.removeItem("schoolId");
    window.localStorage.removeItem("schoolName");
    window.localStorage.removeItem("grade");
    window.localStorage.removeItem("dataId");
    //end 清楚用户信息

    var mobilePhone = window.localStorage.getItem("mobilePhone");           //需要发送的手机号
    var password = window.localStorage.getItem("password");                 //需要发送的密码
    loginRequest(mobilePhone,password,windowurl);
}
//当登录失败或者失效的时候清除浏览器缓存

//请求数据验证用户登录信息
function loginRequest(username,password,windowurl) {
    var openid = window.localStorage.getItem("openid");             //需要发送的openid
    //发送的登录数据
    var dataPost = {
        mobilePhone:username,
        password:password,
        openid:openid
    };
    //end 发送的登录数据

    var signOutShow = $(".signOutShow");
    var loginBox = $(".loginBox");

    //登录请求
    $.ajax({
        url:url + "wx/account/login",
        type:"POST",
        data:dataPost,
        dataType:"json",
        success:function (data) {
            if(data.status == false){
                tip = data.message;
                pageTip(tip);
            }else if(data.status == true){
                loginBox.hide();
                if(window.localStorage.getItem("cityId") != null){

                }else{
                    window.localStorage.setItem("status","true");
                    window.localStorage.setItem("studentId",data.data.id);
                    window.localStorage.setItem("mobilePhone",data.data.mobilePhone);
                    window.localStorage.setItem("password",password);
                    window.localStorage.setItem("name",data.data.name);
                    window.localStorage.setItem("provinceId",data.data.provinceId);
                    window.localStorage.setItem("provinceName",data.data.provinceName);
                    window.localStorage.setItem("cityId",data.data.cityId);
                    window.localStorage.setItem("cityName",data.data.cityName);
                    window.localStorage.setItem("schoolId",data.data.schoolId);
                    window.localStorage.setItem("schoolName",data.data.schoolName);
                    window.localStorage.setItem("grade",data.data.grade);
                }
                if(windowurl){
                    setTimeout(function () {
                        window.open(windowurl,"_self");
                    },1000)
                }

                if(tip = "由于您长时间未操作，页面失效，请重试"){

                }else{
                    tip = "登录成功";
                    if(adress){
                        pageTip(tip,adress);
                    }else{
                        pageTip(tip);
                    }
                }

            }
        },
        xhrFields: {
            withCredentials: true    // 此字段标识要跨域传数据
        },
        crossDomain: true
    });
    //end 登录请求
}
//end 请求数据验证用户登录信息