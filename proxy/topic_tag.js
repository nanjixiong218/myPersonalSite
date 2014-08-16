/**
 * Created by Administrator on 2014/8/15.
 */
var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;

exports.newAndSave = function(topic_id,tag_id,callback){
    var topic_tag = new TopicTag();
    topic_tag.topic_id = topic_id;
    topic_tag.tag_id = tag_id;
    topic_tag.save(callback);
};