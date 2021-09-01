var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'sakila'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Post method for making a new user
router.post('/users', function(req, res, next){
  models.user.create(req.body)
    .then(newUser => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newUser));
    })
    .catch(err => {
      res.status(400);
      res.send(err.message);
    })
});

module.exports = router;