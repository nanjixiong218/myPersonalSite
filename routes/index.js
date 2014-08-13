var express = require('express');
var router = express.Router();

var index = require('../controller/home.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/blog',function(req,res){
    res.render('main/blog');
});

module.exports = router;
