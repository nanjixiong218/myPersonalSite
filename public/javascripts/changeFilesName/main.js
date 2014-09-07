/**
 * Created by xu on 2014/9/5.
 */
define(function(require,exports,module){
    require("$");
    exports.init = function(){
        function initFs(fs){
            console.log(fs);
            fs.root.getDirectory('../../../../webFile',{create:true},function(dir){
                console.log(dir.isDirectory);
            },errorHandle);
        }
        function errorHandle(err){
            console.log(err);
        }
        window.webkitRequestFileSystem(window.TEMPORARY,1024*1024,initFs,errorHandle);
    }
});