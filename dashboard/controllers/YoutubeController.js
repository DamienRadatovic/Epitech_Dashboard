var User = require("../model/User");
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./views/');
let twing = new TwingEnvironment(loader);
var request = require('request-promise');
var authController = require('./AuthControllers');

var youtubeController = {};

var _youtubeConsumerKey = "482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com";
var _youtubeConsumerSecret = "7ywN-C1VKkvURTRzWXKaGw2M";
var _youtubeApiKey = "AIzaSyA4xXnPqBQaJfzzYpMn3RBTFBYZT206Qas";

youtubeController.connect = function(req,res) {
    res.redirect("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&response_type=code&state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken&redirect_uri=http%3A//127.0.0.1:3000/youtube/services/callback&client_id=482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com");
};

youtubeController.callback = function(req,res) {
    request.post({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url:     'https://oauth2.googleapis.com/token',
        body:    "code="+req.query.code+"&client_id=482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com&client_secret=7ywN-C1VKkvURTRzWXKaGw2M&redirect_uri=http://127.0.0.1:3000/youtube/services/callback&grant_type=authorization_code"
    }, function(error, response, body){
        User.find({username: req.user.username}).updateOne({oauthYoutube: JSON.parse(response.body).access_token}, function(err, todo){
            if (err) return res.status(500).send(err);
            res.redirect('/');
        });
    });
};

youtubeController.getChannel = function(req,res) {
    authController.checkIfLogged(req, res);
    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthYoutube,
            'Accept': 'application/json'
        },
        url:     "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key="+_youtubeApiKey,
    }, function(error, response, body){
        if(JSON.parse(response.body).error) {
            return res.redirect('https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&response_type=code&state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken&redirect_uri=http%3A//127.0.0.1:3000/youtube/services/callback&client_id=482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com');
        }
        if(JSON.parse(response.body).pageInfo.totalResults == 0) {
            return twing.render('youtube/channel.html.twig', {
                'channelName': 'Pas de chaîne',
                'viewsCount': 0,
                'subscribersCount': 0,
                'createdAt' : 0
            }).then((output) => {
                res.end(output);
            });
        }
        return twing.render('youtube/channel.html.twig', {
            'channelName': JSON.parse(response.body).items[0].snippet.title,
            'viewsCount': JSON.parse(response.body).items[0].statistics.viewCount,
            'subscribersCount': JSON.parse(response.body).items[0].statistics.subscriberCount,
            'createdAt' : JSON.parse(response.body).items[0].snippet.publishedAt
        }).then((output) => {
            res.end(output);
        });
    });
};

youtubeController.apiGetChannel = function(req,res) {
    authController.checkIfLogged(req, res);
    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthYoutube,
            'Accept': 'application/json'
        },
        url:     "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key="+_youtubeApiKey,
    }, function(error, response, body){
        if(JSON.parse(response.body).error) {
            return res.json({
                error: 401
            });
        }
        if(JSON.parse(response.body).pageInfo.totalResults == 0) {
            return res.json({
                'channelName': 'Pas de chaîne',
                'viewsCount': 0,
                'subscribersCount': 0,
                'createdAt' : 0
            });
        }

        return res.json({
            'channelName': JSON.parse(response.body).items[0].snippet.title,
            'viewsCount': JSON.parse(response.body).items[0].statistics.viewCount,
            'subscribersCount': JSON.parse(response.body).items[0].statistics.subscriberCount,
            'createdAt' : JSON.parse(response.body).items[0].snippet.publishedAt
        });
    });
};


