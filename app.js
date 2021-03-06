require('newrelic');
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var events = require('./routes/events');

var app = express();

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/trailhead-students-admin", {native_parser:true});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index(db));
app.get('/event/:id', events.getevent(db));
app.get('/events', events.listevents(db));
app.post('/addevent', events.addevent(db));
app.delete('/deleteevent/:id', events.deleteevent(db));
app.put('/sortevent', events.sortevent(db));
app.put('/editevent', events.editevent(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
