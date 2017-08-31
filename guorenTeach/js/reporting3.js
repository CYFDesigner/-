/**
 * Created by zy on 2017/5/4.
 */
/**
 * Created by zy on 2017/5/4.
 */
/**
 * Created by zy on 2017/5/4.
 */
$(function () {
    var page = 0;
    var pageold = [];
    var chouseItem = [];
    var chouseNum = 0;
    var ENumber = 0;
    var INumber = 0;
    var SNumber = 0;
    var NNumber = 0;
    var TNumber = 0;
    var FNumber = 0;
    var JNumber = 0;
    var PNumber = 0;
    var EIpost;
    var EIpostId;
    var SNpost;
    var SNpostId;
    var TFpost;
    var TFpostId;
    var JPpost;
    var JPpostId;
    var record = [];
    var characterContent = {
        question:[
            "1.电话铃响的时候，你会:",
            "2.你更倾向于:",
            "3.对你来说那种情况更糟:",
            "4.同别人在一起，你通常:",
            "5.哪种事更使你感到惬意:",
            "6.面对学习环境里的噪音你会:",
            "7.你的做事方式:",
            "8.排队时，你常常:",
            "9.你愿意把什么人作为朋友:",
            "10.你对什么更感兴趣:",
            "11.你更有可能依据什么对事物做出判断:",
            "12.评价他人时，你易于:",
            "13.对于制定周末计划:",
            "14.您更愿意拥有:",
            "15.在一个聚会上，你更倾向于:",
            "16.你更倾向于:",
            "17.你喜欢什么样的作者:",
            "18.什么更吸引你:",
            "19.你通常:",
            "20.学习中，你清楚你的行动进度:",
            "21.你更经常提出:",
            "22.与陌生人交流:",
            "23.你认为事实:",
            "24.你觉得幻想家和思想家:",
            "25.在一场热烈的辩论赛中，你会:",
            "26.哪一个更好:",
            "27.你觉得学习中什么更自然:",
            "28.什么时候你的感觉更惬意:",
            "29.你倾向于:",
            "30.你认为常识:",
            "31.儿童往往不会:",
            "32.管理他人时:",
            "33.你更倾向于做一个:",
            "34.你倾向于:",
            "35.在多数情况下，你更倾向于:",
            "36.你认为自己是一个:",
            "37.你更经常是一个:",
            "38.你说话时:",
            "39.哪句话更像是赞美:",
            "40.你更容易受什么支配:",
            "41.一件学习完成时:",
            "42.你喜欢什么样的学习:",
            "43.你是那种:",
            "44.你更容易接受:",
            "45.你更经常注意:",
            "46.成为哪一种人更糟糕:",
            "47.在令人难堪的情况下，你有时表现的:",
            "48.你在做出选择时倾向于:",
            "49.你喜欢的生活:",
            "50.学习中的你更倾向于:",
            "51.你更容易相信:",
            "52.你更容易接受:",
            "53.你认为你自己是一个:",
            "54.你对自己哪种品格评价更高:",
            "55.你通常希望事情:",
            "56.你认为自己:",
            "57.你觉得自己是个:",
            "58.你很满意自己能够:",
            "59.你更注重:",
            "60.什么错误看起来比较严重:",
            "61.你更容易受什么影响:",
            "62.哪一种情况下你的感觉更好:",
            "63.较令人满意的是:",
            "64.你是一个:",
            "65.你喜欢什么样的故事:",
            "66.什么事对你来说更容易:",
            "67.你更希望自己具备:",
            "68.你认为你自己基本上:",
            "69.你常注意的是:",
            "70.你比较喜欢:"
        ],
        answer:{
            1:{
                A:"马上第一个去接",
                B:"希望别人去接"
            },
            2:{
                A:"敏锐而不内省",
                B:"内省而不敏锐"
            },
            3:{
                A:"想入非非",
                B:"循规蹈矩"
            },
            4:{
                A:"坚定而不随和",
                B:"随和而不坚定"
            },
            5:{
                A:"做出权威判断",
                B:"做出有价值的判断"
            },
            6:{
                A:"抽出时间整顿",
                B:"最大限度的忍耐"
            },
            7:{
                A:" 果断",
                B:"某种程度的斟酌"
            },
            8:{
                A:"与他人聊天",
                B:"仍考虑学习"
            },
            9:{
                A:"思维活跃的人",
                B:"脚踏实地的人"
            },
            10:{
                A:"真实存在的东西",
                B:"潜在的东西"
            },
            11:{
                A:"事实",
                B:"愿望"
            },
            12:{
                A:"客观，不讲人情",
                B:"有人情味"
            },
            13:{
                A:"很有必要",
                B:"没有必要"
            },
            14:{
                A:"学习成果",
                B:"不断进展的学习"
            },
            15:{
                A:"与许多人甚至陌生人交流",
                B:"只与几个朋友交流"
            },
            16:{
                A:"务实而不空谈",
                B:"空谈而不务实"
            },
            17:{
                A:"直述主题",
                B:"运用隐喻和象征法"
            },
            18:{
                A:"逻辑分析",
                B:"人际关系"
            },
            19:{
                A:"坦率，直言不讳",
                B:"温和，体谅他人"
            },
            20:{
                A:"确定",
                B:"不确定"
            },
            21:{
                A:"最后，确定的建议",
                B:"暂时，初步的建议"
            },
            22:{
                A:"使你更加自信",
                B:"使你伤脑筋"
            },
            23:{
                A:"只是说明事实",
                B:"是理论的例证"
            },
            24:{
                A:"有些讨厌",
                B:"非常有魅力"
            },
            25:{
                A:"坚持你的观点",
                B:"寻找共同之处"
            },
            26:{
                A:"公正",
                B:"宽容"
            },
            27:{
                A:"指出错误",
                B:"设法取悦他人"
            },
            28:{
                A:"作出决定后",
                B:"作出决定前"
            },
            29:{
                A:"直接说出你的想法",
                B:"听别人的发言"
            }
            ,
            30:{
                A:"通常是可靠的",
                B:"经常值得怀疑"
            }
            ,
            31:{
                A:"做十分有用的事",
                B:"充分利用想象力"
            }
            ,
            32:{
                A:"坚定而严格",
                B:"宽厚而仁慈"
            }
            ,
            33:{
                A:"头脑冷静的人",
                B:"热心肠的人"
            }
            ,
            34:{
                A:"将事情搞定",
                B:"探究事物的各种潜质"
            }
            ,
            35:{
                A:"做作不自然",
                B:"自然不做作"
            }
            ,
            36:{
                A:"有很多朋友但交往不深",
                B:"朋友不多但交往较深"
            }
            ,
            37:{
                A:"讲究实际的人",
                B:"沉于幻想的人"
            }
            ,
            38:{
                A:"详细而不泛泛",
                B:"宏观但不详细"
            }
            ,
            39:{
                A:"这是一个逻辑性很强的人",
                B:"这是一个感情丰富的人"
            }
            ,
            40:{
                A:"你的思想",
                B:"你的体验"
            }
            ,
            41:{
                A:"把所有未了解的零星事物安排妥当",
                B:"干别的事"
            }
            ,
            42:{
                A:"有最后期限的",
                B:"随时进行的"
            }
            ,
            43:{
                A:"很健谈的人",
                B:"认真聆听的人"
            }
            ,
            44:{
                A:"较直白的语言",
                B:"较有寓意的语言"
            }
            ,
            45:{
                A:"恰好在眼前的事物",
                B:"想象中的事物"
            }
            ,
            46:{
                A:"过分心软",
                B:"顽固"
            }
            ,
            47:{
                A:"过于无动于衷",
                B:"过于同情怜悯"
            }
            ,
            48:{
                A:"小心翼翼",
                B:"有些冲动"
            }
            ,
            49:{
                A:"紧张充实",
                B:"悠闲自在"
            }
            ,
            50:{
                A:"热情与同学交往",
                B:"保留更多的私人空间"
            }
            ,
            51:{
                A:"你的经验",
                B:"你的观念"
            }
            ,
            52:{
                A:"脚踏实地",
                B:"变化创新"
            }
            ,
            53:{
                A:"意志坚强的人",
                B:"心地温和的人"
            }
            ,
            54:{
                A:"通情达理",
                B:"埋头苦干"
            }
            ,
            55:{
                A:"已经被安排、确定",
                B:"有改变的余地"
            }
            ,
            56:{
                A:"严肃、坚定",
                B:"随和"
            }
            ,
            57:{
                A:"好的演说家",
                B:"好的聆听者"
            }
            ,
            58:{
                A:"有力的把握现实",
                B:"有丰富想象力"
            }
            ,
            59:{
                A:"基本原理",
                B:"深层寓意"
            }
            ,
            60:{
                A:"同情心过于丰富",
                B:"过于冷漠、无动于衷"
            }
            ,
            61:{
                A:"有说服力的证据",
                B:"令人感动的陈述"
            }
            ,
            62:{
                A:"结束一件事",
                B:"保留各种选择"
            }
            ,
            63:{
                A:"确定事情已经做好",
                B:"让事情顺其自然的发展"
            }
            ,
            64:{
                A:"容易接近的人",
                B:"有些矜持的人"
            }
            ,
            65:{
                A:"刺激和冒险的",
                B:"幻想和豪勇的"
            }
            ,
            66:{
                A:"视他人各尽其用",
                B:"认同他人"
            }
            ,
            67:{
                A:"意志的力量",
                B:"情感的力量"
            }
            ,
            68:{
                A:"禁得住批评和侮辱",
                B:"禁不住批评和侮辱"
            }
            ,
            69:{
                A:"混乱",
                B:"变革的机会"
            }
            ,
            70:{
                A:"按规章程序办事",
                B:"随机应变"
            }
        }
    };
    appendQuestion(page);
    //添加、更换题目
    function appendQuestion(pageNum) {
        var question = $(".reportingQuestion");
        var answer1 = $("#answer1").parent().find(".reportingAnswerText");
        var answer2 = $("#answer2").parent().find(".reportingAnswerText");
        question.text(characterContent.question[pageNum]);
        answer1.html("A." + characterContent.answer[pageNum+1].A);
        answer2.html("B." + characterContent.answer[pageNum+1].B);
    }

    //end 添加、更换题目

    //题目选项点击事件
    $(".reportingAnswer").find("input").bind("click", function () {
        var radioInput = $(".reportingAnswer").find("input");
        radioInput.prop("checked", false);
        $(this).prop("checked", true);
        radioInput.parent().removeClass("labelActive");
        $(this).parent().addClass("labelActive");
    });
    //end 题目选项点击事件

    //点击下一题
    var submit = $(".submit");
    var nextItem = $(".nextItem");
    nextItem.bind("click", function () {
        judgePage();
        if (page > 0 && page != characterContent.question.length - 1) {
            lastItem.css({
                "backgroundColor":"#f4cb5f",
                "color":"#ffffff",
                "borderColor":"transparent"
            });
        } else if (page == characterContent.question.length - 1 && page > 0) {
            nextItem.css("display", "none");
            submit.css("display", "block");
        }
    });
    //end 点击下一题

    //点击上一题
    var lastItem = $(".lastItem");
    if (page == 0) {
        lastItem.css({
            "backgroundColor":"transparent",
            "color":"#c9c9c9",
            "borderColor":"#c9c9c9"
        });
    }
    lastItem.bind("click", function () {
        var radioInput = $(".reportingAnswer").find("input");
        submit.css("display", "none");
        nextItem.css("display", "block");
        if (page > 0) {
            page = page - 1;
            appendQuestion(page);
            if (page > 0) {
                lastItem.css({
                    "backgroundColor":"#f4cb5f",
                    "color":"#ffffff",
                    "borderColor":"transparent"
                });
            } else {
                lastItem.css({
                    "backgroundColor":"transparent",
                    "color":"#c9c9c9",
                    "borderColor":"#c9c9c9"
                });
            }
            radioInput.prop("checked", false);
            radioInput.attr("checked", false);
            radioInput.parent().removeClass("labelActive");
            if (chouseItem[page] == "A") {
                radioInput.eq(0).attr("checked", true);
                radioInput.eq(0).prop("checked", true);
                radioInput.eq(0).parent().addClass("labelActive");
            }else if (chouseItem[page] == "B") {
                radioInput.eq(1).attr("checked", true);
                radioInput.eq(1).prop("checked", true);
                radioInput.eq(1).parent().addClass("labelActive");
            }
        }else {
            lastItem.css("backgroundColor", "#d4d4d4");
            tip = "前面没有更多的题目了";
            pageTip(tip);
        }
    });
    //end 点击上一题

    //判断是新页面还是老页面
    function judgePage() {
        if (pageold.indexOf(page) == -1) {
            chouseNum = 0;
            judgeNewChouseItem();
        } else {
            chouseNum = 1;
            judgeNewChouseItem();
        }
    }

    //end 判断是新页面还是老页面

    //判断有没有选择
    function judgeNewChouseItem() {
        var radioInput = $(".reportingAnswer").find("input");
        for (var a = 0; a < radioInput.length; a++) {
            if (radioInput.eq(a).is(":checked")) {
                chouseNum = 1;
                break;
            }
        }
        if (chouseNum == 0) {
            tip = "您还没有做出选择";
            pageTip(tip);
        } else {
            if (pageold.indexOf(page) == -1) {
                pageold.push(page);
            }
            pageChouseSave();
            if (page < characterContent.question.length - 1) {
                radioInput.attr("checked", false);
                radioInput.prop("checked", false);
                radioInput.parent().removeClass("labelActive");
                page = page + 1;
                if (chouseItem[page] == "A") {
                    radioInput.eq(0).attr("checked", true);
                    radioInput.eq(0).prop("checked", true);
                    radioInput.eq(0).parent().addClass("labelActive");
                } else if (chouseItem[page] == "B") {
                    radioInput.eq(1).attr("checked", true);
                    radioInput.eq(1).prop("checked", true);
                    radioInput.eq(1).parent().addClass("labelActive");
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
        for (var a = 0; a < radioInput.length; a++) {
            if (radioInput.eq(a).is(":checked")) {
                if (radioInput.eq(a).attr("id") == "answer1") {
                    chouseItem[page] = "A";
                } else if (radioInput.eq(a).attr("id") == "answer2") {
                    chouseItem[page] = "B";
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
        for (var a = 0; a < characterContent.question.length; a++) {
            if (a+1 == 1 || a+1 == 8 || a+1 == 15 || a+1 == 22 || a+1 == 29 || a+1 == 36 || a+1 == 43 || a+1 == 50 || a+1 == 57 || a+1 ==64) {
                if (chouseItem[a] == "A") {
                    ENumber = ENumber + 1;
                } else if (chouseItem[a] == "B") {
                    INumber = INumber + 1;
                }
            } else if (a+1 == 2 || a+1 == 9 || a+1 == 16 || a+1 == 23 || a+1 == 30 || a+1 == 37 || a+1 == 44 || a+1 == 51 || a+1 == 58 || a+1 == 65 ||
                a+1 == 3 || a+1 == 10 || a+1 == 17 || a+1 == 24 || a+1 == 31 || a+1 == 38 || a+1 == 45 || a+1 == 52 || a+1 == 59 || a+1 == 66) {
                if (chouseItem[a] == "A") {
                    SNumber = SNumber + 1;
                } else if (chouseItem[a] == "B") {
                    NNumber = NNumber + 1;
                }
            } else if (a+1 == 4 || a+1 == 11 || a+1 == 18 || a+1 == 25 || a+1 == 32 || a+1 == 39 || a+1 == 46 || a+1 == 53 || a+1 == 60 || a+1 == 67 ||
                a+1 == 5 || a+1 == 12 || a+1 == 19 || a+1 == 26 || a+1 == 33 || a+1 == 40 || a+1 == 47 || a+1 == 54 || a+1 == 61 || a+1 == 68) {
                if (chouseItem[a] == "A") {
                    TNumber = TNumber + 1;
                } else if (chouseItem[a] == "B") {
                    FNumber = FNumber + 1;
                }
            } else if (a+1 == 6 || a+1 == 13 || a+1 == 20 || a+1 == 27 || a+1 == 34 || a+1 == 41 || a+1 == 48 || a+1 == 55 || a+1 == 62 || a+1 == 69 ||
                a+1 == 7 || a+1 == 14 || a+1 == 21 || a+1 == 28 || a+1 == 35 || a+1 == 42 || a+1 == 49 || a+1 == 56 || a+1 == 63 || a+1 == 70) {
                if (chouseItem[a] == "A") {
                    JNumber = JNumber + 1;
                } else if (chouseItem[a] == "B") {
                    PNumber = PNumber + 1;
                }
            }
        }
        if(ENumber >= INumber){
            if( ENumber == INumber){
                EIpost = ENumber + 1;
            }else{
                EIpost = ENumber;
            }
            EIpostId = 1;
        }else{
            EIpost = INumber;
            EIpostId = 2;
        }
        if(SNumber >= NNumber){
            if(SNumber == NNumber){
                SNpost = SNumber + 1;
            }else{
                SNpost = SNumber;
            }
            SNpostId = 3;
        }else{
            SNpost = NNumber;
            SNpostId = 4;
        }
        if(TNumber >= FNumber){
            if(TNumber == FNumber){
                TFpost = TNumber + 1;
            }else{
                TFpost = TNumber;
            }
            TFpostId = 5;
        }else{
            TFpost = FNumber;
            TFpostId = 6;
        }
        if(JNumber >= PNumber){
            if(JNumber == PNumber){
                JPpost = JNumber + 1;
            }else{
                JPpost = JNumber;
            }
            JPpostId = 7;
        }else{
            JPpost = PNumber;
            JPpostId = 8;
        }
    }
    //end 结果计算

    //保存答案
    function Answersave() {
        var dataPost = {
            "evaluationId":3,
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
            "evaluationId":3,
            "evaluationResultList[0].groupId":EIpostId,
            "evaluationResultList[0].score":EIpost,
            "evaluationResultList[1].groupId":SNpostId,
            "evaluationResultList[1].score":SNpost,
            "evaluationResultList[2].groupId":TFpostId,
            "evaluationResultList[2].score":TFpost,
            "evaluationResultList[3].groupId":JPpostId,
            "evaluationResultList[3].score":JPpost
        };
        $.ajax({
            url:url + "wx/evaluation/update",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if (data.status == true) {
                    tip = "提交成功";
                    adress = url + "guorenTeach/reportingResult.html" + "?evaluationId=" + 3 + "&?studentId=" + window.localStorage.getItem("studentId");
                    pageTip(tip, adress);
                } else {
                    tip = data.message;
                    pageTip(tip)
                }
            },
            xhrFields:{
                withCredentials:true    // 此字段标识要跨域传数据
            },
            crossDomain:true
        })
    }
    //储存结果
});

