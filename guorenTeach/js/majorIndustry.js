/**
 * Created by zy on 2017/4/18.
 */
$(function () {
    var dataObj;
    var id = window.localStorage.getItem("majorTestId");
    var title = window.localStorage.getItem("majorTestTitle");
    var level = 2;
    $("title").text(title);
    dataRequest();
    //请求页面数据
    function dataRequest() {
        var dataPost;
        if(!window.localStorage.getItem("searchIndusty")){
            dataPost = {
                parentId:id,
                level:level
            };
        }else{
            var postText = window.localStorage.getItem("searchIndusty");
            dataPost = {
                keyword:postText,
                level:level
            };
        }
        $.ajax({
            url:url + "wx/profession/list",
            type:'GET',
            dataType:'json',
            data:dataPost,
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    appendDate();
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
        window.localStorage.removeItem("searchIndusty");
        window.localStorage.removeItem("majorTestId")
    }
    //end 请求页面数据

    //添加页面内容
    function appendDate() {
        var majorList = $(".majorList");
        majorList.empty();
        var majorPDom = $(".majorP");
        var majorPBoxDom = $(".majorPBox");
        for(var i = 0;i < dataObj.data.length;i++){
            var majorListLi = $("<li></li>").attr({
                "parentId":dataObj.data[i].id,
                "class":"majorListLi"
            }).appendTo(majorList);
                $("<span></span>").attr("class","majorItemTitle").text(dataObj.data[i].name).appendTo(majorListLi);
                var majorPBox = $("<div></div>").attr("class","majorPBox").appendTo(majorListLi);
                    $("<p></p>").attr("class","majorP").html(dataObj.data[i].introduction + "<br/>【做什么】" + dataObj.data[i].content).appendTo(majorPBox);
        }
        if(majorPDom.eq(i).height() - majorPBoxDom.eq(i).height() > 11 ){
            majorPBoxDom.eq(i).addClass("majorPAfter");
        }
        clickBind();
    }
    //添加页面内容
    function clickBind() {
        var majorList = $(".majorList");
        majorList.find("li").bind("click",function () {
            var thisParentId = $(this).attr("parentid");
            var thisParentName = $(this).find("majorItemTitle").text();
            window.localStorage.setItem("parentId",thisParentId);
            window.localStorage.setItem("parentName",thisParentName);
            window.open("http://guoren.ueasier.com/guorenTeach/majorIndustryMore.html","_self");
        })
    }
});