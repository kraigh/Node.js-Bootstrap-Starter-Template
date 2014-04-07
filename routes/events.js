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
* PUT to sortevent.
*/
exports.sortevent = function(db) {
  return function(req, res) {
    db.collection('eventlist').update({ type : "book" })
    db.collection('eventlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};
