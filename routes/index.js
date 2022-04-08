var express = require('express');
var router = express.Router();

var callback = require('./callback');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/callback', callback);

module.exports = router;
