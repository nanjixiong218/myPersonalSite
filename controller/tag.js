/**
 * Created by Administrator on 2014/8/16.
 */
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy');
var Tag = require('../proxy/tag');


exports.createTag = function(req,res,next){
    var name = req.body.name.trim();
    var order = parseInt(req.body.order);
    var description = req.body.description.trim();
    Tag.newAndSave(name,order,description,function(err,tag){
        console.log(tag.name);
    });
};