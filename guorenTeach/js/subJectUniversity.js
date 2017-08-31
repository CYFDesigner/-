/**
 * Created by zy on 2017/5/3.
 */
$(function () {
    var dataObj;
    var subjectObj;
    var year = 2017;
    //获取大学ID
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var dataId;
    if(lastIndex != -1){
        dataId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        dataId = location.search.substr(index+1);
    }
    //end 获取大学ID
    var subjectChouseText = JSON.parse(window.localStorage.getItem("subjectChouseListText"));

    dataRequest();
    dataSubject();
    //请求数据
    function dataRequest() {
        var Id = {
            "id":dataId
        };
        //请求大学信息
        $.ajax({
            url:url + 'wx/subject/university/' + dataId,
            type:'GET',
            dataType:'json',
            data:Id,
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    $("title").html(dataObj.data.name);
                    appendData();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip = "数据请求失败，请刷新再试";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
        //end 请求大学信息
    }
    //end 请求数据

    function dataSubject() {
        var Id = {
            "universityId":dataId,
            "year":year
        };
        //请求大学信息
        $.ajax({
            url:url + 'wx/subject/specialty',
            type:'GET',
            dataType:'json',
            data:Id,
            success:function (data) {
                if(data.status == true){
                    subjectObj = data;
                    appendSubject();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip = "数据请求失败，请刷新再试";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
        //end 请求大学信息
    }

    //添加大学概述信息
    function appendData() {
        var LogoBox = $(".universityLogo");
        $("<img>").attr("src",dataObj.data.logoUrl).appendTo(LogoBox);
        var universityName = $(".universityName");
        universityName.text(dataObj.data.name);
        var universityClass = $(".universityClass");
        universityClass.empty();
        var universityClassRegion = $("<li></li>").appendTo(universityClass);
        $("<i></i>").addClass("locationIcon iconfont icon-dingwei").appendTo(universityClassRegion);
        $("<span></span>").addClass("locationText").text(dataObj.data.provinceName).appendTo(universityClassRegion);
        var universityClassLevel =  $("<li></li>").appendTo(universityClass);
        $("<i></i>").addClass("locationIcon iconfont icon-xueli").appendTo(universityClassLevel);
        $("<span></span>").addClass("locationText").text(dataObj.data.level).appendTo(universityClassLevel);
        if(dataObj.data.tag211 == true){
            var universityClassTag211 =  $("<li></li>").appendTo(universityClass);
            $("<i></i>").addClass("locationIcon iconfont icon-icon-test").appendTo(universityClassTag211);
            $("<span></span>").addClass("locationText").text("211").appendTo(universityClassTag211);
        }
        if(dataObj.data.tag985 == true){
            var universityClassTag985 =  $("<li></li>").appendTo(universityClass);
            $("<i></i>").addClass("locationIcon iconfont icon-icon-test1").appendTo(universityClassTag985);
            $("<span></span>").addClass("locationText").text("985").appendTo(universityClassTag985);
        }
        var universityLable = $(".universityLable");
        universityLable.empty();
        for(var b = 0;b < dataObj.data.labels.length;b++){
            if(dataObj.data.labels[b].name == "211"){
                $("<li></li>").text("211").appendTo(universityLable);
            }
            if(dataObj.data.labels[b].name == "985"){
                $("<li></li>").text("985").appendTo(universityLable);
            }
            if(dataObj.data.labels[b].name == "研究生院"){
                $("<li></li>").text("研究生院").appendTo(universityLable);
            }
            if(dataObj.data.labels[b].name == "国防生"){
                $("<li></li>").text("国防生").appendTo(universityLable);
            }
        }

        var subjectChouseTextSpan = $(".subjectChouseText").find("span");
        subjectChouseText.forEach(function (e,index) {
            if(index < subjectChouseText.length-1){
                $("<span></span>").text(e + "、").appendTo(subjectChouseTextSpan);
            }else{
                $("<span></span>").text(e).appendTo(subjectChouseTextSpan);
            }
        });
        screenBind();
    }
    //end 添加大学概述信息

    //添加选考专业信息
    function appendSubject() {
        var subjectList = $(".subjectList");
        for (var i = 0;i < subjectObj.data.length;i++){
            var subjectListItem = $("<li></li>").appendTo(subjectList);
                $("<div></div>").addClass("subjectName").text("专业(类)名称: " + subjectObj.data[i].specialtyName).appendTo(subjectListItem);
                $("<div></div>").addClass("subjectMajor").html("类中所含专业: " + subjectObj.data[i].containSpecialty).appendTo(subjectListItem);
                var subjectLabelBox = $("<div></div>").addClass("subjectLabel").appendTo(subjectListItem);
                if(subjectObj.data[i].level == 0){
                    $("<span></span>").addClass("levelLabel").text("本科").appendTo(subjectLabelBox)
                }else if(subjectObj.data[i].level == 1){
                    $("<span></span>").addClass("levelLabel").text("专科").appendTo(subjectLabelBox)
                }
                subjectObj.data[i].subjects.forEach(function (e) {
                    $("<span></span>").text(e).appendTo(subjectLabelBox);
                });
        }
    }
    //end 添加选考专业信息

    function screenBind() {
        var yearScreenBtn = $(".yearScreenBtn");
        var screenBox = $(".screenBox");
        var yearScreenBox = $(".subjectYearScreenBox");
        yearScreenBtn.bind("click",function () {
            screenBox.fadeIn(200);
            addFlag();
        });
        screenBox.bind("click",function (e) {
            screenBox.fadeOut(200);
            addFlag();
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        yearScreenBox.bind("click",function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
        yearScreenBox.find("li").bind("touchstart",function (e) {
            yearScreenBox.find("li").removeClass("yearActive");
            $(this).addClass("yearActive");
            yearScreenBtn.html($(this).text() + "年 <span class='iconfont icon-xiangxia- iconSpan'></span>");
            year = $(this).text() - 0;
            screenBox.fadeOut(200);
            dataSubject();
            e.preventDefault();
        })
    }
    var flag = 0;
    var bodyScrollTop;
    var oldScrollTop;
    function addFlag() {
        var majorScreen = $(".majorScreen");
        var screenBox = $(".screenBox");
        var admissionScreen = $(".admissionScreen");
        bodyScrollTop = $("body").scrollTop();
        setTimeout(function () {
            if(screenBox.is(":hidden")){
                flag = 0;
                // $("body").removeClass("modal-open").scrollTop(oldScrollTop);
            }else{
                flag = 1;
                // $("body").css("top",-1 * bodyScrollTop);
                // oldScrollTop = bodyScrollTop;
            }
        },300);
    }

    document.body.addEventListener('touchmove', function (event) {
        var screenBox = $(".screenBox");
        var itemParentClass = event.target.parentNode.parentNode.parentNode.className;
        var itemClass = event.target.className;
        if(itemParentClass == "screenBox"){

        }else if(itemClass == "screenBox"){
            screenBox.fadeOut(200);
            event.preventDefault();
        }
    });
});