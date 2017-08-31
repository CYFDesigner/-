/**
 * Created by zy on 2017/4/28.
 */
$(function () {
    var chouseOld = window.localStorage.getItem("subjectChouse");
    var chouseOldText = window.localStorage.getItem("subjectChouseText");
    var subjectChouse;
    var subjectChouseText;
    var subjectItem = $(".subjectListUl").find("li");
    var sureBtn = $(".sureBtn");
    if(chouseOld){
        subjectChouse = JSON.parse(chouseOld);
        subjectChouseText = JSON.parse(chouseOldText);
        for(var a = 0;a < subjectChouse.length;a++){
            subjectItem.find(".subjectLabel").find(".subjectInput").attr("checked",false);
            subjectItem.find(".subjectLabel").removeClass("subjectLabeActive");
            subjectItem.find(".subjectLabel").find(".subjectInput").eq(subjectChouse[a]-1).attr("checked",true);
            subjectItem.find(".subjectLabel").eq(subjectChouse[a]-1).addClass("subjectLabeActive");
        }
    }else{
        subjectChouse = [];
        subjectChouseText = [];
    }

    subjectItem.find(".subjectLabel").bind("click",function (e) {
        if($(this).find(".subjectInput").is(":checked") && $(this).find(".subjectInput").attr("checked")){
            $(this).find(".subjectInput").attr("checked",false);
            $(this).removeClass("subjectLabeActive");
            if(subjectChouse.indexOf($(this).find(".subjectInput").attr("id")) != -1){
                subjectChouse.splice(subjectChouse.indexOf($(this).find(".subjectInput").attr("id")),1);
                subjectChouseText.splice(subjectChouseText.indexOf($(this).find(".subjectName").text(),1))
            }
            e.preventDefault();
        }else{
            $(this).find(".subjectInput").attr("checked",true);
            $(this).addClass("subjectLabeActive");
            if(subjectChouse.indexOf($(this).find(".subjectInput").attr("id")) == -1){
                subjectChouse.push($(this).find(".subjectInput").attr("id"));
                subjectChouseText.push($(this).find(".subjectName").text())
            }
            e.preventDefault();
        }
    });

    sureBtn.bind("click",function () {
        if(subjectChouse.length > 3){
            tip = "选考科目数量不能大于3个";
            pageTip(tip);
        }else if(subjectChouse.length > 0){
            subjectChouse = JSON.stringify(subjectChouse);
            subjectChouseText = JSON.stringify(subjectChouseText);
            window.localStorage.setItem("subjectChouse",subjectChouse);
            window.localStorage.setItem("subjectChouseText",subjectChouseText);
            window.open(url + "guorenTeach/subjectList.html","_self");
        }else if(subjectChouse.length = 0){
            tip = "选考专业不能为空";
            pageTip(tip);
        }
    });
});
