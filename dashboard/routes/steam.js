var express = require('express');
var router = express.Router();
var passport = require('passport');

var steamController = require('../controllers/SteamController');

router.get('/getusername', steamController.getUserName);

router.get('/getPlayerCount', steamController.getPlayerCount);

router.get('/getrecentplayedgames', steamController.getRecentPlayedGames);

router.get('/putgameindb', steamController.putSteamGamesInDB);

router.get('/getCurrentPlayerForGame', steamController.getCurrentPlayerForGame);

router.get('/getAllGames', steamController.getAllGames);

router.get('/getfriendlist', steamController.getFriendList);

router.get('/sessions/connect', passport.authenticate('openid'));

router.get('/sessions/callback', steamController.callback);

router.get('/test', steamController.getAllGamesFromSteam);

router.get('/myLibraryPrice', steamController.getLibraryPrice);

router.get('/api/myPrice', steamController.apiGetLibraryPrice);

module.exports = router;
