$(function() {
    //for touch event
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

    //生成随机整数函数
    function rnd(start, end){
        return Math.floor(Math.random() * (end - start) + start);
    }
    //文字进入特效数组
    var inClassArray = ['enter-up-bounce','dance','pulse-slow', 'journal', 'jamp'];
    var temLength = inClassArray.length;


    //logic for page switch
    var curpage=1;
    var totalpage, nextpage, lastpage;
    //获取总页数,以及总页数的+1后的序号，供后面for循环使用
    totalpage = $(".page").length;

    function switchPage(toward) {
            if(toward=="up"){
                nextpage = curpage + 1;
                lastpage = curpage - 1;
                if(curpage == totalpage) {
                    nextpage = 1;
                }
                if(curpage == 1) {
                    lastpage = totalpage;
                }
                var inClass ="flip-bottom";
                var outClass="flip-top";
            }else if(toward=="down"){
                if(curpage == 1){
                    return false;
                }
                nextpage = curpage - 1; 
                lastpage = curpage + 1;         
                var outClass ="flip-top";
                var inClass="flip-bottom";
            }
            $(".page" + curpage).removeClass(inClass);
            $(".page" + curpage).addClass(outClass);
            $(".page" + curpage).removeClass("show");
            $(".page" + curpage).addClass("hide");
            $(".page" + nextpage).removeClass("hide");
            $(".page" + nextpage).addClass("show");
            $(".page" + nextpage).addClass(inClass);
            $(".page" + lastpage).removeClass(outClass);
            //为文字添加随机特效
            clearTextAnimation();
            var randomNum = rnd(0,temLength);
            setTimeout(function(){
                $(".textbox"+nextpage).css('display','block');
                $(".textbox"+nextpage).addClass(inClassArray[curpage-1]);
            },300);
            
            curpage = nextpage;
    }

    function clearTextAnimation() {
        $('.page>div').each(function (i) {
            $(this).css({ 'visibility': 'hidden' });
            $(this).attr('class', 'textbox'+(i+1));
        });
    }

    $(document).swipeUp(function(){
        switchPage("up");
    })

    $(document).swipeDown(function(){
        switchPage("down");
    })
})