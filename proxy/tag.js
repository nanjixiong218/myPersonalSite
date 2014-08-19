/**
 * Created by Administrator on 2014/8/15.
 */
var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;
var Tag = models.Tag;

exports.getAllTags = function(callback){
    Tag.find({},null,{sort:'order'}, callback);//这句排序？TODO
};
exports.getTagById = function(tag_id,callback){
    Tag.findOne({_id:tag_id},callback);
};
exports.newAndSave = function(name,order,description,callback){
    Tag.findOne({name:name},function(err,tag){
        console.log(tag);
        if(tag){
            callback(new Error('此tag名字已经存在！'));
        }else{
            var tag = new Tag();
            tag.name = name;
            tag.order = order;
            tag.description = description;
            tag.save(callback);
        }

    });

};
exports.getTopicsByTagId = function(tag_id,callback){
    TopicTag.find({tag_id:tag_id},function(err,topic_tags){
        var topic_ids = [];
        for(var i = 0,length = topic_tags.length; i < length;i++){
            topic_ids.push(topic_tags[i].topic_id);
        }
        Topic.find({_id:{'$in':topic_ids}},callback);
    });
};
