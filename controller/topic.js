/**
 * Created by Administrator on 2014/8/15.
 */

var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var Topic = require('../proxy/topic');
var Tag = require('../proxy/tag');
var TopicTag = require('../proxy/topic_tag');


exports.index = function(req,res,next){
    var topic_id = req.params.tid;

    var ep = EventProxy.create('topic','topic_tags','all_tags',function(topic,topic_tags,all_tags){
        res.render("topic/index",{
            topic:topic,
            topic_tag:topic_tags,
            all_tags:all_tags
        });
    });
    ep.fail(next);
    Topic.getTopicById(topic_id,ep.done(function(topic){
        topic.visit_count++;
        topic.save();
        ep.emit("topic");
    }));
    Topic.getTagsByTopicId(topic._id,ep.done("topic_tags"));
    Tag.getAllTags(ep.done("all_tags"));
};

exports.create = function(req,res,next){
    Tag.getAllTags(function(err,tags){
        res.render('topic/edit',{tags:tags});
    });
};


exports.add = function (req,res,next){
    var title = req.body.title.trim();
    var content = req.body.content.trim();
    var tags = req.body.tags.split(',');//tags是数组

    Topic.newAndSave(title,content,function(err,topic){
        var render = function(){
            console.log("in");
            res.redirect('/blog/topic/'+topic._id);
        };
        var ep = EventProxy.create('tags_save',render);
        ep.fail(next);
        var tags_saved = function(){
            console.log("savedone");
            ep.emit("tags_save");
        };
        ep.after('tag_save',tags.length,tags_saved);//这里替换成ep.done("tags_save");居然不行？
        tags.forEach(function(tag,i){

            TopicTag.newAndSave(topic._id,tag,function(){
                console.log(i);
                ep.emit("tag_save");
            });
            Tag.getTagById(tag,function(err,tag){
                tag.topic_count++;
                tag.save();
            });
        });
    });

};