exports.index = function(db) {
  return function(req, res) {
    db.collection('eventlist').find().toArray(function (err, items) {
      res.render ('index', {
        items: items
      });
      console.log(items);
      // res.json(items);
    })
  }
};
