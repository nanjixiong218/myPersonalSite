var express = require('express');
var router = express.Router();

var index = require('../controller/home.js');
/* GET home page. */
router.get('/', function(req, res) {
    //好奇怪，sendfile再养在服务器上找不到,本地却可以
   //res.sendfile('views/static/myStarIndex.html');
    res.render('myStarIndex',{layout:false});
});
router.get('/index', function(req, res) {
  res.render('index');
});
router.get('/about', function(req, res) {
  res.render('about');
});
/*同样，这个在服务器上也不行
router.get('/todo', function(req, res) {
  res.sendfile('views/static/ng-todo.html');
});
*/
module.exports = router;
