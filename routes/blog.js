/**
 * Created by Administrator on 2014/8/15.
 */
var express = require('express');
var router = express.Router();
var Topic = require('../controller/topic');

router.get('/',function(req,res,next){
    res.render('blog');
});
router.get('/topic',function(req,res,next){
    res.send("topic");
});

router.post('/topic',Topic.createTopic);

module.exports = router;
