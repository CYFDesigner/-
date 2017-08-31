/**
 * Created by zy on 2017/4/18.
 */
$(function () {
    var dataObj;
    var postText = "";
    var parentId = "";
    var thisParentId = "";
    var majorid;
    var majorTitle;
    var level = 0;
    dataRequest();
    //请求页面数据
    function dataRequest() {
        var dataPost = {
            parentId:parentId,
            level:level
        };
        $.ajax({
            url:url + "wx/profession/list",
            type:'GET',
            dataType:'json',
            data:dataPost,
            success:function (data) {
                if(data.status == true){
                    postText = "";
                    dataObj = data;
                    if(parentId == ""){
                        appendData();
                        itemBinding();
                    }else{
                        appendScreen();
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
    //end 请求页面数据

    //添加页面内容
    function appendData() {
        var contentList = $(".contentList");
        contentList.empty();
        for(var i = 0;i < dataObj.data.length;i++){
            var contentListLi = $("<li></li>").attr("id",dataObj.data[i].id).appendTo(contentList);
            //noinspection JSUnresolvedVariable
            $("<img>").attr("src",dataObj.data[i].logo).appendTo(contentListLi);
                $("<span></span>").attr("class","itemSpan").text(dataObj.data[i].name).appendTo(contentListLi);
        }
    }
    //end 添加页面内容

    //添加对应筛选内容
    function appendScreen() {
        var screenLinkBox = $(".screenLinkBox");
        screenLinkBox.empty();
        for(var i = 0;i < dataObj.data.length;i++){
            $("<li></li>").text(dataObj.data[i].name).attr("majorId",dataObj.data[i].id).appendTo(screenLinkBox);
        }
        $(".screenBox").fadeIn(200);
    }
    //end 添加对应筛选内容
    function itemBinding() {
        $(".itemSpan").bind("click",function () {
            thisParentId = $(this).parent().attr("id");
            parentId = thisParentId;
            level = 1;
            dataRequest();
        });
    }


    document.getElementsByClassName("screenBox")[0].addEventListener("click",function (e) {
        if(e.target.className == "closeScreen"){
            $(".screenBox").fadeOut(200);
            parentId = "";
            var screenLinkBox = $(".screenLinkBox");
            screenLinkBox.empty();
        }else if(e.target.className == "screenBox"){

        }else{
            majorid = e.target.getAttribute("majorId");
            majorTitle = e.target.innerText;
            window.localStorage.setItem("majorTestId",majorid);
            window.localStorage.setItem("majorTestTitle",majorTitle);
            window.open("http://guoren.ueasier.com/guorenTeach/majorIndustry.html","_self");
        }
    });

    //搜索功能
    $(".searchBtn").bind("click",function () {
        postText = $(".searchInput").val().trim();
        window.localStorage.setItem("searchIndusty",postText);
        window.open(url + "guorenTeach/majorIndustry.html","_self")
    });
    //end 搜索功能
});