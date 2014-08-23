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
    var ep = EventProxy.create('topics','hot_topics','all_tags','pages',function(topics,hot_topics,all_tags,pages){
        res.render('topic/list',{
            topics:topics,
            hot_topics:hot_topics,
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
    Topic.getTopicsByQuery({},null,{limit:5,sort:{visit_count:-1}},ep.done("hot_topics"));

};


exports.edit = function(req,res,next){
    var topic_id = req.params.tid;
    console.log(topic_id);
    if(topic_id){

        var ep = EventProxy.create('topic','all_tags',function(topic,all_tags){
            res.render('topic/edit',{
                topic:topic,
                all_tags:all_tags,
                isUpdate:true
            });
        });
        Topic.getTopicById(topic_id,function(err,topic){
            ep.emit('topic',topic);
        });
        Tag.getAllTags(function(err,tags){
            Topic.getTagsByTopicId(topic_id,function(err,topic_tags){
                topic_tags.forEach(function(tagInTopic){
                    tags.forEach(function(tag){
                        if(tag._id === tagInTopic){
                            tagInTopic.isSelected = true;
                        }
                    });
                });
            });
            ep.emit('all_tags',tags);
        });

    }else{
        Tag.getAllTags(function(err,tags){
            res.render('topic/edit',{topic:{title:"",content:""},all_tags:tags,isUpdate:false});
        });
    }

};
exports.del = function(req,res,next){
    Tag.getAllTags(function(err,tags){
        res.render('topic/edit',{tags:tags});
    });
};
exports.toTop = function(req,res,next){
    Tag.getAllTags(function(err,tags){
        res.render('topic/edit',{tags:tags});
    });
};


exports.add = function (req,res,next){
    var title = req.body.title.trim();
    var content = req.body.content.trim();

    var tags = req.body.tags;//tags前台传的时候是数组，到这里应变成字符串

    Topic.newAndSave(title,content,function(err,topic){
        var render = function(){
            res.redirect('/blog/topic/'+topic._id);
        };
        var ep = EventProxy.create('tags_save',render);
        ep.fail(next);
        var tags_saved = function(){
            ep.emit("tags_save");
        };
        if(tags ==='') {
            tags = [];
        }else{
            tags = tags.split(',');
        }
        ep.after('tag_save',tags.length,tags_saved);//这里替换成ep.done("tags_save");居然不行？
        tags.forEach(function(tag,i){
            console.log(i);
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
exports.update = function (req,res,next){
    var topic_id = req.body.topic_id;
    var title = req.body.title.trim();
    var content = req.body.content.trim();

    var tags = req.body.tags;//tags前台传的时候是数组，到这里应变成字符串

    console.log(topic_id);
    console.log(title);
    Tag.getAllTags(function(err,all_tags){//TODO 没有对tags进行编辑
        Topic.getTopicById(topic_id,function(err,topic){
            topic.title = title;
            topic.content = content;
            topic.save();
            res.render('topic/index',{
                topic:topic,
                topic_tags:tags,
                all_tags:all_tags
            });
        });

    });


};