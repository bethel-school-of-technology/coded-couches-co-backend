var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/', function(req, res) {
//   res.send('You successfully created a POST route!');
// });

// router.get('/', function(req, res) {
//   res.send('You successfully created a GET route!');
// });

// router.put('/', function(req, res) {
//   res.send('You successfully created a PUT route!');
// });

// router.delete('/', function(req, res) {
//   res.send('You successfully created a DELETE route!');
// });

router.post('/', function (req, res) {
  let bodyUsername = req.body;
  if (usernames.includes(bodyUsername.username)) {
    res.send('Username is already in use.')
  } else {
    usernames.push(bodyUsername.username);
    res.send(usernames);
  }
})




module.exports = router;
