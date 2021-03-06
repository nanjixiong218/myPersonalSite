var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var routes = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');
var tag = require('./routes/tag');
var static = require('./routes/static');//这种方式专门配置静态文件的路由没有必要吧，测试着玩玩

var app = express();
//locals包含了settings
//console.log(app.locals);
//console.log(app.settings);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public'))); 没有指定具体路径时是什么操作？
app.use('/public',express.static(path.join(__dirname, 'public')));
//这里配置静态访问的路径，就可不经过路由直接指定到html文件
app.use('/static',express.static(path.join(__dirname,'views/static')));

app.use('/', routes);
app.use('/users', users);
app.use('/static', static);
app.use('/blog',blog);
app.use('/tag',tag);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user 明明没有区别啊？TODO
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
