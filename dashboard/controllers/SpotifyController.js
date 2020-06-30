var User = require("../model/User");
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./views/');
let twing = new TwingEnvironment(loader);
var request = require('request-promise');
var authController = require('./AuthControllers');

var spotifyController = {};

var _spotifyConsumerKey = "2847f09c105d4a07aec94c448957fe60";
var _spotifyConsumerSecret = "860cf137d5544e56a0548b1b65fd0908";

spotifyController.connect = function(req, res) {
    res.redirect("https://accounts.spotify.com/fr/authorize?client_id=2847f09c105d4a07aec94c448957fe60&response_type=code&redirect_uri=http://127.0.0.1:3000/spotify/sessions/callback&&scope=user-read-private%20user-read-email%20playlist-read-private%20user-top-read");
};

spotifyController.callback = function(req, res) {
    request.post({
        headers: {'Authorization' : 'Basic Mjg0N2YwOWMxMDVkNGEwN2FlYzk0YzQ0ODk1N2ZlNjA6ODYwY2YxMzdkNTU0NGU1NmEwNTQ4YjFiNjVmZDA5MDg=',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url:     'https://accounts.spotify.com/api/token',
        body:    "grant_type=authorization_code&code="+req.query.code+"&redirect_uri=http://127.0.0.1:3000/spotify/sessions/callback"
    }, function(error, response, body){
        User.find({username: req.user.username}).updateOne({oauthSpotify: JSON.parse(response.body).access_token}, function(err, todo){
            if (err) return res.status(500).send(err);
            res.redirect('/');
        });
    });
};

spotifyController.getUserPlaylistApi = function(req, res) {
    var playlists = [];
    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthSpotify,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:     'https://api.spotify.com/v1/me/playlists',
    }, function(error, response, body){
        if(JSON.parse(response.body).error) {
            return res.json({error: 401});
        }
        JSON.parse(response.body).items.forEach(function (item) {
            playlists.push([item.id, item.name]);
        });
        return res.json(playlists);
    });
};

spotifyController.getUserPlaylist = function(req, res) {
    authController.checkIfLogged(req, res);
    return twing.render('spotify/playlist.html.twig').then((output) => {
        res.end(output);
    });
};

spotifyController.getTopTrackAndPlaylist = function(req, res) {
    authController.checkIfLogged(req, res);
    return twing.render('spotify/top.html.twig').then((output) => {
        res.end(output);
    });
}

spotifyController.apiGetTops = function(req, res) {
    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthSpotify,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:     'https://api.spotify.com/v1/me/top/'+req.query.type+'?limit=10',
    }, function(error, response, body){
        if(JSON.parse(response.body).error) {
            return res.json({error: 401});
        }
        return res.json(response.body);
    });
}

module.exports = spotifyController;