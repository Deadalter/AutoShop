var express = require('express');
var router = express.Router();

//global.current_user;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Автосервис' });
});

module.exports = router;
