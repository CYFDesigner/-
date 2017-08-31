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
    var A1 = 0;
    var B1 = 0;
    var C1 = 0;
    var D1 = 0;
    var E1 = 0;
    var F1 = 0;
    var G1 = 0;
    var H1 = 0;
    var A2 = 0;
    var B2 = 0;
    var C2 = 0;
    var D2 = 0;
    var E2 = 0;
    var F2 = 0;
    var G2 = 0;
    var H2 = 0;
    var A3 = 0;
    var B3 = 0;
    var C3 = 0;
    var D3 = 0;
    var E3 = 0;
    var F3 = 0;
    var G3 = 0;
    var H3 = 0;
    var A4 = 0;
    var B4 = 0;
    var C4 = 0;
    var D4 = 0;
    var E4 = 0;
    var F4 = 0;
    var G4 = 0;
    var H4 = 0;
    var A5 = 0;
    var B5 = 0;
    var C5 = 0;
    var D5 = 0;
    var E5 = 0;
    var F5 = 0;
    var G5 = 0;
    var H5 = 0;
    var languageNum;
    var MathNum;
    var visionNum;
    var motionNum;
    var musicNum;
    var contactNum;
    var cognitionNum;
    var observationNum;
    var record = [];
    var characterContent = {
        question:[
            "1.善于编谎话或讲故事、说笑话:",
            "2.善于记忆人名、地名、日期或其他琐事:",
            "3.喜欢看书:",
            "4.喜欢不包含实在意义的顺口溜、双关语、绕口令",
            "5.喜欢听口述的语言如：故事、收音机播放的评论、书籍谈论:",
            "6.喜欢数学课，喜欢与数字打交道，如做与数字有关的工作或玩耍:",
            "7.喜欢电脑游戏、象棋、跳棋、或其他带有策略性的游戏:",
            "8.喜欢解决逻辑谜题、智力谜题喜欢听逻辑推理方面的问题:",
            "9.喜欢将物品按类别、层次或其他逻辑模式仿制而不是将他们混合在一起:",
            "10.对与科学有关的话题感兴趣:",
            "11.读地图、表格、图表比读课文容易喜欢看课文以外的东西:",
            "12.喜欢艺术活动、擅长绘画:",
            "13.喜欢看电影、幻灯片或其他形象化的内容:",
            "14.构建有趣的三维立体结构如：垒高拼装玩具:",
            "15.喜欢在书本、作业纸张或其他物品上乱涂乱画:",
            "16.在一项或多项运动中的表现出色:",
            "17.善于模仿别人的手势或言语、行为中的特殊习惯动作:",
            "18.喜欢拆卸物品并按原样安装起来:",
            "19.喜欢跑步、跳跃、摔跤或类似的有障碍的活动:",
            "20.显示出手工艺技巧例如：木工活、缝纫、机械操作或在其他方面表现出良好的动作协调性:",
            "21.歌唱嗓音好，能记住歌曲的旋律，当音乐听起来走调时能够觉察出来:",
            "22.演奏乐器、参加合唱:",
            "23.说话、活动有节奏感:",
            "24.无意地自己哼唱给自己听:",
            "25.学习或工作时有节奏地敲打桌子:",
            "26.似乎是天生的领袖:",
            "27.给有问题的朋友提供建议:",
            "28.俱乐部、社团、组织机构或非正式同伴团体中的一员:",
            "29.喜欢非正规地教育其他孩子:",
            "30.有两个或更多亲密朋友:",
            "31.显示出独立意识或坚强意志:",
            "32.对自己的能力和弱点有现实的认识:",
            "33.在学习和生活风格上能适应不同的节奏:",
            "34.喜欢独立学习而不喜欢与他人一起学习:",
            "35.能从生活的成功和失败中学习:",
            "36.天生喜欢去动物园、自然历史博物馆户外旅行:",
            "37.显示出对自然界构成的敏感如：跟班一起走出户外时会注意到山和云；或如果在城市环境里会对诸如运动鞋或汽车款式显示出敏感性:",
            "38.喜欢在兔子笼、养鱼缸、鸟笼和其他饲养动物的地方逗留:",
            "39.喜欢做关于自然的事情，诸如观察鸟类、收集蝴蝶或昆虫、研究树木、饲养动物:",
            "40.在校对涉及生态系统的话题如自然科学中的生物话题、社会研究中的环境问题表现出色:"
        ],
        answer:{
            A:"非常符合",
            B:"比较符合",
            C:"说不清",
            D:"不太符合",
            E:"非常不符合"
        }
    };
    appendQuestion(page);
    //添加、更换题目
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
    //end 添加、更换题目

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
                }else if(radioInput.eq(a).attr("id") == "answer5"){
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
            if(a < 5){
                if(chouseItem[a] == "A"){
                    A1 = A1 + 1;
                }else if(chouseItem[a] == "B"){
                    A2 = A2 + 1;
                }else if(chouseItem[a] == "C"){
                    A3 = A3 + 1;
                }else if(chouseItem[a] == "D"){
                    A4 = A4 + 1;
                }else if(chouseItem[a] == "E"){
                    A5 = A5 + 1;
                }
            }else if(a >= 5 && a < 10){
                if(chouseItem[a] == "A"){
                    B1 = B1 + 1;
                }else if(chouseItem[a] == "B"){
                    B2 = B2 + 1;
                }else if(chouseItem[a] == "C"){
                    B3 = B3 + 1;
                }else if(chouseItem[a] == "D"){
                    B4 = B4 + 1;
                }else if(chouseItem[a] == "E"){
                    B5 = B5 + 1;
                }
            }else if(a >= 10 && a < 15){
                if(chouseItem[a] == "A"){
                    C1 = C1 + 1;
                }else if(chouseItem[a] == "B"){
                    C2 = C2 + 1;
                }else if(chouseItem[a] == "C"){
                    C3 = C3 + 1;
                }else if(chouseItem[a] == "D"){
                    C4 = C4 + 1;
                }else if(chouseItem[a] == "E"){
                    C5 = C5 + 1;
                }
            }else if(a >= 15 && a < 20){
                if(chouseItem[a] == "A"){
                    D1 = D1 + 1;
                }else if(chouseItem[a] == "B"){
                    D2 = D2 + 1;
                }else if(chouseItem[a] == "C"){
                    D3 = D3 + 1;
                }else if(chouseItem[a] == "D"){
                    D4 = D4 + 1;
                }else if(chouseItem[a] == "E"){
                    D5 = D5 + 1;
                }
            }else if(a >= 20 && a < 25){
                if(chouseItem[a] == "A"){
                    E1 = E1 + 1;
                }else if(chouseItem[a] == "B"){
                    E2 = E2 + 1;
                }else if(chouseItem[a] == "C"){
                    E3 = E3 + 1;
                }else if(chouseItem[a] == "D"){
                    E4 = E4 + 1;
                }else if(chouseItem[a] == "E"){
                    E5 = E5 + 1;
                }
            }else if(a >= 25 && a < 30){
                if(chouseItem[a] == "A"){
                    F1 = F1 + 1;
                }else if(chouseItem[a] == "B"){
                    F2 = F2 + 1;
                }else if(chouseItem[a] == "C"){
                    F3 = F3 + 1;
                }else if(chouseItem[a] == "D"){
                    F4 = F4 + 1;
                }else if(chouseItem[a] == "E"){
                    F5 = F5 + 1;
                }
            }else if(a >= 30 && a < 35){
                if(chouseItem[a] == "A"){
                    G1 = G1 + 1;
                }else if(chouseItem[a] == "B"){
                    G2 = G2 + 1;
                }else if(chouseItem[a] == "C"){
                    G3 = G3 + 1;
                }else if(chouseItem[a] == "D"){
                    G4 = G4 + 1;
                }else if(chouseItem[a] == "E"){
                    G5 = G5 + 1;
                }
            }else if(a >= 35 && a < 40){
                if(chouseItem[a] == "A"){
                    H1 = H1 + 1;
                }else if(chouseItem[a] == "B"){
                    H2 = H2 + 1;
                }else if(chouseItem[a] == "C"){
                    H3 = H3 + 1;
                }else if(chouseItem[a] == "D"){
                    H4 = H4 + 1;
                }else if(chouseItem[a] == "E"){
                    H5 = H5 + 1;
                }
            }
        }
        languageNum = A1*5 + A2*4 + A3*3 + A4*2 + A5;
        MathNum = B1*5 + B2*4 + B3*3 + B4*2 + B5;
        visionNum = C1*5 + C2*4 + C3*3 + C4*2 + C5;
        motionNum = D1*5 + D2*4 + D3*3 + D4*2 + D5;
        musicNum = E1*5 + E2*4 + E3*3 + E4*2 + E5;
        contactNum = F1*5 + F2*4 + F3*3 + F4*2 + F5;
        cognitionNum = G1*5 + G2*4 + G3*3 + G4*2 + G5;
        observationNum = H1*5 + H2*4 + H3*3 + H4*2 + H5;
    }
    //end 结果计算

    //保存答案
    function Answersave() {
        var dataPost = {
            "evaluationId":2,
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
            "evaluationId":2,
            "evaluationResultList[0].groupId":1,
            "evaluationResultList[0].score":languageNum,
            "evaluationResultList[1].groupId":2,
            "evaluationResultList[1].score":MathNum,
            "evaluationResultList[2].groupId":3,
            "evaluationResultList[2].score":visionNum,
            "evaluationResultList[3].groupId":4,
            "evaluationResultList[3].score":motionNum,
            "evaluationResultList[4].groupId":5,
            "evaluationResultList[4].score":musicNum,
            "evaluationResultList[5].groupId":6,
            "evaluationResultList[5].score":contactNum,
            "evaluationResultList[6].groupId":7,
            "evaluationResultList[6].score":cognitionNum,
            "evaluationResultList[7].groupId":8,
            "evaluationResultList[7].score":observationNum
        };
        $.ajax({
            url:url + "wx/evaluation/update",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if(data.status == true){
                    tip = "提交成功";
                    adress = url + "guorenTeach/reportingResult.html" + "?evaluationId=" + 2 + "&?studentId=" + window.localStorage.getItem("studentId");
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
    //储存结果
});

