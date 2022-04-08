var express = require('express');
var qs = require('qs');
var uuid = require('uuid');
var router = express.Router();

router.get('/login', async (req, res, next) => {
  const params = {
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'notify',
    state: uuid.v4(),
  };
  res.redirect(`https://notify-bot.line.me/oauth/authorize?${qs.stringify(params)}`);
});

router.get('/logout', function (req, res, next) {
  res.redirect('/');
});

router.get('/callback', function (req, res, next) {
  const { code } = req.query;
  res.render('callback.ejs', { title: 'Logged in successfully!', code });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
