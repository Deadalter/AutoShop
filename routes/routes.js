var express = require('express');
var router = express.Router();
var Users = require('../models/models').User;
var Orders = require('../models/models').Order;
var Clients = require('../models/models').Client;
var Store = require('../models/models').Store;
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

router.get('/logout', function(req,res, next) {
    if(req.session.user_id){
        delete req.session.user_id;
        res.redirect('/');
    }
});

router.get('/main', loadUser, function(req, res, next) {
    Orders.find({itComplite: false}, function(err, orders){
        console.log(orders);
        res.render('main', {
            title: 'Автосервис: Главная',
            style: 'main',
            orders: orders
        });
    });
});

router.get('/clients', loadUser, function(req, res ,next) {
    Clients.find({master: req.session.user_id}, function(err, clients) {
        console.log(clients);
        res.render('clients', {
            title: 'Автосервис: Клиенты',
            style: 'main',
            clients: clients
        });
    });
});

router.get('/clients/all', loadUser, function(req, res, next){
    Clients.find({}, function(err, clients) {
        console.log(clients);
        res.render('clients', {
            title: 'Автосервис: Клиенты',
            style: 'main',
            clients: clients,
            filter: 'all'
        });
    });
});

router.get('/store', loadUser, function(req, res, next) {
    Store.find({}, function(err, store) {
        console.log(store);
        res.render('store', {
            title: 'Автосервис: Склад',
            style: 'main',
            store: store
        });
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
            res.redirect('/clients');
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

router.post('/client/new', function(req, res, next) {
    var newClient = new Clients({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        master: req.session.user_id
    });
    newClient.save(function(err){
        if(err){
            console.error(err);
        }
        res.redirect('/clients');
    });
});

router.post('/clients/find', function(req, res, next) {
    var regExp = req.body.clientQuery;
    console.log(regExp);
    Clients.find({lastName: regExp}, function(err, clients) {
        res.render('clients', {
            title: 'Автосервис: Клиенты',
            style: 'main',
            clients: clients
        });
    });
});

router.post('/order/new', function(req, res, next) {
    var newOrder = new Orders({
        name: req.body.orderName,
        vin: req.body.vin,
        desc: req.body.desc,
        carModel: req.body.carModel,
        itComplite: false
    });
    newOrder.save(function(err){
        if(err){
            console.error(err);
        }
        res.redirect('/main')
    })
});

router.get('/order/:id', function(req, res, next) {
    Orders.findOne({id: req.param.id}, function(err, order){
        if(order){
            res.render('order', {
                title: 'Автосервис: Просмотр заказа',
                style: 'main',
                order: order
            });
        } else {
            res.redirect('/404');
        }
    });
});

router.post('/store/newitem', function(req, res, next) {
    var newItem = new Store({
        itemName: req.body.itemName,
        count: req.body.itemCounts
    });
    newItem.save(function(err){
        if(err){
            console.error(err);
        }
        res.redirect('/store');
    });
});

module.exports = router;
