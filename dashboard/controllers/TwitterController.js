var mongoose = require("mongoose");
const passport = require('passport');
var User = require("../model/User");
var oauth = require('oauth');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./views/');
let twing = new TwingEnvironment(loader);
var Twitter = require('twitter');

var authController = require('./AuthControllers');


var twitterController = {};

var _twitterConsumerKey = "rfivln94JNkVoPVKoBn79crdc";
var _twitterConsumerSecret = "ppY9iUnH5uEL5QABgd1hEwZMt8cPUHrcCoqqhIwNUR2zl2xr0w";

function consumer() {
    return new oauth.OAuth(
        "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
        _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:3000/twitter/sessions/callback", "HMAC-SHA1");
}

twitterController.connect = function(req, res) {
    consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
        if (error) {
            res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
        } else {
            req.session.oauthRequestToken = oauthToken;
            req.session.oauthRequestTokenSecret = oauthTokenSecret;
            res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
        }
    });
    // res.render('register');
};

twitterController.callback = function(req, res) {
    consumer().getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (error) {
            res.send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]", 500);
        } else {
            req.session.oauthAccessToken = oauthAccessToken;
            req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
            User.find({username: req.user.username}).updateOne({oauthTwitter: oauthAccessToken, oauthAccessSecret: oauthAccessTokenSecret}, function(err, todo){
                if (err) return res.status(500).send(err);
                res.redirect('/');
            })
        }
    });
}

twitterController.apiGetAccountInfo = function(req, res) {
    consumer().get("https://api.twitter.com/1.1/users/show.json?screen_name="+req.query.user, req.user.oauthTwitter, req.user.oauthAccessSecret, function (error, data, response) {
        if (error) {
            console.log(error);
        } else {
            return res.json(JSON.parse(data));
        }
    });
};

twitterController.getTweets = function(req, res) {
    authController.checkIfLogged(req, res);
    consumer().get("https://api.twitter.com/1.1/account/verify_credentials.json", req.user.oauthTwitter, req.user.oauthAccessSecret, function (error, data, response) {
        if (error) {
            console.log(error);
        } else {
            return twing.render('twitter/account.html.twig', {
                'username': JSON.parse(data).screen_name,
            }).then((output) => {
                res.end(output);
            });
        }
    });
}

twitterController.postTweets = function(req, res) {
    authController.checkIfLogged(req, res);
    return twing.render('twitter/post_tweets.html.twig').then((output) => {
        res.end(output);
    });
};

//TODO A SUPPRIMER
twitterController.apiPostTweets = function(req, res) {
    var client = new Twitter({
        consumer_key: _twitterConsumerKey,
        consumer_secret: _twitterConsumerSecret,
        access_token_key: req.user.oauthTwitter,
        access_token_secret: req.user.oauthAccessSecret
    });
    var text = req.body.content;
    client.post('statuses/update', {status: text}, function (error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
    });
};

module.exports = twitterController;