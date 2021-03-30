var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/9999/mydb';

mongo.connect(url, function(err, db) {
  if (err) throw err;
  console.log("db created")
  db.close()
});

