/**
 * Created by Administrator on 2014/8/16.
 */
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var Tag = require('../proxy/tag');
var TopicTag = require('../proxy/topic_tag');
var Topic = require('../proxy/topic');
var config = require('../config.js');


exports.createTag = function(req,res,next){
    var name = req.body.name.trim();
    var order = parseInt(req.body.order);
    var description = req.body.description.trim();
    Tag.newAndSave(name,order,description,function(err,tag){
        if(err){
            next(err);
        }else{
            res.render('tag/edit');
        }
    });
};
exports.listTopic = function(req,res,next){
    var tag_id = req.params.tagId;
    var page = parseInt(req.query.page,10)||1;
    var limit = config.config.limit;
    console.log(page);
    var ep = EventProxy.create('topic_ids','all_tags','pages',function(topic_ids,all_tags,pages){
        var opt = {skip:limit*(page-1),limit:limit,sort:{create_at:-1}};
        Topic.getTopicsByQuery({_id:{'$in':topic_ids}},null,opt,function(err,topics){
            console.log(topics.length);
            res.render('topic/list',{
                topics:topics,
                all_tags:all_tags,
                pages:pages,
                current_page:page,
                base:'/tag/list_topic/'+tag_id
            });
        });

    });

    Tag.getTopicsByTagId(tag_id,function(err,topics){
        var topic_ids = [];
        topics.forEach(function(topic){
            topic_ids.push(topic._id);
        });
        ep.emit("topic_ids",topic_ids);
        var count = topics.length;
        var pages = Math.ceil(count/limit);
        ep.emit("pages",pages);
    });
    Tag.getAllTags(ep.done("all_tags"));
};
