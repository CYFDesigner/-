/**
 * Created by zy on 2017/3/1.
 */
$(function () {
    var dataObj;
    var dataObj2;
    var dataObj3;
    var bannerOutBox = $(".bannerBox");         //设置banner最外层盒子
    var bannerUl = $(".banner");                //设置装banner的Ul
    var bannerSpanUl = $(".bannerSpan");        //设置装banner指示位置圆点的Ul
    var bannerSpanActive = "bannerSpanActive";  //设置banenr圆点选中状态的Class
    var bannerBoxCls = "bannerBox";             //设置banner最外层盒子的Class
    dataRequest();

    //获取数据
    function dataRequest(){
        //请求banner数据
        $.ajax({
            url:url +'wx/banner/list',
            type:'GET',
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj = data;
                    appendBanner();
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
        //end 请求banner数据

        //请求浸提头条数据
        $.ajax({
            url:url +'wx/information/list',
            type:'GET',
            dataType:'json',
            success:function (data) {
                if(data.status ==true){
                    dataObj2 = data;
                    appendNews();
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
        //end 请求今日头条数据

        //请求推荐导师数据
        var dataPage = {
            "pageNum":1,
            "pagesize":5
        };
        $.ajax({
            url:url + 'wx/mentor/list',
            type:'POST',
            data:dataPage,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataObj3 = data;
                    appendTeacherList();
                }else{
                    tip = data.message;
                    pageTip(tip)
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
        //end 请求推荐导师数据
        $('body,html').animate({ scrollTop: -10000 });
    }
    //end 获取数据

    //添加banner内容
    function appendBanner() {
        var bannerBox = $(".banner");
        var bannerSpanBox = $(".bannerSpan");
        var maxImgNumber = dataObj.data.length-1;
            var bannerItemFirst = $("<li></li>").appendTo(bannerBox);
                var bannerAFirst = $("<a></a>").attr("href",dataObj.data[maxImgNumber].url).appendTo(bannerItemFirst);
                    $("<img>").attr("src",dataObj.data[maxImgNumber].imageUrl).appendTo(bannerAFirst);
        for (var i = 0;i < dataObj.data.length;i++ ){
            var bannerItem = $("<li></li>").appendTo(bannerBox);
                var bannerA = $("<a></a>").attr("href",dataObj.data[i].url).appendTo(bannerItem);
                    $("<img>").attr("src",dataObj.data[i].imageUrl).appendTo(bannerA);
            $("<li></li>").appendTo(bannerSpanBox);
        }
            var bannerItemLast = $("<li></li>").appendTo(bannerBox);
                var bannerALast = $("<a></a>").attr("href",dataObj.data[0].url).appendTo(bannerItemLast);
                    $("<img>").attr("src",dataObj.data[0].imageUrl).appendTo(bannerALast);
        //执行banner轮播
        bannerScroll(bannerOutBox,bannerUl,bannerSpanUl,bannerSpanActive,bannerBoxCls);
        //end 执行banner轮播
    }
    //end 添加banner内容

    //添加今日头条中的咨询内容
    function appendNews() {
        var newsBox = $(".news");
        for(var a = 0;a < dataObj2.data.length;a++){
            var newsItem = $("<li></li>").appendTo(newsBox);
            $("<a></a>").attr("href",dataObj2.data[a].url + "?polocyId=" + dataObj2.data[a].id).text(dataObj2.data[a].title).appendTo(newsItem);
        }
        var newsItemLast = $("<li></li>").appendTo(newsBox);
        $("<a></a>").attr("href",dataObj2.data[0].url + "?polocyId=" + dataObj2.data[0].id).text(dataObj2.data[0].title).appendTo(newsItemLast);
        HotSctoll();
    }
    //end 添加今日头条中的咨询内容

    //高考倒计时
    var data = new Date();
    var dataYear;
    if(data > new Date("06/07/" + data.getFullYear())){
        dataYear = data.getFullYear() + 1;
    }else{
        dataYear = data.getFullYear();
    }
    var gaokaoDate = new Date("06/07/" + dataYear);
    var timeDifference = gaokaoDate.getTime() - data.getTime();
    var dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var gaokaoBox  = $(".bgImg");
    $("<sapn></sapn>").text(dataYear).addClass("nowYear").appendTo(gaokaoBox);
    $("<span></span>").text(dayDifference+1).addClass("dayDifference").appendTo(gaokaoBox);
    //end 高考倒计时

    //添加推荐导师内容
    function appendTeacherList() {
        var teacherListBox = $(".teacherList");
        for(var i = 0;i< 2;i++){
            if(dataObj3.data[i] == undefined){

            }else{
                var teacherListLi = $("<li></li>").appendTo(teacherListBox);
                    var teacherListA = $("<a></a>").attr("href",url + "guorenTeach/teacherAsk.html" + "?teacherId=" + dataObj3.data[i].id).appendTo(teacherListLi);
                        var teacherLeftBox = $("<div></div>").addClass("teacherLeft").appendTo(teacherListA);
                            $("<img>").attr("src",dataObj3.data[i].head).appendTo(teacherLeftBox);
                        var teacherRightBox = $("<div></div>").addClass("teacherRight").appendTo(teacherListA);
                            $("<p></p>").addClass("teacherName").text(dataObj3.data[i].name).appendTo(teacherRightBox);
                            $("<p></p>").addClass("teacherInfo").text(dataObj3.data[i].description).appendTo(teacherRightBox);
                            var teacherLableBox = $("<ul></ul>").addClass("teacherLable").appendTo(teacherRightBox);
                            for(var a = 0;a < dataObj3.data[i].labels.length;a++){
                                if(dataObj3.data[i].labels[a].name == "选考"){
                                    $("<li></li>").addClass("teacherChouse").text("选考").appendTo(teacherLableBox);
                                }else if(dataObj3.data[i].labels[a].name == "生涯规划"){
                                    $("<li></li>").addClass("teacherCareer").text("生涯规划").appendTo(teacherLableBox);
                                }else if(dataObj3.data[i].labels[a].name == "艺考"){
                                    // $("<li></li>").addClass("teacherArt").text("艺考").appendTo(teacherLableBox);
                                }else if(dataObj3.data[i].labels[a].name == "三位一体"){
                                    $("<li></li>").addClass("teachertThree").text("三位一体").appendTo(teacherLableBox);
                                }else if(dataObj3.data[i].labels[a].name == "留学"){
                                    // $("<li></li>").addClass("teacherStudy").text("留学").appendTo(teacherLableBox);
                                }
                            }
            }
        }
    }
    //end 添加推荐导师内容

    //导航轮播
    function bannerScroll(bannerBoxDom,bannerUlDom,bannerSpanUlDom,bannerSpanActiveClass,bannerBoxClass) {
        var bannerBox = bannerBoxDom;
        var bannerLi = bannerUlDom;
        var bannerItem = bannerLi.find("li");
        var bannerSpanBox = bannerSpanUlDom;
        var bannerSpan = bannerSpanBox.find("li");
        var bannerItemLength = bannerItem.length;
        var bannerItemWidth = $(window).width();
        var bannerWidth = bannerItemWidth * bannerItemLength;
        var n = 1;

        //动态获取设置banner的属性
        // bannerSpanBox.css({marginLeft:bannerSpanBox.width()/2*-1+"px"});
        bannerSpanBox.find("li").eq(0).addClass(bannerSpanActiveClass);
        bannerItem.css({width:bannerItemWidth});
        bannerLi.css({
            width:bannerWidth,
            left:-bannerItemWidth
        });
        //end 动态获取设置banner的属性

        //设置banner轮播动画
        var bannerScroll = setInterval(function (){
            if(n < bannerLi.find("li").length-1){
                n = n+1;
                bannerLi.animate({left:-1 * (n) * bannerItemWidth},300);
                bannerSpan.removeClass(bannerSpanActiveClass).eq(n-1).addClass(bannerSpanActiveClass);
                if(n == bannerLi.find("li").length-1){
                    n = 1;
                    bannerLi.animate({left:-1 * (n) * bannerItemWidth},0);
                    bannerSpan.removeClass(bannerSpanActiveClass).eq(0).addClass(bannerSpanActiveClass);
                }
            }
        },3000);
        //end 设置banner轮播动画

        //设置banner拖动事件
        var x1;
        var x2;
        var startX;
        var endX;
        var moveX = [];
        var moveEnd;
        var bannerUlPosition = bannerLi.css("marginLeft");
        var banerset;
        var bannerBoxWidth_4 = bannerBox.width()/5*-1;
        document.getElementById(bannerBoxClass).addEventListener("touchstart",function (e) {
            x1 = 0;
            startX = e.targetTouches[0].pageX - x1;
            moveX[0] = startX;
            bannerUlPosition = bannerLi.css("left").replace("px","") - 0;
            clearTimeout(banerset);
            clearInterval(bannerScroll);
        });
        document.getElementById(bannerBoxClass).addEventListener("touchmove",function (e) {
            x2 = 0;
            moveX[1] = -1 * (startX - (e.changedTouches[0].pageX - x2));
            if(n>1){
                bannerLi.css("left",(bannerUlPosition + moveX[1]) +"px");
            }else{
                bannerLi.css("left",bannerUlPosition + moveX[1] +"px");
            }
        });
        document.getElementById(bannerBoxClass).addEventListener("touchend",function (e) {
            x2 = 0;
            endX = e.changedTouches[0].pageX - x2;
            moveEnd = (endX - startX)*-1;
            if(moveEnd > -1*bannerBoxWidth_4 && moveEnd > 0){
                if(n < bannerItemLength-1){
                    n = n+1;
                    bannerLi.animate({"left":(n)*bannerBox.width()*-1+"px"},100);
                    if(n == bannerItemLength-1){
                        n = 1;
                        bannerLi.animate({"left":(n)*bannerBox.width()*-1+"px"},0);
                        bannerSpan.removeClass(bannerSpanActiveClass).eq(0).addClass(bannerSpanActiveClass);
                    }
                }
            }else if(moveEnd < -1*bannerBoxWidth_4 && moveEnd > 0){
                bannerLi.animate({"left":(n)*bannerBox.width()*-1+"px"},100);
            }else if(moveEnd < bannerBoxWidth_4 && moveEnd < 0){
                if(n>=1){
                    if(n == 1){
                        bannerLi.animate({"left":"0px"},100);
                        n = bannerItemLength-2;
                        bannerLi.animate({"left":(n)*bannerBox.width()*-1 +"px"},0);
                    }else{
                        n = n-1;
                        bannerLi.animate({"left":(n)*bannerBox.width()*-1 +"px"},100);
                    }
                }
            }else if(moveEnd > bannerBoxWidth_4 && moveEnd < 0){
                bannerLi.animate({"left":(n)*bannerBox.width()*-1 +"px"},100);
            }
            bannerSpan.removeClass(bannerSpanActiveClass).eq(n-1).addClass(bannerSpanActiveClass);
            banerset = setTimeout(function () {
                bannerScroll = setInterval(function (){
                    if(n < bannerLi.find("li").length-1){
                        n = n+1;
                        bannerLi.animate({left:-1 * (n) * bannerItemWidth},300);
                        bannerSpan.removeClass(bannerSpanActiveClass).eq(n-1).addClass(bannerSpanActiveClass);
                        if(n == bannerLi.find("li").length-1){
                            n = 1;
                            bannerLi.animate({left:-1 * (n) * bannerItemWidth},0);
                            bannerSpan.removeClass(bannerSpanActiveClass).eq(0).addClass(bannerSpanActiveClass);
                        }
                    }
                },3000);
            },1000);
        });
        //end 设置banner拖动事件
    }
    //end 导航轮播

    //咨询热点
    function HotSctoll() {
        var hotList = $(".news");
        var ListItemHeight = hotList.find("li").eq(0).height();
        var ListLenght = hotList.find("li").length;
        var z = 1;
        setInterval(function () {
            if (z < ListLenght+1){
                if (z == ListLenght){
                    z = 1;
                    hotList.css('marginTop','0');
                    hotList.animate({marginTop:z*-ListItemHeight},500);
                    z = 2;
                }else{
                    hotList.animate({marginTop:z*-ListItemHeight},500);
                    z = z+1;
                }
            }
        },2000);
    }
    //end 咨询热点
});