document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

//audio play automatically
function audioAutoPlay(id){
    var audio = document.getElementById(id);
    audio.play();
    //for ios    
    var play = function(){  
        var audio = document.getElementById(id);
        audio.play();  
        document.removeEventListener("touchstart",play, false);  
    };    
    document.addEventListener("WeixinJSBridgeReady", function () {  
        play();  
    }, false);  
    document.addEventListener('YixinJSBridgeReady', function() {  
        play();  
    }, false);  
    document.addEventListener("touchstart",play, false);  
}  

document.addEventListener('DOMContentLoaded', function () {
   audioAutoPlay('Jaudio');
});

var curpage=1;
var totalpage,nextpage,lastpage,nexttotalpage;

$(document).swipeUp(function(){

//判断当前页是否为最后一页

        //获取总页数,以及总页数的+1后的序号，供后面for循环使用
    totalpage = $(".page").length;
    nexttotalpage = totalpage+1;
    //如果是最后一页，显示第一页，并移除所有page上的所有css效果类，否则显示下一页，并移除上一页的切换动画效果
    if(curpage == totalpage){
        for(var i=1; i<nexttotalpage;i++){
            $(".page"+i).removeClass("hide");
            $(".page"+i).removeClass("show");
            $(".page"+i).removeClass("flip-bottom");
        }
        $(".page1").addClass("show");
        $(".page1").addClass("flip-bottom");
        curpage =1;
    }else{
        nextpage = curpage+1;
        lastpage = curpage-1;
        $(".page"+curpage).removeClass("flip-bottom");
        $(".page"+curpage).addClass("flip-top");
        $(".page"+curpage).removeClass("show");
        $(".page"+curpage).addClass("hide");
        $(".page"+nextpage).removeClass("hide");
        $(".page"+nextpage).addClass("show");
        $(".page"+nextpage).addClass("flip-bottom");
        $(".page"+lastpage).removeClass("legend-top");
        curpage = nextpage;
    }
});