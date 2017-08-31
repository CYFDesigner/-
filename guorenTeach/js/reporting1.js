/**
 * Created by zy on 2017/5/4.
 */
$(function () {
    var page = 0;
    var pageold = [];
    var chouseItem = [];
    var chouseNum = 0;
    var A1number = 0;
    var B1number = 0;
    var C1number = 0;
    var D1number = 0;
    var A2number = 0;
    var B2number = 0;
    var C2number = 0;
    var D2number = 0;
    var redNumber;
    var blueNumber;
    var yellowNumber;
    var greenNumber;
    var record = [];
    var characterContent = {
        question:[
            "1.关于人生观我的内心其实是:",
            "2.如果爬山旅游，在下山回来的路线选择上，我更在乎:",
            "3.通常在陈述一件事上，别人认为我:",
            "4.在生活大多数时候，我其实更加希望:",
            "5.我认为自己在情感上的基本特点是:",
            "6.我以为自己除了学习以外，在控制欲上面，我:",
            "7.当与同学交往时，我最希望:",
            "8.在人际交往时，我:",
            "9.我认为自己为人更是:",
            "10.通常我完成任务的方式是:",
            "11.如果有人深深惹恼我时，我:",
            "12.在人际关系中，我希望得到一群人的:",
            "13.在学习上，我表现出更多的是:",
            "14.我过往老师最有可能对我的评价是:",
            "15.朋友对我的评价最有可能的是:",
            "16.在帮助他人的问题上，我倾向于:",
            "17.面对他人对自己的赞美，我的本能反应是:",
            "18.面对生活的现状，我更倾向于:",
            "19.对于规则，我内心的态度是:",
            "20.我认为自己在做事上:",
            "21.在面对压力时，我比较倾向于选用:",
            "22.当结束一段刻骨铭心的感情时我会:",
            "23.面对他人的倾诉，我回顾自己大多时候本能上倾向于:",
            "24.我在以下哪个群体中谈话较感满足:",
            "25.我觉得学习:",
            "26.如果我是班长，我内心更希望在同学心目中，我是:",
            "27.我希望得到的认同方式是:",
            "28.当我还是个孩子时，我:",
            "29.如果我是父母，我也许是:",
            "30.以下有四组语言，符合我感觉的数目最多的是:"
        ],
        answer:{
            1:{
                A:"重视人生体验，所以想法极多",
                B:"目标明确，一旦确定就坚持到底",
                C:"无论做什么，人生必须得有所成",
                D:"随遇而安，轻松就好"
            },
            2:{
                A:"要好玩有趣，不愿重复，所以宁愿走新路线",
                B:"要安全稳妥，担心危险，所以宁愿走原路线",
                C:"要挑战自我，喜欢冒险，所以宁愿走新路线",
                D:"要方便省心，害怕麻烦，所以宁愿走原路线"
            },
            3:{
                A:"印象深刻，有时可能会略显紧张",
                B:"表达准确",
                C:"直奔主题，有时可能太过直接让别人不舒服",
                D:"温和，让周围人很舒服"
            },
            4:{
                A:"刺激与众不同",
                B:"安全，循规蹈矩",
                C:"挑战，有强烈的赢的欲望",
                D:"稳定知足"
            },
            5:{
                A:"情绪多变，喜怒无常",
                B:"外表自我抑制强，但内心感情起伏大，一旦挫伤难以平复",
                C:"感情不拖泥带水，较直接，一旦不稳定，容易发怒",
                D:"天性四平八稳"
            },
            6:{
                A:"有感染带动他人的欲望，但自控能力不强",
                B:"用规则来要求自己和他人",
                C:"希望别人服从我",
                D:"从不去管别人"
            },
            7:{
                A:"一起做喜欢的事情，开心自由",
                B:"默契，了解彼此的需求",
                C:"沟通重要的想法，尽情地辩论事情",
                D:"尊重并喜欢倾听"
            },
            8:{
                A:"心态开放，可快速建立起人际关系",
                B:"非常审慎缓慢地进入，一旦认为是朋友便会长久",
                C:"希望在人际关系中占主导地位",
                D:"顺其自然，不温不火，相对被动"
            },
            9:{
                A:"感情丰富",
                B:"思路清晰",
                C:"做事直接",
                D:"为人温和"
            },
            10:{
                A:"经常是赶在最后期限前的一刻完成",
                B:"自己精确地做，不麻烦别人",
                C:"最快速做完，再找下一个任务",
                D:"按部就班，需要时从他人处得到帮忙"
            },
            11:{
                A:"内心受伤，认为不可能原谅，但最终可能还是会原谅对方",
                B:"如此之深的愤怒不会忘记，同时未来完全避开那个家伙",
                C:"火冒三丈，内心期望有机会狠狠地回应",
                D:"避免摊牌，因为还不到那个地步"
            },
            12:{
                A:"赞美欢迎",
                B:"理解欣赏",
                C:"尊敬",
                D:"接纳尊重"
            },
            13:{
                A:"热忱，有很多想法且很有灵性",
                B:"完美精确且为人可靠",
                C:"坚强而有推动力",
                D:"有耐心且适应性强"
            },
            14:{
                A:"情绪起伏大，善于表达和抒发情感",
                B:"严格保护自己的私密，有时会显得孤独或是不合群",
                C:"动作敏捷又独立，且喜欢自己做事情",
                D:"看起来轻松，反应度偏低，比较温和"
            },
            15:{
                A:"喜欢对朋友倾诉事情，也能感染别人",
                B:"能够提出很多问题，而且需要许多精细的解说",
                C:"直接表达想法，有时会直率地谈论不喜欢的人事物",
                D:"通常与他人一起时是多听少说"
            },
            16:{
                A:"我不主动，但若他来找我，那我就帮",
                B:"值得帮助的人就帮，并且绝不拖拉",
                C:"无关者何必帮，但我若承诺，必完成",
                D:"虽无英雄打虎胆，常有自告奋勇心"
            },
            17:{
                A:"没有也无所谓，欣喜也不至于",
                B:"我不需要那些赞美",
                C:"有点怀疑对方是否认真或立即回避众人的关注",
                D:"赞美是一件多么令人愉悦的事"
            },
            18:{
                A:"外面发生什么都与我无关，我觉得自己这样还行",
                B:"这个世界如果我不进步，别人就会进步，所以我需要不停前进",
                C:"在所以的问题未发生前，就应该尽量想好所有的可能性",
                D:"每天的生活，努力开心快乐最重要"
            },
            19:{
                A:"不愿违反规则，但可能因为松散而无法达到规则要求",
                B:"打破规则，希望由自己来制定规则，而不是遵守规则",
                C:"严格遵守规则，并竭尽全力做到规则内的最好",
                D:"不喜欢被规则束缚，不按规则出牌，会觉得新鲜有趣"
            },
            20:{
                A:"慢条斯理，按部就班，能与周围协调一致",
                B:"目标明确，集中精力为实现目标而努力，善于抓住核心",
                C:"慎重小心，为做好预防及善后，会尽心操劳",
                D:"丰富跃动，倾向于快速反应"
            },
            21:{
                A:"眼不见为净",
                B:"压力越大，抵抗力越大",
                C:"在自己的内心慢慢地咀嚼压力",
                D:"本能地回避压力，回避不掉，就用各种方法宣泄出去"
            },
            22:{
                A:"日子总要过，时间会冲淡一切",
                B:"虽然受伤，但一旦下定决心，就会努力把过去的影子甩掉",
                C:"深陷悲伤，在相当长的时期里难以自拔，也不愿再接受新的人",
                D:"痛不欲生，需要找朋友倾诉，寻求化解之道"
            },
            23:{
                A:"静静地听，认同对方感受",
                B:"做出定论，并直接给予解决方法",
                C:"给予分析或推理，安抚他",
                D:"发表评论和意见，与对方的情绪共起落"
            },
            24:{
                A:"能心平气和大家达成一致的",
                B:"直截了当，就事论事，能彼此展开充分激烈的辩论",
                C:"能详细讨论事情的来龙去脉",
                D:"能随意无拘束地开心地自由谈话"
            },
            25:{
                A:"最好没有压力，让我做我熟悉的工作就不错",
                B:"是达成人生目标和成就的最重要的途径",
                C:"要么不做吗，要做就做到最好",
                D:"如果能将乐趣融合在学习中，那就太棒了，如果是不喜欢的学起来实在没劲"
            },
            26:{
                A:"可以亲近的和善于为他们着想的",
                B:"有很强的能力和富有领导力的",
                C:"公平公正且足以信赖的",
                D:"被他们喜欢并且觉得富有感召力的"
            },
            27:{
                A:"有无皆可",
                B:"精英的认同最重要",
                C:"只要我认同的人或我在乎的人认同就可",
                D:"最好大家都能认同"
            },
            28:{
                A:"不太会积极尝试新事物，通常比较喜欢旧有的和熟悉的",
                B:"是孩子王，大家经常听我的决定",
                C:"害羞见生人，有意识地回避",
                D:"调皮可爱，在大部分的情况下是热心的"
            },
            29:{
                A:"不愿干涉子女或易被说动的",
                B:"严厉的或直接给予方向指点的",
                C:"用行动代替语言来表达关爱或高要求的",
                D:"愿意陪孩子一起玩，孩子的朋友们所喜欢和欢迎的"
            },
            30:{
                A:"最深刻的真理是最简单和最平凡的。<br />要在人世间取得成功必须大智若愚。<br />好脾气是一个人在社交中所能穿着的最佳服饰。<br />知足是人生在世最大的幸福。",
                B:"走自己的路，让人家去说吧。<br />虽然世界充满了苦难，但苦难总能被战胜。<br />有所成就就是人生唯一真正的乐趣。<br />对我而言解决一个问题和享受一个假期一样好。",
                C:"一个不注意小事的人，永远不会成就大事。<br />理智是灵魂中最高贵的因素。<br />切忌浮夸，与其说得过分，不如说得不全。<br />谨慎比大胆要有力量得多。",
                D:"与其在死的时候握着一大把钱，还不如活的时候活得丰富多彩。<br />任何时候都要最真实地对待你自己，这比什么都重要。<br />使生活变成幻想，再把幻想化为现实。<br />体验各种不同的经历是人生莫大的快乐。"
            }
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
        question.text(characterContent.question[pageNum]);
        answer1.html("A." + characterContent.answer[pageNum+1].A);
        answer2.html("B." + characterContent.answer[pageNum+1].B);
        answer3.html("C." + characterContent.answer[pageNum+1].C);
        answer4.html("D." + characterContent.answer[pageNum+1].D);
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
            if(a < 15){
                if(chouseItem[a] == "A"){
                    A1number = A1number + 1;
                }else if(chouseItem[a] == "B"){
                    B1number = B1number + 1;
                }else if(chouseItem[a] == "C"){
                    C1number = C1number + 1;
                }else if(chouseItem[a] == "D"){
                    D1number = D1number + 1;
                }
            }else{
                if(chouseItem[a] == "A"){
                    A2number = A2number + 1;
                }else if(chouseItem[a] == "B"){
                    B2number = B2number + 1;
                }else if(chouseItem[a] == "C"){
                    C2number = C2number + 1;
                }else if(chouseItem[a] == "D"){
                    D2number = D2number + 1;
                }
            }
        }
        redNumber = A1number + D2number;
        blueNumber = B1number + C2number;
        yellowNumber = C1number + B2number;
        greenNumber = D1number + A2number;
    }
    //end 结果计算

    //保存答案
    function Answersave() {
        var dataPost = {
            "evaluationId":1,
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
            "evaluationId":1,
            "evaluationResultList[0].groupId":1,
            "evaluationResultList[0].score":redNumber,
            "evaluationResultList[1].groupId":2,
            "evaluationResultList[1].score":blueNumber,
            "evaluationResultList[2].groupId":3,
            "evaluationResultList[2].score":yellowNumber,
            "evaluationResultList[3].groupId":4,
            "evaluationResultList[3].score":greenNumber
        };
        $.ajax({
            url:url + "wx/evaluation/update",
            type:"POST",
            data:dataPost,
            dataType:"json",
            success:function (data) {
                if(data.status == true){
                    tip = "提交成功";
                    adress = url + "guorenTeach/reportingResult.html" + "?evaluationId=" + 1 + "&?studentId=" + window.localStorage.getItem("studentId");
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
