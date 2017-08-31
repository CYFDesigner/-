/**
 * Created by zy on 2017/3/15.
 */
$(function () {
   var signOut = $(".signOut");
   var dataObj;
   signOut.bind("click",function () {
       $.ajax({
           url: url + "wx/account/logout",
           type:"GET",
           dataType:"json",
           success:function (data) {
               dataObj = data;
               if(dataObj.status == true){
                   //清楚登录信息
                   window.localStorage.removeItem("openid");
                   window.localStorage.removeItem("status");
                   //end 清楚登录信息

                   //清楚用户信息
                   window.localStorage.removeItem("mobilePhone");
                   window.localStorage.removeItem("password");
                   window.localStorage.removeItem("name");
                   window.localStorage.removeItem("provinceId");
                   window.localStorage.removeItem("provinceName");
                   window.localStorage.removeItem("cityId");
                   window.localStorage.removeItem("cityName");
                   window.localStorage.removeItem("schoolId");
                   window.localStorage.removeItem("schoolName");
                   window.localStorage.removeItem("grade");
                   window.localStorage.removeItem("dataId");
                   // end 清楚用户信息

                   tip = "退出成功";
                   adress = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8d5f7a759312016&redirect_uri=http%3a%2f%2fguoren.ueasier.com%2fguorenTeach%2findex.html&response_type=code&scope=snsapi_base#wechat_redirect";
                   pageTip(tip,adress);
               }else{
                   tip = data.message;
                   pageTip(tip);
               }
           },
           error:function () {

           },
           xhrFields: {
               withCredentials: true    // 此字段标识要跨域传数据
           },
           crossDomain: true
       });

   })
});