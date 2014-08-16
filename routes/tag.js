/**
 * Created by Administrator on 2014/8/15.
 */
var express = require('express');
var router = express.Router();
var Tag = require('../controller/tag');

router.get('/',function(req,res,next){
    res.render('tag/edit');
});

router.post('/add',Tag.createTag);

module.exports = router;
