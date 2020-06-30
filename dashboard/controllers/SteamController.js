var User = require("../model/User");
var Steam = require('../model/SteamGame');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./views/');
let twing = new TwingEnvironment(loader);
var request = require('request-promise');
const fetch = require('node-fetch');
var authController = require('./AuthControllers');

var steamController = {};

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

steamController.callback = function(req, res) {
    if (req.user) {
        User.find({username: req.user.username}).updateOne({oauthSteam: req.query["openid.identity"].substring(37)}, function(err, todo){
            if (err) return res.status(500).send(err);
            res.redirect('/');
        })
    } else {
        res.redirect('/?failed');
    }
};

//Return les ID ( dans la console ) des amis Steam.
steamController.getFriendList = async function(req, res) {
    authController.checkIfLogged(req, res);
    await request.get('http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&steamid='+req.user.oauthSteam+'&relationship=friend', await async function (error, response, body) {
        var friends = [];
        const forLoop = async _ => {
            for (let element in JSON.parse(body).friendslist.friends) {
                let since = timeConverter(JSON.parse(body).friendslist.friends[element].friend_since);
                await request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5BED62BD82D03D000189824F0AE1E79E&steamids='+JSON.parse(body).friendslist.friends[element].steamid, function (error, response, body) {
                    friends.push([JSON.parse(body).response.players[0].personaname, since,JSON.parse(body).response.players[0].avatar])
                });
            }
        };

        await forLoop();
        return twing.render('steam/friends.html.twig', {
            'friends': friends,
        }).then((output) => {
            res.end(output);
        });
    })
};

steamController.getAllGamesFromSteam = async function(req, res) {
    Steam.find({}).then(async function (items) {

        const forLoop = async _ => {
            var item = 0;
            console.log('Start')
            console.log('Temps max estimé : ~' + ((items.length +1) / 60) + ' minutes');


            for (let element in items) {
                if(items[element].price == "null") {
                    items[element].price = null;
                    items[element].save();
                    continue;
                }
                console.log(item + " / " + items.length);
                if(items[element].price) {
                    item++;
                    console.log("skipped");
                    continue;
                }
                const response = await fetch("https://store.steampowered.com/api/appdetails/?appids=" + items[element].appId + "&cc=EE&l=english&v=1");
                const json = await response.json();

                try {
                    if(json[items[element].appId].success == false) {
                        console.log("no data for this item");
                        item++;
                        items[element].price = "0";
                        items[element].save();

                        await wait(1500);
                        continue;
                    }
                    // console.log(json[items[element].appId].data);
                    if(json[items[element].appId].data.price_overview) {
                        items[element].price = json[items[element].appId].data.price_overview.initial;
                        items[element].save()
                        console.log('item saved');
                    } else {
                        items[element].price = "0";
                        items[element].save();
                        console.log('item saved with 0');
                    }
                } catch (e) {
                    console.log(e)
                }
                await wait(1500);
                item++;
                console.log("finish item")
            }

            console.log('End')
        };

        await forLoop();


        console.log('final price: '+ price/100 +' €')
        // items.forEach(function (item) {
        //
        //     request.get('https://store.steampowered.com/api/appdetails/?appids=' + item.appId + '&cc=EE&l=english&v=1', function (error, response, body) {
        //         item["price"] = JSON.parse(body)[item.appId].data.price_overview.initial;
        //         item.save();
        //         console.log(item.appId + " => Done")
        //     });
        //     wait(2000);
        // })
    })

    var apps = [];
    await request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&steamid='+req.user.oauthSteam,await async function (error, response, body) {
        var i = 1;
        var price = 0;

        JSON.parse(body).response.games.forEach(await async function (games) {
            apps.push(games.appid);
        });
        const forLoop = async _ => {
            console.log('Start')
            console.log('Temps max estimé : ~' + ((apps.length +1) / 60) + ' minutes');

            for (let element in apps) {
                console.log(apps[element]);
                const response = await fetch("https://store.steampowered.com/api/appdetails/?appids=" + apps[element] + "&cc=EE&l=english&v=1");
                const json = await response.json();
                try {
                    if(json[apps[element]].data.price_overview) {
                        price += (json[apps[element]].data.price_overview.initial);
                    }
                } catch (e) {
                    console.log(e)
                }
                await wait(1000);
                console.log(price/100 +' €')
            }

            console.log('End')
        };

        await forLoop();


        console.log('final price: '+ price/100 +' €')
    })
};

steamController.getLibraryPrice = async function(req, res) {
    authController.checkIfLogged(req, res);
    var price = 0;
    var gameCount = 0;

    await request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&steamid='+req.user.oauthSteam,await async function (error, response, body) {
        const forLoop = async _ => {
            var games = JSON.parse(body).response.games;
            gameCount = JSON.parse(body).response.game_count;
            for (element in games ) {
                    await Steam.find({appId: games[element].appid}).then(async function (item) {
                        price += parseInt(item[0].price);
                    });
            }
        };
        await forLoop();
        return twing.render('steam/library_price.html.twig', {
            'game_count': gameCount,
            'price': price/100
        }).then((output) => {
            res.end(output);
        });
    })
};

steamController.apiGetLibraryPrice = async function(req, res) {
    var price = 0;
    var gameCount = 0;

    await request.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&vanityurl="+req.query.user, await async function (error, response, body) {
        if(JSON.parse(body).response.success != 1) {
            return res.json({error: 404});
        }else {
            await request.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&steamid='+JSON.parse(body).response.steamid,await async function (error, response, body) {
                const forLoop = async _ => {
                    var games = JSON.parse(body).response.games;
                    gameCount = JSON.parse(body).response.game_count;
                    for (element in games ) {
                        await Steam.find({appId: games[element].appid}).then(async function (item) {
                            price += parseInt(item[0].price);
                        });
                    }
                };
                await forLoop();
                return res.json({data: {
                    'count': gameCount,
                        'price': price/100,
                        'user': req.query.user
                    }})
            })
        }
    })

};


steamController.getAllGames = function(req, res) {
    Steam.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    });
};

steamController.getCurrentPlayerForGame = function(req, res) {
    Steam.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            return twing.render('steam/current_player_for_game.html.twig', {
                'games': result,
            }).then((output) => {
                res.end(output);
            });
        }
    });
};

steamController.putSteamGamesInDB = function(req, res) {
    request.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/', function (error, response, body) {
        JSON.parse(body).applist.apps.forEach(function (game) {
            var newGame = new Steam({ appId : game.appid, appName : game.name });
            newGame.save(function (err) {
                if (err){
                    console.log(err);
                }
                // saved!
            });
        });
        console.log("done");
    })
};

// Return les X derniers jeux joués avec le nom du jeu ,  le logo du jeu et le nombre de minutes jouées.
steamController.getRecentPlayedGames = function(req, res) {
    authController.checkIfLogged(req, res);
    request.get('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=5BED62BD82D03D000189824F0AE1E79E&steamid='+req.user.oauthSteam, function (error, response, body) {
        return twing.render('steam/recent_played_games.html.twig', {
            'games': JSON.parse(body).response
        }).then((output) => {
            res.end(output);
        });
    })
};

steamController.getPlayerCount = function(req, res) {
    request.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid='+req.query.appid, function (error, response, body) {
        return res.json(JSON.parse(body).response);
    })
};

//TODO A SUPPRIMER
steamController.getUserName = function(req, res) {
    authController.checkIfLogged(req, res);
    request.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=5BED62BD82D03D000189824F0AE1E79E&steamids='+req.user.oauthSteam, function (error, response, body) {
        return null;
    })
};

module.exports = steamController;