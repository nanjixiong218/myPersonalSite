/**
 * Created by Administrator on 2014/8/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    name : {type : String},
    order : {type : Number , default : 1},
    description :{type : String },
    topic_count : {type : Number , default : 0},
    create_at : {type : Date , default : Date.now}
});


mongoose.model("Tag",TagSchema);