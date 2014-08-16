/**
 * Created by Administrator on 2014/8/15.
 */
var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;
var Tag = models.Tag;

exports.getAllTags = function(callback){
    Tag.find({},[],{sort:['order','asc']},callback);
};
exports.getTagById = function(tag_id,callback){
    Tag.findOne({_id:tag_id},callback);
};
exports.newAndSave = function(name,order,description,callback){
    var tag = new Tag();
    tag.name = name;
    tag.order = order;
    tag.description = description;
    tag.save(callback);
};
