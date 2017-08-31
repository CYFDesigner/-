/**
 * Created by zy on 2017/5/10.
 */
$(function () {
    var provinceObj;
    provinceRequest();

    //获取地址栏参数
    var locationId;
    var type;
    var rank;
    var score;
    var pageId = 1;
    var provinceId = 20;
    // var provinceId = 20;
    var voluntaryNavUl = $(".voluntaryNavUl");
    getUrlE();
    function getUrlE() {
        var urlE = location.search;
        var index = urlE.indexOf("=");
        var lastIndex = urlE.indexOf("&");
        var urlEArray = [provinceId,type,rank,score];
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
        rank = urlEArray[2];
        score = urlEArray[3];
        //进入后根据参数选择页面
        voluntaryNavUl.find("li").removeClass("navActive");
        voluntaryNavUl.find("li").eq(pageId - 1).addClass("navActive");
        dataRequest1();
        //end 进入后根据参数选择页面
    }
    //end 获取地址栏参数

    //导航点击事件
    navClick();
    function navClick() {
        voluntaryNavUl.find("li").bind("click",function () {
            voluntaryNavUl.find("li").removeClass("navActive");
            $(this).addClass("navActive");
            pageId = $(this).attr("data-navId")-0;
            if(dataObj1.data == null){
                dataRequest1();
            }else{
                appendData()
            }
        })
    }
    //end 导航点击事件

    //请求省会筛选信息
    function provinceRequest() {
        $.ajax({
            url:url + "wx/region/province/list",
            type:'GET',
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    provinceObj = data;
                    appendProvinceScreen();
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
    }
    //end 请求省会筛选信息

    //添加省会筛选信息
    function appendProvinceScreen() {
        var provinceScreenBox = $(".provinceScreenBox");
        var screenBox = $(".screenBox");
        var screentext = $(".screentext");
        $("<li></li>").text("全部").attr("provinceId","").addClass("screenLinkActive").appendTo(provinceScreenBox);
        for(var i =0;i < provinceObj.data.length;i++){
            $("<li></li>").text(provinceObj.data[i].name).attr("provinceId",provinceObj.data[i].id).appendTo(provinceScreenBox);
        }
        provinceScreenBox.find("li").bind("click",function (e) {
            provinceScreenBox.find("li").removeClass("screenLinkActive");
            $(this).addClass("screenLinkActive");
            screentext.text($(this).text());
            screenBox.fadeOut();
            locationId = $(this).attr("provinceId");
            dataRequest1();
            e.preventDefault();
        });
        var closeScreen = $(".closeScreen");
        closeScreen.bind("click",function () {
            screenBox.fadeOut();
        });
    }
    //end 添加省会筛选信息

    //筛选栏点击事件
    var screenBtn = $(".screenBtn");
    screenBtn.bind("click",function () {
        var screenBox = $(".screenBox");
        screenBox.fadeIn();
    });
    //end 筛选栏点击事件

    //请求数据
    var dataObj1;
    function dataRequest1() {
        var dataPost = {
            locationId:locationId,
            provinceId:provinceId,
            rank:rank,
            score:score,
            type:type
        };
        $.ajax({
            url:url + "wx/volunteer/recommend",
            type:"GET",
            data:dataPost,
            dataType:"JSON",
            success:function (data) {
                dataObj1 = data;
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

    //添加页面内容
    var voluntaryUl = $(".voluntaryUl");
    function appendData() {
        voluntaryUl.empty();
        if(pageId == 1){
            for(var a = 0;a < dataObj1.data.spurtList.length;a++){
                var voluntaryLi = $("<li></li>").appendTo(voluntaryUl);
                    var volintaryLink = $("<a></a>").attr("href","voluntaryUniversityResult.html" +"?provinceId=" + provinceId + "&?type=" + type + "&?universityId=" + dataObj1.data.spurtList[a].id + "&?minScore=" + dataObj1.data.spurtList[a].minScore + "&?minRank=" + dataObj1.data.spurtList[a].minRank + "&?avgScore=" + dataObj1.data.spurtList[a].avgScore + "&?enrollmentNum=" + dataObj1.data.spurtList[a].enrollmentNum).appendTo(voluntaryLi).bind("click",function () {
                        window.localStorage.setItem("voluntaryUniversityName",$(this).find(".voluntaryUniversityTitle").text());
                    });
                        $("<div></div>").addClass("voluntaryUniversityTitle").text(dataObj1.data.spurtList[a].name).appendTo(volintaryLink);
                        var voluntaryInfo = $("<ul></ul>").addClass("voluntaryInfo").appendTo(volintaryLink);
                            var voluntaryMinNumberBox = $("<li></li>").addClass("voluntaryMinNumberBox").appendTo(voluntaryInfo);
                                $("<span></span>").addClass("voluntaryMinNumberText").text("最低分").appendTo(voluntaryMinNumberBox);
                                $("<span></span>").addClass("voluntaryMinNumber").text(dataObj1.data.spurtList[a].minScore).appendTo(voluntaryMinNumberBox);
                            var voluntaryMinRankingBox = $("<li></li>").addClass("voluntaryMinRankingBox").appendTo(voluntaryInfo);
                                $("<span></span>").addClass("voluntaryMinRankingText").text("最低分位").appendTo(voluntaryMinRankingBox);
                                $("<span></span>").addClass("voluntaryMinRanking").text(dataObj1.data.spurtList[a].minRank).appendTo(voluntaryMinRankingBox);
                            var voluntaryAverageNumberBox = $("<li></li>").addClass("voluntaryAverageNumberBox").appendTo(voluntaryInfo);
                                $("<span></span>").addClass("voluntaryAverageNumberText").text("平均分").appendTo(voluntaryAverageNumberBox);
                                $("<span></span>").addClass("voluntaryAverageNumber").text(dataObj1.data.spurtList[a].avgScore).appendTo(voluntaryAverageNumberBox);
                        var voluntaryAdmissionNumberBox = $("<div></div>").addClass("voluntaryAdmissionNumberBox").appendTo(volintaryLink);
                            $("<span></span>").addClass("voluntaryAdmissionNumberText").text("点击获取更多信息").appendTo(voluntaryAdmissionNumberBox);
            }
        }else if(pageId == 2){
            for(var b = 0;b < dataObj1.data.stableList.length;b++){
                var voluntaryLi2 = $("<li></li>").appendTo(voluntaryUl);
                    var volintaryLink2 = $("<a></a>").attr("href","voluntaryUniversityResult.html" +"?provinceId=" + provinceId + "&?type=" + type + "&?universityId=" + dataObj1.data.stableList[b].id + "&?minScore=" + dataObj1.data.stableList[b].minScore + "&?minRank=" + dataObj1.data.stableList[b].minRank + "&?avgScore=" + dataObj1.data.stableList[b].avgScore + "&?enrollmentNum=" + dataObj1.data.stableList[b].enrollmentNum).appendTo(voluntaryLi2).bind("click",function () {
                        window.localStorage.setItem("voluntaryUniversityName",$(this).find(".voluntaryUniversityTitle").text());
                    });
                        $("<div></div>").addClass("voluntaryUniversityTitle").text(dataObj1.data.stableList[b].name).appendTo(volintaryLink2);
                        var voluntaryInfo2 = $("<ul></ul>").addClass("voluntaryInfo").appendTo(volintaryLink2);
                            var voluntaryMinNumberBox2 = $("<li></li>").addClass("voluntaryMinNumberBox").appendTo(voluntaryInfo2);
                                $("<span></span>").addClass("voluntaryMinNumberText").text("最低分").appendTo(voluntaryMinNumberBox2);
                                $("<span></span>").addClass("voluntaryMinNumber").text(dataObj1.data.stableList[b].minScore).appendTo(voluntaryMinNumberBox2);
                            var voluntaryMinRankingBox2 = $("<li></li>").addClass("voluntaryMinRankingBox").appendTo(voluntaryInfo2);
                                $("<span></span>").addClass("voluntaryMinRankingText").text("最低分位").appendTo(voluntaryMinRankingBox2);
                                $("<span></span>").addClass("voluntaryMinRanking").text(dataObj1.data.stableList[b].minRank).appendTo(voluntaryMinRankingBox2);
                            var voluntaryAverageNumberBox2 = $("<li></li>").addClass("voluntaryAverageNumberBox").appendTo(voluntaryInfo2);
                                $("<span></span>").addClass("voluntaryAverageNumberText").text("平均分").appendTo(voluntaryAverageNumberBox2);
                                $("<span></span>").addClass("voluntaryAverageNumber").text(dataObj1.data.stableList[b].avgScore).appendTo(voluntaryAverageNumberBox2);
                        var voluntaryAdmissionNumberBox2 = $("<div></div>").addClass("voluntaryAdmissionNumberBox").appendTo(volintaryLink2);
                            $("<span></span>").addClass("voluntaryAdmissionNumberText").text("点击获取更多信息").appendTo(voluntaryAdmissionNumberBox2);
            }
        }else if(pageId == 3){
            for(var c = 0;c < dataObj1.data.easilyList.length;c++){
                var voluntaryLi3 = $("<li></li>").appendTo(voluntaryUl);
                    var volintaryLink3 = $("<a></a>").attr("href","voluntaryUniversityResult.html" +"?provinceId=" + provinceId + "&?type=" + type + "&?universityId=" + dataObj1.data.easilyList[c].id + "&?minScore=" + dataObj1.data.easilyList[c].minScore + "&?minRank=" + dataObj1.data.easilyList[c].minRank + "&?avgScore=" + dataObj1.data.easilyList[c].avgScore + "&?enrollmentNum=" + dataObj1.data.easilyList[c].enrollmentNum).appendTo(voluntaryLi3).bind("click",function () {
                        window.localStorage.setItem("voluntaryUniversityName",$(this).find(".voluntaryUniversityTitle").text());
                    });
                        $("<div></div>").addClass("voluntaryUniversityTitle").text(dataObj1.data.easilyList[c].name).appendTo(volintaryLink3);
                        var voluntaryInfo3 = $("<ul></ul>").addClass("voluntaryInfo").appendTo(volintaryLink3);
                            var voluntaryMinNumberBox3 = $("<li></li>").addClass("voluntaryMinNumberBox").appendTo(voluntaryInfo3);
                                $("<span></span>").addClass("voluntaryMinNumberText").text("最低分").appendTo(voluntaryMinNumberBox3);
                                $("<span></span>").addClass("voluntaryMinNumber").text(dataObj1.data.easilyList[c].minScore).appendTo(voluntaryMinNumberBox3);
                            var voluntaryMinRankingBox3 = $("<li></li>").addClass("voluntaryMinRankingBox").appendTo(voluntaryInfo3);
                                $("<span></span>").addClass("voluntaryMinRankingText").text("最低分为").appendTo(voluntaryMinRankingBox3);
                                $("<span></span>").addClass("voluntaryMinRanking").text(dataObj1.data.easilyList[c].minRank).appendTo(voluntaryMinRankingBox3);
                            var voluntaryAverageNumberBox3 = $("<li></li>").addClass("voluntaryAverageNumberBox").appendTo(voluntaryInfo3);
                                $("<span></span>").addClass("voluntaryAverageNumberText").text("平均分").appendTo(voluntaryAverageNumberBox3);
                                $("<span></span>").addClass("voluntaryAverageNumber").text(dataObj1.data.easilyList[c].avgScore).appendTo(voluntaryAverageNumberBox3);
                        var voluntaryAdmissionNumberBox3 = $("<div></div>").addClass("voluntaryAdmissionNumberBox").appendTo(volintaryLink3);
                            $("<span></span>").addClass("voluntaryAdmissionNumberText").text("点击获取更多信息").appendTo(voluntaryAdmissionNumberBox3);
            }
        }
    }
    //end 添加页面内容
});