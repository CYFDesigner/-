/**
 * Created by zy on 2017/3/10.
 */
$(function () {
    var index = location.search.indexOf("=");
    var lastIndex = location.search.indexOf("&");
    var majorId;
    if(lastIndex != -1){
        majorId = location.search.substr(index+1,lastIndex-index-1);
    }else{
        majorId = location.search.substr(index+1)
    }
    var dataObj;
    var rankObj;

    //请求数据
    function dataGet() {
        var Id = {
            "id":majorId
        };
        $.ajax({
            url:url + 'wx/specialty/' + majorId,
            type:'GET',
            async:false,
            dataType:'json',
            data:Id,
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    $("title").html(dataObj.data.name);
                    appendData();
                    var collectBtn = $(".collectBtn");
                    if(dataObj.data.follow == true){
                        collectBtn.html("<svg class='collectIcon collectIconActive icon' aria-hidden='true'><use xlink:href='#icon-shoucang-1'></use></svg><span class='collectText'>已收藏</span>");
                        collectBtn.attr("class","collectBtn collectBtnActive");
                    }else{
                        collectBtn.attr("class","collectBtn");
                        collectBtn.html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-2'></use></svg><span class='collectText'>&nbsp;收&nbsp;藏&nbsp;</span>")
                    }
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip  = "数据请求失败";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 请求数据
    dataGet();

    //请求排名数据
    function majorRank() {
        var Id = {
            "specialtyId":majorId
        };
        $.ajax({
            url:url + 'wx/specialty/rank',
            type:'GET',
            async:false,
            dataType:'json',
            data:Id,
            success:function (data) {
                if(data.status == true){
                    rankObj = data;
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip  = "数据请求失败,请刷新再试";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 请求排名数据

    //添加内容
    function appendData(){
        $(".majorName").text(dataObj.data.name);
        if(dataObj.data.degree == null){
            $(".majorAd").text("授予学位：" + "无");
        }else{
            $(".majorAd").text("授予学位：" + dataObj.data.degree);
        }
        $(".majorTime").text("修学年限：" + dataObj.data.length);
        var majorContent = $(".pageContent");
        var navActive = $(".majorNavActive").text();
        majorContent.empty();
        if(navActive == "专业详情"){
            var majorBox = $("<div></div>").addClass("introduceBox").appendTo(majorContent);
            var introduceTitle1 = $("<div></div>").addClass("introduceTitle").appendTo(majorBox);
                $("<span></span>").text("专业详情").appendTo(introduceTitle1);
                $("<p></p>").addClass("introduceContet").html(dataObj.data.introduction).appendTo(majorBox);
            var introduceTitle2 = $("<div></div>").addClass("introduceTitle").appendTo(majorBox);
                $("<span></span>").text("所学课程").appendTo(introduceTitle2);
            $("<p></p>").addClass("introduceContet").html(dataObj.data.course).appendTo(majorBox);
            var introduceTitle3 = $("<div></div>").addClass("introduceTitle").appendTo(majorBox);
                $("<span></span>").text("就业情况").appendTo(introduceTitle3);
            $("<p></p>").addClass("introduceContet").html(dataObj.data.employment).appendTo(majorBox);
        }else if(navActive == "开办院校"){
            var universityBox = $("<ul></ul>").appendTo(majorContent);
                for(var i = 0;i < dataObj.data.universityList.length;i++){
                    var universityItemBox = $("<li></li>").addClass("universityItem").appendTo(universityBox);
                        var universityLink = $("<a></a>").attr("href",url + "guorenTeach/universityShow.html" + "?universityId=" + dataObj.data.universityList[i].id,"_self").appendTo(universityItemBox);
                            var universityLogoBox = $("<div></div>").addClass("universityLogo").appendTo(universityLink);
                                $("<img>").attr("src", dataObj.data.universityList[i].logoUrl).appendTo(universityLogoBox);
                            $("<div></div>").addClass("universityName").text(dataObj.data.universityList[i].name).appendTo(universityLink);
                }
        }else if(navActive == "专业排名"){
            majorRank();
            $("<div></div>").html("<span class='majorHelpText'>此排名来源于中国科学评价研究中心（不同机构的排名，结果会有差异）</span>").addClass("majorHelp").appendTo(majorContent);
            var rankTableBox = $("<table></table>").attr("class","rankTable").appendTo(majorContent);
                var rankTheadBox = $("<thead></thead>").appendTo(rankTableBox);
                    var rankTheadTr = $("<tr></tr>").appendTo(rankTheadBox);
                    $("<th></th>").text("排名").appendTo(rankTheadTr);
                    $("<th></th>").text("学校名称").appendTo(rankTheadTr);
                    $("<th></th>").text("地区").appendTo(rankTheadTr);
                    $("<th></th>").text("星级").appendTo(rankTheadTr);
                var rankTbodyBox = $("<tbody></tbody>").appendTo(rankTableBox);
            for(var b = 0;b < rankObj.data.length;b++){
                    var rankTr = $("<tr></tr>").appendTo(rankTbodyBox);
                        $("<td></td>").text(rankObj.data[b].rank).appendTo(rankTr);
                        $("<td></td>").text(rankObj.data[b].universityName).appendTo(rankTr);
                        $("<td></td>").text(rankObj.data[b].cityName).appendTo(rankTr);
                        $("<td></td>").text(rankObj.data[b].star).appendTo(rankTr);
            }
        }else if(navActive == "相关专业"){
            var majorList = $("<ul></ul>").addClass("collectMajorBox").appendTo(majorContent);
            for(var a = 0;a < dataObj.data.specialtyList.length;a++){
                if(dataObj.data.specialtyList[a].id != majorId){
                    var majorItem = $("<li></li>").appendTo(majorList);
                    var majorLink = $("<a></a>").attr({
                        "href":url + "guorenTeach/majorShow.html" + "?majorId=" + dataObj.data.specialtyList[a].id,
                        "majorId":dataObj.data.specialtyList[a].id
                    }).appendTo(majorItem).bind("click",function () {
                        window.localStorage.setItem("majorId",$(this).attr("majorId"))
                    });
                    majorLink.html("" +
                        "<span class='majorNumber'>"+dataObj.data.specialtyList[a].code+"</span>" +
                        "<span class='majorNameList'>"+dataObj.data.specialtyList[a].name+"</span>" +
                        "<span class='majorEducation'>"+dataObj.data.specialtyList[a].levelName+"</span>"+
                        "<svg class='majorIcon icon' aria-hidden='true'>"+
                        "<use xlink:href='#icon-xueli-'></use>" +
                        "</svg>");
                }
            }
        }
    }
    //end 添加内容

    //点击专业收藏
    var collectBtn = $(".collectBtn");
    collectBtn.bind("click",function (e) {
        if(window.localStorage.getItem("status") == "true"){
            if($(this).attr("class") == "collectBtn collectBtnActive"){
                collectBtn.attr("class","collectBtn");
                collectBtn.html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-2'></use></svg><span class='collectText'>&nbsp;收&nbsp;藏&nbsp;</span>")
            }else{
                collectBtn.html("<svg class='collectIcon collectIconActive icon' aria-hidden='true'><use xlink:href='#icon-shoucang-1'></use></svg><span class='collectText'>已收藏</span>");
                collectBtn.attr("class","collectBtn collectBtnActive");
            }
            var collectPost = {
                specialtyId:dataObj.data.id
            };
            judgeCollect(collectPost);
        }else{
            var openUrl = url + "guorenTeach/majorShow.html" + "?majorId=" + majorId;
            login(openUrl);
        }
        e.stopImmediatePropagation();
        e.preventDefault();
    });
    //end 点击专业收藏

    //收藏请求
    function judgeCollect(collectId) {
        $.ajax({
            url:url + "wx/specialty/collect",
            type:'POST',
            dataType:'json',
            data:collectId,
            success:function (data) {
                if(data.status == false){
                    var openUrl = url + "guorenTeach/majorShow.html" + "?majorId=" + majorId;
                    judgeCollect(collectId);
                    loginFalse(openUrl);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true

        });
    }
    //end 收藏请求

    //导航点击
    function navClick() {
        var lableNavBox = $(".majorNav");
        lableNavBox.find("li").bind("click",function () {
            lableNavBox.find("li").removeClass("majorNavActive");
            $(this).addClass("majorNavActive");
            appendData()
        })
    }
    navClick();
    //end 导航点击
});