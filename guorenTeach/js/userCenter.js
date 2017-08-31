/**
 * Created by zy on 2017/3/14.
 */
$(function () {
   var nusername = window.localStorage.getItem("name");
   $(".userName").text(nusername);
});