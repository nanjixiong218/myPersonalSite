/**
 * Created by Administrator on 2014/8/15.
 */
var express = require('express');
var router = express.Router();
var Topic = require('../controller/topic');

router.get('/',Topic.list);
router.get('/edit',Topic.create);
router.get('/topic/:tid',Topic.index);

router.post('/topic',Topic.add);


module.exports = router;
