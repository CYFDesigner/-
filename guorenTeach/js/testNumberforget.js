/**
 * Created by zy on 2017/4/14.
 */
$(function () {
    var signObj;
    var testNumber = $("#testNumber");
    var username = $("#username");
    var password = $("#password");
    var passwordTrue = $("#passwordTrue");
    var sureBtn = $(".sureBtn");
    var cancelBtn = $(".cancel");
    //输入框聚焦事件
    testNumber.focus(function () {
        testNumber.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    username.focus(function () {
        username.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    password.focus(function () {
        password.css({
            borderBottom:"solid 1px #cccccc"
        });
    });
    passwordTrue.focus(function () {
        passwordTrue.css({
            borderBottom:"solid 1px #cccccc"
        });
        passwordTrue.blur(function () {
            if(passwordTrue.val() != password.val() && passwordTrue.val() != ""){
                passwordTrue.css({
                    borderBottom:"solid 1px red"
                });
                tip = "请确认两次输入的密码一致";
                pageTip(tip);
            }
        })
    });
    //end 输入框聚焦事件

    //确认修改密码
    sureBtn.bind("click",function () {
        if(testNumber.val() == "" || testNumber.val().length < 11){
            tip = "请输入正确的准考证号";
            pageTip(tip);
            testNumber.css({
                borderBottom:"solid 1px red"
            });
        }else if(username.val() == ""){
            tip = "考生姓名不能为空";
            pageTip(tip);
            username.css({
                borderBottom:"solid 1px red"
            });
        }else if(password.val() == ""){
            tip = "请输入新密码";
            pageTip(tip);
            password.css({
                borderBottom:"solid 1px red"
            });
        }else if(password.val().length < 6 || password.val().length > 12){
            tip = "请输入6-12位的新密码";
            pageTip(tip);
            password.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordTrue.val() == ""){
            tip = "请确认您的新密码";
            pageTip(tip);
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
        }else if(passwordTrue.val() != password.val()){
            tip = "请确认两次输入的密码一致";
            pageTip(tip);
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
        }else{
            sureClick();
            return false;
        }
    });
    //end 确认修改密码

    //确认重置密码请求
    function sureClick(){
        var surePost = {
            account:testNumber.val(),
            name:username.val(),
            password:password.val()+""
        };
        $.ajax({
            url:url+"wx/account/resetpwd",
            type:"POST",
            data:surePost,
            dataType:"JSON",
            success:function (data) {
                signObj = data;
                if(signObj.status == true){
                    tip = "密码修改成功,请重新登陆";
                    adress = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect";
                    pageTip(tip);
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
    //end 确认重置密码请求

    //取消返回首页
    cancelBtn.bind("click",function () {
        window.open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect","_self")
    });
    //end 取消返回首页
});