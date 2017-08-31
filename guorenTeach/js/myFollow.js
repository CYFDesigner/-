/**
 * Created by zy on 2017/3/22.
 */
$(function () {
    var dataObj;
    var pageActive = $(".pageActive");
    //数据请求
    function dataRequest(){
        $.ajax({
            url:url + "wx/account/collection",
            type:"GET",
            dataType:"json",
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    navClick();
                    appendList();
                }else{
                    var openUrl = url + "guorenTeach/myFollow.html";
                    loginFalse(openUrl);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    dataRequest();
    //end 数据请求

    //页面内容添加
    function appendList() {
        var pageContent = $(".pageContent");
        var collectMajor = $("<ul></ul>").addClass("collectMajorBox").appendTo(pageContent);
        if(dataObj.data.specialties.length > 0){
            //noinspection JSUnresolvedVariable
            for(var i = 0;i < dataObj.data.specialties.length;i++){
                var majorItem = $("<li></li>").appendTo(collectMajor);
                //noinspection JSUnresolvedVariable
                var majorLink = $("<a></a>").attr({
                    "href":url + "guorenTeach/majorShow.html" + "?majorId=" + dataObj.data.specialties[i].id
                }).appendTo(majorItem).bind("click",function () {
                    window.localStorage.setItem("majorId",$(this).attr("majorId"))
                });
                //noinspection JSUnresolvedVariable
                majorLink.html("" +
                    "<span class='majorNumber'>"+dataObj.data.specialties[i].code+"</span>" +
                    "<span class='majorNameList'>"+dataObj.data.specialties[i].name+"</span>" +
                    "<span class='majorEducation'>"+dataObj.data.specialties[i].levelName+"</span>"+
                    "<svg class='majorIcon icon' aria-hidden='true'>" +
                    "<use xlink:href='#icon-xueli-'></use>" +
                    "</svg>");
            }
        }else{
            $("<li></li>").attr("class","noData").text("暂无专业收藏信息").appendTo(collectMajor);
        }

        var collectUniversity = $("<ul></ul>").addClass("collectUniversityBox").appendTo(pageContent);
        //noinspection JSUnresolvedVariable
        if(dataObj.data.universities.length > 0){
            for (var a = 0;a < dataObj.data.universities.length;a++){
                var universityItem = $("<li></li>").appendTo(collectUniversity);
                //noinspection JSUnresolvedVariable
                var universityLink = $("<a></a>").attr({
                    "href":url + "guorenTeach/universityShow.html" + "?universityId=" + dataObj.data.universities[a].id
                }).appendTo(universityItem).bind("click",function () {
                    window.localStorage.setItem("dataId",$(this).attr("dataId"));
                });
                var logoBox = $("<span></span>").addClass("universityLogo").appendTo(universityLink);
                //noinspection JSUnresolvedVariable
                $("<img>").attr("src",dataObj.data.universities[a].logo).appendTo(logoBox);
                //noinspection JSUnresolvedVariable
                $("<span></span>").addClass("universityName").text(dataObj.data.universities[a].name).appendTo(universityLink);
            }
        }else{
            $("<li></li>").attr("class","noData").text("暂无大学收藏信息").appendTo(collectUniversity);
        }

        if(pageActive.text() == "专业"){
            $(".collectMajorBox").show();
            $(".collectUniversityBox").hide();
        }else if(pageActive.text() == "高校"){
            $(".collectMajorBox").hide();
            $(".collectUniversityBox").show();
        }
    }
    //end 页面内容添加

    function navClick() {
        var pageNavItem = $(".pageNav li");
        pageNavItem.bind("click",function (){
            pageNavItem.removeClass("pageActive");
            $(this).addClass("pageActive");
            // appendList();
            if($(this).text() == "专业"){
                $(".collectMajorBox").show();
                $(".collectUniversityBox").hide();
            }else if($(this).text() == "高校"){
                $(".collectMajorBox").hide();
                $(".collectUniversityBox").show();
            }
        });
    }
});