/**
 * Created by zy on 2017/5/5.
 */
$(function () {
    //获取地址栏参数
    var evaluationId;
    var studentId;
    getUrlE();
    function getUrlE() {
        var urlE = location.search;
        var index = urlE.indexOf("=");
        var lastIndex = urlE.indexOf("&");
        var urlEArray = [evaluationId,studentId];
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
        evaluationId = urlEArray[0];
        studentId = urlEArray[1];
    }
    //end 获取地址栏参数

    var characterObj;
    var talentObj;
    var occupationObj;
    var academicObj;
    //性格测评
    var characteNnumber = [];                                               //性格测评排名
    var characterTextArray = ["红","蓝","黄","绿"];                          //性格测评文字简
    var characterColorArray = ["#fe8969","#75a4ea","#f7be3d","#4cc1c2"];    //性格测评对应颜色
    var characteResultArray = [];
    //end 性格测评

    //天赋测评值
    var talentNumber = [];                                                                                                          //天赋测评排名
    var talentTextArray = [];                                                                                                       //天赋测评智能类型
    var talentText = ["语言","逻辑","空间","运动","音乐","人际","内省","观察"];                                                         //天赋测评智能简写
    var colorArray = ["#99cc66","#fff2d7","#f7e77f","#fe8666","#61cccd","#90d7ff","#ff9537","#7ea7ec"];                             //天赋测评对应颜色
    var resultArray = [];                                                                                                           //天赋测评对应结果
    //end 天赋测评值

    //职业倾向测评
    var occupationTextArray = [];                                           //职业测评对应类型
    var occupationResult = [];                                              //职业测评对应结果
    //end 职业倾向测评

    //学业倾向测评值
    var academicNumber = [];                                                //学业倾向测评排名
    var academicTextArray = [];                                             //学业倾向测评对应类型
    var academicResultArray = [];
    //end 学业倾向测评值

    var middleSubject;
    var science;
    var liberal;
    var num;
    var textArray = ['地理', '外语', '历史', '数学','政治', '美术','音乐','语文','生物','物理','体育','化学'];

    var pageContent = $(".pageContent");
    var characterContent = $(".characterContent");
    var talentContent = $(".talentContent");
    var occupationContent = $(".occupationContent");
    var academicContent = $(".academicContent");
    var navActive = $(".navActive");
    pageJudge();

    //判断是从哪里进入页面的
    function pageJudge() {
        var navUl = $(".navUl");
        if(evaluationId == 1){
            evaluationId = 1;
            if(characterObj == undefined){
                dataContentRequest();
                dataRequest();
            }
            navUl.find("li").removeClass("navActive");
            navUl.find("li").eq(0).addClass("navActive");
            pageContent.find("section").hide();
            characterContent.show();
        }else if(evaluationId == 2){
            evaluationId = 2;
            if(talentObj == undefined){
                dataContentRequest();
                dataRequest();
            }
            navUl.find("li").removeClass("navActive");
            navUl.find("li").eq(1).addClass("navActive");
            pageContent.find("section").hide();
            talentContent.show();
        }else if(evaluationId == 3){
            evaluationId = 3;
            if(occupationObj == undefined){
                dataContentRequest();
                dataRequest();
            }
            navUl.find("li").removeClass("navActive");
            navUl.find("li").eq(2).addClass("navActive");
            pageContent.find("section").hide();
            occupationContent.show();
        }else if(navActive.text() == "专业倾向"){
            evaluationId = 4;
            if(academicObj == undefined){
                dataContentRequest();
                dataRequest();
            }
            navUl.find("li").removeClass("navActive");
            navUl.find("li").eq(3).addClass("navActive");
            pageContent.find("section").hide();
            academicContent.show();
        }
    }
    //end 判断是从哪里进入页面的

    //请求页面测评内容
    function dataContentRequest() {
        var dataPost = {
            evaluationId:evaluationId,
            studentId:studentId
        };
        $.ajax({
            url:url + "wx/evaluation/evaluationgroup",
            type:'GET',
            async:false,
            data:dataPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    if(evaluationId == 1){
                        for(var b = 0;b < data.data.length;b++){
                            characteResultArray[b] = data.data[b].analysis;
                        }
                        // extractStr(data.data)
                    }else if(evaluationId == 2){
                        for(var i = 0;i < data.data.length;i++){
                            resultArray[i] = data.data[i].analysis;
                            talentTextArray[i] = data.data[i].name;
                        }
                    }else if(evaluationId == 3){
                        for(var a = 0;a < data.data.length;a++){
                            occupationTextArray[a] = data.data[a].name;
                            occupationResult[a] = data.data[a].analysis;
                        }
                    }else if(evaluationId == 4){
                        // extractStr2(data.data);
                        for(var c = 0;c < data.data.length;c++){
                            academicTextArray[c] = data.data[c].name;
                            academicResultArray[c] = data.data[c].analysis
                        }
                    }
                }else{
                    if(data.message == "请先登录"){
                        var openUrl = url + "guorenTeach/reportingResult.html";
                        loginFalse(openUrl);
                    }else{
                        tip = data.message;
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
    //请求页面测评内容

    //请求页面测评数据
    function dataRequest() {
        var dataPost = {
            evaluationId:evaluationId,
            studentId:studentId
        };
        $.ajax({
            url:url + "wx/evaluation/evaluationresult",
            type:'GET',
            async:false,
            data:dataPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    if(evaluationId == 1){
                        characterObj = data;
                        appendData();
                    }else if(evaluationId == 2){
                        talentObj = data;
                        appendData();
                    }else if(evaluationId == 3){
                        occupationObj = data;
                        appendData();
                    }else if(evaluationId == 4){
                        academicObj = data;
                        appendData();
                    }
                }else{
                    if(data.message == "请先登录"){
                        var openUrl = url + "guorenTeach/reportingResult.html";
                        loginFalse(openUrl);
                    }else{
                        tip = data.message;
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
    //请求页面测评数据

    //end 请求页面测评数据
    navClick();
    function navClick() {
        var navUl = $(".navUl");
        navUl.find("li").bind("click",function(){
            navUl.find("li").removeClass("navActive");
            $(this).attr("class","navActive");
            if($(this).text() == "自身性格"){
                evaluationId = 1;
                if(characterObj == undefined){
                    dataContentRequest();
                    dataRequest();
                }
                pageContent.find("section").hide();
                characterContent.show();
            }else if($(this).text() == "自身天赋"){
                evaluationId = 2;
                if(talentObj == undefined){
                    dataContentRequest();
                    dataRequest();
                }
                pageContent.find("section").hide();
                talentContent.show();
            }else if($(this).text() == "职业倾向"){
                evaluationId = 3;
                if(occupationObj == undefined){
                    dataContentRequest();
                    dataRequest();
                }
                pageContent.find("section").hide();
                occupationContent.show();
            }else if($(this).text() == "专业倾向"){
                evaluationId = 4;
                if(academicObj == undefined){
                    dataContentRequest();
                    dataRequest();
                }
                pageContent.find("section").hide();
                academicContent.show();
            }

        })
    }

    //添加页面内容
    function appendData() {
        var pageContent = $(".pageContent");
        if(evaluationId == 1){
            if(characterObj.data.length == 0){
                characterContent.empty();
                $("<div></div>").addClass("pageTip").text("您还没有进行过自身性格测评").appendTo(characterContent);
            }else{
                characterContrast();
                pieImg();
                var characterBox = $(".characterBox");
                var characterResult = $(".characterResult");
                var pieChartExplain = $(".pieChartExplain");
                for(var c = 0;c < characterResult.find(".resultExplain").length;c++){
                    if(c == 0){
                        characterBox.find("div").eq(c).text("第一性格:" + characterTextArray[characteNnumber[c]]);
                    }else if(c == 1){
                        characterBox.find("div").eq(c).text("第二性格:" + characterTextArray[characteNnumber[c]]);
                    }else if(c == 2){
                        characterBox.find("div").eq(c).text("第三性格:" + characterTextArray[characteNnumber[c]]);
                    }else if(c == 3){
                        characterBox.find("div").eq(c).text("第四性格:" + characterTextArray[characteNnumber[c]]);
                    }
                    pieChartExplain.find("div").eq(c).find(".iconExplain").css({backgroundColor:characterColorArray[characteNnumber[c]]});
                    pieChartExplain.find("div").eq(c).find(".numberExplain").text((characterObj.data[characteNnumber[c]].score/30*100).toFixed(2) + "%");
                    characterResult.children(".characterTitleBox").eq(c).find("div").text(characterTextArray[characteNnumber[c]] + "色性格 (" + +(characterObj.data[characteNnumber[c]].score/30*100).toFixed(2) + "%"+") ").css({backgroundColor:characterColorArray[characteNnumber[c]]});
                    characterResult.children(".resultExplain").eq(c).find(".resultCont").html(characteResultArray[characteNnumber[c]]);
                }
            }
        }else if(evaluationId == 2){
            if(talentObj.data.length == 0){
                talentContent.empty();
                $("<div></div>").addClass("pageTip").text("您还没有进行过自身天赋测评").appendTo(talentContent);
            }else{
                talentContrast();
                var talentBox = $(".talentBox");
                var histogramTitleBox = $(".histogramTitleBox");
                var histogramNumberBox = $(".histogramNumberBox");
                var talentResult = $(".talentResult");
                var histogramImgBox = $(".histogramImgBox");
                var boxWidth = histogramImgBox.width();
                for(var a = 0;a < histogramNumberBox.find("div").length;a++){
                    if(a == 0){
                        talentBox.find("div").eq(a).text("第一天赋:" + talentTextArray[talentNumber[a]]);
                    }else if(a == 1){
                        talentBox.find("div").eq(a).text("第二天赋:" + talentTextArray[talentNumber[a]]);
                    }else if(a == 2){
                        talentBox.find("div").eq(a).text("第三天赋:" + talentTextArray[talentNumber[a]]);
                    }else if(a == 3){
                        talentBox.find("div").eq(a).text("第四天赋:" + talentTextArray[talentNumber[a]]);
                    }
                    histogramTitleBox.find("div").eq(a).text(talentText[talentNumber[a]]);
                    histogramNumberBox.find("div").eq(a).text(talentObj.data[talentNumber[a]].score / 25 * 100 + "%");
                    histogramImgBox.children("div").children("div").find("div").eq(a).css({
                        width:talentObj.data[talentNumber[a]].score/25 *　100 + "%",
                        backgroundColor:colorArray[talentNumber[a]]
                    });
                    talentResult.find(".resultCont").eq(a).html(resultArray[talentNumber[a]]);
                    talentResult.find(".resultCont").eq(a).find("p").eq(1).css("marginTop","2.4rem");
                }
            }
        }else if(evaluationId == 3){
            if(occupationObj.data.length == 0){
                occupationContent.empty();
                $("<div></div>").addClass("pageTip").text("您还没有进行过自身职业倾向测评").appendTo(occupationContent);
            }else{
                var occupationLeftImgWidth = $(".occupationLeftImg1").width();
                var _Index1;
                var _Index2;
                var _Index3;
                var _Index4;
                occupationObj.data.forEach(function (e) {
                    if(e.groupId == 1){
                        $(".occupationLeftImg1").find("div").css("width",e.score / 10 * occupationLeftImgWidth);
                        $(".occupationRightImg1").find("div").css("width",(10 - e.score) / 10 * occupationLeftImgWidth);
                        _Index1 = "E";
                    }else if(e.groupId == 2){
                        $(".occupationLeftImg1").find("div").css("width",(10 - e.score) / 10 * occupationLeftImgWidth);
                        $(".occupationRightImg1").find("div").css("width",e.score / 10 * occupationLeftImgWidth);
                        _Index1 = "I";
                    }else if(e.groupId == 3){
                        $(".occupationLeftImg2").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg2").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        _Index2 = "S";
                    }else if(e.groupId == 4){
                        $(".occupationLeftImg2").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg2").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        _Index2 = "N";
                    }else if(e.groupId == 5){
                        $(".occupationLeftImg3").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg3").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        _Index3 = "T";
                    }else if(e.groupId == 6){
                        $(".occupationLeftImg3").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg3").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        _Index3 = "F";
                    }else if(e.groupId == 7){
                        $(".occupationLeftImg4").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg4").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        _Index4 = "J";
                    }else if(e.groupId == 8){
                        $(".occupationLeftImg4").find("div").css("width",(20 - e.score) / 20 * occupationLeftImgWidth);
                        $(".occupationRightImg4").find("div").css("width",e.score / 20 * occupationLeftImgWidth);
                        _Index4 = "P";
                    }
                    var occupationExplainContent1 = $(".occupationExplainContent1");
                    var occupationExplainContent2 = $(".occupationExplainContent2");
                    var occupationExplainContent3 = $(".occupationExplainContent3");
                    var occupationExplainContent4 = $(".occupationExplainContent4");
                    var resultOccu = _Index1+_Index2+_Index3+_Index4;
                    if(resultOccu == "ESTP"){
                        occupationExplainContent2.html(occupationResult[0]);
                        occupationExplainContent1.text(occupationTextArray[0]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("管理人员<br />企业家<br />推销员<br />仲裁者<br />辩护律师<br />实业家<br />预算分析师<br />演艺制作人<br />理财专家").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=639" +"'>工商管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=222" +"'>经济与金融</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=1246" +"'>市场开发与营销</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=1099" +"'>软件开发与项目管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=1114" +"'>信息安全技术</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=225" +"'>法学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=355" +"'>数理基础科学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=687" +"'>电影学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=208" +"'>经济学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=357" +"'>信息与计算科学</a>" +
                            "");
                    }else if(resultOccu == "ISTP"){
                        occupationExplainContent2.html(occupationResult[1]);
                        occupationExplainContent1.text(occupationTextArray[1]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("机械师<br />警察<br />珠宝设计师<br />外科医生<br />美术家<br />海洋生物学者<br />运动员<br />软件开发商<br />音乐家<br />统计人员").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=393" +"'>机械工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=245" +"'>犯罪学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=415" +"'>宝石及材料工艺学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=589" +"'>临床医学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=698" +"'>美术学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=376" +"'>海洋资源与环境</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=270" +"'>运动人体科学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=386" +"'>生物信息学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=683" +"'>作曲与作曲技术理论</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=389" +"'>统计学</a>" +
                            "");
                    }else if(resultOccu == "ESFP"){
                        occupationExplainContent2.html(occupationResult[2]);
                        occupationExplainContent1.text(occupationTextArray[2]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("小学教师<br />督导<br />采矿工程师<br />消防员<br />舞台表演者<br />经纪人<br />房产中介").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=257" +"'>教育学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=473" +"'>地质工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=477" +"'>采矿工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=248" +"'>消防指挥</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=684" +"'>表演</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=654" +"'>市场营销</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=262" +"'>小学教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=474" +"'>资源勘查工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=481" +"'>矿物资源工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=255" +"'>国内安全保卫</a>" +
                            "");
                    }else if(resultOccu == "ISFP"){
                        occupationExplainContent2.html(occupationResult[3]);
                        occupationExplainContent1.text(occupationTextArray[3]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("护士<br />园艺家<br />林业家<br />兽医<br />人工智能<br />导演<br />时尚设计师<br />作曲家<br />编舞者<br />画家<br />雕刻师<br />小说家/诗人<br />教师").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=630" +"'>护理学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=569" +"'>植物科学与技术</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=580" +"'>林学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=577" +"'>动物医学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=450" +"'>智能科学与技术</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=277" +"'>应用语言学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=702" +"'>产品设计</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=683" +"'>作曲与作曲技术理论</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=695" +"'>绘画</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=275" +"'>汉语言文学</a>" +
                            "");
                    }else if(resultOccu == "ESTJ"){
                        occupationExplainContent2.html(occupationResult[4]);
                        occupationExplainContent1.text(occupationTextArray[4]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("法律工作者<br />警务人员<br />信息总监<br />政治家<br />军人<br />督导员<br />财务经理<br />审计员<br />会计师<br />项目经理").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=225" +"'>法学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=252" +"'>公安情报学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=447" +"'>信息安全</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=230" +"'>政治学与行政学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=239" +"'>科学社会主义</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=233" +"'>社会学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=642" +"'>资产评估</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=649" +"'>市场营销教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=461" +"'>水利水电工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=242" +"'>治安学</a>" +
                            "");
                    }else if(resultOccu == "ISTJ"){
                        occupationExplainContent2.html(occupationResult[5]);
                        occupationExplainContent1.text(occupationTextArray[5]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("图书管理员<br />牙科医生<br />航空机械师<br />银行查核员<br />地质学家<br />测绘人员<br />财务经理<br />审计员<br />会计师<br />警察<br />验光师").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=664" +"'>信息资源管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=594" +"'>口腔医学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=501" +"'>航空航天工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=221" +"'>信用管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=475" +"'>勘查技术与工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=466" +"'>地理国情监测</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=643" +"'>国际商务</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=644" +"'>财务管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=648" +"'>财务会计教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=591" +"'>放射医学</a>" +
                            "");
                    }else if(resultOccu == "ESFJ"){
                        occupationExplainContent2.html(occupationResult[6]);
                        occupationExplainContent1.text(occupationTextArray[6]).css("fontSize",occupationExplainContent2.find("span").css("fontSize")).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("旅游项目经营者<br />神职人员<br />美容师<br />教练<br />教师<br />各类服务人员<br />销售人员");
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=353" +"'>文物与博物馆学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=206" +"'>宗教学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=342" +"'>新闻学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=272" +"'>武术与民族传统体育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=637" +"'>会计学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=650" +"'>体育经济与管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=350" +"'>世界史</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=204" +"'>哲学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=343" +"'>广告学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=267" +"'>运动训练</a>" +
                            "");
                    }else if(resultOccu == "ISFJ"){
                        occupationExplainContent2.html(occupationResult[7]);
                        occupationExplainContent1.text(occupationTextArray[7]).css("fontSize",occupationExplainContent2.find("span").css("fontSize")).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("医生<br />图书馆管理员<br />室内装潢设计师<br />社工<br />信贷顾问<br />保险代理人<br />法律工作者");
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=587" +"'>基础医学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=630" +"'>护理学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=663" +"'>图书馆学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=696" +"'>雕塑</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=653" +"'>行政管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=217" +"'>保险学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=218" +"'>投资学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=607" +"'>中西医临床医学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=234" +"'>人类学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=593" +"'>眼视光医学</a>" +
                            "");
                    }else if(resultOccu == "ENFJ"){
                        occupationExplainContent2.html(occupationResult[8]);
                        occupationExplainContent1.text(occupationTextArray[8]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("基础护理医师<br />翻译<br />非盈利机构总裁<br />神职人员<br />教育家<br />记者<br />平面造型艺术家<br />咨询顾问").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=623" +"'>康复治疗学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=280" +"'>英语</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=653" +"'>行政管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=205" +"'>逻辑学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=258" +"'>科学教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=347" +"'>编辑出版学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=697" +"'>摄影</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=642" +"'>资产评估</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=628" +"'>卫生检验与检疫</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=284" +"'>翻译</a>" +
                            "");
                    }else if(resultOccu == "INFJ"){
                        occupationExplainContent2.html(occupationResult[9]);
                        occupationExplainContent1.text(occupationTextArray[9]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("临床心理学家<br />服装设计师<br />包装设计师<br />临床医学家<br />特殊领域教师<br />绘画员<br />作家/编辑<br />HR/职业咨询顾问<br />社会服务者<br />AIR建筑师").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=387" +"'>心理学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=484" +"'>服装设计与工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=488" +"'>包装工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=592" +"'>医学影像学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=263" +"'>特殊教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=700" +"'>中国画</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=276" +"'>古典文献学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=646" +"'>人力资源管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=654" +"'>城市管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=545" +"'>城乡规划</a>" +
                            "");
                    }else if(resultOccu == "ENFP"){
                        occupationExplainContent2.html(occupationResult[10]);
                        occupationExplainContent1.text(occupationTextArray[10]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("公务员<br />小说家/演说家<br />电影编剧<br />新闻记者<br />企业宣传<br />战略规划师<br />创业者<br />音乐家<br />实业家<br />教导者").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=232" +"'>政治学、经济学与哲学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=277" +"'>应用语言学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=691" +"'>戏剧影视文学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=348" +"'>网络与新媒体</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=344" +"'>传播学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=445" +"'>软件工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=448" +"'>物联网工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=680" +"'>音乐表演</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=227" +"'>知识产权</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=380" +"'>地球化学</a>" +
                            "");
                    }else if(resultOccu == "INFP"){
                        occupationExplainContent2.html(occupationResult[11]);
                        occupationExplainContent1.text(occupationTextArray[11]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("政府工作人员<br />记者/主诗人/宣传工作者<br />心理学专家<br />社工<br />教育工作者<br />明星<br />漫画家<br />艺术家<br />团队建设顾问").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=660" +"'>土地资源管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=345" +"'>数字出版</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=387" +"'>心理学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=659" +"'>公共事业管理</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=259" +"'>人文教育</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=684" +"'>表演</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=695" +"'>绘画</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=681" +"'>舞蹈表演</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=356" +"'>数学与应用数学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=260" +"'>艺术教育</a>" +
                            "");
                    }else if(resultOccu == "ENTJ"){
                        occupationExplainContent2.html(occupationResult[12]);
                        occupationExplainContent1.text(occupationTextArray[12]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("工程人员<br />机械工程师<br />电气工程师<br />航天工程师<br />飞行员<br />土木工程人员<br />政治家<br />公检法人员<br />CEO/COO/CTO <br />病理学家<br />核工程师").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=391" +"'>工程力学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=402" +"'>材料成型及控制工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=426" +"'>电气工程与智能控制</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=504" +"'>飞行器适航技术</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=503" +"'>飞行器动力工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=454" +"'>土木工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=228" +"'>外交学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=226" +"'>监狱学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=216" +"'>金融学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=610" +"'>临床药学</a>" +
                            "");
                    }else if(resultOccu == "INTJ"){
                        occupationExplainContent2.html(occupationResult[13]);
                        occupationExplainContent1.text(occupationTextArray[13]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("科学研究人员<br />电脑分析师<br />网络工程师<br />投资顾问<br />经济学家<br />建筑设计师<br />知识产权律师<br />数据库专家<br />广告策划").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=472" +"'>化学工程与工业生物工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=527" +"'>环境工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=446" +"'>网络工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=218" +"'>投资学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=208" +"'>经济学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=546" +"'>风景园林</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=227" +"'>知识产权</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=453" +"'>空间信息与数字技术</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=346" +"'>广播电视学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=469" +"'>能源化学工程</a>" +
                            "");
                    }else if(resultOccu == "ENTP"){
                        occupationExplainContent2.html(occupationResult[14]);
                        occupationExplainContent1.text(occupationTextArray[14]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("电气工程师<br />化学工程师<br />硬件工程师<br />摄影师<br />软件工程师<br />汽车灯具工程师<br />飞行器制造工程师<br />太阳能工程师<br />园林工程师<br />核工程师<br />计算机专员").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=424" +"'>智能电网信息工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=362" +"'>化学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=452" +"'>电子与计算机工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=697" +"'>摄影</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=445" +"'>软件工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=397" +"'>汽车服务工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=505" +"'>飞行器设计与工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=421" +"'>新能源科学与工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=517" +"'>辐射防护与核安全</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=451" +"'>计算机科学与技术</a>" +
                            "");
                    }else if(resultOccu == "INTP"){
                        occupationExplainContent2.html(occupationResult[15]);
                        occupationExplainContent1.text(occupationTextArray[15]).css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent3.html("技术专家<br />数学家<br />考古学家<br />建筑师<br />企业金融师<br />科学家<br />逻辑学家<br />摄影师<br />计算机程序员").css("fontSize",occupationExplainContent2.find("span").css("fontSize"));
                        occupationExplainContent4.html("" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=405" +"'>测控技术与仪器</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=356" +"'>数学与应用数学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=351" +"'>考古学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=544" +"'>建筑学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=219" +"'>金融工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=549" +"'>生物工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=357" +"'>信息与计算科学</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=697" +"'>摄影</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=446" +"'>网络工程</a>" +
                            "<a href='"+ url+"guorenTeach/majorShow.html" + "?majorId=444" +"'>轨道交通信号与控制</a>" +
                            "");
                    }
                    occupationContent.find(".resultTitle").css("fontSize",occupationExplainContent2.find("p").eq(0).find("span").css("fontSize"));
                    occupationExplainContent2.find("p").eq(1).css("marginTop",occupationContent.find(".resultCont2").css("marginTop"));
                })
            }
        }else if(evaluationId == 4){
            if(academicObj.data.length == 0){
                academicContent.empty();
                $("<div></div>").addClass("pageTip").text("您还没有进行过自身学业倾向测评").appendTo(academicContent);
            }else{
                radarMap();
                academicContrast();

                //添加文理分布图
                var wen = $(".liberalArtsRight");
                var li = $(".liberalArtsLeft");
                wen.find(".liberalNumber").find("div").css({
                    width:liberal/num * wen.find(".liberalNumber").width()
                });
                li.find(".liberalNumber").find("div").css({
                    width:science/num * li.find(".liberalNumber").width()
                });
                //end 添加文理分布图

                var subjectInterest = $(".subjectInterest");
                if(middleSubject >= 76){
                    subjectInterest.find("span").html("您对" + textArray[academicNumber[0]] + "、" + textArray[academicNumber[1]] + "、" + textArray[academicNumber[2]] + "感兴趣,为" + "<br/><b>文科思维</b>");
                }else if(middleSubject>=5 && middleSubject <= 75){
                    subjectInterest.find("span").html("您对" + textArray[academicNumber[0]] + "、" + textArray[academicNumber[1]] + "、" + textArray[academicNumber[2]] + "感兴趣,为" + "<br/><b>偏文科思维</b>");
                }else if(middleSubject>=-5 && middleSubject <= 5){
                    subjectInterest.find("span").html("您对" + textArray[academicNumber[0]] + "、" + textArray[academicNumber[1]] + "、" + textArray[academicNumber[2]] + "感兴趣,为" + "<br/><b>文理不偏科思维</b>");
                }else if(middleSubject>=-75 && middleSubject <= -5){
                    subjectInterest.find("span").html("您对" + textArray[academicNumber[0]] + "、" + textArray[academicNumber[1]] + "、" + textArray[academicNumber[2]] + "感兴趣,为" + "<br/><b>偏理科思维</b>");
                }else if(middleSubject<=-76){
                    subjectInterest.find("span").html("您对" + textArray[academicNumber[0]] + "、" + textArray[academicNumber[1]] + "、" + textArray[academicNumber[2]] + "感兴趣,为" + "<br/><b>理科思维</b>");
                }

                //添加学科兴趣排名

                var academicExplain1 = $(".academicExplain1");
                academicExplain1.find("ul").find("li").eq(0).text(textArray[academicNumber[0]] + "、");
                academicExplain1.find("ul").find("li").eq(1).text(textArray[academicNumber[1]] + "、");
                academicExplain1.find("ul").find("li").eq(2).text(textArray[academicNumber[2]]);
            }
        }
    }
    //end 添加页面内容

    //判断性格测试值排名
    function characterContrast() {
        var characterArray = [characterObj.data[0].score,characterObj.data[1].score,characterObj.data[2].score,characterObj.data[3].score];
        var ArrayBox = [characterObj.data[0].score,characterObj.data[1].score,characterObj.data[2].score,characterObj.data[3].score];
        characterArray.sort(function(a,b){
            return b-a
        });
        characterArray.forEach(function (e,index) {
            if(ArrayBox.indexOf(e) == ArrayBox.indexOf(characterArray[index-1])){
                ArrayBox.splice(ArrayBox.indexOf(e),1,-1);
                characteNnumber[index] = ArrayBox.indexOf(e);
            }else{
                characteNnumber[index] = ArrayBox.indexOf(e);
            }
        });
    }
    //end 判断性格测试值排名

    //判断天赋测试值排名
    function talentContrast() {
        var talentArray = [talentObj.data[0].score,talentObj.data[1].score,talentObj.data[2].score,talentObj.data[3].score,talentObj.data[4].score,talentObj.data[5].score,talentObj.data[6].score,talentObj.data[7].score];
        var ArrayBox = [talentObj.data[0].score,talentObj.data[1].score,talentObj.data[2].score,talentObj.data[3].score,talentObj.data[4].score,talentObj.data[5].score,talentObj.data[6].score,talentObj.data[7].score];

        talentArray.sort(function(a,b){
            return b-a
        });
        talentArray.forEach(function (e,index) {
            if(ArrayBox.indexOf(e) == ArrayBox.indexOf(talentArray[index-1])){
                ArrayBox.splice(ArrayBox.indexOf(e),1,-1);
                talentNumber[index] = ArrayBox.indexOf(e);
            }else{
                talentNumber[index] = ArrayBox.indexOf(e);
            }
        });
    }
    //end 判断天赋测试值排名

    //判断学业倾向测试值排名
    function academicContrast() {
        var originalArray = [academicObj.data[0].score,academicObj.data[1].score,academicObj.data[2].score,academicObj.data[3].score,academicObj.data[4].score,academicObj.data[5].score];
        var academicArray = [academicObj.data[0].score,academicObj.data[1].score,academicObj.data[2].score,academicObj.data[3].score,academicObj.data[4].score,academicObj.data[5].score];
        var ArrayBox = [academicObj.data[0].score,academicObj.data[1].score,academicObj.data[2].score,academicObj.data[3].score,academicObj.data[4].score,academicObj.data[5].score];
        textArray = ['历史', '化学', '生物', '地理','物理', '政治'];
        academicArray.sort(function(a,b){
            return b-a
        });
        academicArray.forEach(function (e,index) {
            if(ArrayBox.indexOf(e) == ArrayBox.indexOf(academicArray[index-1])){
                ArrayBox.splice(ArrayBox.indexOf(e),1,-1);
                academicNumber[index] = ArrayBox.indexOf(e);
            }else{
                academicNumber[index] = ArrayBox.indexOf(e);
            }
        });


        //文理科分数统计
        liberal = originalArray[0] + originalArray[3] + originalArray[5];
        science = originalArray[1] + originalArray[2] + originalArray[4];
        middleSubject = liberal - science;
        //文理科分数统计

        //总分统计
        num = 0;
        academicArray.forEach(function (e) {
            num = num + e;
        });
        //end 总分统计
        return academicNumber;
    }
    //end 判断学业倾向测试值排名

    var redNum;
    var yellowNum;
    var greenNum;
    var blueNum;

    //性格测试饼状图
    function pieImg() {
        redNum = (characterObj.data[0].score/30*100).toFixed(2);
        blueNum = (characterObj.data[1].score/30*100).toFixed(2);
        yellowNum = (characterObj.data[2].score/30*100).toFixed(2);
        greenNum = (characterObj.data[3].score/30*100).toFixed(2);
        $('#container').highcharts({
            chart: {
                plotBackgroundColor: "#fff",
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
                style: {fontSize:"20px"}
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            colors: [
                "#fe8969",
                "#75a4ea",
                "#f7be3d",
                "#4cc1c2"
            ],
            series: [{
                type: 'pie',
                name: '性格占比',
                data: [
                    ['红', redNum-0],
                    ['蓝', blueNum-0],
                    ['黄', yellowNum-0],
                    ['绿', greenNum-0]
                ]
            }],
            legend: {
                enabled: false
            },
            credits: {
                text: '',
                href: ''
            }
        });
    }
    //end 性格测试饼状图

    var radarA = 0;
    var radarB = 0;
    var radarC = 0;
    var radarD = 0;
    var radarE = 0;
    var radarF = 0;

    //学习倾向测试雷达图
    function radarMap() {
        radarA = academicObj.data[0].score/45 * 100;
        radarB = academicObj.data[1].score/45 * 100;
        radarC = academicObj.data[2].score/45 * 100;
        radarD = academicObj.data[3].score/45 * 100;
        radarE = academicObj.data[4].score/45 * 100;
        radarF = academicObj.data[5].score/45 * 100;
        $(function () {
            $('#radarImg').highcharts({
                chart: {
                    polar: true,
                    type: 'line'
                },
                title: {
                    text: '',
                    x: -80,
                    y:10
                },
                pane: {
                    size: '80%'
                },
                plotBackgroundColor:"#000",
                xAxis: {
                    categories: ['历史', '化学', '生物', '地理','物理', '政治'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                    labels : {
                        style : {
                            'fontSize' : '24px'
                        }
                    }
                },
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0,
                    max:100,
                    labels : {
                        style : {
                            'fontSize' : '24px',
                            'color' : '#cecece'
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    headerFormat: '<div>{point.key}</div><table>',
                    pointFormat: '<br/><span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>',
                    style: {fontSize:"24px"},
                    labels : {
                        style : {
                            'fontSize' : '100px'
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '学科倾向',
                    data: [radarA,radarB,radarC,radarD,radarE,radarF],
                    pointPlacement: 'on'
                }]
            });
        });
    }
    //end 学习倾向测试雷达图
});