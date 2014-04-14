/*
* POST to addevent.
*/
exports.addevent = function(db) {
  return function(req, res) {
    db.collection('eventlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

/*
* GET to getevent.
*/
exports.getevent = function(db) {
  return function(req, res) {
    db.collection('eventlist').findById(req.params.id, function(err, result){
      res.json(result);
    });
  }
};

/*
* GET to listevents.
*/
exports.listevents = function(db) {
  return function(req, res) {
    db.collection('eventlist').find().toArray(function (err, items) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,      Accept");
      res.json(items);
    })
  }
};

/*
* PUT to sortevent.
*/
exports.sortevent = function(db) {
  return function(req, res) {
    console.log(req.body._id);
    console.log(req.body.order);
    // db.collection('eventlist').update({_id: req.body._id}, {order: req.body.order}, function(err, result) {
    db.collection('eventlist').updateById(req.body._id, {$set: {order: req.body.order}}, function(err, result) {
    //db.collection('eventlist').findAndModify({_id: id}, [], {$set: { order: order }}, {new: true}, function(err, result) {
        // result contains the updated document
      console.log(result);
      console.log(err);
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

/*
* PUT to editevent.
*/
exports.editevent = function(db) {
  return function(req, res) {
    console.log(req.body);
    // db.collection('eventlist').update({_id: req.body._id}, {order: req.body.order}, function(err, result) {
    db.collection('eventlist').updateById(req.body._id, {$set: {title: req.body.title, description: req.body.description}}, function(err, result) {
    //db.collection('eventlist').findAndModify({_id: id}, [], {$set: { order: order }}, {new: true}, function(err, result) {
        // result contains the updated document
      console.log(result);
      console.log(err);
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

/*
* DELETE to deleteevent.
*/
exports.deleteevent = function(db) {
  return function(req, res) {
    var eventToDelete = req.params.id;
    db.collection('eventlist').removeById(eventToDelete, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};
