const passport = require('passport');
var User = require("../model/User");
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./views/');
let twing = new TwingEnvironment(loader);

var userController = {};

userController.home = async function(req, res) {
    twing.render('index.html.twig', {user: req.user}).then((output) => {
        res.end(output);
    });
};

userController.register = function(req, res) {
    twing.render('register.html.twig', {'name': 'World'}).then((output) => {
        res.end(output);
    });
};

userController.doRegister = function(req, res) {
    User.register(new User({ email : req.body.email, username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
            return twing.render('register.html.twig', {}).then((output) => {
                res.end(output);
            });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

userController.login = function(req, res) {
    twing.render('login.html.twig', {}).then((output) => {
        res.end(output);
    });
};

userController.doLogin = function(req, res, next) {
    passport.authenticate('local')(req, res , function(err, user, info) {
        if (err) { return next(err); }
        if (!req.user) {
            return res.redirect('/login');
        }

        req.logIn(req.user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    });
};

userController.checkIfLogged = function(req, res) {
    if(!req.user) {
        res.redirect('/')
    }
};

userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

userController.parameter = function(req, res) {
    userController.checkIfLogged(req, res);
    return twing.render('parameter.html.twig', {user: req.user, currentPage: 'parameter'}).then((output) => {
        res.end(output);
    });
};

module.exports = userController;
