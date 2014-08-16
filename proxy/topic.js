/**
 * Created by Administrator on 2014/8/15.
 */
var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;

exports.newAndSave = function (title, content, callback) {
    var topic = new Topic();
    topic.title = title;
    topic.content = content;
    topic.save(callback);
};
exports.getTopicById = function(topic_id,callback){
    Topic.find({_id:topic_id},callback);
};
exports.getTagsByTopicId =function(topic_id,callback){
    TopicTag.find({_id:topic_id},function(topic_tags){
        var tag_ids = [];

        for(var i = 0 ; i<topic_tags.length;i++){
            tag_ids.push(topic_tags[i]._id);
        }
        callback(null,tag_ids);
    });
};
