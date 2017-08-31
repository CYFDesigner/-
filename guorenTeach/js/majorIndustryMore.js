/**
 * Created by zy on 2017/4/18.
 */
$(function () {
    var dataObj;
    var id = window.localStorage.getItem("parentId");
    var title = window.localStorage.getItem("parentName");
    $("title").text(title);
    dataRequest();
    //请求页面数据
    function dataRequest() {
        var dataPost = {
            id:id
        };
        $.ajax({
            url:url + "wx/profession/" + id,
            type:'GET',
            dataType:'json',
            data:dataPost,
            success:function (data) {
                dataObj = data;
                if(dataObj.status == true){
                    appendData();
                    clickBind();
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
    //end 请求页面数据

    function appendData() {
        console.log(dataObj.data.details.replace(/\r\n/g,"<br />"));
        var mainSpan = $(".mainSpan");
        var majorText = "";
        mainSpan.text(dataObj.data.belong);
        var mainBox = $(".mainBox");
        var majorIntroduce = $("<div></div>").addClass("majorIntroduce").appendTo(mainBox);
            $("<div></div>").addClass("mainTitle").text(dataObj.data.name).appendTo(majorIntroduce);
            var majorIntroduceContent = $("<div></div>").addClass("mainContent").appendTo(majorIntroduce);
                $("<p></p>").html(dataObj.data.introduction.replace(/\r\n/g,"<br />")).addClass("majorDetailsP").appendTo(majorIntroduceContent);
        var majorWorkMain = $("<div></div>").addClass("majorWorkMain").appendTo(mainBox);
            $("<div></div>").addClass("mainTitle").text("工作内容").appendTo(majorWorkMain);
            var majorWorkMainContent = $("<div></div>").addClass("mainContent").appendTo(majorWorkMain);
                $("<p></p>").html(dataObj.data.content.replace(/\r\n/g,"<br />")).addClass("majorDetailsP").appendTo(majorWorkMainContent);
        var majorDetails = $("<div></div>").addClass("majorDetails").appendTo(mainBox);
            $("<div></div>").addClass("mainTitle").text("职业详情").appendTo(majorDetails);
            var majorDetailsContent = $("<div></div>").addClass("mainContent").appendTo(majorDetails);
                $("<p></p>").html(dataObj.data.details.replace(/\r\n/g,"<br />")).addClass("majorDetailsP").appendTo(majorDetailsContent);
        var majorDetailsDom =  $(".majorDetails");
        var majorDetailsContentDom = majorDetailsDom.find(".mainContent");
        var majorDetailsPDom = majorDetailsDom.find(".majorDetailsP");
        if(majorDetailsPDom.height() - majorDetailsContentDom.height() > 18){
            var majorDetailsMoreBtn = $("<div></div>").addClass("majorDetailsMoreBtn").appendTo(mainBox);
            $("<span></span>").addClass("majorDetailsMoreText").text("展开").appendTo(majorDetailsMoreBtn);
            $("<span></span>").addClass("majorDetailsMoreIcon iconfont icon-xiangxia-").appendTo(majorDetailsMoreBtn);
            majorDetailsContentDom.addClass("majorDetailsAfter");
        }else{
            majorDetailsContentDom.removeClass("majorDetailsAfter");
        }
        var relevantMajorUl = $(".relevantMajorUl");
        for(var i = 0;i < dataObj.data.specialties.length;i++){
            var relevantMajorLi = $("<li></li>").appendTo(relevantMajorUl);
            $("<a></a>").attr("href",url + "guorenTeach/majorShow.html" + "?majorId=" + dataObj.data.specialties[i].id).text(dataObj.data.specialties[i].name).appendTo(relevantMajorLi);
            majorText = majorText + "/" + dataObj.data.specialties[i].name;
        }
        majorText = majorText.slice(1);
        $(".contentSpan").text(majorText);
    }

    function clickBind() {
        var majorDetailsDom =  $(".majorDetails");
        var majorDetailsContentDom = majorDetailsDom.find(".mainContent");
        var relevantMajorList = $(".relevantMajorList");
        var enterSpan = $(".enterSpan");
        $(".majorDetailsMoreBtn").bind("click",function () {
            if($(this).find(".majorDetailsMoreText").text() == "展开"){
                majorDetailsContentDom.css({
                    height:"auto"
                });
                $(this).find(".majorDetailsMoreText").text("收起");
                $(this).find(".majorDetailsMoreIcon").removeClass("icon-xiangxia-").addClass("icon-xiangshang-");
                majorDetailsContentDom.removeClass("majorDetailsAfter");
            }else if($(this).find(".majorDetailsMoreText").text() == "收起"){
                majorDetailsContentDom.css({
                    height:"18rem"
                });
                $(this).find(".majorDetailsMoreText").text("展开");
                $(this).find(".majorDetailsMoreIcon").removeClass("icon-xiangshang-").addClass("icon-xiangxia-");
                majorDetailsContentDom.addClass("majorDetailsAfter");
            }
        });

        $(".RelevantMajor").bind("click",function () {
            if(relevantMajorList.is(":hidden")){
                relevantMajorList.fadeIn(200);
                $("body").css({
                    height:"100%",
                    overflow:"hidden",
                    position:"fixed"
                });
                enterSpan.css({
                    transform:"rotate(0deg)"
                })
            }else{
                relevantMajorList.fadeOut(200);
                $("body").css({
                    height:"100%",
                    overflow:"visible",
                    position:"static"
                });
                enterSpan.css({
                    transform:"rotate(-90deg)"
                })
            }
        });

        relevantMajorList.find("li").bind("click",function () {
            var thisMajorId = $(this).attr("majorid");
            window.localStorage.setItem("majorId",thisMajorId);
            window.open("http://guoren.ueasier.com/guorenTeach/majorShow.html","_self")
        })
    }
});