youtubeController.getLastStats = function(req, res) {
    authController.checkIfLogged(req, res);
    var current_date = new Date();
    var cmonth = current_date.getMonth().toString();
    var zero = '0';
    if(cmonth < 10) {
        cmonth = zero.concat('', cmonth);
    }
    var lastMonth = current_date.getMonth() - 1;
    if(lastMonth < 10) {
        lastMonth = zero.concat('', lastMonth);
    }

    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthYoutube,
            'Accept': 'application/json'
        },
        url:     "https://youtubeanalytics.googleapis.com/v2/reports?dimensions=month&endDate=2020-"+cmonth+"-01&ids=channel%3D%3DMINE&metrics=views%2CsubscribersGained%2CsubscribersLost%2Clikes%2Cdislikes&startDate=2020-"+lastMonth+"-01&key="+_youtubeApiKey,
    }, function(error, response, body){
        var data = JSON.parse(response.body).rows;
        if(JSON.parse(response.body).error) {
            return res.redirect('https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube&response_type=code&state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken&redirect_uri=http%3A//127.0.0.1:3000/youtube/services/callback&client_id=482608527715-8fpkr88gaq0chr2rngoer02i8240baib.apps.googleusercontent.com');
        }
        if(data.length == 0) {
            return twing.render('youtube/last_stats.html.twig', {
                'views': null,
                'subs': null,
                'likes': null,
                'dislikes': null,
                'empty_channel': 1,
            }).then((output) => {
                res.end(output);
            });
        }
        var views = {};
        views.currentMonth = data[1][1];
        if(data[0][1] == data[1][1]) {
            views.stats = 0;
        }else {
            if(data[0][1] == 0 ) {
                views.stats = 1000;
            } else if(data[1][1] == 0) {
                views.stats = -1000;
            }
            else {
                views.stats = ((data[1][1] * 100) / data[0][1]);
                views.stats = views.stats.toFixed(2);
            }
        }

        var subsGain = {};
        subsGain.currentMonth = data[1][2] - data[1][3];
        if((data[0][2] - data[0][3]) == ((data[1][2] - data[1][3]))) {
            subsGain.stats = 0;
        }else {
            if((data[0][2] - data[0][3] )== 0) {
                subsGain.stats = 1000;
            } else if ( (data[1][2] - data[1][3]) == 0) {
                subsGain.stats = -1000;
            } else {
                subsGain.stats = (( (data[1][2] - data[1][3]) * 100) / (data[0][2] - data[0][3]) );
                subsGain.stats = subsGain.stats.toFixed(2);
            }
        }

        var likes = {};
        likes.currentMonth = data[1][4];
        if(data[0][4] == data[1][4]) {
            likes.stats = 0
        } else {
            if (data[0][4] == 0) {
                likes.stats = 1000;
            } else if (data[1][4] == 0) {
                likes.stats = -1000;
            } else {
                likes.stats = ((data[1][4] * 100) / data[0][4]);
                likes.stats = likes.stats.toFixed(2);
            }
        }

        var dislikes = {};
        dislikes.currentMonth = data[1][5];
        if(data[0][5] == data[1][5]) {
            dislikes.stats = 0;
        } else {
            if(data[0][5] == 0 ) {
                dislikes.stats = 1000;
            } else if(data[1][5] == 0) {
                dislikes.stats = -1000;
            } else {
                dislikes.stats = ((data[1][5] * 100) / data[0][5]);
                dislikes.stats = dislikes.stats.toFixed(2);
            }
        }

        return twing.render('youtube/last_stats.html.twig', {
            'views': views,
            'subs': subsGain,
            'likes': likes,
            'dislikes': dislikes,
            'empty_channel': 0
        }).then((output) => {
            res.end(output);
        });
    });
};

youtubeController.apiGetLastStats = function(req, res) {
    authController.checkIfLogged(req, res);
    var current_date = new Date();
    var cmonth = current_date.getMonth().toString();
    var zero = '0';
    if(cmonth < 10) {
        cmonth = zero.concat('', cmonth);
    }
    var lastMonth = current_date.getMonth() - 1;
    if(lastMonth < 10) {
        lastMonth = zero.concat('', lastMonth);
    }

    request.get({
        headers: {'Authorization' : 'Bearer '+req.user.oauthYoutube,
            'Accept': 'application/json'
        },
        url:     "https://youtubeanalytics.googleapis.com/v2/reports?dimensions=month&endDate=2020-"+cmonth+"-01&ids=channel%3D%3DMINE&metrics=views%2CsubscribersGained%2CsubscribersLost%2Clikes%2Cdislikes&startDate=2020-"+lastMonth+"-01&key="+_youtubeApiKey,
    }, function(error, response, body){
        var data = JSON.parse(response.body).rows;
        if(JSON.parse(response.body).error) {
            return res.json({
                error: 401
            })
        }
        if(data.length == 0 || !data[1]) {
            return res.json({
                'views': null,
                'subs': null,
                'likes': null,
                'dislikes': null,
                'empty_channel': 1,
            })
        }
        var views = {};
        views.currentMonth = data[1][1];
        if(data[0][1] == data[1][1]) {
            views.stats = 0;
        }else {
            if(data[0][1] == 0 ) {
                views.stats = 1000;
            } else if(data[1][1] == 0) {
                views.stats = -1000;
            }
            else {
                views.stats = ((data[1][1] * 100) / data[0][1]);
                views.stats = views.stats.toFixed(2);
            }
        }

        var subsGain = {};
        subsGain.currentMonth = data[1][2] - data[1][3];
        if((data[0][2] - data[0][3]) == ((data[1][2] - data[1][3]))) {
            subsGain.stats = 0;
        }else {
            if((data[0][2] - data[0][3] )== 0) {
                subsGain.stats = 1000;
            } else if ( (data[1][2] - data[1][3]) == 0) {
                subsGain.stats = -1000;
            } else {
                subsGain.stats = (( (data[1][2] - data[1][3]) * 100) / (data[0][2] - data[0][3]) );
                subsGain.stats = subsGain.stats.toFixed(2);
            }
        }

        var likes = {};
        likes.currentMonth = data[1][4];
        if(data[0][4] == data[1][4]) {
            likes.stats = 0
        } else {
            if (data[0][4] == 0) {
                likes.stats = 1000;
            } else if (data[1][4] == 0) {
                likes.stats = -1000;
            } else {
                likes.stats = ((data[1][4] * 100) / data[0][4]);
                likes.stats = likes.stats.toFixed(2);
            }
        }

        var dislikes = {};
        dislikes.currentMonth = data[1][5];
        if(data[0][5] == data[1][5]) {
            dislikes.stats = 0;
        } else {
            if(data[0][5] == 0 ) {
                dislikes.stats = 1000;
            } else if(data[1][5] == 0) {
                dislikes.stats = -1000;
            } else {
                dislikes.stats = ((data[1][5] * 100) / data[0][5]);
                dislikes.stats = dislikes.stats.toFixed(2);
            }
        }

        return res.json({
            'views': views,
            'subs': subsGain,
            'likes': likes,
            'dislikes': dislikes,
            'empty_channel': 0
        });
    });
};

module.exports = youtubeController;