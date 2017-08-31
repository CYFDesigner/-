/**
 * Created by zy on 2017/3/22.
 */
$(function () {
    var dataObj;
    var oldPassword = $("#oldPassword");
    var newPassword = $("#newPassword");
    var repeatPassword = $("#repeatPassword");
    $(".formBox").bind("submit",function () {
        if(oldPassword.val() == ""){
            oldPassword.css({
                borderBottom:"solid 1px #cccccc"
            });
            tip = "原始密码不能为空";
            pageTip(tip);
        }else if(newPassword.val() == ""){
            newPassword.css({
                borderBottom:"solid 1px #cccccc"
            });
            tip = "新密码不能为空";
            pageTip(tip);
        }else if(repeatPassword.val() == ""){
            repeatPassword.css({
                borderBottom:"solid 1px #cccccc"
            });
            tip = "请再次确认新密码";
            pageTip(tip);
        }else{
            if(newPassword.val() == oldPassword.val()){
                tip = "新密码不能和原始密码相同";
                pageTip(tip);
            }else{
                if(repeatPassword.val() != newPassword.val()){
                    tip = "请确认两次输入的密码一致";
                    pageTip(tip);
                }else{
                    dataRequest();
                }
            }
        }
    });
    function dataRequest() {
        var oragainal = $("#oldPassword").val();
        var password = $(".newPassword").val();
        var dataPost = {
            original:oragainal,
            password:password
        };
        $.ajax({
            url:url + "wx/account/changepassword",
            type:'POST',
            async:false,
            data:dataPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    if(dataObj.message == "密码错误"){
                        tip = "原始密码错误";
                        pageTip(tip);
                    }else{
                        tip = "密码修改成功";
                        adress = "guorenTeach/userCenter.html";
                        pageTip(tip,adress);
                    }
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

});