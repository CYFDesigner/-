/**
 * Created by zy on 2017/4/12.
 */
$(function () {
    var placeObj;
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var dataId;
    if(lastIndex != -1){
        dataId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        dataId = location.search.substr(index+1);
    }
    //请求籍贯
    place();
    function place() {
        var planData = {
            universityId:dataId
        };
        $.ajax({
            url:url + 'wx/university/place/',
            type:'GET',
            dataType:'json',
            async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    placeObj = data;
                    appendPlace();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {

            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
    }
    //end 请求籍贯
    function appendPlace() {
        var contentBox = $(".content");
        if(placeObj.data.length > 0){
            $("<div></div>").attr("class","temperatureTitle").html("<span>学生籍贯分布详情</span>").appendTo(contentBox);
            for(var i = 0;i < placeObj.data.length;i++){
                var localBox = $("<div></div>").attr("class","localBox").appendTo(contentBox);
                $("<div></div>").attr("class","localName").text(placeObj.data[i].provinceName).appendTo(localBox);
                var localProportionBox = $("<div></div>").attr("class","localProportionBox").appendTo(localBox);
                $("<div></div>").attr("class","localProportion").css("width",(100-(placeObj.data[i].rate-0))/100*localProportionBox.width()).appendTo(localProportionBox);
                $("<div></div>").attr("class","localText").text("占"+ placeObj.data[i].rate +"%").appendTo(localBox);
            }
        }else{
            $("<div></div>").attr("class","noData").text("暂无数据信息").appendTo(contentBox);
        }
    }
});