/**
 * Created by zy on 2017/5/5.
 */
/**
 * Created by zy on 2017/5/4.
 */
$(function () {
    var page = 0;
    var pageold = [];
    var chouseItem = [];
    var chouseNum = 0;
    var GeographyNum = 0;
    var HistoryNum = 0;
    var PoliticsNum = 0;
    var BiologyNum = 0;
    var PhysicsNum = 0;
    var ChemistryNum = 0;
    var record = [];
    var characterContent = {
        question:[
            "1.喜欢了解历史人物，例如曾国藩，康熙等:",
            "2.对古尸不腐感到非常好奇:",
            "3.爱做一些解剖生物的小实验:",
            "4.知道哪些地方的农作物一年一熟哪些是一年两熟:",
            "5.好奇香蕉球怎样踢出来的:",
            "6.反对盗版、抵制低俗文化节目等:",
            "7.常把历史事件与现实作对照 ，例如古代的分权制衡与今天的分权:",
            "8.我的计算能力还不错:",
            "9.对人体的内脏结构比较熟悉:",
            "10.了解所在城市或故乡的气候:",
            "11.我能够做到用两个开关控制一盏灯:",
            "12.比较关注社会热点问题，如教育改革，食品安全等:",
            "13.关心世界各国的历史:",
            "14.具有一定的推理能力:",
            "15.对生物前沿知识很着迷，例如基因检测:",
            "16.去国外旅行，能够准确算出时差:",
            "17.知道为什么鸡蛋从20层高的楼上掉下来，也能砸死人:",
            "18.对身边物价变化比较关注，如油价、菜价等:",
            "19.谈起历史事件会很兴奋，能够客观的分析并发表自己的看法:",
            "20.知道干冰和冰的区别是什么:",
            "21.动手能力强:",
            "22.知道有些地方“早穿皮袄午穿纱，围着火炉吃西瓜”的原因:",
            "23.具有较强的逻辑思维能力:",
            "24.对国际局势比较关注:",
            "25.能清晰准确说出重大事件发生的时间，地点及主要内容:",
            "26.知道用什么方法去掉衣服上的油渍:",
            "27.我能说出部分的濒危物种以及保护动植物:",
            "28.关注我国的环境污染以及环境治理问题，如雾霾:",
            "29.知道飞机最怕撞上小鸟:",
            "30.对国家的基本法律法规比较了解:",
            "31.喜欢参观历史博物馆:",
            "32.知道海鲜为什么不与含丰富的维C果蔬一起吃:",
            "33.注重营养平衡，并了解缺乏营养后可能出现的症状:",
            "34.知道为什么有的地方喜食面食，有地方喜食大米:",
            "35.知道为什么汽车，飞机都要设计成流线型:",
            "36.有想过让钱生钱的办法吗，如买点股票或基金:",
            "37.喜欢看大秦帝国、武则天、汉武大帝等题材的影视剧:",
            "38.知道苹果削皮以后为什么很快会变色:",
            "39.看到有人抓蛇等破坏生态的行为很生气:",
            "40.谈起各地的天气，自然环境，滔滔不绝:",
            "41.知道为什么高的建筑一定要安装避雷针:",
            "42.国外文化对自己也有比较大的影响:",
            "43.喜欢阅读史记、资治通鉴等类书籍:",
            "44.解答化学难题时，哪怕花很长时间也要把它做出来:",
            "45.喜欢看动物世界等自然科学类节目:",
            "46.能够根据不同时间的影子判断方向或判断时间:",
            "47.很好奇火箭发射的轨迹为什么是曲线而不是直线:",
            "48.做事不易冲动，能根据实际处理问题:",
            "49.喜欢通过电影去了解背后的原型事件及人物:",
            "50.知道吃药时要用温开水而不用茶水:",
            "51.喜爱饲养小动物或栽培植物,并记录他们的生长过程:",
            "52.比较关注各地的风土人情以及地质地貌:",
            "53.喜欢和同学深入的讨论问题，而不是点到为止:",
            "54.喜欢《诗词大会》等传统文化类节目:"
        ],
        answer:{
            A:"很符合自己的情况",
            B:"比较符合自己的情况",
            C:"很难说",
            D:"较不符合自己的情况",
            E:"很不符合自己的情况"
        }
    };
    appendQuestion(page);
    //添加更换题目
    function appendQuestion(pageNum) {
        var question = $(".reportingQuestion");
        var answer1 = $("#answer1").parent().find(".reportingAnswerText");
        var answer2 = $("#answer2").parent().find(".reportingAnswerText");
        var answer3 = $("#answer3").parent().find(".reportingAnswerText");
        var answer4 = $("#answer4").parent().find(".reportingAnswerText");
        var answer5 = $("#answer5").parent().find(".reportingAnswerText");
        question.text(characterContent.question[pageNum]);
        answer1.html("A." + characterContent.answer.A);
        answer2.html("B." + characterContent.answer.B);
        answer3.html("C." + characterContent.answer.C);
        answer4.html("D." + characterContent.answer.D);
        answer5.html("E." + characterContent.answer.E);
    }
    //end 添加更换题目

    //题目选项点击事件
    $(".reportingAnswer").find("input").bind("click",function () {
        var radioInput = $(".reportingAnswer").find("input");
        radioInput.prop("checked",false);
        $(this).prop("checked",true);
        radioInput.parent().removeClass("labelActive");
        $(this).parent().addClass("labelActive");
    });
    //end 题目选项点击事件


    //点击下一题
    var submit = $(".submit");
    var nextItem = $(".nextItem");
    nextItem.bind("click",function () {
        judgePage();
        if(page > 0 && page != characterContent.question.length - 1){
            lastItem.css({
                "backgroundColor":"#f4cb5f",
                "color":"#ffffff",
                "borderColor":"transparent"
            });
        }else if(page == characterContent.question.length - 1 && page > 0){
            nextItem.css("display","none");
            submit.css("display","block");
        }
    });
    //end 点击下一题

    //点击上一题
    var lastItem = $(".lastItem");
    if(page == 0 ){
        lastItem.css({
            "backgroundColor":"transparent",
            "color":"#c9c9c9",
            "borderColor":"#c9c9c9"
        });
    }
    lastItem.bind("click",function () {
        var radioInput = $(".reportingAnswer").find("input");
        submit.css("display","none");
        nextItem.css("display","block");
        if(page > 0){
            page = page - 1;
            appendQuestion(page);
            if(page > 0){
                lastItem.css({
                    "backgroundColor":"#f4cb5f",
                    "color":"#ffffff",
                    "borderColor":"transparent"
                });
            }else{
                lastItem.css({
                    "backgroundColor":"transparent",
                    "color":"#c9c9c9",
                    "borderColor":"#c9c9c9"
                });
            }
            radioInput.prop("checked",false);
            radioInput.attr("checked",false);
            radioInput.parent().removeClass("labelActive");
            if(chouseItem[page] == "A"){
                radioInput.eq(0).attr("checked",true);
                radioInput.eq(0).prop("checked",true);
                radioInput.eq(0).parent().addClass("labelActive");
            }else if(chouseItem[page] == "B"){
                radioInput.eq(1).attr("checked",true);
                radioInput.eq(1).prop("checked",true);
                radioInput.eq(1).parent().addClass("labelActive");
            }else if(chouseItem[page] == "C"){
                radioInput.eq(2).attr("checked",true);
                radioInput.eq(2).prop("checked",true);
                radioInput.eq(2).parent().addClass("labelActive");
            }else if(chouseItem[page] == "D"){
                radioInput.eq(3).attr("checked",true);
                radioInput.eq(3).prop("checked",true);
                radioInput.eq(3).parent().addClass("labelActive");
            }else if(chouseItem[page] == "E"){
                radioInput.eq(4).attr("checked",true);
                radioInput.eq(4).prop("checked",true);
                radioInput.eq(4).parent().addClass("labelActive");
            }
        }else{
            lastItem.css("backgroundColor","#d4d4d4");
            tip = "前面没有更多的题目了";
            pageTip(tip);
        }
    });
    //end 点击上一题

    //判断是新页面还是老页面
    function judgePage() {
        if(pageold.indexOf(page) == -1){
            chouseNum = 0;
            judgeNewChouseItem();
        }else{
            chouseNum = 1;
            judgeNewChouseItem();
        }
    }
    //end 判断是新页面还是老页面

    //判断有没有选择
    function judgeNewChouseItem() {
        var radioInput = $(".reportingAnswer").find("input");
        for(var a = 0;a < radioInput.length;a++){
            if(radioInput.eq(a).is(":checked")){
                chouseNum = 1;
                break;
            }
        }
        if(chouseNum == 0){
            tip = "您还没有做出选择";
            pageTip(tip);
        }else{
            if(pageold.indexOf(page) == -1){
                pageold.push(page);
            }
            pageChouseSave();
            if(page < characterContent.question.length - 1){
                radioInput.attr("checked",false);
                radioInput.prop("checked",false);
                radioInput.parent().removeClass("labelActive");
                page = page + 1;
                if(chouseItem[page] == "A"){
                    radioInput.eq(0).attr("checked",true);
                    radioInput.eq(0).prop("checked",true);
                    radioInput.eq(0).parent().addClass("labelActive");
                }else if(chouseItem[page] == "B"){
                    radioInput.eq(1).attr("checked",true);
                    radioInput.eq(1).prop("checked",true);
                    radioInput.eq(1).parent().addClass("labelActive");
                }else if(chouseItem[page] == "C"){
                    radioInput.eq(2).attr("checked",true);
                    radioInput.eq(2).prop("checked",true);
                    radioInput.eq(2).parent().addClass("labelActive");
                }else if(chouseItem[page] == "D"){
                    radioInput.eq(3).attr("checked",true);
                    radioInput.eq(3).prop("checked",true);
                    radioInput.eq(3).parent().addClass("labelActive");
                }else if(chouseItem[page] == "E"){
                    radioInput.eq(4).attr("checked",true);
                    radioInput.eq(4).prop("checked",true);
                    radioInput.eq(4).parent().addClass("labelActive");
                }
                appendQuestion(page);
            }else{
                for(var i =0;i < chouseItem.length;i++){
                    record[i] = {
                        topic: i + 1,
                        option:chouseItem[i]
                    };
                }
                Answersave();
                resultCalculation();
                severSave();
            }
        }
    }
    //end 判断有没有选择

    //选项储存
    function pageChouseSave() {
        var radioInput = $(".reportingAnswer").find("input");
        for(var a = 0;a < radioInput.length;a++){
            if(radioInput.eq(a).is(":checked")){
                if(radioInput.eq(a).attr("id") == "answer1"){
                    chouseItem[page] = "A";
                }else if(radioInput.eq(a).attr("id") == "answer2"){
                    chouseItem[page] = "B";
                }else if(radioInput.eq(a).attr("id") == "answer3"){
                    chouseItem[page] = "C";
                }else if(radioInput.eq(a).attr("id") == "answer4"){
                    chouseItem[page] = "D";
                }else if(radioInput.eq(a).attr("id") == "answer4"){
                    chouseItem[page] = "E";
                }
            }
        }
    }
    //end 选项储存

    //点击提交
    submitBind();
    function submitBind() {
        submit.one("click",function () {
            judgePage();
            setTimeout(function () {
                submitBind()
            },10000)
        });
    }
    //end 点击提交

    //结果计算
    function resultCalculation() {
        for(var a = 0;a < characterContent.question.length;a++){
            if(a+1 == 1 || a+1 == 7 || a+1 == 13 || a+1 == 19 || a+1 == 25 || a+1 == 31 || a+1 == 37 || a+1 == 43 || a+1 == 49){
                if(chouseItem[a] == "A"){
                    HistoryNum = HistoryNum + 5;
                }else if(chouseItem[a] == "B"){
                    HistoryNum = HistoryNum + 4;
                }else if(chouseItem[a] == "C"){
                    HistoryNum = HistoryNum + 3;
                }else if(chouseItem[a] == "D"){
                    HistoryNum = HistoryNum + 2;
                }else if(chouseItem[a] == "E"){
                    HistoryNum = HistoryNum + 1;
                }
            }else if(a+1 == 2 || a+1 == 8 || a+1 == 14 || a+1 == 20 || a+1 == 26 || a+1 == 32 || a+1 == 38 || a+1 == 44 || a+1 == 50){
                if(chouseItem[a] == "A"){
                    ChemistryNum = ChemistryNum + 5;
                }else if(chouseItem[a] == "B"){
                    ChemistryNum = ChemistryNum + 4;
                }else if(chouseItem[a] == "C"){
                    ChemistryNum = ChemistryNum + 3;
                }else if(chouseItem[a] == "D"){
                    ChemistryNum = ChemistryNum + 2;
                }else if(chouseItem[a] == "E"){
                    ChemistryNum = ChemistryNum + 1;
                }
            }else if(a+1 == 3 || a+1 == 9 || a+1 == 15 || a+1 == 21 || a+1 == 27 || a+1 == 33 || a+1 == 39 || a+1 == 45 || a+1 == 51){
                if(chouseItem[a] == "A"){
                    BiologyNum = BiologyNum + 5;
                }else if(chouseItem[a] == "B"){
                    BiologyNum = BiologyNum + 4;
                }else if(chouseItem[a] == "C"){
                    BiologyNum = BiologyNum + 3;
                }else if(chouseItem[a] == "D"){
                    BiologyNum = BiologyNum + 2;
                }else if(chouseItem[a] == "E"){
                    BiologyNum = BiologyNum + 1;
                }
            }else if(a+1 == 4 || a+1 == 10 || a+1 == 16 || a+1 == 22 || a+1 == 28 || a+1 == 34 || a+1 == 40 || a+1 == 46 || a+1 == 52){
                if(chouseItem[a] == "A"){
                    GeographyNum = GeographyNum + 5;
                }else if(chouseItem[a] == "B"){
                    GeographyNum = GeographyNum + 4;
                }else if(chouseItem[a] == "C"){
                    GeographyNum = GeographyNum + 3;
                }else if(chouseItem[a] == "D"){
                    GeographyNum = GeographyNum + 2;
                }else if(chouseItem[a] == "E"){
                    GeographyNum = GeographyNum + 1;
                }
            }else if(a+1 == 5 || a+1 == 11 || a+1 == 17 || a+1 == 23 || a+1 == 29 || a+1 == 35 || a+1 == 41 || a+1 == 47 || a+1 == 53){
                if(chouseItem[a] == "A"){
                    PhysicsNum = PhysicsNum + 5;
                }else if(chouseItem[a] == "B"){
                    PhysicsNum = PhysicsNum + 4;
                }else if(chouseItem[a] == "C"){
                    PhysicsNum = PhysicsNum + 3;
                }else if(chouseItem[a] == "D"){
                    PhysicsNum = PhysicsNum + 2;
                }else if(chouseItem[a] == "E"){
                    PhysicsNum = PhysicsNum + 1;
                }
            }else if(a+1 == 6 || a+1 == 12 || a+1 == 18 || a+1 == 24 || a+1 == 30 || a+1 == 36 || a+1 == 42 || a+1 == 48 || a+1 == 54){
                if(chouseItem[a] == "A"){
                    PoliticsNum = PoliticsNum + 5;
                }else if(chouseItem[a] == "B"){
                    PoliticsNum = PoliticsNum + 4;
                }else if(chouseItem[a] == "C"){
                    PoliticsNum = PoliticsNum + 3;
                }else if(chouseItem[a] == "D"){
                    PoliticsNum = PoliticsNum + 2;
                }else if(chouseItem[a] == "E"){
                    PoliticsNum = PoliticsNum + 1;
                }
            }
        }
    }
    //end 结果计算

    //保存答案
    function Answersave() {
        var dataPost = {
            "evaluationId":4,
            "record":JSON.stringify(record)
        };
        $.ajax({
            url:url + "wx/evaluation/updaterecord",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if(data.status == true){

                }else{
                    tip = data.message;
                    pageTip(tip)
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 保存答案

    //储存结果
    function severSave() {
        var dataPost = {
            "evaluationId":4,
            "evaluationResultList[0].groupId":1,
            "evaluationResultList[0].score":HistoryNum,
            "evaluationResultList[1].groupId":2,
            "evaluationResultList[1].score":ChemistryNum,
            "evaluationResultList[2].groupId":3,
            "evaluationResultList[2].score":BiologyNum,
            "evaluationResultList[3].groupId":4,
            "evaluationResultList[3].score":GeographyNum,
            "evaluationResultList[4].groupId":5,
            "evaluationResultList[4].score":PhysicsNum,
            "evaluationResultList[5].groupId":6,
            "evaluationResultList[5].score":PoliticsNum
        };
        $.ajax({
            url:url + "wx/evaluation/update",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if(data.status == true){
                    tip = "提交成功";
                    adress = url + "guorenTeach/reportingResult.html" + "?evaluationId=" + 4 + "&?studentId=" + window.localStorage.getItem("studentId");
                    pageTip(tip,adress);
                }else{
                    tip = data.message;
                    pageTip(tip)
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 储存结果
});

