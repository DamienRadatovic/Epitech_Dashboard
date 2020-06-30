var express = require('express');
var router = express.Router();
var twitterController = require("../controllers/TwitterController");

router.get('/sessions/connect', twitterController.connect);

router.get('/sessions/callback', twitterController.callback);

router.get('/account/tweets', twitterController.getTweets);

router.get('/sendTweet', twitterController.postTweets);

router.post('/api/sendTweet', twitterController.apiPostTweets);

router.get('/api/accountInfo', twitterController.apiGetAccountInfo);

module.exports = router;
