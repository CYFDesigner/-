/**
 * Created by zy on 2017/3/21.
 */
$(function () {
    var hideBox = $(".selectBox");

    //分别承装省会、城市、学校、年级选中的文字
    var city;
    var province;
    var school;
    var grade;
    //end 分别承装省会、城市、学校、年级选中的文字

    //分别承装省会、城市、学校、年级数据的盒子
    var dataProvince;
    var dataCity;
    var dataSchool;
    var dataSubmit;
    //end 分别承装省会、城市、学校、年级数据的盒子

    //分别承装省会、城市、学校、年级发送数据的盒子
    var ProvincePost;
    var CityPost;
    var SchoolPost;
    var gradePost;
    if(window.localStorage.getItem("provinceId") == ""){
        ProvincePost = {
            provinceId:2
        };
        CityPost = {
            cityId:37
        };
        SchoolPost = {
            schoolId:1
        };
        gradePost = {
            grade:1
        };
    }else{
        ProvincePost = {
            provinceId:window.localStorage.getItem("provinceId")
        };
        CityPost = {
            cityId:window.localStorage.getItem("cityId")
        };
        SchoolPost = {
            schoolId:window.localStorage.getItem("schoolId")
        };
        gradePost = {
            grade:window.localStorage.getItem("grade")
        };
    }

    var SubmitPost;
    //end 分别承装省会、城市、学校、年级发送数据的盒子

    function readId() {
        dataRequest();
        var myProvinceId = window.localStorage.getItem("provinceId");
        var myProvinceName = window.localStorage.getItem("provinceName");
        var myCityId = window.localStorage.getItem("cityId");
        var myCityName = window.localStorage.getItem("cityName");
        var mySchoolId = window.localStorage.getItem("schoolId");
        var mySchoolName = window.localStorage.getItem("schoolName");
        var myGradeId = window.localStorage.getItem("grade");
        if(myProvinceId == ""){
            $("#addressBox").val("");
            $("#schoolBox").val("");
            $("#gradeBox").val("");
        }else{
            //将个人信息的ID赋值
            ProvincePost = {
                provinceId:myProvinceId
            };
            CityPost = {
                cityId:myCityId
            };
            SchoolPost = {
                schoolId:mySchoolId
            };
            gradePost = {
                grade:myGradeId
            };
            //end 将个人信息的ID赋值

            //将个人信息的名字赋值
            province = myProvinceName;
            city = myCityName;
            school = mySchoolName;
            grade = myGradeId;
            //end 将个人信息的名字赋值

            //将个人信息框内容显示
            var gradeBox = $("#gradeBox");
            $("#addressBox").val(myProvinceName + "/" + myCityName);
            $("#schoolBox").val(mySchoolName);
            gradeBox.val(myGradeId);
            if(myGradeId == "1"){
                gradeBox.val("高一");
                grade = "高一";
            }else if(myGradeId == "2"){
                gradeBox.val("高二");
                grade = "高二";
            }else if(myGradeId == "3"){
                gradeBox.val("高三");
                grade = "高三";
            }
            //end 将个人信息框内容显示
            var GradeBox = $(".grade");
            for(var a = 0;a < GradeBox.find("li").length+1;a++){
                GradeBox.find("li").eq(a-1).attr("gradeid",a);
            }
            if (gradePost.grade == ""){
                GradeBox.find("li").eq(0).addClass("gradeActive");
            }else{
                GradeBox.find("li").each(function () {
                    if ($(this).attr("gradeid") == gradePost.grade){
                        $(this).addClass("gradeActive");
                    }
                })
            }
        }
    }
    readId();

    function itemClick() {
        var ProvinceActive = $(".ProvinceActive");
        //下拉盒子点击隐藏
        hideBox.bind("click",function (e) {
            hideBox.fadeOut();
            e.stopImmediatePropagation();
        });
        //end 下拉盒子点击隐藏

        //绑定年级点击事件

        var grade = $(".grade");
        var gradeItem = grade.find("li");
        grade.find("li").bind("click",function (e) {
            gradeItem.removeClass("gradeActive");
            $(this).addClass("gradeActive");
            gradePost = {
                grade:$(this).attr("gradeid")
            };
            grade = $(".gradeActive").text();
            $("#gradeBox").val(grade);
            hideBox.fadeOut();
            e.stopImmediatePropagation();
        });
        //end 绑定年级点击事件

        //绑定个人信息点击事件
        $(".formBox input").bind("click",function (e) {
            $(this).blur();
            var signOut = $(".signOutShow");
            if($(this).attr("class") == "addressBox"){
                hideBox.fadeIn();
                $(".ProvinceBox").show();
                $(".schoolSelectBox").hide();
                $(".gradeSelectBox").hide();
            }else if($(this).attr("class") == "schoolBox"){
                if($("#addressBox").val() == ""){
                    tip = "请先选择省会/城市";
                    pageTip(tip);
                }else{
                    hideBox.fadeIn();
                    $(".schoolSelectBox").show();
                    $(".ProvinceBox").hide();
                    $(".gradeSelectBox").hide();
                }
            }else if($(this).attr("class") == "gradeBox"){
                if($("#schoolBox").val() == ""){
                    tip = "请先选择所在学校";
                    pageTip(tip);
                }else{
                    hideBox.fadeIn();
                    // for(var i = 1;i < gradeItem.length + 1;i++){
                    //     gradeItem.eq(i-1).attr("gradeid",i);
                    // }
                    // var GradeBox = $(".grade");
                    // if (gradePost.grade == ""){
                    //     GradeBox.find("li").eq(0).addClass("gradeActive");
                    // }else{
                    //     GradeBox.find("li").each(function () {
                    //         if ($(this).attr("gradeid") == gradePost.grade){
                    //             $(this).addClass("gradeActive");
                    //         }
                    //     })
                    // }
                    $(".gradeSelectBox").show();
                    $(".ProvinceBox").hide();
                    $(".schoolSelectBox").hide();
                }
            }
            e.preventDefault();
        });
        //end 绑定个人信息点击事件
    }

    //请求省会数据
    function dataRequest(){
        $.ajax({
            url:url + "wx/region/province/list",
            type:'GET',
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataProvince = data;
                    appendProvince();
                    var ProvinceActive = $(".ProvinceActive");
                    ProvincePost = {
                        provinceId:ProvinceActive.attr("provinceId")
                    };
                    cityData();
                    //绑定省会点击事件
                    $(".Province li").bind("click",function (e) {
                        $(".Province li").removeClass("ProvinceActive");
                        $(this).addClass("ProvinceActive");
                        province = $(this).text();
                        ProvincePost = {
                            provinceId:$(this).attr("provinceId")
                        };
                        CityPost = {};
                        cityData();
                        e.stopImmediatePropagation();
                    });
                    //end 绑定省会点击事件
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
    }
    //end 请求省会数据

    //请求城市数据
    function cityData() {
        $.ajax({
            url:url + "wx/region/city/list",
            type:'GET',
            data:ProvincePost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataCity = data;
                    appendCity();
                    var CityActive = $(".CityActive");
                    CityPost = {
                        cityId:CityActive.attr("cityId")
                    };
                    schoolData();
                    //绑定城市点击事件
                    $(".City li").bind("click",function (e) {
                        $(".City li").removeClass("CityActive");
                        $(this).addClass("CityActive");
                        city = $(this).text();
                        CityPost = {
                            cityId:$(this).attr("cityId")
                        };
                        schoolData();
                        province = $(".ProvinceActive").text();
                        $("#addressBox").val(province + "/" + city);
                        $("#schoolBox").val("");
                        $("#gradeBox").val("");
                        hideBox.fadeOut();
                        e.stopImmediatePropagation();
                    });
                    //end 绑定城事点击事件
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
    //end 请求城市数据

    //请求学校数据
    function schoolData() {
        $.ajax({
            url:url + "wx/school/list",
            type:'GET',
            data:CityPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataSchool = data;
                    appendSchool();
                    var SchoolActive = $(".schoolActive");
                    SchoolPost = {
                        schoolId:SchoolActive.attr("schoolid")
                    };
                    //绑定学校点击事件
                    $(".school li").bind("click",function (e) {
                        $(".school li").removeClass("schoolActive");
                        $(this).addClass("schoolActive");
                        school = $(this).text();
                        SchoolPost = {
                            schoolId:$(this).attr("schoolid")
                        };
                        $("#schoolBox").val(school);
                        hideBox.fadeOut();
                        e.stopImmediatePropagation();
                    });
                    //end 绑定学校点击事件
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
    //end 请求城市数据

    //完成提交
    function submitData() {
        SubmitPost = {
            cityId:CityPost.cityId,
            schoolId:SchoolPost.schoolId,
            grade:gradePost.grade
        };
        $.ajax({
            url:url + "wx/account/update",
            type:'POST',
            data:SubmitPost,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    dataSubmit = data;
                    window.localStorage.setItem("cityId",CityPost.cityId);
                    window.localStorage.setItem("cityName",city);
                    window.localStorage.setItem("provinceId",ProvincePost.provinceId);
                    window.localStorage.setItem("provinceName",province);
                    window.localStorage.setItem("schoolId",SchoolPost.schoolId);
                    window.localStorage.setItem("schoolName",school);
                    window.localStorage.setItem("grade",gradePost.grade);
                    tip = "信息修改成功";
                    adress = "guorenTeach/userCenter.html";
                    pageTip(tip,adress);
                }else{
                    var openUrl = url + "guorenTeach/myInfo.html";
                    loginFalse(openUrl);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        })
    }
    //end 完成提交

    //添加省会列表
    function appendProvince() {
        var ProvinceBox = $(".Province");
        for(var i = 0;i < dataProvince.data.length;i++){
            $("<li></li>").text(dataProvince.data[i].name).attr("provinceId",dataProvince.data[i].id).appendTo(ProvinceBox);
        }
        if (ProvincePost.provinceId == ""){
            ProvinceBox.find("li").eq(0).addClass("ProvinceActive");
        }else{
            ProvinceBox.find("li").each(function () {
                if ($(this).attr("provinceId") == ProvincePost.provinceId){
                    $(this).addClass("ProvinceActive");
                }
            })
        }
        
    }
    //end 添加省会列表

    //添加城市列表
    function appendCity() {
        var CityBox = $(".City");
        CityBox.empty();
        for(var i = 0;i < dataCity.data.length;i++){
            $("<li></li>").text(dataCity.data[i].name).attr("cityId",dataCity.data[i].id).appendTo(CityBox);
        }
        if (CityPost.cityId == ""){
            CityBox.find("li").eq(0).addClass("CityActive");
        }else{
            CityBox.find("li").each(function () {
                if ($(this).attr("cityId") == CityPost.cityId){
                    $(this).addClass("CityActive");
                }
            })
        }

    }
    //end 添加城市列表

    //添加学校列表
    function appendSchool() {
        var SchoolBox = $(".school");
        SchoolBox.empty();
        for(var i = 0;i < dataSchool.data.length;i++){
            $("<li></li>").text(dataSchool.data[i].name).attr("schoolid",dataSchool.data[i].id).appendTo(SchoolBox);
        }
        if (SchoolPost.schoolId == ""){
            SchoolBox.find("li").eq(0).addClass("schoolActive");
        }else{
            SchoolBox.find("li").each(function () {
                if ($(this).attr("schoolid") == SchoolPost.schoolId){
                    $(this).addClass("schoolActive");
                }
            });
        }
        return SchoolPost;
    }
    //end 添加学校列表
    itemClick();

    $(".form").bind("submit",function (e) {
        if($("#addressBox").val() != "" && $("#schoolBox").val() != "" && $("#gradeBox").val() != ""){
            submitData();
        }else{
            tip = "信息不完整";
            pageTip(tip);
        }
        e.preventDefault();
    })
});