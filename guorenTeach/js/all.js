/**
 * Created by zy on 2017/3/3.
 */
$(function () {
    $(".pageAnimate").hide();
    var oHeight = $(document).height(); //浏览器当前的高度
    var openid = window.localStorage.getItem("openid");

    $(window).resize(function(){
        if($(document).height() < oHeight){
            $(".lableNavBox").hide();
        }else{
            $(".lableNavBox").show();
        }
    });

    //点击用户页面时的身份验证
    $(".lableNavMyself a").bind("click",function (e) {
        var openUrl = url + "guorenTeach/userCenter.html";
        if(!window.localStorage.getItem("status")){
            login(openUrl);
        }else{
            window.open(openUrl,"_self");
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    //end 点击用户页面时的身份验证
    $(".content").show();
});