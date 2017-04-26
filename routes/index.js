var express = require('express');
var router = express.Router();
var Models = require('../models/models');


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
        style: 'registrtion',
        user: new Models.User()
    });
});

router.post('/auth', function(req, res, next) {
    var user = Models.User.findOne({name: req.body.login});
    console.log(user);
    if(user && user.authenticate(req.body.password)){
        res.redirect('/main');
    }
    else {
        res.render('index', { title: 'Автосервис', style: 'index'});
    }
});

router.post('/reg', function(req, res, next) {
    console.log(req.body);
    var newUser = new Models.User({
        name: req.body.login,
        password: req.body.password,
        type: 'admin'
    });
    newUser.save(function(err){
        console.log('User ${req.body.login} has created!');
        res.render('index', { title: 'Автосервис', style: 'index', reg: true });
        if(err){
            console.error(err);
            res.render('index', { title: 'Автосервис', style: 'index', reg: true, regerr: true });
        }});
});


module.exports = router;
