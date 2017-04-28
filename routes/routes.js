var express = require('express');
var router = express.Router();
var Users = require('../models/models').User;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Автосервис',
        style: 'index'
    });
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
            //req.session.user_id = user.id;
            console.log(user);
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
        console.log('User ${uLogin} has created!');
        res.redirect('/');
    });
});


module.exports = router;
