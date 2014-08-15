/**
 * Created by Administrator on 2014/8/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
    title : { type : String } ,
    content : { type : String },
    top : {type : Boolean , default : false},
    create_at : {type : Date , default : Date.now},
    update_at : {type : Date , default : Date.now},
    reply_count : {type : Number , default : 0},
    visit_count : {type : Number , default : 0},
    content_is_html : {type : Boolean}
});

TopicSchema.index({ create_at : -1});

mongoose.model("Topic",TopicSchema);
