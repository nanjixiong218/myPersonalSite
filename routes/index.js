var express = require('express');
var router = express.Router();

var index = require('../controller/home.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('views/static/myStarIndex.html');
});
router.get('/index', function(req, res) {
  res.render('index');
});
router.get('/about', function(req, res) {
  res.render('about');
});
router.get('/todo', function(req, res) {
  res.sendfile('views/static/ng-todo.html');
});

module.exports = router;
