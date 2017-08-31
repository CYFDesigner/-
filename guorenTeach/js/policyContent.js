/**
 * Created by zy on 2017/3/17.
 */
$(function () {
    var url = "http://guoren.ueasier.com/";
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var palicyId;
    if(lastIndex != -1){
        palicyId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        palicyId = location.search.substr(index+1);
    }

    var dataObj;
    // alert(palicyId);
    function dataGet() {
        $.ajax({
            url: url + "wx/policy/" + palicyId,
            type:'GET',
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    appendList();
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
    dataGet();
    function appendList() {
        var pageContent = $(".pageContent");
        pageContent.html(dataObj.data.content);
        $("title").html(dataObj.data.title);
        imgWith();
    }
    function imgWith() {
        var pageContent = $(".pageContent").eq(0);
        pageContent.find("img").each(function () {
            if($(this).width() > pageContent.width()){
                $(this).css({
                    width:"100%",
                    height:"auto"
                })
            }
        })
    }
});