/**
 * Created by zy on 2017/4/28.
 */
$(function () {
    if(window.localStorage.getItem("subjectChouse")){
        window.localStorage.setItem("subjectChouseList",window.localStorage.getItem("subjectChouse"));
        window.localStorage.setItem("subjectChouseListText",window.localStorage.getItem("subjectChouseText"));
    }
    var subjectChouse = JSON.parse(window.localStorage.getItem("subjectChouseList"));
    var subjectChouseText = JSON.parse(window.localStorage.getItem("subjectChouseListText"));
    window.localStorage.removeItem("subjectChouse");
    window.localStorage.removeItem("subjectChouseText");
    subjectTransformation(subjectChouse);
    var subjectIds = {};
    for(var i = 0; i < subjectChouse.length;i++){
        subjectIds[i] = subjectChouse[i];
    }
    var levelIds = {};
    var regionIds = {};
    var tagIds = {};
    var typeIds = {};
    var year = 2017;
    var dataObj;
    var postNumber = 0;
    dataRequest();
    screenPageShow();

    //请求页面数据
    function dataRequest() {
        postNumber = postNumber + 1;
        var dataPost = {
            levelIds:levelIds,
            regionIds:regionIds,
            subjectIds:subjectIds,
            tagIds:tagIds,
            typeIds:typeIds,
            year:year,
            "pageNum":postNumber
        };
        $.ajax({
            url:url + "wx/subject/university",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    appendData();
                    subjectChouseText = [];
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
    //end 请求页面数据

    //添加頁面內容
    function appendData() {
        var subjectChouseClass = $(".subjectChouseClass");
        subjectChouseText.forEach(function (e,index) {
            if(index < subjectChouseText.length-1){
                $("<span></span>").text(e + "、").appendTo(subjectChouseClass);
            }else{
                $("<span></span>").text(e).appendTo(subjectChouseClass);
            }
        });
        var university = $(".universityListBox");
        for(var b = 0;b < dataObj.data.length;b++){
            var universityList = university.find(".universityList");
            var universityItem = $("<li></li>").appendTo(universityList);
            var universityLink = $("<a></a>").attr({
                "href": url + "guorenTeach/subjectUniversity.html" + "?universityId=" + dataObj.data[b].id
            }).appendTo(universityItem);
            var universityRightBox = $("<div></div>").addClass("universityRight").appendTo(universityLink);
            var universityInfoBox = $("<div></div>").addClass("universityInfo").appendTo(universityRightBox);
            $("<div></div>").addClass("universityName").text(dataObj.data[b].name).appendTo(universityInfoBox);
            var universityOtherBox = $("<ul></ul>").addClass("universityOther").appendTo(universityInfoBox);
            //noinspection JSUnresolvedVariable
            if (dataObj.data[b].tag985 == true) {
                var universityOtherItem4 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon--1'></use></svg>");
                $("<span></span>").addClass("locationText").appendTo(universityOtherItem4).text('985');
            }
            //noinspection JSUnresolvedVariable
            if (dataObj.data[b].tag211 == true) {
                var universityOtherItem3 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon--'></use></svg>");
                $("<span></span>").addClass("locationText").appendTo(universityOtherItem3).text('211');
            }
            var universityOtherItem1 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon-weizhi-'></use></svg>");
            //noinspection JSUnresolvedVariable
            $("<span></span>").addClass("locationText").text(dataObj.data[b].provinceName).appendTo(universityOtherItem1);
            var universityOtherItem2 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon-xueli-'></use></svg>");
            //noinspection JSUnresolvedVariable
            $("<span></span>").addClass("locationText").appendTo(universityOtherItem2).text(dataObj.data[b].level);
            var universityLeftBox = $("<div></div>").addClass("universityLeft").appendTo(universityLink);
            //noinspection JSUnresolvedVariable
            $("<img>").attr("src", dataObj.data[b].logoUrl).appendTo(universityLeftBox);
        }
        lission();
    }
    //end 添加頁面內容

    //监听页面滚动事件
    function lission() {
        window.onscroll = function() {
            var offset = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var delta = offset - document.body.scrollTop ;
            if (delta == 0) {
                loadPage();
            }
        }

    }
    //end 监听页面滚动事件

    //页面滚动到底部请求数据
    function loadPage() {
        var loadBox = $(".loadBox");
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
    //end 页面滚动到底部请求数据

    //筛选按钮点击事件绑定
    function screenPageShow() {
        var screenBtn = $(".subjectChouseScreenBtn");
        var screenPage = $(".screenPage");
        var screenBtnBox = $(".screenBtnBox");
        var universityList = $(".universityList");
        var content = $(".content");
        var body =$("body");
        var screenBox = $(".screenPageBox");
        var screenContent = $(".screenContent");
        var screenReset = $(".screenReset");
        var screenSure = $(".screenSure");
        //阻止事件冒泡
        screenPage.bind("touchmove",function (e) {
            e.stopImmediatePropagation();
        });
        screenPage.bind("touchmove",function (e) {
            e.stopImmediatePropagation();
        });
        screenBox.bind("click",function (e) {
            e.stopImmediatePropagation();
        });
        screenBox.bind("touchmove",function (e) {
            e.stopImmediatePropagation();
        });
        screenBox.bind("doubleClick",function (e) {
            e.stopImmediatePropagation();
        });
        screenContent.find("ul").bind("click",function (e) {
            e.stopImmediatePropagation();
        });
        screenContent.find("ul").bind("doubleClick",function (e) {
            e.stopImmediatePropagation();
        });
        //end 阻止事件冒泡

        var screenTitleBox = $(".screenTitleBox");
        var screenBox0 = $(".screenBox0");
        var screenBox1 = $(".screenBox1");
        var screenBox2 = $(".screenBox2");
        var screenBox3 = $(".screenBox3");
        var screenBox4 = $(".screenBox4");
        screenTitleBox.bind("click",function () {
            if($(this).attr("class") == "screenTitleBox yearScreen"){
                if(screenBox0.is(":hidden") == false){
                    screenBox0.slideUp(200);
                    $(this).html("<span class='screenTitle'>年份</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
                }else{
                    screenBox0.slideDown(200);
                    $(this).html("<span class='screenTitle'>年份</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
                }
            }else if($(this).attr("class") == "screenTitleBox EducationScreen"){
                if(screenBox1.is(":hidden") == false){
                    screenBox1.slideUp(200);
                    $(this).html("<span class='screenTitle'>学历层次</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
                }else{
                    screenBox1.slideDown(200);
                    $(this).html("<span class='screenTitle'>学历层次</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
                }
            }else if($(this).attr("class") == "screenTitleBox heightSchoolScreen"){
                if(screenBox2.is(":hidden") == false){
                    screenBox2.slideUp(200);
                    $(this).html("<span class='screenTitle'>高校标签</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
                }else{
                    screenBox2.slideDown(200);
                    $(this).html("<span class='screenTitle'>高校标签</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
                }
            }else if($(this).attr("class") == "screenTitleBox heightSchoolTypeScreen"){
                if(screenBox3.is(":hidden") == false){
                    screenBox3.slideUp(200);
                    $(this).html("<span class='screenTitle'>高校类型</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
                }else{
                    screenBox3.slideDown(200);
                    $(this).html("<span class='screenTitle'>高校类型</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
                }
            }else if($(this).attr("class") == "screenTitleBox stationScreen"){
                if(screenBox4.is(":hidden") == false){
                    screenBox4.slideUp(200);
                    $(this).html("<span class='screenTitle'>地区</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
                }else{
                    screenBox4.slideDown(200);
                    $(this).html("<span class='screenTitle'>地区</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
                }
            }
        });

        //弹出筛选页面的
        screenBtn.bind("click",function (e) {
            screenPage.show();
            e.preventDefault();
        });
        //end 弹出筛选页面的

        //隐藏筛选页面
        screenPage.bind("click",function (e) {
            screenPage.fadeOut(200);
            screenBox.find(".screenPageBox").scrollTop(0);
            e.preventDefault();
        });
        //end 隐藏筛选页面
        function screenPageHide() {
            screenPage.css({
                display:'none',
                left:0
            });
        }

        //筛选页标签点击事件
        screenContent.find("input[type=checkbox]").bind("click",function (e) {
            $(this).parent().parent().toggleClass("screenInputCheck");
            if($(this).is(':checked') == false){
                $(this).attr("checked",false);
            }else{
                $(this).attr("checked",true);
            }
            e.stopImmediatePropagation();
        });
        screenContent.find("input[type=radio]").bind("click",function (e) {
            if($(this).not(":checked")){
                screenContent.find("input[type=radio]").attr("checked",false);
                screenContent.find(".screenBox0").find("li").removeClass("screenInputCheck");
                $(this).attr("checked",true);
                $(this).parent().parent().addClass("screenInputCheck");
            }else{
                screenContent.find("input[type=radio]").attr("checked",false);
                screenContent.find(".screenBox0").find("li").removeClass("screenInputCheck");
            }
            e.stopImmediatePropagation();
        });
        //end 筛选页标签点击事件

        //筛选重置按钮点击事件
        screenReset.bind("click",function (e) {
            screenContent.find("input[type=checkbox]").each(function (index,el) {
                if($(this).is(':checked')){
                    el.checked = false;
                    $(this).attr("checked",false);
                }
                $(this).parent().parent().removeClass("screenInputCheck");
            });
            screenContent.find("input[type=radio]").each(function (index,el) {
                if($(this).is(':checked')){
                    el.checked = false;
                    $(this).attr("checked",false);
                    $(this).parent().parent().removeClass("screenInputCheck");
                }
                if(index == 0){
                    el.checked = true;
                    $(this).attr("checked",true);
                    $(this).parent().parent().addClass("screenInputCheck");
                }
            });
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        //end 筛选重置按钮点击事件

        //筛选确定按钮点击事件
        screenSure.bind("click",function (e) {
            $(".universityList").empty();
            postNumber = 0;
            levelIds = {};
            tagIds = {};
            typeIds = {};
            regionIds = {};
            year = 2017;
            if (screenContent.find(".screenBox0").find("input[type=radio]").is(":checked") == true) {
                screenContent.find(".screenBox0").find("input[type=radio]").each(function () {
                    if($(this).is(":checked")){
                        year = $(this).attr("dataYear") - 0;
                    }
                });
            }
            if (screenContent.find(".screenBox1").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox1").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        levelIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox2").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox2").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        tagIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox3").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox3").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        typeIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox4").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox4").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        regionIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            var loadBox = $(".loadBox");
            loadBox.html("已无更多信息").css({
                "fontSize":"2.4rem",
                "textAlign":"center",
                "lineHeight":"8.3rem"
            });
            dataRequest();
            screenPageHide();
            e.preventDefault();
        });
    }

    //end 筛选按钮点击事件绑定

    function subjectTransformation(obj) {
        for(var i = 0;i < obj.length;i++){
            obj[i] = obj[i]-0;
        }
    }
});