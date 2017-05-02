var express = require('express');
var router = express.Router();
var Users = require('../models/models').User;
var Sessions = require('../models/models').Session;


function loadUser(req, res, next) {
    if (req.session.user_id) {
        Users.findById(req.session.user_id, function(err, user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
}


/* GET home page. */
router.get('/', loadUser, function(req, res, next) {
    res.redirect('/main');
});

router.get('/login', function(req, res, next){
    res.render('index', {
        title: 'Автосервис',
        style: 'index'
    });
});

router.post('/logout', function(req,res, next) {
    if(req.session.user_id){
        delete req.session.user_id;
        res.redirect('/');
    }
});

router.get('/main', function(req, res, next) {
    res.render('main', {
        title: 'Автосервис: Главная',
        style: 'main'
    });
});

router.get('/reg', function(req, res, next) {
    res.render('registration', {
        title: 'Автосервис - Регистрация',
        style: 'index'
    });
});

router.post('/auth', function(req, res, next) {
    Users.findOne({login: req.body.login}, function (err, user){
        if(user && user.authenticate(req.body.password)){
            req.session.user_id = user.id;
            console.log(req.session);
            console.log(req.session.user_id);
            res.redirect('/main');
        } else {
            res.redirect('/');
        }
    });
});

router.post('/reg', function(req, res, next) {
    console.log(req.body);
    var uLogin = req.body.login;
    var newUser = new Users({
        login: req.body.login,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.error(err);
            res.redirect('/');
        }
        console.log('User'+ uLogin +'has created!');
        res.redirect('/login');
    });
});


module.exports = router;
