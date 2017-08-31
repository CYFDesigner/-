/**
 * Created by zy on 2017/3/9.
 */

$(function () {
    var dataBox;
    var collectPost;

    //获取列表数据
    function dataRequest() {
        $.ajax({
            url:url + 'wx/specialty/list',
            type:'GET',
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataBox = data;
                    append();
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
    }
    dataRequest();
    //end 获取列表数据

    //列表添加
    function append() {
        var levelBoxList = $(".levelBox");
        levelBoxList.empty();
        var navActive = $(".navActive");
        var i = 0;
        if(navActive.text() == "本科"){
            i = 0;
        }else if(navActive.text() == "专科"){
            i = 1;
        }
        for(var a = 0;a < dataBox.data[i].subSpecialty.length;a++){
            // var UndergraduateMajorBox = $("<ul></ul>").addClass("UndergraduateMajor").appendTo(levelBoxList);
            var UndergraduateMajorLi = $("<li></li>").appendTo(levelBoxList);
                var UndergraduateInfoBox2 = $("<span></span>").addClass("UndergraduateInfo").appendTo(UndergraduateMajorLi);
                    $("<span></span>").addClass("UndergraduateIcon twoIcon icon-xiangxia- iconfont").appendTo(UndergraduateInfoBox2);
                    $("<span></span>").addClass("UndergraduateText").text(dataBox.data[i].subSpecialty[a].name).appendTo(UndergraduateInfoBox2);
                    $("<span></span>").addClass("UndergraduateNumber").text(dataBox.data[i].subSpecialty[a].subSpecialty.length).appendTo(UndergraduateInfoBox2);
                for(var b = 0;b < dataBox.data[i].subSpecialty[a].subSpecialty.length;b++){
                    var UndergraduateMajorItemBox = $("<ul></ul>").addClass("UndergraduateMajorItem").appendTo(UndergraduateMajorLi);
                    var UndergraduateMajorItemLi = $("<li></li>").appendTo(UndergraduateMajorItemBox);
                    var UndergraduateInfoBox3 = $("<span></span>").addClass("UndergraduateInfo").appendTo(UndergraduateMajorItemLi);
                        $("<span></span>").addClass("UndergraduateIcon threeIcon icon-xiangxia- iconfont").appendTo(UndergraduateInfoBox3);
                        $("<span></span>").addClass("UndergraduateText").text(dataBox.data[i].subSpecialty[a].subSpecialty[b].name).appendTo(UndergraduateInfoBox3);
                        $("<span></span>").addClass("UndergraduateNumber").text(dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty.length).appendTo(UndergraduateInfoBox3);
                    var UndergraduateClassBox = $("<ul></ul>").addClass("UndergraduateClass").appendTo(UndergraduateMajorItemLi);
                    for(var c = 0;c < dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty.length;c++){
                        var UndergraduateClassLi = $("<li></li>").appendTo(UndergraduateClassBox);
                        var UndergraduateClassA = $("<a></a>").attr({
                            "href":url + "guorenTeach/majorShow.html" + "?majorId=" + dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty[c].id,
                            "data-id":dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty[c].id
                        }).appendTo(UndergraduateClassLi);
                        if(dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty[c].follow == true){
                            UndergraduateClassA.html("" +
                                "<span class='UndergraduateText'>"+dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty[c].name+"</span>" +
                                "<div class='collectIconBox collectIconBoxActive'>" +
                                "<svg class='collectIcon icon' aria-hidden='true'>" +
                                "<use xlink:href='#icon-shoucang-1'></use>" +
                                "</svg>" +
                                "</div>");
                        }else{
                            UndergraduateClassA.html("" +
                                "<span class='UndergraduateText'>"+dataBox.data[i].subSpecialty[a].subSpecialty[b].subSpecialty[c].name+"</span>" +
                                "<div class='collectIconBox'>" +
                                "<svg class='collectIcon icon' aria-hidden='true'>" +
                                "<use xlink:href='#icon-shoucang-2'></use>" +
                                "</svg>" +
                                "</div>");
                        }

                    }
                }
        }
        levelBoxList.find(".oneIcon").addClass("xiangzuo").css({
            transform:"rotate(-90deg)"
        });
        eventBind();
    }
    //end 列表添加
    var classNav = $(".classNav");
    classNav.find("a").bind("click",function () {
        classNav.find("a").removeClass("navActive");
        $(this).addClass("navActive");
        append();
    });

    //点击专业收藏
    $(".collectIconBox").bind("click",function (e) {
        if(window.localStorage.getItem("status") == "true"){
            if($(this).attr("class") == "collectIconBox collectIconBoxActive"){
                $(this).removeClass("collectIconBoxActive");
                $(this).html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-2'></use></svg>");
            }else{
                $(this).addClass("collectIconBoxActive");
                $(this).html("<svg class='collectIcon icon' aria-hidden='true'><use xlink:href='#icon-shoucang-1'></use></svg>");
            }
            collectPost = {
                specialtyId:$(this).parent().attr("data-id")
            };
            judgeCollect(collectPost);
        }else{
            tip = "请先登录后再收藏";
            pageTip(tip);
            var openUrl = url +　"guorenTeach/major.html";
            login(openUrl);
        }
        e.stopImmediatePropagation();
        e.preventDefault();
    });
    //end 点击专业收藏

    //专业收藏请求
    function judgeCollect(collectid){
        $.ajax({
            url:url + "wx/specialty/collect",
            type:'POST',
            dataType:'json',
            data:collectid,
            success:function (data) {
                if(data.status == false){
                    var openUrl = url +　"guorenTeach/major.html";
                    loginFalse(openUrl);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true

        });
    }
    //end 专业收藏请求

    //点击展开列表
    function eventBind() {
        var levelBox = $(".levelBox");
        levelBox.children("li").unbind("click");
        levelBox.children("li").bind("click",function () {
            if($(this).find(".twoIcon").attr("class") == "UndergraduateIcon twoIcon icon-xiangxia- iconfont"){
                $(this).find(".twoIcon").addClass("xiangzuo");
                $(this).find(".twoIcon").css({
                    transform:"rotate(-90deg)"
                })
            }else if($(this).find(".twoIcon").attr("class") == "UndergraduateIcon twoIcon icon-xiangxia- iconfont xiangzuo"){
                $(this).find(".twoIcon").removeClass("xiangzuo");
                $(this).find(".twoIcon").css({
                    transform:"rotate(0deg)"
                })
            }
            $(this).children(".UndergraduateMajorItem").slideToggle(300);
            if($(this).attr("class") != "UndergraduateMajorActive"){
                $(this).addClass("UndergraduateMajorActive");
            }else{
                $(this).removeClass("UndergraduateMajorActive");
            }
            e.stopPropagation();
        });

        // var UndergraduateMajor = $(".UndergraduateMajor");
        // UndergraduateMajor.children("li").unbind("click");
        // UndergraduateMajor.children("li").bind("click",function (e) {
        //     if($(this).find(".threeIcon").attr("class") == "UndergraduateIcon threeIcon icon-xiangxia- iconfont"){
        //         $(this).find(".threeIcon").addClass("xiangzuo");
        //         $(this).find(".threeIcon").css({
        //             transform:"rotate(-90deg)"
        //         })
        //     }else if($(this).find(".threeIcon").attr("class") == "UndergraduateIcon threeIcon icon-xiangxia- iconfont xiangzuo"){
        //         $(this).find(".threeIcon").removeClass("xiangzuo");
        //         $(this).find(".threeIcon").css({
        //             transform:"rotate(0deg)"
        //         })
        //     }
        //     $(this).children(".UndergraduateMajorItem").slideToggle(300);
        //     if($(this).attr("class") != "UndergraduateMajorActive"){
        //         $(this).addClass("UndergraduateMajorActive");
        //     }else{
        //         $(this).removeClass("UndergraduateMajorActive");
        //     }
        //     e.stopPropagation();
        // });

        var UndergraduateMajorItem = $(".UndergraduateMajorItem");
        UndergraduateMajorItem.children("li").unbind("click");
        UndergraduateMajorItem.children("li").bind("click",function (e) {
            if($(this).find(".threeIcon").attr("class") == "UndergraduateIcon threeIcon icon-xiangxia- iconfont"){
                $(this).find(".threeIcon").addClass("xiangzuo");
                $(this).find(".threeIcon").css({
                    transform:"rotate(-90deg)"
                })
            }else if($(this).find(".threeIcon").attr("class") == "UndergraduateIcon threeIcon icon-xiangxia- iconfont xiangzuo"){
                $(this).find(".threeIcon").removeClass("xiangzuo");
                $(this).find(".threeIcon").css({
                    transform:"rotate(0deg)"
                })
            }
            $(this).children(".UndergraduateClass").slideToggle(300);
            if($(this).attr("class") != "UndergraduateMajorItemActive"){
                $(this).addClass("UndergraduateMajorItemActive");
            }else{
                $(this).removeClass("UndergraduateMajorItemActive");
            }
            e.stopPropagation();
        });
    }
    //end 点击展开列表

    //专业搜索
    var searchBtn = $(".searchBtn");
    searchBtn.bind("click",function () {
       var searchInput = $("#searchInput");
       if(searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, '').length == 0){
           tip = "请输入专业名后再搜索";
           pageTip(tip);
       }else{
           window.localStorage.setItem("majorSearch",searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
           window.open(url + "guorenTeach/majorSearch.html","_self");
       }
    });
    //end 专业搜索
});