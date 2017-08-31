/**
 * Created by zy on 2017/4/14.
 */
$(function () {
    var signObj;
    var passwordInput = $("#password");
    var passwordTrue = $("#passwordTrue");
    var sureBtn = $(".sureBtn");
    var cancelBtn = $(".cancel");
    //输入框聚焦事件
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
    //end 输入框聚焦事件

    //确认修改密码
    sureBtn.bind("click",function () {
        if(passwordInput.val() == ""){
            passwordInput.css({
                borderBottom:"solid 1px red"
            });
            tip = "新密码不能为空";
            pageTip(tip);
        }else if(passwordInput.val().length < 6 || passwordInput.val().length > 12){
            passwordInput.css({
                borderBottom:"solid 1px red"
            });
            tip = "请输入6-12位的新密码";
            pageTip(tip);
        }else if(passwordTrue.val() == ""){
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
            tip = "请确认您的新密码";
            pageTip(tip);
        }else if(passwordTrue.val() != passwordInput.val()){
            passwordTrue.css({
                borderBottom:"solid 1px red"
            });
            tip = "请确认两次输入的密码一致";
            pageTip(tip);
        }else{
            sureClick();
            return false;
        }
    });
    //end 确认修改密码

    //确认重置密码请求
    function sureClick(){
        var surePost = {
            password:passwordInput.val()+""
        };
        $.ajax({
            url:url+"wx/account/resetpassword",
            type:"POST",
            data:surePost,
            dataType:"JSON",
            success:function (data) {
                if(data.status == true){
                    signObj = data;
                    tip = "密码修改成功,请重新登陆";
                    adress = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect";
                    pageTip(tip,adress);
                }else{
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
    //end 确认重置密码请求

    //取消返回首页
    cancelBtn.bind("click",function () {
        window.open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect","_self")
    });
    //end 取消返回首页
});