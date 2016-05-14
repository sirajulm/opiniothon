'use strict';

var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/static', express.static('app/assets'));
app.use('/partials',express.static('views/partials'));

app.get('/', function(req, res){
    res.render('index');
});

app.listen('4000');
console.log('Express server started on port %s');