/**
 * Created by Administrator on 2014/8/15.
 */
var express = require('express');
var router = express.Router();
var Topic = require('../controller/topic');

router.get('/',Topic.list);
router.get('/edit',Topic.edit);
router.get('/edit/:tid',Topic.edit);
router.get('/topic/:tid',Topic.index);
router.get('/del/:tid',Topic.del);
router.get('/toTop/:tid',Topic.toTop);

router.post('/add',Topic.add);
router.post('/update',Topic.update);


module.exports = router;
