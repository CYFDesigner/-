/**
 * Created by zy on 2017/3/8.
 */
$(function () {
    var status = window.localStorage.getItem("status");
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var dataId;
    if(lastIndex != -1){
        dataId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        dataId = location.search.substr(index+1);
    }
    var dataObj;
    var majorObj;
    var planObj;
    var provinceObj;
    var admissionObj;
    var weatherObj;
    var weatherDate = [];
    var placeObj;

    //用来盛装就业情况发送数据
    var majorProvinceId = 20;
    var majorBatch = null;
    var majorYear = 2016;
    var majorName = "";
    //end 用来盛装就业情况发送数据

    //用来盛装就业情况数据对应的文字
    var majorProvinceIdText = "广东省";
    var majorBatchText = "全部";
    var majorYearText = "2016";
    //end 用来盛装就业情况数据对应的文字

    //用来盛装选考要求发送数据
    var year = 2016;
    var planType = null;
    var provinceId = 20;
    var specialtyLevel = null;
    var specialtyType = null;
    //end 用来盛装选考要求发送数据

    //用来盛装选考要求数据对应的文字
    var yearText = "2016";
    var planTypeText = "全部";
    var provinceText = "广东省";
    var specialtyLevelText = "全部";
    var specialtyTypeText = "全部";
    //end 用来盛装选考要求数据对应的文字

    //用来盛装录取分数发送数据
    var batch = null;
    var provinceIdNumber = 20;
    var type = null;
    var admissionYear = 2016;
    //end 用来盛装录取分数发送数据

    //用来盛装录取分数数据对应的文字
    var batchText = "全部";
    var provinceIdNumberText = "广东省";
    var typeText = "全部";
    var admissionYearText = "2016";
    //end 用来盛装录取分数数据对应的文字

    //请求数据
    function dataGet() {
        var Id = {
            "id":dataId
        };
        //请求大学信息
        $.ajax({
            url:url + 'wx/university/info/' + dataId,
            type:'GET',
            async:false,
            dataType:'json',
            data:Id,
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    $("title").html(dataObj.data.name);
                    var collectBtn = $(".collectBtn");
                    if(dataObj.data.follow == true){
                        collectBtn.html("<svg class='collectIcon collectIconActive icon' aria-hidden='true'><use xlink:href='#icon-shoucang-1'></use></svg><span class='collectText'>已收藏</span>");
                        collectBtn.attr("class","collectBtn collectBtnActive");
                    }else{
                        collectBtn.attr("class","collectBtn");
                        collectBtn.html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-2'></use></svg><span class='collectText'>&nbsp;收&nbsp;藏&nbsp;</span>")
                    }
                    place(28);
                    appendData();
                    judgeCollect();
                    selectContent();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip = "数据请求失败，请刷新再试";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
        //end 请求大学信息
    }
    //end 请求数据
    dataGet();

    //请求大学就业情况
    function dataMajor() {
        var planData = {
            keyword:majorName,
            provinceId:majorProvinceId,
            type:majorBatch,
            universityId:dataObj.data.id,
            year:majorYear
        };
        $.ajax({
            url:url + 'wx/university/specialtyscore',
            type:'GET',
            dataType:'json',
            // async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    majorObj = data;
                    selectContent();
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
    dataMajor();
    //请求大学就业情况

    //请求大学选考要求
    function dataPlan() {
        var planData = {
            planType:planType,
            provinceId:provinceId,
            specialtyLevel:specialtyLevel,
            specialtyType:specialtyType,
            universityId:dataObj.data.id,
            year:year
        };
        $.ajax({
            url:url + 'wx/university/enrollment/',
            type:'GET',
            dataType:'json',
            // async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    planObj = data;
                    selectContent();
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
    //end 请求大学选考要求
    dataPlan();

    //请求大学录取分数
    function dataAdmission() {
        var planData = {
            batch:batch,
            provinceId:provinceIdNumber,
            type:type,
            universityId:dataObj.data.id,
            year:admissionYear
        };
        $.ajax({
            url:url + 'wx/university/collegescore/',
            type:'GET',
            dataType:'json',
            // async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    admissionObj = data;
                    selectContent();
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
    dataAdmission();
    //end 请求大学录取分数

    //请求天气
    function weather() {
        var planData = {
            provinceId:dataObj.data.regionId
        };
        $.ajax({
            url:url + 'wx/university/weather/',
            type:'GET',
            dataType:'json',
            async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    weatherObj = data;
                    if(weatherObj.data != null){
                        weatherDate[0] = weatherObj.data.springAvgTemp;
                        weatherDate[1] = weatherObj.data.summerAvgTemp;
                        weatherDate[2] = weatherObj.data.fallAvgTemp;
                        weatherDate[3] = weatherObj.data.winterAvgTemp;
                        temperature();
                    }
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
    //end 请求天气

    //请求籍贯
    function place(postId) {
        var planData = {
            provinceId:postId,
            universityId:dataObj.data.id
        };
        $.ajax({
            url:url + 'wx/university/place/',
            type:'GET',
            dataType:'json',
            async:false,
            data:planData,
            success:function (data) {
                if(data.status == true){
                    if(!placeObj){
                        placeObj = data;
                        place(20);
                    }else{
                        if(placeObj.data.length == 0){
                            if(data.data.length == 0){

                            }else{
                                placeObj.data[0] = data.data[0];
                            }
                        }else{
                            if(data.data.length == 0){

                            }else{
                                placeObj.data[1] = data.data[0];
                            }
                        }
                    }
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

    //请求省份筛选列表
    function dataPlanProvince() {
        $.ajax({
            url:url + "wx/region/province/list",
            type:'GET',
            dataType:'json',
            success:function (data) {
                if(data.status ==true){
                    provinceObj = data;
                    appendPlanScreen();
                    appendMajorScreen();
                    appendAdmissionScreen();
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
    //end 请求省份筛选列表
    dataPlanProvince();

    //页面导航点击事件
    function detailsNavClick() {
        $(".detailsNav li").bind("click",function () {
            $(".detailsNav li").removeClass("detailsActive");
            $(this).addClass("detailsActive");
            selectContent();
        })
    }
    //end 页面导航点击事件
    detailsNavClick();

    //收藏功能
    function judgeCollect() {
        $(".collectBtn").bind("click",function (e) {
            if(window.localStorage.getItem("status") == "true"){
                if($(this).attr("class") == "collectBtn collectBtnActive"){
                    $(this).removeClass("collectBtnActive");
                    $(this).html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-2'></use></svg><span class='collectText'>&nbsp;收&nbsp;藏&nbsp;</span>")
                }else{
                    $(this).addClass("collectBtnActive");
                    $(this).html("<svg class='collectIcon collectIconActive icon' aria-hidden='true'><use xlink:href='#icon-shoucang-1'></use></svg><span class='collectText'>已收藏</span>")
                }
                var collectPost = {
                    universityId:dataObj.data.id
                };
                $.ajax({
                    url:url + "wx/university/collect",
                    type:'POST',
                    dataType:'json',
                    data:collectPost,
                    success:function (data) {
                        if(data.status == true){

                        }else{
                            var openUrl = url + "guorenTeach/universityShow.html" + "?universityId=" + dataId;
                            loginFalse(openUrl);
                        }
                    },
                    xhrFields: {
                        withCredentials: true    // 此字段标识要跨域传数据
                    },
                    crossDomain: true
                });
            }else{
                tip = "请先登录后再收藏";
                pageTip(tip);
                var openUrl = url + "guorenTeach/universityShow.html" + "?universityId=" + dataId;
                login(openUrl);
            }
            e.preventDefault();
        });

    }
    //end 收藏功能

    //选择不同导航下的页面信息
    function selectContent() {
        var detailsTextBox = $(".detailsTextBox");
        var navCheck = $(".detailsActive");
        if(navCheck.text() == "学校简介"){
            detailsTextBox.empty();
            detailsTextBox.css({
                padding:"0 1.3rem"
            });
            //添加大学简介信息
            $("<div></div>").attr("class","temperatureTitle").html("<span>大学简介</span>").appendTo(detailsTextBox);
            var textBox = $("<div></div>").attr("id","textBox").appendTo(detailsTextBox);
            var text = dataObj.data.introduction;
            textBox.append(text);
            $("<div></div>").attr("class","toggleText").html("<span>查看更多信息</span><span class='iconShow icon-xiangxia- iconfont'></span>").appendTo(detailsTextBox).bind("click",function () {
                if($(this).attr("class") == "toggleText show"){
                    $("#textBox").css({"height":"20rem"});
                    $(this).html("<span>查看更多信息</span><span class='iconShow icon-xiangxia- iconfont'></span>");
                    $(this).removeClass("show");
                }else{
                    $("#textBox").css({"height":"auto"});
                    $(this).html("<span>收起更多信息</span><span class='iconShow icon-xiangshang- iconfont'></span>");
                    $(this).addClass("show");
                }
            });
            //end 添加大学简介信息

            //添加男女比例图表
            $("<div></div>").attr("class","temperatureTitle").html("<span>男女比例</span>").appendTo(detailsTextBox);
            var manAndWomanBox = $("<div></div>").attr("class","manAndWoman").appendTo(detailsTextBox);
                $("<div></div>").attr("class","man").appendTo(manAndWomanBox);
                var proportionBox = $("<div></div>").attr("class","proportion").appendTo(manAndWomanBox);
                    $("<div></div>").attr("class","manProportion").css({
                        width:dataObj.data.maleRate/100*proportionBox.width()
                    }).appendTo(proportionBox);
                    $("<span></span>").text(dataObj.data.maleRate + "%").attr("class","manProportionText").appendTo(proportionBox);
                    $("<span></span>").text(dataObj.data.femaleRate + "%").attr("class","womanProportionText").appendTo(proportionBox);
                var woman = $("<div></div>").attr("class","woman").appendTo(manAndWomanBox);
            //end 添加男女比例图表

            //添加天气图表
            $("<div></div>").attr("class","temperatureTitle").html("<span>当地天气</span>").appendTo(detailsTextBox);
            $("<div></div>").attr({
                "id":"container",
                "class":"temperature"
            }).appendTo(detailsTextBox);
            if(weatherObj == undefined){
                weather();
            }else{
                if(weatherObj.data != null){
                    weatherDate[0] = weatherObj.data.springAvgTemp;
                    weatherDate[1] = weatherObj.data.summerAvgTemp;
                    weatherDate[2] = weatherObj.data.fallAvgTemp;
                    weatherDate[3] = weatherObj.data.winterAvgTemp;
                    temperature();
                }
            }
            //end 添加天气图表

            //添加学生籍贯分布图表
            if(placeObj.data.length > 0){
                $("<div></div>").attr("class","temperatureTitle").html("<a href='local.html?universityId=" + dataId + "'><span>学生籍贯分布</span><b class='iconEnter icon-xiangshang- iconfont'></b></a>").appendTo(detailsTextBox);
                for(var d = 0;d < placeObj.data.length;d++){
                    var localBox = $("<div></div>").attr("class","localBox").appendTo(detailsTextBox);
                        $("<div></div>").attr("class","localName").text(placeObj.data[d].provinceName).appendTo(localBox);
                        var localProportionBox = $("<div></div>").attr("class","localProportionBox").appendTo(localBox);
                            $("<div></div>").attr("class","localProportion").css("width",(100-(placeObj.data[d].rate-0))/100*localProportionBox.width()).appendTo(localProportionBox);
                            $("<div></div>").attr("class","localText").text("占"+ placeObj.data[d].rate +"%").appendTo(localBox);
                }
            }else{
                var localUrl = url + "guorenTeach/local.html" + "?universityId=" + dataId;
                $("<div></div>").attr("class","temperatureTitle").html("<a href='"+ localUrl +"'><span>学生籍贯分布</span><b class='iconEnter icon-xiangshang- iconfont'></b></a>").appendTo(detailsTextBox);
            }
            //end 添加学生籍贯分布图表
        }else if(navCheck.text() == "选考要求"){
            detailsTextBox.empty();
            detailsTextBox.css({
                padding:"0 0 0 0"
            });
            var screenBox = $("<ul></ul>").addClass("fractionScreen").appendTo(detailsTextBox);
                $("<li></li>").addClass("stationScreen").html("<span>"+ provinceText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(screenBox);
                $("<li></li>").addClass("typeScreen").html("<span>"+ planTypeText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(screenBox);
                $("<li></li>").addClass("batchScreen").html("<span>"+ specialtyLevelText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(screenBox);
                $("<li></li>").addClass("subjectScreen").html("<span>"+ specialtyTypeText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(screenBox);
                $("<li></li>").addClass("yearScreenBtn").html("<span>"+ yearText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(screenBox);
            if(year == 2016){
                $("<div></div>").addClass("majorInfo").text("2016年选考要求数据更新中").appendTo(detailsTextBox);
            }else{
                var tableBox = $("<table></table>").addClass("listTable").appendTo(detailsTextBox);
                var listTableHead = $("<thead></thead>").appendTo(tableBox);
                var theadItemTr = $("<tr></tr>").appendTo(listTableHead);
                $("<th></th>").text("专业名称").appendTo(theadItemTr);
                $("<th></th>").text("计划类型").appendTo(theadItemTr);
                $("<th></th>").text("层次").appendTo(theadItemTr);
                $("<th></th>").text("科类").appendTo(theadItemTr);
                $("<th></th>").text("计划数").appendTo(theadItemTr);
                var listTableBody = $("<tbody></tbody>").appendTo(tableBox);
                for(var a = 0;a < planObj.data.length;a++){
                    var tbodyItemTr = $("<tr></tr>").appendTo(listTableBody);
                    $("<td></td>").text(planObj.data[a].specialtyName).addClass("majorNameTd").appendTo(tbodyItemTr);
                    $("<td></td>").text(planObj.data[a].planTypeName).addClass("majorTypeTd").appendTo(tbodyItemTr);
                    $("<td></td>").text(planObj.data[a].specialtyLevelName).addClass("majorLeveTd").appendTo(tbodyItemTr);
                    $("<td></td>").text(planObj.data[a].specialtyTypeName).addClass("majorClassTd").appendTo(tbodyItemTr);
                    $("<td></td>").text(planObj.data[a].planNum).addClass("majorPlanNumberTd").appendTo(tbodyItemTr);
                }
            }
            planNavBind();
        }else if(navCheck.text() == "录取分数"){
            detailsTextBox.empty();
            detailsTextBox.css({
                padding:"0 0 0 0"
            });
            if(status == "true"){
                var admissionScreenBox = $("<ul></ul>").addClass("admissionScreenBox").appendTo(detailsTextBox);
                $("<li></li>").addClass("admissionStation").html("<span>"+ provinceIdNumberText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(admissionScreenBox);
                $("<li></li>").addClass("admissionType").html("<span>"+ typeText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(admissionScreenBox);
                $("<li></li>").addClass("admissionBatch").html("<span>"+ batchText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(admissionScreenBox);
                $("<li></li>").addClass("admissionYear").html("<span>"+ admissionYearText +"<span class='iconSpan iconfont icon-xiangxia-'></span></span>").appendTo(admissionScreenBox);
                $("<div></div>").html("<span class='detailsHelpText'>录取分数参考须知</span><span class='detailsHelpIcon'>?</span>").addClass("detailsHelp").appendTo(detailsTextBox);
                var admissionTableBox = $("<table></table>").addClass("listTable").appendTo(detailsTextBox);
                var admissionListTableHead = $("<thead></thead>").appendTo(admissionTableBox);
                var admissionTheadItemTr = $("<tr></tr>").appendTo(admissionListTableHead);
                $("<th></th>").text(" 文理 ").appendTo(admissionTheadItemTr);
                $("<th></th>").text("批次线").appendTo(admissionTheadItemTr);
                $("<th></th>").text("最低分").appendTo(admissionTheadItemTr);
                $("<th></th>").text("最低分位次").appendTo(admissionTheadItemTr);
                $("<th></th>").text("人数").appendTo(admissionTheadItemTr);
                $("<th></th>").text("批次").appendTo(admissionTheadItemTr);
                $("<th></th>").text("线差").appendTo(admissionTheadItemTr);
                var admissionListTableBody = $("<tbody></tbody>").appendTo(admissionTableBox);
                for(var b = 0;b < admissionObj.data.length;b++){
                    var admissionTbodyItemTr = $("<tr></tr>").appendTo(admissionListTableBody);
                    if(admissionObj.data[b].type == 0 ){
                        $("<td></td>").text("文科").appendTo(admissionTbodyItemTr);
                    }else if(admissionObj.data[b].type == 1){
                        $("<td></td>").text("理科").appendTo(admissionTbodyItemTr);
                    }
                    $("<td></td>").text(admissionObj.data[b].batchScore).addClass("LiberalTd").appendTo(admissionTbodyItemTr);
                    $("<td></td>").text(admissionObj.data[b].minScore).addClass("BatchNumberTd").appendTo(admissionTbodyItemTr);
                    $("<td></td>").text(admissionObj.data[b].lowestScore).addClass("MinNumberTd").appendTo(admissionTbodyItemTr);
                    $("<td></td>").text(admissionObj.data[b].enrollmentNum).addClass("MinEnrollmentTd").appendTo(admissionTbodyItemTr);
                    $("<td></td>").text(admissionObj.data[b].batchName).addClass("BatchTd").appendTo(admissionTbodyItemTr);
                    $("<td></td>").text(admissionObj.data[b].lineDifference).addClass("LineDiffTd").appendTo(admissionTbodyItemTr);
                }
                admissionPanNavBind();
            }else{
                $("<div></div>").addClass("majorInfo").html("请<a> 登录 </a>后查看").appendTo(detailsTextBox);
                majorInfoA();
            }
        }else if(navCheck.text() == "食宿配置"){
            detailsTextBox.empty();
        }
    }
    //end 选择不同导航下的页面信息

    //添加就业情况的筛选列表
    function appendMajorScreen() {
        var majorProvinceScreen = $(".majorProvinceScreen");
        for(var b = 0;b < provinceObj.data.length;b++){
            if(provinceObj.data[b].id == 20 || provinceObj.data[b].id == 28 || provinceObj.data[b].id == 21){
                $("<li></li>").attr("provinceId",provinceObj.data[b].id).text(provinceObj.data[b].name).appendTo(majorProvinceScreen);
            }
        }

        var majorBatchScreen = $(".majorBatchScreen");
        majorBatchScreen.empty();
        $("<li></li>").attr("majorBatch","").text("全部").appendTo(majorBatchScreen);
        $("<li></li>").attr("majorBatch",0).text("文史").appendTo(majorBatchScreen);
        $("<li></li>").attr("majorBatch",1).text("理工").appendTo(majorBatchScreen);
        var majorYearScreen = $(".majorYearScreen");
        majorYearScreen.empty();
        $("<li></li>").attr("year",2014).text("2014").appendTo(majorYearScreen);
        $("<li></li>").attr("year",2015).text("2015").appendTo(majorYearScreen);
        $("<li></li>").attr("year",2016).text("2016").appendTo(majorYearScreen);
        majorBind();
    }
    //end 添加就业情况的筛选列表

    //添加选考要求的筛选列表
    function appendPlanScreen() {
        var ProvinceScreen = $(".Province");
        for(var b = 0;b < provinceObj.data.length;b++){
            if(provinceObj.data[b].id == 20 || provinceObj.data[b].id == 28 || provinceObj.data[b].id == 21){
                $("<li></li>").attr("provinceId",provinceObj.data[b].id).text(provinceObj.data[b].name).appendTo(ProvinceScreen);
            }
        }
        var planTypeScreen = $(".planType");
        planTypeScreen.empty();
        $("<li></li>").attr("planType","").text("全部").appendTo(planTypeScreen);
        $("<li></li>").attr("planType",0).text("非定向").appendTo(planTypeScreen);
        $("<li></li>").attr("planType",1).text("国防生").appendTo(planTypeScreen);
        $("<li></li>").attr("planType",2).text("地方专项").appendTo(planTypeScreen);
        var specialtyLevelScreen = $(".specialtyLevel");
        specialtyLevelScreen.empty();
        $("<li></li>").attr("specialtyLevel","").text("全部").appendTo(specialtyLevelScreen);
        $("<li></li>").attr("specialtyLevel",0).text("本科").appendTo(specialtyLevelScreen);
        $("<li></li>").attr("specialtyLevel",1).text("专科").appendTo(specialtyLevelScreen);
        var specialtyTypeScreen = $(".specialtyType");
        specialtyTypeScreen.empty();
        $("<li></li>").attr("specialtyType","").text("全部").appendTo(specialtyTypeScreen);
        $("<li></li>").attr("specialtyType",0).text("文史").appendTo(specialtyTypeScreen);
        $("<li></li>").attr("specialtyType",1).text("理工").appendTo(specialtyTypeScreen);
        var yearScreen = $(".year");
        yearScreen.empty();
        $("<li></li>").attr("year",2014).text("2014").appendTo(yearScreen);
        $("<li></li>").attr("year",2015).text("2015").appendTo(yearScreen);
        $("<li></li>").attr("year",2016).text("2016").appendTo(yearScreen);
        planBind();
    }
    //end 添加选考要求的筛选列表

    function majorInfoA() {
        var majorInfo = $(".majorInfo");
        majorInfo.find("a").bind("touchstart",function () {
            var openUrl = url + "guorenTeach/universityShow.html" + location.search;
            login(openUrl);
        })
    }

    //添加录取分数的筛选列表
    function appendAdmissionScreen() {
        var admissionProvinceScreen = $(".admissionProvinceScreen");
        for(var b = 0;b < provinceObj.data.length;b++){
            if(provinceObj.data[b].id == 20 || provinceObj.data[b].id == 28 || provinceObj.data[b].id == 21){
                $("<li></li>").attr("provinceId",provinceObj.data[b].id).text(provinceObj.data[b].name).appendTo(admissionProvinceScreen);
            }
        }
        var admissionBatchScreen = $(".admissionBatchScreen");
        admissionBatchScreen.empty();
        $("<li></li>").attr("admissionBatch","").text("全部").appendTo(admissionBatchScreen);
        $("<li></li>").attr("admissionBatch",0).text("本科提前批").appendTo(admissionBatchScreen);
        $("<li></li>").attr("admissionBatch",1).text("本科一批").appendTo(admissionBatchScreen);
        $("<li></li>").attr("admissionBatch",2).text("本科二批").appendTo(admissionBatchScreen);
        $("<li></li>").attr("admissionBatch",3).text("本科三批").appendTo(admissionBatchScreen);
        var admissionTypeScreen = $(".admissionTypeScreen");
        admissionTypeScreen.empty();
        $("<li></li>").attr("admissionType","").text("全部").appendTo(admissionTypeScreen);
        $("<li></li>").attr("admissionType",0).text("文科").appendTo(admissionTypeScreen);
        $("<li></li>").attr("admissionType",1).text("理科").appendTo(admissionTypeScreen);
        var admissionYearScreen = $(".admissionYearScreen");
        admissionYearScreen.empty();
        $("<li></li>").attr("admissionYear",2014).text("2014").appendTo(admissionYearScreen);
        $("<li></li>").attr("admissionYear",2015).text("2015").appendTo(admissionYearScreen);
        $("<li></li>").attr("admissionYear",2016).text("2016").appendTo(admissionYearScreen);
        admissionBind();
    }
    //end 添加录取分数的筛选列表

    //就业情况导航点击事件绑定
    function majorNavBind() {
        var majorProvinceScreen = $(".majorProvinceScreen");
        var majorBatchScreen = $(".majorBatchScreen");
        var majorYearScreen = $(".majorYearScreen");
        $(".majorStationBtn").bind("click",function () {
            majorBatchScreen.parent().hide();
            majorYearScreen.parent().hide();
            majorProvinceScreen.parent().parent().fadeIn(200);
            majorProvinceScreen.parent().show();
            addFlag();
        });
        $(".majorBatchBtn").bind("click",function () {
            majorProvinceScreen.parent().hide();
            majorYearScreen.parent().hide();
            majorBatchScreen.parent().parent().fadeIn(200);
            majorBatchScreen.parent().show();
            addFlag();
        });
        $(".majorYearBtn").bind("click",function () {
            majorProvinceScreen.parent().hide();
            majorBatchScreen.parent().hide();
            majorYearScreen.parent().parent().fadeIn(200);
            majorYearScreen.parent().show();
            addFlag();
        });
    }
    //end 就业情况导航点击事件绑定

    //选考要求导航点击事件绑定
    function planNavBind() {
        var ProvinceScreen = $(".Province");
        var planTypeScreen = $(".planType");
        var specialtyLevelScreen = $(".specialtyLevel");
        var specialtyTypeScreen = $(".specialtyType");
        var yearScreen = $(".year");
        $(".stationScreen").bind("click",function () {
            specialtyLevelScreen.parent().hide();
            specialtyTypeScreen.parent().hide();
            yearScreen.parent().hide();
            planTypeScreen.parent().hide();
            ProvinceScreen.parent().parent().fadeIn(200);
            ProvinceScreen.parent().show();
            addFlag();
        });
        $(".typeScreen").bind("click",function () {
            ProvinceScreen.parent().hide();
            specialtyLevelScreen.parent().hide();
            specialtyTypeScreen.parent().hide();
            yearScreen.parent().hide();
            planTypeScreen.parent().parent().fadeIn(200);
            planTypeScreen.parent().show();
            addFlag();
        });
        $(".batchScreen").bind("click",function () {
            ProvinceScreen.parent().hide();
            planTypeScreen.parent().hide();
            specialtyTypeScreen.parent().hide();
            yearScreen.parent().hide();
            specialtyLevelScreen.parent().parent().fadeIn(200);
            specialtyLevelScreen.parent().show();
            addFlag();
        });
        $(".subjectScreen").bind("click",function () {
            ProvinceScreen.parent().hide();
            planTypeScreen.parent().hide();
            specialtyLevelScreen.parent().hide();
            yearScreen.parent().hide();
            specialtyTypeScreen.parent().parent().fadeIn(200);
            specialtyTypeScreen.parent().show();
            addFlag();
        });
        $(".yearScreenBtn").bind("click",function () {
            ProvinceScreen.parent().hide();
            planTypeScreen.parent().hide();
            specialtyLevelScreen.parent().hide();
            specialtyTypeScreen.parent().hide();
            yearScreen.parent().parent().fadeIn(200);
            yearScreen.parent().show();
            addFlag();
        });
    }
    //end 选考要求导航点击事件绑定

    //录取分数导航点击事件绑定
    function admissionPanNavBind() {
        var admissionProvinceScreen = $(".admissionProvinceScreen");
        var admissionBatchScreen = $(".admissionBatchScreen");
        var admissionTypeScreen = $(".admissionTypeScreen");
        var admissionYearScreen = $(".admissionYearScreen");
        $(".admissionStation").bind("click",function () {
            admissionBatchScreen.parent().hide();
            admissionTypeScreen.parent().hide();
            admissionYearScreen.parent().hide();
            admissionProvinceScreen.parent().parent().fadeIn(200);
            admissionProvinceScreen.parent().show();
            addFlag();
        });
        $(".admissionBatch").bind("click",function () {
            admissionProvinceScreen.parent().hide();
            admissionTypeScreen.parent().hide();
            admissionYearScreen.parent().hide();
            admissionBatchScreen.parent().parent().fadeIn(200);
            admissionBatchScreen.parent().show();
            addFlag();
        });
        $(".admissionType").bind("click",function () {
            admissionProvinceScreen.parent().hide();
            admissionBatchScreen.parent().hide();
            admissionYearScreen.parent().hide();
            admissionTypeScreen.parent().parent().fadeIn(200);
            admissionTypeScreen.parent().show();
            addFlag();
        });
        $(".admissionYear").bind("click",function () {
            admissionProvinceScreen.parent().hide();
            admissionBatchScreen.parent().hide();
            admissionTypeScreen.parent().hide();
            admissionYearScreen.parent().parent().fadeIn(200);
            admissionYearScreen.parent().show();
            addFlag();
        });
        var detailsHelpShow = $(".detailsHelpShow");
        $(".detailsHelp").bind("click",function () {
            detailsHelpShow.fadeIn(200);
        });
        detailsHelpShow.bind("click",function () {
            detailsHelpShow.fadeOut(200);
        })
    }
    //end 录取分数导航点击事件绑定

    //就业情况筛选列表的事件绑定
    function majorBind() {
        var majorProvinceScreen = $(".majorProvinceScreen");
        var majorBatchScreen = $(".majorBatchScreen");
        var majorYearScreen = $(".majorYearScreen");
        $(".majorScreen").bind("click",function (e) {
            $(this).fadeOut(200);
            addFlag();
            e.preventDefault();
        });
        majorProvinceScreen.find("li").bind("click",function (e) {
            majorProvinceScreen.find("li").removeClass("majorProvinceActive");
            $(this).addClass("majorProvinceActive");
            majorProvinceIdText = $(this).text();
            majorProvinceId = $(this).attr("provinceId") - 0;
            $(".majorScreen").fadeOut(200);
            dataMajor();
            addFlag();
            e.stopImmediatePropagation();
        });
        majorBatchScreen.find("li").bind("click",function (e) {
            majorBatchScreen.find("li").removeClass("majorBatchActive");
            $(this).addClass("majorBatchActive");
            majorBatchText = $(this).text();
            majorBatch = $(this).attr("majorBatch");
            $(".majorScreen").fadeOut(200);
            dataMajor();
            addFlag();
            e.stopImmediatePropagation();
        });
        majorYearScreen.find("li").bind("click",function (e) {
            majorYearScreen.find("li").removeClass("majorYearActive");
            $(this).addClass("majorYearActive");
            majorYearText = $(this).text();
            majorYear = $(this).attr("year") - 0;
            $(".majorScreen").fadeOut(200);
            dataMajor();
            addFlag();
            e.stopImmediatePropagation();
        });
    }
    //end 就业情况筛选列表的事件绑定

    //选考要求筛选列表的事件绑定
    function planBind() {
        var ProvinceScreen = $(".Province");
        var planTypeScreen = $(".planType");
        var specialtyLevelScreen = $(".specialtyLevel");
        var specialtyTypeScreen = $(".specialtyType");
        var yearScreen = $(".year");
        $(".screenBox").bind("click",function (e) {
            $(this).fadeOut(200);
            addFlag();
            e.preventDefault();
        });
        ProvinceScreen.find("li").bind("click",function (e) {
            ProvinceScreen.find("li").removeClass("ProvinceActive");
            $(this).addClass("ProvinceActive");
            provinceText = $(this).text();
            provinceId = $(this).attr("provinceId") - 0;
            $(".screenBox").fadeOut(200);
            dataPlan();
            addFlag();
            e.stopImmediatePropagation();
        });
        planTypeScreen.find("li").bind("click",function (e) {
            planTypeScreen.find("li").removeClass("planTypeActive");
            $(this).addClass("planTypeActive");
            planTypeText = $(this).text();
            planType = $(this).attr("planType");
            $(".screenBox").fadeOut(200);
            dataPlan();
            addFlag();
            e.stopImmediatePropagation();
        });
        specialtyLevelScreen.find("li").bind("click",function (e) {
            specialtyLevelScreen.find("li").removeClass("specialtyLevelActive");
            $(this).addClass("specialtyLevelActive");
            specialtyLevelText = $(this).text();
            specialtyLevel = $(this).attr("specialtyLevel");
            $(".screenBox").fadeOut(200);
            dataPlan();
            addFlag();
            e.stopImmediatePropagation();
        });
        specialtyTypeScreen.find("li").bind("click",function (e) {
            specialtyTypeScreen.find("li").removeClass("specialtyTypeActive");
            $(this).addClass("specialtyTypeActive");
            specialtyTypeText = $(this).text();
            specialtyType = $(this).attr("specialtyType");
            $(".screenBox").fadeOut(200);
            dataPlan();
            addFlag();
            e.stopImmediatePropagation();
        });
        yearScreen.find("li").bind("click",function (e) {
            yearScreen.find("li").removeClass("yearActive");
            $(this).addClass("yearActive");
            yearText = $(this).text();
            year = $(this).attr("year") - 0;
            $(".screenBox").fadeOut(200);
            dataPlan();
            addFlag();
            e.stopImmediatePropagation();
        });
    }
    //end 选考要求筛选列表的事件绑定

    //录取分数筛选列表的事件绑定
    function admissionBind() {
        var admissionProvinceScreen = $(".admissionProvinceScreen");
        var admissionBatchScreen = $(".admissionBatchScreen");
        var admissionTypeScreen = $(".admissionTypeScreen");
        var admissionYearScreen = $(".admissionYearScreen");
        $(".admissionScreen").bind("click",function (e) {
            $(this).fadeOut(200);
            addFlag();
            e.preventDefault();
        });
        admissionProvinceScreen.find("li").bind("click",function (e) {
            admissionProvinceScreen.find("li").removeClass("admissionProvinceActive");
            $(this).addClass("admissionProvinceActive");
            provinceIdNumberText = $(this).text();
            provinceIdNumber = $(this).attr("provinceId") - 0;
            $(".admissionScreen").fadeOut(200);
            dataAdmission();
            addFlag();
            e.stopImmediatePropagation();
        });
        admissionBatchScreen.find("li").bind("click",function (e) {
            admissionBatchScreen.find("li").removeClass("admissionBatchActive");
            $(this).addClass("admissionBatchActive");
            batchText = $(this).text();
            batch = $(this).attr("admissionBatch");
            $(".admissionScreen").fadeOut(200);
            dataAdmission();
            addFlag();
            e.stopImmediatePropagation();
        });
        admissionTypeScreen.find("li").bind("click",function (e) {
            admissionTypeScreen.find("li").removeClass("admissionTypeActive");
            $(this).addClass("admissionTypeActive");
            typeText = $(this).text();
            type = $(this).attr("admissionType");
            $(".admissionScreen").fadeOut(200);
            dataAdmission();
            addFlag();
            e.stopImmediatePropagation();
        });
        admissionYearScreen.find("li").bind("click",function (e) {
            admissionYearScreen.find("li").removeClass("admissionYearActive");
            $(this).addClass("admissionYearActive");
            admissionYearText = $(this).text();
            admissionYear = $(this).attr("admissionYear") - 0;
            $(".admissionScreen").fadeOut(200);
            dataAdmission();
            addFlag();
            e.stopImmediatePropagation();
        });
    }
    //end 录取分数筛选列表的事件绑定

    //添加页面信息
    function appendData() {
        detailsNavClick();
        var LogoBox = $(".universityLogo");
            $("<img>").attr("src",dataObj.data.logo).appendTo(LogoBox);
            var universityName = $(".universityName");
                universityName.text(dataObj.data.name);
            var universityClass = $(".universityClass");
            universityClass.empty();
                var universityClassRegion = $("<li></li>").appendTo(universityClass);
                    $("<i></i>").addClass("locationIcon iconfont icon-dingwei").appendTo(universityClassRegion);
                    $("<span></span>").addClass("locationText").text(dataObj.data.region).appendTo(universityClassRegion);
                var universityClassLevel =  $("<li></li>").appendTo(universityClass);
                    $("<i></i>").addClass("locationIcon iconfont icon-xueli").appendTo(universityClassLevel);
                    $("<span></span>").addClass("locationText").text(dataObj.data.level).appendTo(universityClassLevel);
            if(dataObj.data.tag211 == true){
                var universityClassTag211 =  $("<li></li>").appendTo(universityClass);
                    $("<i></i>").addClass("locationIcon iconfont icon-icon-test").appendTo(universityClassTag211);
                    $("<span></span>").addClass("locationText").text("211").appendTo(universityClassTag211);
            }
            if(dataObj.data.tag985 == true){
                var universityClassTag985 =  $("<li></li>").appendTo(universityClass);
                    $("<i></i>").addClass("locationIcon iconfont icon-icon-test1").appendTo(universityClassTag985);
                    $("<span></span>").addClass("locationText").text("985").appendTo(universityClassTag985);
            }
            var universityLable = $(".universityLable");
            universityLable.empty();
            if(dataObj.data.labelList.indexOf("211") != -1){
                $("<li></li>").text("211").appendTo(universityLable);
            }
            if(dataObj.data.labelList.indexOf("985") != -1){
                $("<li></li>").text("985").appendTo(universityLable);
            }
            if(dataObj.data.labelList.indexOf("研究生院") != -1){
                $("<li></li>").text("研究生院").appendTo(universityLable);
            }
            if(dataObj.data.labelList.indexOf("国防生") != -1){
                $("<li></li>").text("国防生").appendTo(universityLable);
            }
    }
    //end 添加页面信息
    function begin() {
        var ProvinceScreen = $(".Province");
        var planTypeScreen = $(".planType");
        var specialtyLevelScreen = $(".specialtyLevel");
        var specialtyTypeScreen = $(".specialtyType");
        var yearScreen = $(".year");
        ProvinceScreen.find("li").eq(0).addClass("ProvinceActive");
        specialtyLevelScreen.find("li").eq(0).addClass("specialtyLevelActive");
        planTypeScreen.find("li").eq(0).addClass("planTypeActive");
        specialtyTypeScreen.find("li").eq(0).addClass("specialtyTypeActive");
        yearScreen.find("li").eq(0).addClass("yearActive");
    }
    begin();

    function temperature() {
        var json = {};
        var title = {
            text: '四季平均气温',
            style:{
                fontSize:"2.8rem",
                fontFamily:"微软雅黑"
            }
        };
        var xAxis = {
            categories: ['春', '夏', '秋', '冬'],
            labels:{
                style:{
                    fontSize:'2.4rem',
                    fontFamily:'微软雅黑'
                }
            },
            gridLineColor:"transparent",
            gridLineWidth:"0",
            lineColor:"#fff",
            style:{
                fontSize:'2.4rem',
                fontFamily:'微软雅黑'
            },
            tickColor: 'transparent'
        };
        var yAxis = {
            title: {
                text: '温度（℃）',
                style:{
                    fontSize:"2rem",
                    fontFamily:"微软雅黑"
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            max: 50,
            min:-50,
            tickAmount: 5,
            gridLineColor:"transparent",
            lineColor:"transparent",
            labels:{
                style:{
                    fontSize:'2rem',
                    fontFamily:'微软雅黑'
                }
            }
        };
        var chart = {
            plotBackgroundImage:"images/bg.png",
            height:"400",
            width: $(".temperature").width(),
            defaultSeriesType:"line",
            renderTo : "container",
            style:{
                marginLeft:"-1rem"
            }
        };
        var legend = {
            enabled:false
        };
        var plotOptions = {
            dataLabels: {
                enabled: true,
                allowPointSelect:true
            },
            enableMouseTracking: false
        };
        var tooltip = {
            enabled:true,
            backgroundColor:"rgb(116,207,231)",
            borderColor:"rgb(116,207,231)",
            borderRadius:8,
            shadow:false,
            style:{
                color:"rgb(255,255,255)",
                fontSize:"2rem",
                fontFamily:"微软雅黑"
            },
            shared: true,
            headerFormat: '<small>{point.y} ℃</small><table>',
            pointFormat: "",
            footerFormat: '</table>',
            valueDecimals: 0
        };
        var series =  [
            {
                name: '温度',
                data: weatherDate,
                style:{
                    fontSize:'2rem',
                    fontFamily:'微软雅黑'
                },
                show:true
            }
        ];
        json.title = title;
        json.chart = chart;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.plotOptions = plotOptions;
        json.series = series;
        json.tooltip = tooltip;
        json.credits = {
            enabled: false
        };
        Highcharts.setOptions({
            colors: ['#ffc804']
        });
        $('#container').highcharts(json);
    }
    var flag = 0;
    var bodyScrollTop;
    var oldScrollTop;
    function addFlag() {
        var majorScreen = $(".majorScreen");
        var screenBox = $(".screenBox");
        var admissionScreen = $(".admissionScreen");
        bodyScrollTop = $("body").scrollTop();
        setTimeout(function () {
            if(majorScreen.is(":hidden") && screenBox.is(":hidden") && admissionScreen.is(":hidden")){
                flag = 0;
                $("body").removeClass("modal-open").scrollTop(oldScrollTop);
            }else{
                flag = 1;
                $("body").addClass("modal-open").css("top",-1 * bodyScrollTop);
                oldScrollTop = bodyScrollTop;
            }
        },300);
    }
    addFlag();
    var majorScreen = $(".majorScreen");
    document.body.addEventListener('touchmove', function (event) {
        var majorScreen = $(".majorScreen");
        var screenBox = $(".screenBox");
        var admissionScreen = $(".admissionScreen");
        var itemParentClass = event.target.parentNode.parentNode.parentNode.className;
        var itemClass = event.target.className;
        if(itemParentClass == "majorScreen" || itemParentClass == "screenBox" || itemParentClass == "admissionScreen"){

        }else if(itemClass == "majorScreen" || itemClass == "screenBox" || itemClass == "admissionScreen"){
            majorScreen.fadeOut(200);
            screenBox.fadeOut(200);
            admissionScreen.fadeOut(200);
        }
    });
});
