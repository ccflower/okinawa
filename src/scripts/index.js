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
    var totalpage, nextpage, prepage, lastpage, nexttotalpage, pretotalpage;
    //获取总页数,以及总页数的+1后的序号，供后面for循环使用
    totalpage = $(".page").length;
    console.log(totalpage);
    nexttotalpage = totalpage + 1;
    pretotalpage = totalpage - 1;

    function switchPage(toward) {
        //如果是最后一页，显示第一页，并移除所有page上的所有css效果类，否则显示下一页，并移除上一页的切换动画效果
        if(curpage == totalpage && nextpage != pretotalpage){
            for(var i=1; i<nexttotalpage;i++){
                $(".page"+i).removeClass("hide");
                $(".page"+i).removeClass("show");
                $(".page"+i).removeClass("flip-bottom");
            }
            $(".page1").addClass("show");
            $(".page1").addClass("flip-bottom");
            //为文字添加随机特效
            clearTextAnimation();
            var randomNum = rnd(0,temLength);
            setTimeout(function(){
                $(".textbox"+1).css('display','block');
                $(".textbox"+1).addClass(inClassArray[0]);
            },500);
            curpage =1;
        }else{
            if(toward=="up"){
                console.log("up");
                nextpage = curpage + 1;
                lastpage = curpage - 1;
                console.log('lastpage: ',lastpage );
                console.log('curpage: ',curpage );
                console.log('nextpage: ',nextpage ); 
                var inClass ="flip-bottom";
                var outClass="flip-top";
            }else if(toward=="down"){
                if(curpage == 1){
                    return false;
                }
                console.log("down");
                nextpage = curpage - 1;
                lastpage = curpage + 1;
                console.log('lastpage: ',lastpage );
                console.log('curpage: ',curpage );
                console.log('nextpage: ',nextpage );          
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
            //为文字添加随机特效
            clearTextAnimation();
            var randomNum = rnd(0,temLength);
            setTimeout(function(){
                $(".textbox"+nextpage).css('display','block');
                $(".textbox"+nextpage).addClass(inClassArray[curpage-1]);
            },500);
            $(".page"+lastpage).removeClass("flip-top");
            curpage = nextpage;
        }
    }

    function clearTextAnimation() {
        $('.page>div').each(function (i) {
            $(this).css({ 'visibility': 'hidden' });
            $(this).attr('class', 'textbox'+(i+1));
        });
    }

    // $(document).swipeUp(function(){
    //     switchPage();
    // });

    $(document).swipeUp(function(){
        switchPage("up");
    })

    $(document).swipeDown(function(){
        switchPage("down");
    })
})