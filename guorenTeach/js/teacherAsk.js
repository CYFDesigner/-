/**
 * Created by zy on 2017/3/13.
 */
$(function () {
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var teacherId;
    if(lastIndex != -1){
        teacherId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        teacherId = location.search.substr(index+1)
    }
    // 动态设置老师标签的居中
    function teacherLable() {
        var teacherLableBox = $(".teacherLableBox");
        var teacherLableWidth = teacherLableBox.width();
        teacherLableBox.css({
            marginLeft:-1 * teacherLableWidth /2
        })
    }
    //end 动态设置老师标签的居中

    var dataObj;
    function dataRequest() {
        $.ajax({
            url:url + "wx/mentor/" + teacherId,
            type:'GET',
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    $("title").html("导师" + dataObj.data.name);
                    append();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {

            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
    }
    dataRequest();

    var payButtonBox = $(".payButton");
    var askDtaa;
    payButtonBox.bind("click",function () {
        if(window.localStorage.getItem("status")){
            var content = $(".askBox").val();
            if(content == ""){
                tip = "提问内容不能为空";
                pageTip(tip);
            }else{
                var dataPost = {
                    content: content,
                    mentorId: teacherId
                };
                $.ajax({
                    url:url + "wx/mentor/ask",
                    type:'POST',
                    data:dataPost,
                    dataType:'json',
                    success:function (data) {
                        if(data.status == true){
                            askDtaa = data;
                            onBridgeReady();
                        }else{
                            var openUrl = url + "guorenTeach/teacherAsk.html" + "?teacherId=" + teacherId;
                            loginFalse(openUrl);
                        }
                    },
                    error:function () {

                    },
                    xhrFields: {
                        withCredentials: true    // 此字段标识要跨域传数据
                    },
                    crossDomain: true
                });
            }
        }else{
            tip = "请登录后再提问";
            pageTip(tip);
            var openUrl = url + "guorenTeach/teacherAsk.html" + "?teacherId=" + teacherId;
            login(openUrl);
        }
    });

    function onBridgeReady(){
        //noinspection JSUnresolvedVariable
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', askDtaa.data,
            function(res){
                //noinspection JSUnresolvedVariable
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    tip = "提问成功";
                    adress = "guorenTeach/myAsk.html";
                    pageTip(tip,adress);
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }

    function append() {
        var teacherLableBox = $(".teacherLableBox");
        var teacherInfoBox = $(".teacherInfo");
        var teacherHead = teacherInfoBox.find(".head");
        $("<img>").attr("src",dataObj.data.head).appendTo(teacherHead);
        teacherInfoBox.find(".teacherName").text(dataObj.data.name);
        teacherInfoBox.find(".teacherIntroduce").text(dataObj.data.title);
        for(var i = 0;i < dataObj.data.labels.length;i++){
            $("<li></li>").text(dataObj.data.labels[i].name).appendTo(teacherLableBox);
        }
        $(".askInfo").text(dataObj.data.description);
        $(".payPrice").text("￥"+ dataObj.data.price);
        teacherLable();
    }
});