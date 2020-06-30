var express = require('express');
var router = express.Router();

var _youtubeConsumerKey = "482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com";
var _youtubeConsumerSecret = "7ywN-C1VKkvURTRzWXKaGw2M";
var _youtubeApiKey = "AIzaSyA4xXnPqBQaJfzzYpMn3RBTFBYZT206Qas";

var youtubeController = require('../controllers/YoutubeController');

router.get('/sessions/connect', youtubeController.connect);

router.get('/services/callback', youtubeController.callback);

router.get('/channel', youtubeController.getChannel);

router.get('/api/channel', youtubeController.apiGetChannel);

router.get('/lastStats', youtubeController.getLastStats);

router.get('/api/lastStats', youtubeController.apiGetLastStats);

module.exports = router;
