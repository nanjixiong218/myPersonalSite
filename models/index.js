/**
 * Created by Administrator on 2014/8/15.
 */

var mongoose = require('mongoose');
var config = require('../config').config;
mongoose.connect(config.db,function(err){
    if(err){
        console.error("连接数据库到%s 出错",config.db,err.message);
        process.exit(1);
    }
});

require('./topic');
require('./reply');
require('./tag');
require('./topic_tag');

exports.Topic = mongoose.model("Topic");
exports.TopicTag = mongoose.model("TopicTag");
exports.Tag = mongoose.model("Tag");
exports.Reply = mongoose.model("Reply");