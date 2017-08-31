/**
 * Created by zy on 2017/3/16.
 */
$(function () {
    var dataObj;
    var dataObj2;
    var dataObj3;
    var dataObj4;
    var postNumber = 0;
    var pageActive = $(".pageActive");
    var pagenavBox = $(".pagenav");
    var loadBox = $(".loadBox");

    pagenavBox.find("li").bind("click",function () {
        pagenavBox.find("li").removeClass("pageActive");
        $(this).addClass("pageActive");
        pageActive = $(".pageActive");
        $(".pageContentBox").empty();
        postNumber = 0;
        loadBox.html(
            "<div class='load'>"+
                "<span class='loadIcon'></span>"+
                "<span class='loadText'></span>"+
             "</div>"
        );
        dataGet();
    });

    //请求数据
    function dataGet() {
        postNumber = postNumber + 1;
        var dataPost;
        if (pageActive.text() == "学业规划"){
            dataPost = {
                pageNum: postNumber,
                pageSize:10
            };
            $.ajax({
                url:url + 'wx/policy/list',
                type:'POST',
                data:dataPost,
                dataType:'json',
                success:function (data) {
                    if(data.status == true){
                        dataObj = data;
                        appendList();
                        aLink();
                        var palicyContentBox = $(".palicyContent");
                        var palicyContentBoxHeight = palicyContentBox.height();
                        var loadHeight = palicyContentBoxHeight - $(window).height();
                        if(loadHeight>0){
                            lission();
                        }else{
                            if(dataObj.pager.pageNum < dataObj.pager.pageCount){
                                dataGet();
                            }else{
                                loadBox.html("暂无更多信息").css({
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
            })
        }else if(pageActive.text() == "职业规划"){
            dataPost = {
                pageNum: postNumber,
                pageSize:10
            };
            $.ajax({
                url:url + 'wx/policy/specialcolumn',
                type:'POST',
                data:dataPost,
                dataType:'json',
                success:function (data) {
                    if(data.status == true){
                        dataObj3 = data;
                        appendList();
                        aLink2();
                        var questionContent = $(".questionContent");
                        var questionContentHeight = questionContent.height();
                        var loadHeight = questionContentHeight - $(window).height();
                        if(loadHeight>0){
                            lission();
                        }else{
                            if(dataObj3.pager.pageNum < dataObj3.pager.pageCount){
                                dataGet();
                            }else{
                                loadBox.html("暂无更多信息").css({
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
            })
        }else if(pageActive.text() == "高考新政"){
            loadBox.html("暂无更多信息").css({
                "fontSize":"2.4rem",
                "textAlign":"center",
                "lineHeight":"8.3rem"
            });
        }else if(pageActive.text() == "常见问题"){
            dataPost = {
                keyword:"",
                pageNum: postNumber,
                pageSize:10
            };
            $.ajax({
                url:url + 'wx/question/list',
                type:'POST',
                data:dataPost,
                dataType:'json',
                success:function (data) {
                    if(data.status == true){
                        dataObj2 = data;
                        appendList();
                        var questionContent = $(".questionContent");
                        var questionContentHeight = questionContent.height();
                        var loadHeight = questionContentHeight - $(window).height();
                        if(loadHeight>0){
                            lission();
                        }else{
                            if(dataObj2.pager.pageNum < dataObj2.pager.pageCount){
                                dataGet();
                            }else{
                                loadBox.html("暂无更多信息").css({
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
            })
        }
    }
    //end 请求数据
    dataGet();



    //页面内容添加
    function appendList() {
        var pageActive = $(".pageActive");
        var pageContentBox = $(".pageContentBox");
        if(pageActive.text() == "学业规划"){
            if(pageContentBox.find("ul").length == 0){
                var palicyContent = $("<ul></ul>").addClass("palicyContent").appendTo(pageContentBox);
            }else{
                palicyContent = $(".palicyContent");
            }
            for (var i = 0;i < dataObj.data.length;i++){
                var palicyContentA;
                var palicyContentLi = $("<li></li>").appendTo(palicyContent);
                if(dataObj.data[i].type == 0){
                    palicyContentA = $("<a></a>").attr({
                        "href":url + "guorenTeach/policyContent.html" + "?polocyId=" + dataObj.data[i].id
                    }).appendTo(palicyContentLi);
                }else{
                    palicyContentA = $("<a></a>").attr("href",dataObj.data[i].url).appendTo(palicyContentLi);
                }
                $("<p></p>").addClass("palicyText").text(dataObj.data[i].title).appendTo(palicyContentA);
                $("<span></span>").addClass("palicyIcon iconfont icon-xiangxia-").appendTo(palicyContentA);
            }
            return pageActive.height();
        }else if(pageActive.text() == "职业规划"){
            if(pageContentBox.find("ul").length == 0){
                var newContent = $("<ul></ul>").addClass("newContent").appendTo(pageContentBox);
            }else{
                newContent = $(".newContent");
            }
            for (var b = 0;b < dataObj3.data.length;b++){
                var newContentA;
                var newContentLi = $("<li></li>").appendTo(newContent);
                newContentA = $("<a></a>").attr({
                    "href":url + "guorenTeach/policyContent.html" + "?polocyId=" + dataObj3.data[b].id
                }).appendTo(newContentLi);
                $("<p></p>").addClass("palicyText").text(dataObj3.data[b].title).appendTo(newContentA);
                $("<span></span>").addClass("palicyIcon iconfont icon-xiangxia-").appendTo(newContentA);
            }
            return pageActive.height();
        }else if(pageActive.text() == "高考新政"){
            if(pageContentBox.find("ul").length == 0){
                var newContent2 = $("<ul></ul>").addClass("newContent2").appendTo(pageContentBox);
            }else{
                newContent2 = $(".newContent2");
            }
            return pageActive.height();
        }else if(pageActive.text() == "常见问题"){
            if(pageContentBox.find("ul").length == 0){
                var questionContent = $("<ul></ul>").addClass("questionContent").appendTo(pageContentBox);
            }else{
                questionContent = $(".questionContent");
            }
            for(var a = 0;a < dataObj2.data.length;a++){
                var questionContentLi = $("<li></li>").appendTo(questionContent);
                var questionDiv = $("<div></div>").addClass('questionDiv').appendTo(questionContentLi).bind("click",function () {
                    var questionDivAll = $(".questionDiv");
                    if($(this).parent().find(".questionHide").is(":hidden")){
                        questionDivAll.parent().find(".questionHide").slideUp(100);
                        questionDivAll.find(".palicyIcon").removeClass("icon-xiangshang-").addClass("icon-xiangxia-");
                        $(this).parent().find(".questionHide").slideDown(100);
                        $(this).find(".palicyIcon").removeClass("icon-xiangxia-").addClass("icon-xiangshang-");
                    }else{
                        questionDivAll.parent().find(".questionHide").slideUp(100);
                        $(this).find(".palicyIcon").removeClass("icon-xiangshang-").addClass("icon-xiangxia-");
                    }
                });
                $("<p></p>").addClass("palicyText").text(dataObj2.data[a].content).appendTo(questionDiv);
                $("<span></span>").addClass("palicyIcon iconfont icon-xiangxia-").appendTo(questionDiv);
                //noinspection JSUnresolvedVariable
                var questionHide = $("<p></p>").addClass('questionHide').text(dataObj2.data[a].answer).appendTo(questionContentLi).hide();
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
        if(pageActive.text() == "学业规划"){
            if(dataObj.pager.pageNum < dataObj.pager.pageCount){
                dataGet();
            }else{
                loadBox.html("暂无更多信息").css({
                    "fontSize":"2.4rem",
                    "textAlign":"center",
                    "lineHeight":"8.3rem"
                });
            }
        }else if(pageActive.text() == "职业规划"){
            if(dataObj3.pager.pageNum < dataObj3.pager.pageCount){
                dataGet();
            }else{
                loadBox.html("暂无更多信息").css({
                    "fontSize":"2.4rem",
                    "textAlign":"center",
                    "lineHeight":"8.3rem"
                });
            }
        }else if(pageActive.text() == "高考新政"){
            if(dataObj4.pager.pageNum < dataObj4.pager.pageCount){
                dataGet();
            }else{
                loadBox.html("暂无更多信息").css({
                    "fontSize":"2.4rem",
                    "textAlign":"center",
                    "lineHeight":"8.3rem"
                });
            }
        }else if(pageActive.text() == "常见问题"){
            if(dataObj2.pager.pageNum < dataObj2.pager.pageCount){
                dataGet();
            }else{
                loadBox.html("暂无更多信息").css({
                    "fontSize":"2.4rem",
                    "textAlign":"center",
                    "lineHeight":"8.3rem"
                });
            }
        }

    }
    //end 页面滚动到底部请求数据

    //页面跳转前的id存储
    function aLink2() {
        var newPalicyId;
        var palicyLink = $(".newContent").find("li").find("a");
        palicyLink.bind("click",function () {
            newPalicyId = $(this).attr("newPalicy-id");
            window.localStorage.setItem('newPalicyId', newPalicyId);
        });
    }
    //end 页面跳转前的id存储

    //页面跳转前的id存储
    function aLink() {
        var palicyId;
        var palicyLink = $(".palicyContent").find("li").find("a");
        palicyLink.bind("click",function () {
            palicyId = $(this).attr("palicy-id");
            window.localStorage.setItem('palicyId', palicyId);
        });
    }
    //end 页面跳转前的id存储
});