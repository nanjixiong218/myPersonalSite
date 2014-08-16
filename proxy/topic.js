/**
 * Created by Administrator on 2014/8/15.
 */
var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;
var Tag = models.Tag;

exports.newAndSave = function (title, content, callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.save(callback);
};
exports.getTopicById = function(topic_id,callback){
    Topic.findOne({_id:topic_id},callback);
};
exports.getTagsByTopicId =function(topic_id,callback){
    TopicTag.find({topic_id:topic_id},function(err,topic_tags){
        var tag_ids = [];
        for(var i = 0 ; i<topic_tags.length;i++){
            tag_ids.push(topic_tags[i].tag_id);
        }
        console.log(tag_ids);
        Tag.find({_id:{'$in':tag_ids}},callback);
    });
};
