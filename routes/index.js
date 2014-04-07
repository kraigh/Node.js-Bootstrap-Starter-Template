exports.index = function(db) {
  return function(req, res) {
    db.collection('eventlist').find().sort({order: 1}).toArray(function (err, items) {
      res.render ('index', {
        items: items
      });
      console.log(items);
    })
  }
};
