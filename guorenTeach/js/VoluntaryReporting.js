/**
 * Created by zy on 2017/5/9.
 */
$(function () {
    var provinceObj;
    var buyObj;
    provinceRequest();
    //请求省会信息
    function provinceRequest() {
        $.ajax({
            url:url + "wx/region/province/list",
            type:'GET',
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    provinceObj = data;
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
    }
    //end 请求省会信息

    //添加省会信息
    function provinceAppend() {
        var screenLinkBox = $(".screenLinkBox");
        var screenUl = $(".screenUl");
        var screenBox = $(".screenBox");
        screenLinkBox.empty();
        for(var i = 0;i < provinceObj.data.length;i++){
            if(provinceObj.data[i].id == 20 || provinceObj.data[i].id == 21 || provinceObj.data[i].id == 28){
                $("<li></li>").attr("provinceId",provinceObj.data[i].id).text(provinceObj.data[i].name).appendTo(screenLinkBox).bind("click",function (e) {
                    screenLinkBox.find("li").removeClass("screenLinkActive");
                    $(this).addClass("screenLinkActive");
                    screenUl.find("li").eq(0).find(".screenBtnValue").text($(this).text()).attr("provinceId",$(this).attr("provinceId"));
                    screenBox.fadeOut();
                    e.preventDefault();
                });
            }
        }
    }
    //end 添加省会信息

    //添加科属信息
    function subjectAppend() {
        var screenLinkBox = $(".screenLinkBox");
        var screenUl = $(".screenUl");
        var screenBox = $(".screenBox");
        screenLinkBox.empty();
            $("<li></li>").attr("subjectId",0).text("文科").appendTo(screenLinkBox).bind("click",function (e) {
                screenLinkBox.find("li").removeClass("screenLinkActive");
                $(this).addClass("screenLinkActive");
                screenUl.find("li").eq(1).find(".screenBtnValue").text($(this).text()).attr("subjectId",$(this).attr("subjectId"));
                screenBox.fadeOut();
                e.preventDefault();
            });
            $("<li></li>").attr("subjectId",1).text("理科").appendTo(screenLinkBox).bind("click",function (e) {
                screenLinkBox.find("li").removeClass("screenLinkActive");
                $(this).addClass("screenLinkActive");
                screenUl.find("li").eq(1).find(".screenBtnValue").text($(this).text()).attr("subjectId",$(this).attr("subjectId"));
                screenBox.fadeOut();
                e.preventDefault();
            });
    }
    //end 添加科属信息

    var screenUl = $(".screenUl");
    var screenBox = $(".screenBox");
    var closeScreen = $(".closeScreen");
    var screenLinkBox = $(".screenLinkBox");
    //点击弹出、隐藏筛选框
    screenUl.find("li").eq(0).bind("click",function (e) {
        provinceAppend();
        screenBox.fadeIn(200);
        e.preventDefault();
    });
    screenUl.find("li").eq(1).bind("click",function (e) {
        subjectAppend();
        screenBox.fadeIn(200);
        e.preventDefault();
    });
    closeScreen.bind("click",function (e) {
        screenBox.fadeOut(200);
        e.preventDefault();
    });
    //end 点击弹出、隐藏筛选框

    //查询接口点击事件
    var searchPassageway = $(".searchPassageway");
    var pageNumber;
    searchPassageway.find("a").eq(0).bind("click",function () {
        pageNumber = 1;
        Verification();
    });
    //end 查询接口点击事件

    var screenBtnValue1 = screenUl.find("li").eq(0).find(".screenBtnValue");
    var screenBtnValue2 = screenUl.find("li").eq(1).find(".screenBtnValue");
    // var screenBtnValue3 = screenUl.find("li").eq(2).find(".screenBtnValue");
    var inputInfo = $(".inputInfo");
    var ranking = $("#ranking");
    var number = $("#number");

    //点击查询后验证表单是否完整
    function Verification() {
        if(screenBtnValue1.text() == ""){
            tip = "请选择您所在的地区";
            pageTip(tip);
        }else if(screenBtnValue2.text() == ""){
            tip = "请选择您的考试科属";
            pageTip(tip);
        }else if(ranking.val().length == 0){
            tip = "请输入您的位次";
            pageTip(tip);
        }else if(number.val().length == 0){
            tip = "请输入您的分数";
            pageTip(tip);
        }else{
            if(window.localStorage.getItem("status") == "true"){
                VerificationBuy(ranking.val()-0)
            }else{
                login();
            }
        }
    }
    //end 点击查询后验证表单是否完整

    //点击查询请求
    function VerificationBuy(rank) {
        var dataPot = {
            rank:rank
        };
        $.ajax({
            url:url + "wx/volunteer/check",
            type:"GET",
            dataType:"json",
            data:dataPot,
            success:function (data) {
                var provinceId = screenUl.find("li").eq(0).find(".screenBtnValue").attr("provinceid");
                var type = screenUl.find("li").eq(1).find(".screenBtnValue").attr("subjectid");
                var rank = ranking.val();
                var score = number.val();
                if(!data.message){
                    // adress = url + "guorenTeach/voluntaryResult.html" + "?provinceId=" + provinceId + "&?type=" + type + "&?rank=" + rank + "&?score=" + score + "&?pageNumber=" + pageNumber;
                    // window.open(adress,"_self");
                    if(data.status == true){
                        adress = url + "guorenTeach/voluntaryResult.html" + "?provinceId=" + provinceId + "&?type=" + type + "&?rank=" + rank + "&?score=" + score + "&?pageNumber=" + pageNumber;
                        window.open(adress,"_self");
                    }else{
                        tip = "购买后查询结果";
                        pageTip(tip);
                        buy(
                            screenUl.find(".screenBtnValue").eq(0).attr("provinceid")-0,
                            ranking.val() - 0,
                            number.val() - 0,
                            screenUl.find(".screenBtnValue").eq(1).attr("subjectid")-0
                        )
                    }
                }else{
                    if(data.message == "请先登录"){
                        loginFalse();
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
    //end 点击查询请求

    var disclaimerPage = $(".disclaimerPage");
    $(".disclaimerBtn").bind("click",function () {
        disclaimerPage.fadeIn();
    });

    disclaimerPage.bind("click",function () {
        disclaimerPage.fadeOut();
    });

    //点击查询后如果未购买请求购买
    function buy(provinceid,rank,score,type) {
        var dataPot = {
            provinceId:provinceid,
            rank:rank,
            score:score,
            type:type
        };
        $.ajax({
            url:url + "wx/volunteer/buy",
            type:"POST",
            dataType:"json",
            data:dataPot,
            success:function (data) {
                buyObj = data;
                if(data.status == true){
                    onBridgeReady();
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
    function onBridgeReady(){
        //noinspection JSUnresolvedVariable
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', buyObj.data,
            function(res){
                //noinspection JSUnresolvedVariable
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    tip = "购买成功";
                    adress = url + "guorenTeach/voluntaryResult.html" + "?provinceId=" + provinceId + "&?type=" + type + "&?rank=" + rank + "&?score=" + score + "&?pageNumber=" + pageNumber;
                    pageTip(tip,adress);
                } else{
                    tip = "支付失败";
                    pageTip(tip);
                }    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
    //end 点击查询后如果未购买请求购买
});
