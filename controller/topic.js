/**
 * Created by Administrator on 2014/8/15.
 */

var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var Topic = require('../proxy/topic');


exports.index = function(req,res,next){
    Topic.get
};


exports.createTopic = function (req,res,next){
    var title = req.body.title.trim();
    var content = req.body.content.trim();

    Topic.newAndSave(title,content,function(err,topic){
        console.log(topic.title);
        res.render('topic/index',{topic:topic});
    });
};