/**
 * Created by zy on 2017/3/3.
 */
$(function () {
    var dataObj;
    var postNumber = 0;
    var university = $(".universityListBox");
    var searchName = "";
    var levelIds = {};
    var tagIds = {};
    var typeIds= {};
    var regionIds = {};
    var dataCollect;
    var collectArray;
    //获取数据
    function dataRequest() {
        postNumber = postNumber + 1;
        var dataPage = {
            "keyword":searchName,
            "pageNum":postNumber,
            "pagesize":10,
            "levelIds":levelIds,
            "tagIds":tagIds,
            "typeIds":typeIds,
            "regionIds":regionIds
        };
        $.ajax({
            url:url +'wx/university/list',
            type:'POST',
            dataType:'json',
            data:dataPage,
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    appendList();
                    judgeCollect();
                    heightData();
                }else{
                    tip = data.message;
                    pageTip(tip);
                }
            },
            error:function () {
                tip = "数据请求失败,请刷新再试";
                pageTip(tip);
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
        if(postNumber == 1){
            var speed=200;//滑动的速度
            $('body,html').animate({ scrollTop: -10000 }, speed);
            return false;
        }
    }
    //end 获取数据

    //检测第一次请求数据的内容有没有一屏高没有的话在请求一次
    function heightData() {
        var universityLenght = university.height();
        var loadHeight = universityLenght - $(window).height();
        var loadBox = $(".loadBox");
        if(loadHeight>0){
            lission();
        }else{
            if(dataObj.pager.pageNum < dataObj.pager.count){
                if(levelIds == tagIds == typeIds == regionIds == {} && searchName.length == 0){
                    dataRequest();
                }else{
                    loadBox.html("已无更多信息").css({
                        "fontSize":"2.4rem",
                        "textAlign":"center",
                        "lineHeight":"8.3rem"
                    });
                }
            }else{
                loadBox.html("已无更多信息").css({
                    "fontSize":"2.4rem",
                    "textAlign":"center",
                    "lineHeight":"8.3rem"
                });
            }
        }
    }
    //end 检测第一次请求数据的内容有没有一屏高没有的话在请求一次

    //瀑布流添加内容
    function appendList() {
        for(var i=0;i<10;i++){
            if (dataObj.data[i] != undefined) {
                var universityList = university.find(".universityList");
                var universityItem = $("<li></li>").appendTo(universityList);
                    var universityLink = $("<a></a>").attr({
                        "href": url + "guorenTeach/universityShow.html" + "?universityId=" + dataObj.data[i].id,
                        "data-id":dataObj.data[i].id
                    }).appendTo(universityItem);
                var universityRightBox = $("<div></div>").addClass("universityRight").appendTo(universityLink);
                var universityInfoBox = $("<div></div>").addClass("universityInfo").appendTo(universityRightBox);
                $("<div></div>").addClass("universityName").text(dataObj.data[i].name).appendTo(universityInfoBox);
                var universityOtherBox = $("<ul></ul>").addClass("universityOther").appendTo(universityInfoBox);
                //noinspection JSUnresolvedVariable
                if (dataObj.data[i].tag985 == true) {
                    var universityOtherItem4 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon--1'></use></svg>");
                    $("<span></span>").addClass("locationText").appendTo(universityOtherItem4).text('985');
                }
                //noinspection JSUnresolvedVariable
                if (dataObj.data[i].tag211 == true) {
                    var universityOtherItem3 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon--'></use></svg>");
                    $("<span></span>").addClass("locationText").appendTo(universityOtherItem3).text('211');
                }
                var universityOtherItem1 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon-weizhi-'></use></svg>");
                //noinspection JSUnresolvedVariable
                $("<span></span>").addClass("locationText").text(dataObj.data[i].region).appendTo(universityOtherItem1);
                var universityOtherItem2 = $("<li></li>").appendTo(universityOtherBox).html("<svg class='locationIcon icon' aria-hidden='true'><use xlink:href='#icon-xueli-'></use></svg>");
                //noinspection JSUnresolvedVariable
                $("<span></span>").addClass("locationText").appendTo(universityOtherItem2).text(dataObj.data[i].level);

                var collectionLableBox;
                //noinspection JSUnresolvedVariable
                if (dataObj.data[i].follow == null || dataObj.data[i].follow == false) {
                    collectionLableBox = $("<label></label>").addClass("collectionLable").appendTo(universityRightBox);
                    //noinspection JSUnresolvedVariable
                    $("<input>").addClass("collectionInput").attr({
                        "type": "checkbox",
                        "checked": false,
                        "follow-data": dataObj.data[i].follow
                    }).appendTo(collectionLableBox);
                } else {
                    collectionLableBox = $("<label></label>").addClass("collectionLable collectionActive").appendTo(universityRightBox);
                    //noinspection JSUnresolvedVariable
                    $("<input>").addClass("collectionInput").attr({
                        "type": "checkbox",
                        "checked": true,
                        "follow-data": dataObj.data[i].follow
                    }).appendTo(collectionLableBox);
                }
                $("<span></span>").addClass("collectionIcon icon-xingxing- iconfont").appendTo(collectionLableBox);
                $("<span></span>").addClass("collectionText").appendTo(collectionLableBox).text("收藏");
                var universityLeftBox = $("<div></div>").addClass("universityLeft").appendTo(universityLink);
                //noinspection JSUnresolvedVariable
                $("<img>").attr("src", dataObj.data[i].logo).appendTo(universityLeftBox);
            }
        }
    }
    //end 瀑布流添加内容

    //点击大学收藏
    var collectPost;
    function judgeCollect() {
        var collectionLable = $(".collectionLable");
        collectArray = [];
        for (var a = 0;a < dataObj.data.length;a++){
            collectArray.push(dataObj.data[a].id);
        }
        for(var b = 0; b < collectionLable.length;b++){
            if(collectArray.indexOf(collectionLable.eq(b).parent().parent("a").attr("data-id")-0) != -1){
                collectionLable.eq(b).bind("click",function (e) {
                    if(window.localStorage.getItem("status") == "true"){
                        var collectInput = $(this).find("input");
                        if($(this).find("input").attr("follow-data") == "true"){
                            collectInput.attr({
                                "follow-data":"false",
                                "checked":false
                            });
                            $(this).removeClass("collectionActive");
                        }else{
                            collectInput.attr({
                                "follow-data":"true",
                                "checked":true
                            });
                            $(this).addClass("collectionActive");
                        }
                        collectPost = {
                            universityId:$(this).parent().parent().attr("data-id")
                        };
                        collectRequest(collectPost);
                    }else{
                        tip = "请先登录后再收藏";
                        pageTip(tip);
                        var openUrl = url +　"guorenTeach/university.html";
                        login(openUrl);
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                });
            }
        }
    }
    //end 点击大学收藏

    //大学收藏请求
    function collectRequest(collectId) {
        $.ajax({
            url:url + "wx/university/collect",
            type:'POST',
            dataType:'json',
            data:collectId,
            success:function (data) {
                if(data.status == true){
                    dataCollect = data;
                }else{
                    var openUrl = url + "guorenTeach/university.html";
                    loginFalse(openUrl);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
    }
    //end 大学收藏请求

    //监听页面滚动事件
    function lission() {
        window.onscroll = function() {
            var offset = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var delta = offset - document.body.scrollTop ;
            if (delta == 0) {
                loadPage();
            }
        }

    }
    //end 监听页面滚动事件

    //页面滚动到底部请求数据
    function loadPage() {
        var loadBox = $(".loadBox");
        //noinspection JSUnresolvedVariable
        if(dataObj.pager.pageNum < dataObj.pager.pageCount){
            dataRequest();
        }else{
            loadBox.html("已无更多信息").css({
                "fontSize":"2.4rem",
                "textAlign":"center",
                "lineHeight":"8.3rem"
            });
        }
    }
    //end 页面滚动到底部请求数据

    //搜索事件
    $(".searchBtn").bind("click",function () {
        $(".universityList").empty();
        postNumber = 0;
        searchName = $(".searchInput").val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        dataRequest();
    });
    //end 搜索事件

    //筛选页面显示与隐藏
    function screenPageShow(){
        var screenBtn = $(".screenBox");
        var screenPage = $(".screenPage");
        var screenBtnBox = $(".screenBtnBox");
        var universityList = $(".universityList");
        var content = $(".content");
        var body =$("body");
        var screenBox = $(".screenPageBox");
        var screenContent = $(".screenContent");
        var screenReset = $(".screenReset");
        var screenSure = $(".screenSure");
        //阻止事件冒泡
        screenPage.bind("touchmove",function (e) {
            e.stopImmediatePropagation();
        });
        screenPage.bind("touchmove",function (e) {
           e.stopImmediatePropagation();
        });
        screenBox.bind("click",function (e) {
            e.stopImmediatePropagation();
        });
        screenBox.bind("touchmove",function (e) {
            e.stopImmediatePropagation();
        });
        screenBox.bind("doubleClick",function (e) {
            e.stopImmediatePropagation();
        });
        screenContent.find("ul").bind("click",function (e) {
            e.stopImmediatePropagation();
        });
        screenContent.find("ul").bind("doubleClick",function (e) {
            e.stopImmediatePropagation();
        });
        //end 阻止事件冒泡

        var screenTitleBox = $(".screenTitleBox");
        var screenBox1 = $(".screenBox1");
        var screenBox2 = $(".screenBox2");
        var screenBox3 = $(".screenBox3");
        var screenBox4 = $(".screenBox4");
        screenTitleBox.bind("click",function () {
           if($(this).attr("class") == "screenTitleBox EducationScreen"){
               if(screenBox1.is(":hidden") == false){
                   screenBox1.slideUp(200);
                   $(this).html("<span class='screenTitle'>学历层次</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
               }else{
                   screenBox1.slideDown(200);
                   $(this).html("<span class='screenTitle'>学历层次</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
               }
           }else if($(this).attr("class") == "screenTitleBox heightSchoolScreen"){
               if(screenBox2.is(":hidden") == false){
                   screenBox2.slideUp(200);
                   $(this).html("<span class='screenTitle'>高校标签</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
               }else{
                   screenBox2.slideDown(200);
                   $(this).html("<span class='screenTitle'>高校标签</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
               }
           }else if($(this).attr("class") == "screenTitleBox heightSchoolTypeScreen"){
               if(screenBox3.is(":hidden") == false){
                   screenBox3.slideUp(200);
                   $(this).html("<span class='screenTitle'>高校类型</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
               }else{
                   screenBox3.slideDown(200);
                   $(this).html("<span class='screenTitle'>高校类型</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
               }
           }else if($(this).attr("class") == "screenTitleBox stationScreen"){
               if(screenBox4.is(":hidden") == false){
                   screenBox4.slideUp(200);
                   $(this).html("<span class='screenTitle'>地区</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangxia-'></use></svg>");
               }else{
                   screenBox4.slideDown(200);
                   $(this).html("<span class='screenTitle'>地区</span><svg class='screenTitleIcon icon' aria-hidden='true'><use xlink:href='#icon-xiangshang-'></use></svg>");
               }
           }
        });

        //弹出筛选页面的
        screenBtn.bind("click",function (e) {
            screenPage.show();
            e.preventDefault();
            addFlag();
        });
        //end 弹出筛选页面的

        //隐藏筛选页面
        screenPage.bind("click",function (e) {
            screenPage.fadeOut(200);
            screenBox.find(".screenPageBox").scrollTop(0);
            e.preventDefault();
            addFlag();
        });
        //end 隐藏筛选页面
        function screenPageHide() {
            screenPage.css({
                display:'none',
                left:0
            });
        }

        //筛选页标签点击事件
        screenContent.find("input[type=checkbox]").bind("click",function (e) {
            $(this).parent().parent().toggleClass("screenInputCheck");
            if($(this).is(':checked') == false){
                $(this).attr("checked",false);
            }else{
                $(this).attr("checked",true);
            }
            e.stopImmediatePropagation();
        });
        //end 筛选页标签点击事件

        //筛选重置按钮点击事件
        screenReset.bind("click",function (e) {
            screenContent.find("input[type=checkbox]").each(function (index,el) {
                el.checked = false;
                $(this).parent().parent().removeClass("screenInputCheck");
            });
            e.preventDefault();
        });
        //end 筛选重置按钮点击事件

        //筛选确定按钮点击事件
        screenSure.bind("click",function (e) {
            $(".universityList").empty();
            postNumber = 0;
            levelIds = {};
            tagIds = {};
            typeIds = {};
            regionIds = {};
            if (screenContent.find(".screenBox1").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox1").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        levelIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox2").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox2").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        tagIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox3").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox3").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        typeIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            if (screenContent.find(".screenBox4").find("input[type=checkbox]").is(":checked") == true) {
                screenContent.find(".screenBox4").find("input[type=checkbox]").each(function (eq) {
                    if ($(this).is(':checked') == true) {
                        regionIds[eq] = $(this).attr("name") - 0;
                    }
                })
            }
            dataRequest();
            screenPageHide();
            e.preventDefault();
        });
        //end 筛选确定按钮点击事件
    }
    //end 筛选页面显示与隐藏
    dataRequest();
    screenPageShow();

    var flag = 0;
    var bodyScrollTop;
    var oldScrollTop;
    function addFlag() {
        var screenBox = $(".screenPage");
        bodyScrollTop = $("body").scrollTop();
        setTimeout(function () {
            if(screenBox.is(":hidden")){
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
});
