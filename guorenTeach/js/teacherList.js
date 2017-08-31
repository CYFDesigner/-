/**
 * Created by zy on 2017/3/13.
 */
$(function () {
    var dataObj;
    var postNumber = 0;
    var labelId = null;
    //获取列表数据
    function dataRequest() {
        postNumber = postNumber + 1;
        var dataPage = {
            "labelId":labelId,
            "pageNum":postNumber,
            "pagesize":10
        };
        $.ajax({
            url:url + 'wx/mentor/list',
            type:'POST',
            data:dataPage,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    labelId = null;
                    append();
                    var teacherList = $(".teacherList");
                    var teacherListHenght = teacherList.height();
                    var loadHeight = teacherListHenght - $(window).height();
                    var loadBox = $(".loadBox");
                    if(loadHeight>0){
                        lission();
                    }else{
                        //noinspection JSUnresolvedVariable
                        if(dataObj.pager.pageNum < dataObj.pager.pageCount){
                            dataRequest();
                        }else{
                            loadBox.html("已无更多信息").css({
                                "fontSize":"2.4rem",
                                "textAlign":"center",
                                "lineHeight":"8.3rem"
                            });
                        }
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
        });
        if(postNumber == 1){
            var speed=200;//滑动的速度
            $('body,html').animate({ scrollTop: -10000 }, speed);
            return false;
        }
        return postNumber;
    }
    dataRequest();
    //end 获取列表数据

    //页面内容添加
    function append() {
        var teacherListBox =  $(".teacherList");
        for(var i = 0;i< dataObj.data.length;i++){
            if(dataObj.data[i] == undefined){

            }else{
                var teacherListLi = $("<li></li>").appendTo(teacherListBox);
                var teacherListA = $("<a></a>").attr("href",url + "guorenTeach/teacherAsk.html" + "?teacherId=" + dataObj.data[i].id).appendTo(teacherListLi);
                var teacherLeftBox = $("<div></div>").addClass("teacherLeft").appendTo(teacherListA);
                    $("<img>").attr("src",dataObj.data[i].head).appendTo(teacherLeftBox);
                var teacherRightBox = $("<div></div>").addClass("teacherRight").appendTo(teacherListA);
                    $("<p></p>").addClass("teacherName").text(dataObj.data[i].name).appendTo(teacherRightBox);
                    //noinspection JSUnresolvedVariable
                    $("<p></p>").addClass("teacherInfo").text(dataObj.data[i].description).appendTo(teacherRightBox);
                    var teacherLableBox = $("<ul></ul>").addClass("teacherLable").appendTo(teacherRightBox);
                    for(var a = 0;a < dataObj.data[i].labels.length;a++){
                        if(dataObj.data[i].labels[a].name == "选考"){
                            $("<li></li>").addClass("teacherChouse").text("选考").appendTo(teacherLableBox);
                        }else if(dataObj.data[i].labels[a].name == "生涯规划"){
                            $("<li></li>").addClass("teacherCareer").text("生涯规划").appendTo(teacherLableBox);
                        }else if(dataObj.data[i].labels[a].name == "艺考"){
                            // $("<li></li>").addClass("teacherArt").text("艺考").appendTo(teacherLableBox);
                        }else if(dataObj.data[i].labels[a].name == "职业达人"){
                            $("<li></li>").addClass("teachertThree").text("职业达人").appendTo(teacherLableBox);
                        }else if(dataObj.data[i].labels[a].name == "留学"){
                            // $("<li></li>").addClass("teacherStudy").text("留学").appendTo(teacherLableBox);
                        }
                    }
            }
        }
    }
    //end 页面内容添加

    //监听页面滚动事件
    function lission() {
        window.onscroll = function() {
            var offset = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var delta = offset - document.body.scrollTop ;
            if (delta <= 0) {
                loadPage();
            }
        }
    }
    //end 监听页面滚动事件

    //页面滚动到底部请求数据
    function loadPage() {
        var loadBox = $(".loadBox");
        var teacherList = $(".teacherList");
        //noinspection JSUnresolvedVariable
        if(dataObj.pager.pageNum < dataObj.pager.pageCount){
            dataRequest();
        }else{
            teacherList.css("padding-bottom","0");
            loadBox.css("display","block");
            loadBox.html("已无更多导师信息").css({
                "fontSize":"2.4rem",
                "textAlign":"center",
                "lineHeight":"8.3rem"
            });
        }
    }
    //end 页面滚动到底部请求数据

    //筛选事件
    function screen() {
        var loadBox = $(".loadBox");
        var teacherList = $(".teacherList");
        $(".chouseScreen").bind("click",function () {
            teacherList.empty();
            if($(this).find(".screenText").attr("class") == "screenText screenTextActive"){
                labelId = null;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
            }else{
                labelId = 1;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
                $(this).find(".screenText").addClass("screenTextActive");
            }
        });
        $(".careerScreen").bind("click",function () {
            teacherList.empty();
            if($(this).find(".screenText").attr("class") == "screenText screenTextActive"){
                labelId = null;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
            }else{
                labelId = 2;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
                $(this).find(".screenText").addClass("screenTextActive");
            }
        });
        $(".artScreen").bind("click",function () {
            teacherList.empty();
            if($(this).find(".screenText").attr("class") == "screenText screenTextActive"){
                labelId = null;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
            }else{
                labelId = 3;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
                $(this).find(".screenText").addClass("screenTextActive");
            }
        });
        $(".threeScreen").bind("click",function () {
            teacherList.empty();
            if($(this).find(".screenText").attr("class") == "screenText screenTextActive"){
                labelId = null;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
            }else{
                labelId = 4;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
                $(this).find(".screenText").addClass("screenTextActive");
            }
        });
        $(".studyScreen").bind("click",function () {
            teacherList.empty();
            if($(this).find(".screenText").attr("class") == "screenText screenTextActive"){
                labelId = null;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
            }else{
                labelId = 5;
                postNumber = 0;
                dataRequest();
                $(".screenText").removeClass("screenTextActive");
                $(this).find(".screenText").addClass("screenTextActive");
            }
        });
    }
    //end 筛选事件
    screen();
});