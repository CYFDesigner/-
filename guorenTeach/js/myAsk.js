/**
 * Created by zy on 2017/3/24.
 */
$(function () {
    var dataObj;
    //请求数据
    function dataGet() {
        $.ajax({
            url:url + 'wx/account/question/',
            type:'GET',
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    if(dataObj.data.length == 0){
                        appendPrompt();
                    }else{
                        appendList();
                    }
                }else{
                    var openUrl = url + "guorenTeach/myAsk.html";
                    loginFalse(openUrl);
                }
            },
            error:function () {
                tip = "数据请求失败";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    dataGet();
    //end 请求数据

    //添加提示数据
    function appendPrompt() {
        var body = $("body");
        body.css({
            height:"100%",
            overflow:"hidden"
        });
        body.empty();
        $("<section></section>").text("——暂无问答信息——").addClass("promptBox").appendTo(body);
    }
    //end添加提示数据

    //添加数据内容
    function appendList() {
        var teacherAskListBox = $(".teacherAskList");
        for (var i = 0;i < dataObj.data.length;i++){
            var teacherItemBox = $("<li></li>").addClass("teacherItem").appendTo(teacherAskListBox);
                var teacherHeadBox = $("<div></div>").addClass("teacherHead").appendTo(teacherItemBox);
                    $("<img>").attr("src",dataObj.data[i].head).appendTo(teacherHeadBox);
                var askInfoBox = $("<div></div>").addClass("askInfo").appendTo(teacherItemBox);
                    var teacherNameBox = $("<div></div>").addClass("teacherName").appendTo(askInfoBox);
                        //noinspection JSUnresolvedVariable
                        $("<span></span>").addClass("teacherNameSpan").text(dataObj.data[i].teacherAskListBox).appendTo(teacherNameBox);
                    if (dataObj.data[i].status == 1){
                        $("<small></small>").text(" 未回答 ").appendTo(teacherNameBox);
                    }else if(dataObj.data[i].status == 2){
                        $("<small></small>").text(" 已回答 ").appendTo(teacherNameBox);
                    }else if(dataObj.data[i].status == 3){
                        $("<small></small>").text(" 已退款 ").appendTo(teacherNameBox);
                    }
                        //noinspection JSUnresolvedVariable
                        $("<small></small>").addClass("askTime").text(dataObj.data[i].gmtCreate).appendTo(teacherNameBox);
                    var questionContentBox = $("<div></div>").addClass("questionContent1").appendTo(askInfoBox);
                        $("<span></span>").addClass("questionContentSpan").html("<span>我的提问: </span>" + dataObj.data[i].content).appendTo(questionContentBox);
                var answerBox;
                if(dataObj.data[i].status == 1){
                    answerBox = $("<div></div>").addClass("teacherAnswer").appendTo(askInfoBox);
                    $("<span></span>").addClass("answerSpan").html("<span>导师回答: </span>" + "导师尚未作答，请耐心等候").appendTo(answerBox);
                } else if(dataObj.data[i].status == 2){
                    answerBox = $("<div></div>").addClass("teacherAnswer").appendTo(askInfoBox);
                    //noinspection JSUnresolvedVariable
                    $("<span></span>").addClass("answerSpan").html("<span>导师回答: </span>" + dataObj.data[i].answer).appendTo(answerBox);
                }
            var questionContent = $(".questionContent1");
            var questionContent2 = $(".questionContent2");
            var questionContent3 = $(".questionContent3");
            var questionContentSpan = $(".questionContentSpan");
            var showIconBtn;
            if (dataObj.data[i].status == 1){
                if(questionContentSpan.eq(i).height() > questionContent.eq(i).height()){
                    showIconBtn = $("<div></div>").addClass("showIcon").appendTo(askInfoBox);
                    $("<a></a>").text("展开").appendTo(showIconBtn);
                    $("<span></span>").addClass("Icon iconfont icon-xiangxia-").appendTo(showIconBtn);
                }else{

                }
            }else if(dataObj.data[i].status == 2){
                showIconBtn = $("<div></div>").addClass("showIcon").appendTo(askInfoBox);
                $("<a></a>").text("展开").appendTo(showIconBtn);
                $("<span></span>").addClass("Icon iconfont icon-xiangxia-").appendTo(showIconBtn);
            }else if(dataObj.data[i].status == 3){

            }
            if(questionContentSpan.eq(i).height() == questionContent.eq(i).height()){
                questionContent.eq(i).addClass("questionContent2");
            }
            if(questionContentSpan.eq(i).height() > questionContent.eq(i).height()){
                questionContent.eq(i).addClass("questionContent3");
            }
            questionContent.css({
                height: "2.2rem",
                overflow:"hidden"
            });
            questionContent2.css({
                height: "4.4rem",
                overflow:"hidden"
            });
            questionContent3.css({
                height: "4.4rem",
                overflow:"hidden"
            });
            teacherItemBox.bind("click",function () {
                if($(this).find(".showIcon").find("a").text() == "展开"){
                    $(this).find(".questionContent1").css({
                        height: "auto",
                        overflow:"hidden"
                    });
                    $(this).find(".questionContent2").css({
                        height: "auto",
                        overflow:"hidden"
                    });
                    $(".teacherAnswer").slideUp(100);
                    $(this).find(".teacherAnswer").slideDown(100);
                    $(".showIcon").find("a").text("展开");
                    $(this).find(".showIcon").find("a").text("收起");
                    $(this).find(".Icon").removeClass("icon-xiangxia-").addClass("icon-xiangshang-");
                }else if($(this).find(".showIcon").find("a").text() == "收起"){
                    $(this).find(".questionContent1").css({
                        height: "2.2rem",
                        overflow:"hidden"
                    });
                    $(this).find(".questionContent3").css({
                        height: "4.4rem",
                        overflow:"hidden"
                    });
                    $(this).find(".teacherAnswer").slideUp(100);
                    $(this).find(".showIcon").find("a").text("展开");
                    $(this).find(".Icon").removeClass("icon-xiangshang-").addClass("icon-xiangxia-");
                }
            });
        }
    }
    //end 添加数据内容
});
