/**
 * Created by zy on 2017/5/17.
 */
$(function () {
    var searchObj;
    var collectPost;
    var searchInput = $("#searchInput");
    var searchText = window.localStorage.getItem("majorSearch");
    searchInput.val(searchText);
    var searchPost;
    searchPost = searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    dataRequest(searchPost);
    //专业搜索
    function dataRequest(searchPost){
        var dataPost = {
            keyword:searchPost
        };
        $.ajax({
            url:url + "wx/specialty/search",
            type:'GET',
            dataType:'json',
            data:dataPost,
            success:function (data) {
                if(data.status == false){
                    tip = data.message;
                    pageTip(tip);
                }else{
                    if(data.data.length == 0){
                        tip = "未找到您所查询的专业";
                        pageTip(tip);
                    }else{
                        searchObj = data;
                        appendSearchList();
                    }
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true

        });
    }
    //end 专业搜索

    //添加搜索列表
    function appendSearchList() {
        var majorSearchUl = $(".majorSearchUl");
        majorSearchUl.empty();
        for (var i = 0;i < searchObj.data.length;i++){
            var majorSearchLi = $("<li></li>").appendTo(majorSearchUl);
                var majorSearchA = $("<a></a>").attr({
                    "href":url + "guorenTeach/majorShow.html" + "?majorId=" + searchObj.data[i].id,
                    "data-id":searchObj.data[i].id
                }).appendTo(majorSearchLi);
                if(searchObj.data[i].follow == true){
                    majorSearchA.html("" +
                        "<span class='UndergraduateText'>"+searchObj.data[i].name+"</span>" +
                        "<div class='collectIconBox collectIconBoxActive'>" +
                            "<svg class='collectIcon icon' aria-hidden='true'>" +
                                "<use class='iconUse' xlink:href='#icon-shoucang-1'></use>" +
                            "</svg>" +
                        "</div>");
                }else{
                    majorSearchA.html("" +
                        "<span class='UndergraduateText'>"+searchObj.data[i].name+"</span>" +
                        "<div class='collectIconBox'>" +
                            "<svg class='collectIcon icon' aria-hidden='true'>" +
                                "<use class='iconUse' xlink:href='#icon-shoucang-2'></use>" +
                            "</svg>" +
                        "</div>");
                }
        }

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
    }
    //end 添加搜索列表

    //专业收藏请求
    function judgeCollect(collectid){
        $.ajax({
            url:url + "wx/specialty/collect",
            type:'POST',
            dataType:'json',
            data:collectid,
            success:function (data) {
                if(data.status == false){
                    if(data.message == "请登录后再收藏"){
                        var openUrl = url +　"guorenTeach/majorSearch.html";
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

        });
    }
    //end 专业收藏请求

    //搜索
    var searchBtn = $(".searchBtn");
    searchBtn.bind("click",function (e) {
       if(searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, '').length == 0){
           tip = "请输入专业名后再搜索";
           pageTip(tip);
       }else{
           window.localStorage.setItem("majorSearch",searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
           searchPost = searchInput.val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
           dataRequest(searchPost);
       }
       e.preventDefault();
       e.stopImmediatePropagation();
    });
    //end 搜索
});