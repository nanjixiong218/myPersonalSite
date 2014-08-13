/**
 * Created by Administrator on 2014/8/13.
 */
var express = require('express');
var router = express.Router();

router.get('/father',function(req,res){
   // res.sendFile("../views/static/fatherDay.html"); 出错
   res.render("static/myFather");//ok
});
module.exports = router;
