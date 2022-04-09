var express = require('express');
var qs = require('qs');
var uuid = require('uuid');
var axios = require('axios');
var router = express.Router();

const redirectUrl = 'http://localhost:3000/callback';

router.get('/subscribe', async (req, res, next) => {
  const params = {
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: redirectUrl,
    scope: 'notify',
    state: uuid.v4(),
  };
  res.redirect(`https://notify-bot.line.me/oauth/authorize?${qs.stringify(params)}`);
});

router.get('/callback', async function (req, res, next) {
  const { code } = req.query;
  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    redirect_uri: redirectUrl,
  };
  const response = await axios({
    method: 'POST',
    url: 'https://notify-bot.line.me/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
  });
  const { access_token: token } = response.data;
  req.session.token = token;
  res.render('callback.ejs', { title: 'Broadcaster', btnText: 'Back', code, token });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  const accessToken = req.session.token;
  console.log('TEST', req.session);
  const btnText = accessToken ? 'Subscribed' : 'Subscribe';

  res.render('index.ejs', { title: 'Broadcaster', btnText, isSubscribed: !!accessToken });
});

module.exports = router;
