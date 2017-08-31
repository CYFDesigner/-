/**
 * Created by zy on 2017/5/5.
 */
$(function () {
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var testId;
    if(lastIndex != -1){
        testId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        testId = location.search.substr(index+1)
    }
    var evaluationId;
    if(testId < 4){
        evaluationId = 5;
    }else{
        evaluationId = 4;
    }
    var dataObj;
    var reportingTest = $(".reportingTest");
    reportingTest.bind("click",function (e) {
        if(window.localStorage.getItem("status") == "true"){
            dataRequest();
        }else{
            tip = "您还未登陆，请登录后再测";
            pageTip(tip);
            login();
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    function dataRequest() {
        var dataPost = {
            evaluationId:evaluationId
        };
        $.ajax({
            url:url + "wx/evaluation/check",
            type:'GET',
            data:dataPost,
            dataType:'json',
            success:function (data) {
                dataObj = data;
                if(dataObj.status == true){
                    if(testId == 1){
                        window.open(url + "guorenTeach/reporting1.html","_self");
                    }else if(testId == 2){
                        window.open(url + "guorenTeach/reporting2.html","_self");
                    }else if(testId == 3){
                        window.open(url + "guorenTeach/reporting3.html","_self");
                    }else if(testId == 4){
                        window.open(url + "guorenTeach/reporting4.html","_self");
                    }
                }else{
                    if(dataObj.message == "请先登录"){
                        login();
                    }else if(dataObj.message == "没有购买该测评"){
                        tip = dataObj.message;
                        adress = url + "guorenTeach/reportingBuy.html" + "?evaluationId=" + testId;
                        pageTip(tip,adress);
                    }else{
                        tip = dataObj.message;
                        pageTip(tip);
                    }
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    // function dataRequest() {
    //     var dataPost = {
    //         evaluationId:evaluationId
    //     };
    //     $.ajax({
    //         url:url + "wx/evaluation/check",
    //         type:'GET',
    //         data:dataPost,
    //         dataType:'json',
    //         success:function (data) {
    //             dataObj = data;
    //             if(testId == 1){
    //                 window.open(url + "guorenTeach/reporting1.html","_self");
    //             }else if(testId == 2){
    //                 window.open(url + "guorenTeach/reporting2.html","_self");
    //             }else if(testId == 3){
    //                 window.open(url + "guorenTeach/reporting3.html","_self");
    //             }else if(testId == 4){
    //                 window.open(url + "guorenTeach/reporting4.html","_self");
    //                 // if(dataObj.status == true){
    //                 //     window.open(url + "guorenTeach/reporting4.html","_self");
    //                 // }else{
    //                 //     if(dataObj.message == "请先登录"){
    //                 //         login();
    //                 //     }else if(dataObj.message == "没有购买该测评"){
    //                 //         tip = dataObj.message;
    //                 //         adress = url + "guorenTeach/reportingBuy.html" + "?evaluationId=" + evaluationId;
    //                 //         pageTip(tip,adress);
    //                 //     }else{
    //                 //         tip = dataObj.message;
    //                 //         pageTip(tip);
    //                 //     }
    //                 // }
    //             }
    //         },
    //         xhrFields: {
    //             withCredentials: true    // 此字段标识要跨域传数据
    //         },
    //         crossDomain: true
    //     })
    // }
});