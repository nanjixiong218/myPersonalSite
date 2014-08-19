/**
 * Created by Administrator on 2014/8/15.
 */

var sanitize = require('validator').sanitize;
var config = require('../config.js');
var EventProxy = require('eventproxy');
var Topic = require('../proxy/topic');
var Tag = require('../proxy/tag');
var TopicTag = require('../proxy/topic_tag');


exports.index = function(req,res,next){
    var topic_id = req.params.tid;
    var ep = EventProxy.create('topic','topic_tags','all_tags',function(topic,topic_tags,all_tags){
        console.log(topic_tags.length);
        res.render("topic/index",{
            topic:topic,
            topic_tags:topic_tags,
            all_tags:all_tags
        });
    });
    ep.fail(next);
    Topic.getTopicById(topic_id,ep.done(function(topic){
        topic.visit_count += 1;
        topic.save();//你妹啊，这里提示没有save方法，是因为没有用findOne进行查找，得到的是数组
        ep.emit("topic",topic);
        Topic.getTagsByTopicId(topic._id,ep.done("topic_tags"));
        Tag.getAllTags(ep.done("all_tags"));
    }));

};

exports.list = function (req,res,next){
    var page = parseInt(req.query.page,10)||1;
    page = page>0?page:1;
    var limit = config.config.limit;
    console.log(limit);
    var ep = EventProxy.create('topics','all_tags','pages',function(topics,all_tags,pages){
        res.render('topic/list',{
            topics:topics,
            all_tags:all_tags,
            pages:pages,
            current_page:page,
            base:'/blog'
        });
    });
    Topic.getTopicsByQuery({},null,{skip:limit*(page-1),limit:limit,sort:{create_at:-1}},ep.done("topics"));
    Tag.getAllTags(ep.done("all_tags"));
    Topic.getCountByQuery({},function(err,count){
        var pages = Math.ceil(count / limit);
        ep.emit("pages",pages);
    });

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
            res.redirect('/blog/topic/'+topic._id);
        };
        var ep = EventProxy.create('tags_save',render);
        ep.fail(next);
        var tags_saved = function(){
            ep.emit("tags_save");
        };
        ep.after('tag_save',tags.length,tags_saved);//这里替换成ep.done("tags_save");居然不行？
        tags.forEach(function(tag,i){
            console.log(topic._id);
            TopicTag.newAndSave(topic._id,tag,function(){
                ep.emit("tag_save");
            });
            Tag.getTagById(tag,function(err,tag){
                tag.topic_count++;
                tag.save();
            });
        });
    });

};