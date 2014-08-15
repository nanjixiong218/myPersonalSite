/**
 * Created by Administrator on 2014/8/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
    topic_id : {type : ObjectId },
    content :{type : String },
    create_at : {type : Date , default : Date.now},
    content_is_html : {type : Boolean}
});

ReplySchema.index({topic_id:1});
ReplySchema.index({create_at:1});
mongoose.model("Reply",ReplySchema);