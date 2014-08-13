$(document).ready(function(){
		$('.mp-slider')._TMS({
			show:0,
			pauseOnHover:false,
			prevBu:'.mp-prev',
			nextBu:'.mp-next',
			duration:1000,
			preset:'simpleFade',
			pagination:false,//'.pagination',true,'<ul></ul>'
			pagNums:false,
			slideshow:7000,
			numStatus:false,
			banners:'fade',// fromLeft, fromRight, fromTop, fromBottom
			waitBannerAnimation:false
		});
        var video = document.getElementById("video1");
        var played = function(event){
            document.getElementById("audio1").pause();
        };
        var paused = function(event){
            document.getElementById("audio1").play();
        };
        function addEvent(el){
            if(el.addEventListener){
                el.addEventListener("play",played);
                el.addEventListener("pause",paused);
            }else{
                el.attachEvent("play",eve);
                el.addEventListener("pause",paused);
            }
        }
        addEvent(video);
 })