/**
 * Created by Administrator on 2014/8/15.
 */

var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var Topic = require('../proxy/topic');
var Tag = require('../proxy/tag');
var TopicTag = require('../proxy/topic_tag');


exports.index = function(req,res,next){

};


exports.createTopic = function (req,res,next){
    var title = req.body.title.trim();
    var content = req.body.content.trim();
    var tags = req.body.tags;//tags是数组


    Topic.newAndSave(title,content,function(err,topic){
        console.log(topic.title);
        var render = function(){
            res.render('topic/'+topic._id);
        };
        var ep = EventProxy.create('tags_save',render);
        ep.fail(next);
        ep.after('tag_save',tags.length,ep.done('tags_save'));
        tags.forEach(function(tag){
            TopicTag.newAndSave(topic._id,tag,ep.done('tag_save'));
            Tag.getTagById(tag,function(tag){
                tag.topic_count++;
                tag.save();
            });
        });
    });
};