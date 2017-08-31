/**
 * Created by zy on 2017/4/13.
 */
$(function () {
    var signObj;
    var getVerificationBtn = $(".getVerification");
    var phoneNumberInput = $("#phoneNumber");
    var verificationNumberInput = $("#verificationNumber");
    var usernameInput = $("#username");
    var passwordInput = $("#password");
    var passwordTrue = $("#passwordTrue");
    var sureBtn = $(".sureBtn");
    var cancelBtn = $(".cancel");
    //点击获取验证码
    function clickBind() {
        getVerificationBtn.one("click",function getClick() {
            if(phoneNumberInput.val() == "" || phoneNumberInput.val().length < 11){
                tip = "请填写正确的手机号码";
                pageTip(tip);
                clickBind();
            }else{
                getVerificationNumber();
            }
        });
    }
    clickBind();
    //end 点击获取验证码

    //获取验证码
    function getVerificationNumber(){
        var phoneNumber = {
            mobilePhone:phoneNumberInput.val()+"",
            type:"register"
        };
        $.ajax({
            url:url+"wx/account/authcode",
            type:"GET",
            data:phoneNumber,
            dataType:"JSON",
            success:function (data) {
                if(data.status == true){
                    getVerificationBtn.css("backgroundColor","#878787");
                    var i = 60;
                    var time = setInterval(function () {
                        getVerificationBtn.text("重新获取("+i+"s)");
                        if(i == 0){
                            getVerificationBtn.css("backgroundColor","#f95353").text("获取验证码");
                            clearInterval(time);
                            clickBind();
                        }else{
                            i = i-1;
                        }
                    },1000);
                }else{
                    clickBind();
                    tip = data.message;
                    pageTip(tip);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 获取验证码

    //输入框聚焦取消输入错误样式
    phoneNumberInput.focus(function () {
        phoneNumberInput.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    verificationNumberInput.focus(function () {
        verificationNumberInput.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    usernameInput.focus(function () {
        usernameInput.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    passwordInput.focus(function () {
        passwordInput.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    passwordTrue.focus(function () {
        passwordTrue.css({
            borderBottom:"solid 1px #cccccc"
        });
        passwordTrue.blur(function () {
            if(passwordTrue.val() != passwordInput.val() && passwordTrue.val() != ""){
                passwordTrue.css({
                    borderBottom:"solid 1px red"
                });
                tip = "请确认两次输入的密码一致";
                pageTip(tip);
            }
        })
    });
    //end 输入框聚焦取消输入错误样式

    sureBtn.bind("touchstart",function () {
        sureBtn.css({
            "backgroundColor":"#DC4E4E"
        });
    });
    sureBtn.bind("touchend",function () {
        sureBtn.css({
            "backgroundColor":"#f95353"
        });
    });

    //确认绑定事件
    sureBtn.bind("click",function () {
        if(usernameInput.val() == ""){
            tip = "用户名不能为空";
            pageTip(tip);
            usernameInput.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordInput.val() == ""){
            tip = "密码不能为空";
            pageTip(tip);
            passwordInput.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordInput.val().length < 6 || passwordInput.val().length >12){
            tip = "请输入6-12位的密码";
            pageTip(tip);
            passwordInput.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordTrue.val() == ""){
            tip = "请确认您的密码";
            pageTip(tip);
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordTrue.val() != passwordInput.val() && passwordTrue.val() != ""){
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
            tip = "请确认两次输入的密码一致";
            pageTip(tip);
        }else if(phoneNumberInput.val() == "" || phoneNumberInput.val() < 11){
            tip = "请填写正确的手机号码";
            pageTip(tip);
            phoneNumberInput.css({
                borderBottom:"solid 1px red"
            });
        }else if(verificationNumberInput.val() == ""){
            tip = "验证码不能为空";
            pageTip(tip);
            verificationNumberInput.css({
                borderBottom:"solid 1px red"
            });
        }else {
            sureClick();
            return false;
        }
    });
    //end 确认绑定事件

    //注册请求
    function sureClick(){
        var surePost = {
            mobilePhone:phoneNumberInput.val()+"",
            authCode:verificationNumberInput.val()+"",
            name:usernameInput.val()+"",
            openid:window.localStorage.getItem("openid"),
            password:passwordInput.val()+""
        };
        $.ajax({
            url:url+"wx/account/register",
            type:"POST",
            data:surePost,
            dataType:"JSON",
            success:function (data) {
                signObj = data;
                if(signObj.status == true){
                    window.localStorage.setItem("status","true");
                    window.localStorage.setItem("name",signObj.data.name);
                    window.localStorage.setItem("cityId",signObj.data.cityId);
                    window.localStorage.setItem("cityName",signObj.data.cityName);
                    window.localStorage.setItem("provinceId",signObj.data.provinceId);
                    window.localStorage.setItem("provinceName",signObj.data.provinceName);
                    window.localStorage.setItem("schoolId",signObj.data.schoolId);
                    window.localStorage.setItem("schoolName",signObj.data.schoolName);
                    window.localStorage.setItem("grade",signObj.data.grade);
                    tip = "注册成功";
                    adress = "guorenTeach/myInfo.html";
                    pageTip(tip,adress);
                }else{
                    tip = signObj.message;
                    pageTip(tip);
                }


            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 注册请求

    //取消返回首页
    cancelBtn.bind("click",function () {
        window.open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect","_self")
    });
    //end 取消返回首页
});