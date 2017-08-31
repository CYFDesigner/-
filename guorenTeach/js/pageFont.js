/**
 * Created by zy on 2017/5/9.
 */
//适配移动端
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            docEl.style.fontSize = 5 * (clientWidth / 320) + 'px';
            if((5 * (clientWidth / 320)) > 20)docEl.style.fontSize = 30+'px';
        };

    // Abort if browser does not support addEventListener
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//end 适配移动端