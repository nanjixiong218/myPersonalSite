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
exports.getTopicById = function(){

};
