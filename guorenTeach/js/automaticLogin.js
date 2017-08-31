/**
 * Created by zy on 2017/3/30.
 */
var automaticData;
automaticLogin();
function automaticLogin() {
    var url = "http://guoren.ueasier.com/";
    var index = location.search.indexOf("&") - 6;
    var code = location.search.substr(6,index);
    var datapost = {
        code:code
    };
    if(code == ""){

    }else{
        $.ajax({
            url:url+"wx/account/autologin",
            type:'POST',
            data:datapost,
            async:false,
            dataType:'json',
            success:function (data) {
                if(data.status == true){
                    automaticData = data;
                    code = "";
                    if(automaticData.data.cityId != null){
                        window.localStorage.setItem("openid",automaticData.data.openid);
                        window.localStorage.setItem("status","true");
                        window.localStorage.setItem("studentId",data.data.id);
                        window.localStorage.setItem("mobilePhone",data.data.mobilePhone);
                        window.localStorage.setItem("name",data.data.name);
                        window.localStorage.setItem("provinceId",data.data.provinceId);
                        window.localStorage.setItem("provinceName",data.data.provinceName);
                        window.localStorage.setItem("cityId",data.data.cityId);
                        window.localStorage.setItem("cityName",data.data.cityName);
                        window.localStorage.setItem("schoolId",data.data.schoolId);
                        window.localStorage.setItem("schoolName",data.data.schoolName);
                        window.localStorage.setItem("grade",data.data.grade);
                    }else{
                        window.localStorage.setItem("openid",automaticData.data.openid);
                    }
                }else if(data.status == false && data.data == null){
                    // window.open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect","_self");
                }else if(data.status == false && data.data != null){
                    window.localStorage.setItem("openid",data.data.openid);
                }
            },
            xhrFields: {
                withCredentials: true    // 此字段标识要跨域传数据
            },
            crossDomain: true
        });
    }

}

