/**
 * Created by 柴永峰 on 2017/5/6.
 */
$(function () {
    var characterReporting = $(".characterReporting");
    characterReporting.eq(0).bind("click",function (e) {
        window.open(url + "guorenTeach/reportingExplain1.html" + "?testId=1","_self");
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    characterReporting.eq(1).bind("click",function (e) {
        window.open(url + "guorenTeach/reportingExplain2.html" + "?testId=2","_self");
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    characterReporting.eq(2).bind("click",function (e) {
        window.open(url + "guorenTeach/reportingExplain3.html" + "?testId=3","_self");
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    characterReporting.eq(3).bind("click",function (e) {
        window.open(url + "guorenTeach/reportingExplain4.html" + "?testId=4","_self");
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    var reportingResult = $(".reportingResult");
    reportingResult.bind("click",function (e) {
        if(window.localStorage.getItem("status") == "true"){
            window.open(url + "guorenTeach/reportingResult.html" + "?evaluationId=1" + "&?studentId=" + window.localStorage.getItem("studentId"),"_self");
        }else{
            tip = "请登录后查看结果";
            pageTip(tip);
            login();
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    })
});
