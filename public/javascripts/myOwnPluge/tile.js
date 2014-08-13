/**
 * Created by xu695_000 on 2014/6/13.
 */
!function($){
    "use strict";
    var Tile = function(element,options) {
        this.$element = $(element);
        this.options = options;

        this.frames = this.$element.children(".tile-content");

        this.currentIndex = 0;
        this.interval = 0;
        this.size = {
            "width": this.$element.width(),
            "height": this.$element.height()
        };
        //完整性检测
        if (this.options.direction == undefined) {
            this.options.direction = Tile.DEFAULTS.direction;
        }
        if (this.options.period == undefined) {
            this.options.period = Tile.DEFAULTS.period;
        }
        if (this.options.duration == undefined) {
            this.options.duration = Tile.DEFAULTS.duration;
        }
        if (this.options.easing == undefined) {
            this.options.easing = Tile.DEFAULTS.easing;
        }
        //默认过度效果？
        $.easing.doubleSqrt = function(t){
            return Math.sqrt(Math.sqrt(t));
        }

    }


        Tile.DEFAULTS = {
            direction:"slideLeft",
            period:3000,
            duration:700,
            easing:"doubleSqrt"
        }

        Tile.prototype.start=function(){
            var that = this;
            this.interval = setInterval(function(){
                that.animate();
            },that.options.period);
        }
        Tile.prototype.pause = function(){
            var that =this;//这里没有必要用that了吧？
            clearInterval(that.interval);
        }
        Tile.prototype.animate = function(){
            var that = this;
            var currentFrame = this.frames[this.currentIndex];
            var nextFrame;
            this.currentIndex++;
            if(this.currentIndex>=this.frames.length){
                this.currentIndex=0;
            }
            nextFrame = this.frames[this.currentIndex];

            switch (this.options.direction){
                case "slideLeft":this.slideLeft(currentFrame,nextFrame);break;
                case "slideRight":this.slideRight(currentFrame,nextFrame);break;
                case "slideDown":this.slideDown(currentFrame,nextFrame);break;
                case "slideUpDown":this.slideUpDown(currentFrame,nextFrame);break;
                case "slideLeftRight":this.slideLeftRight(currentFrame,nextFrame);break;
                default :this.slideUp(currentFrame,nextFrame);
            }
        }
        Tile.prototype.slideLeftRight = function (currentFrame,nextFrame) {
            if(this.currentIndex%2==1){
                this.slideLeft(currentFrame,nextFrame);
            }else{
                this.slideRight(currentFrame,nextFrame);
            }
        }
        Tile.prototype.slideUpDown =function(currentFrame,nextFrame){
            if(this.currentIndex%2==1){
                this.slideUp(currentFrame,nextFrame);
            }else{
                this.slideDown(currentFrame,nextFrame);
            }
        }
        Tile.prototype.slideUp =function(currentFrame,nextFrame){
            var move = this.size.height;
            var options = {
                "duration":this.options.duration,
                "easing":this.options.easing
            };
            $(currentFrame).animate({top:-move},options);
            $(nextFrame)
                .css({top:move})
                .show()
                .animate({top:0},options);
        }
        Tile.prototype.slideDown  = function (currentFrame,nextFrame) {
            var move = this.size.height;
            var options = {
                "duration":this.options.duration,
                "easing":this.options.easing
            };
            $(currentFrame).animate({top:move},options);
            $(nextFrame)
                .css({top:-move})
                .show()
                .animate({top:0},options);
        }
        Tile.prototype.slideLeft  = function (currentFrame,nextFrame) {
            var move = this.size.width;
            var options = {
                "duration":this.options.duration,
                "easing":this.options.easing
            };
            $(currentFrame).animate({left:-move},options);
            $(nextFrame)
                .css({left:move})
                .show()
                .animate({left:0},options);
        }
        Tile.prototype.slideRight = function (currentFrame,nextFrame) {
            var move = this.size.width;
            var options = {
                "duration":this.options.duration,
                "easing":this.options.easing
            };
            $(currentFrame).animate({left:move},options);
            $(nextFrame)
                .css({left:-move})
                .show()
                .animate({left:0},options);
        }
        var old  = $.fn.tile;
        $.fn.tile = function(option){
            return this.each(function(){
                var $this =$(this);
                var data = $this.data("bs.tile");
                var options =$.extend({},Tile.DEFAULTS,$this.data(),
                typeof option=="object"&&option)

                if(!data){
                    $this.data("bs.tile",(data=new Tile(this,options)));
                }
                option === "pause" ? data.pause() : data.start();
            })
        }
        $.fn.tile.Constructor = Tile;
        $.fn.tile.noConflict=function(){
            $.fn.tile = old;
            return this;
        }

        $(window).on("load",function(){
            $("[data-toggle='tile']").each(function(){
                $(this).tile();
            });
        })


}(window.jQuery);