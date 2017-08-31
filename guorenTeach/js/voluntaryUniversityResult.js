/**
 * Created by zy on 2017/5/10.
 */
$(function () {
    //获取地址栏参数
    var provinceId;
    var type;
    var universityId;
    var minScore;
    var minRank;
    var avgScore;
    var enrollmentNum;
    getUrlE();
    function getUrlE() {
        var urlE = location.search;
        var index = urlE.indexOf("=");
        var lastIndex = urlE.indexOf("&");
        var urlEArray = [provinceId,type,universityId,minScore,minRank,avgScore,enrollmentNum];
        for(var i = 0;i < urlEArray.length;i++){
            if(lastIndex != -1){
                urlEArray[i] = urlE.substr(index+1,lastIndex-index-1)-0;
                urlE = urlE.slice(lastIndex+1);
                index = urlE.indexOf("=");
                lastIndex = urlE.indexOf("&");
            }else{
                urlEArray[i] = urlE.substr(index+1)-0;
            }
        }
        provinceId = urlEArray[0];
        type = urlEArray[1];
        universityId = urlEArray[2];
        minScore = urlEArray[3];
        minRank = urlEArray[4];
        avgScore = urlEArray[5];
        enrollmentNum = urlEArray[6];
        dataRequest();
    }
    //end 获取地址栏参数

    //请求数据
    var dataObj;
    function dataRequest() {
        var dataPost = {
            provinceId:provinceId,
            type:type,
            universityId:universityId
        };
        $.ajax({
            url:url + "wx/volunteer/specialtyscore",
            type:"GET",
            data:dataPost,
            dataType:"JSON",
            success:function (data) {
                dataObj= data;
                if(data.status == true){
                    appendData();
                }else{
                    tip = data.message;
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 请求数据

    function appendData() {
        var universityTitle = $(".universityTitle");
        universityTitle.text(window.localStorage.getItem("voluntaryUniversityName"));
        var voluntaryMinNumber = $(".voluntaryMinNumber");
        voluntaryMinNumber.text(minScore);
        var voluntaryMinRanking = $(".voluntaryMinRanking");
        voluntaryMinRanking.text(minRank);
        var voluntaryAverageNumber = $(".voluntaryAverageNumber");
        voluntaryAverageNumber.text(avgScore);
        var voluntaryAdmissionNumber = $(".voluntaryAdmissionNumber");
        if(!enrollmentNum){
            voluntaryAdmissionNumber.text(0 + "人");
        }else{
            voluntaryAdmissionNumber.text(enrollmentNum + "人");
        }
        var listTbody = $(".listTbody");
        for(var i = 0;i < dataObj.data.length;i++){
            var listTr = $("<tr></tr>").appendTo(listTbody);
                $("<td></td>").text(dataObj.data[i].specialtyName).appendTo(listTr);
                $("<td></td>").text(dataObj.data[i].batch).appendTo(listTr);
                // $("<td></td>").text(dataObj.data[i].minScore).appendTo(listTr);
                // $("<td></td>").text(dataObj.data[i].maxScore).appendTo(listTr);
                // $("<td></td>").text(dataObj.data[i].avgScore).appendTo(listTr);
                // $("<td></td>").text(dataObj.data[i].year).appendTo(listTr);
                $("<td></td>").text("2016").appendTo(listTr);
        }
    }
});