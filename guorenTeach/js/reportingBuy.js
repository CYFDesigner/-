/**
 * Created by 柴永峰 on 2017/5/6.
 */
$(function () {
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var testId;
    if(lastIndex != -1){
        testId = location.search.substr(index+1,lastIndex-index-1)-0;
    }else{
        testId = location.search.substr(index+1)-0
    }
    var buyObj;
    var evaluationId;
    var ul1 = $(".oneBuyUl");
    var ul2 = $(".twoBuyUl");
    ul1.hide();
    ul2.hide();
    if(testId < 4){
        evaluationId = 5;
        $(".moneyBox").text("9.9元");
        ul2.hide();
        ul1.show();
    }else{
        evaluationId = 4;
        $(".moneyBox").text("4 元");
        ul2.show();
        ul1.hide();
    }

    var payButton = $(".payButton");
    payButton.bind("click",function () {
        dataRequest();
    });

    function dataRequest() {
        var dataPost = {
            evaluationId:evaluationId
        };
        $.ajax({
            url:url + "wx/evaluation/buy",
            type:'GET',
            data:dataPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    buyObj = data;
                    onBridgeReady();
                }else{
                    if(data.message == "请先登录"){
                        var openUrl = url + "guorenTeach/reportingBuy.html" + "?evaluationId=" + testId;
                        loginFalse(openUrl);
                    }else{
                        tip = data.message;
                        pageTip(tip);
                    }

                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }

    function onBridgeReady(){
        //noinspection JSUnresolvedVariable
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', buyObj.data,
            function(res){
                //noinspection JSUnresolvedVariable
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    tip = "购买成功";
                    adress = url + "guorenTeach/reporting" + testId + ".html?testId=" + testId;
                    pageTip(tip,adress);
                } else{
                    tip = "支付失败";
                    pageTip(tip);
                }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
});