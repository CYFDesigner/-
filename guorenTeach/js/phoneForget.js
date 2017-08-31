/**
 * Created by zy on 2017/4/13.
 */
$(function () {
    var sureObj;
    var getVerificationBtn = $(".getVerification");
    var phoneNumberInput = $("#phoneNumber");
    var verificationNumberInput = $("#verificationNumber");
    var sureBtn = $(".sureBtn");
    var cancelBtn = $(".cancel");
    var signOut = $(".signOutShow");
    var singnOutWith;
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

    //请求验证码
    function getVerificationNumber(){
        var phoneNumber = {
            mobilePhone:phoneNumberInput.val()+"",
            type:"reset"
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
                    tip = data.message;
                    pageTip(tip);
                    clickBind();
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 请求验证码

    //输入框聚焦事件
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
    //end 输入框聚焦事件

    //确认请求验证是否正确
    sureBtn.bind("click",function () {
        if(phoneNumberInput.val() == "" || phoneNumberInput.val() < 11){
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
        }else{
            sureClick();
            return false;
        }
    });
    //end 确认请求验证是否正确

    //取消返回首页
    cancelBtn.bind("click",function () {
        window.open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect","_self")
    });
    //end 取消返回首页

    //验证码判断
    function sureClick(){
        var surePost = {
            mobilePhone:phoneNumberInput.val()+"",
            authcode:verificationNumberInput.val()+""
        };
        $.ajax({
            url:url+"wx/account/authcode/check",
            type:"GET",
            data:surePost,
            dataType:"JSON",
            success:function (data) {
                sureObj = data;
                if(sureObj.status == true){
                    tip = "手机号验证成功";
                    adress = "guorenTeach/forgetReset.html";
                    pageTip(tip,adress);
                }else{
                    tip = sureObj.message;
                    pageTip(tip);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 验证码判断
});