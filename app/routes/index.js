var express = require('express');
var router = express.Router();


//global.current_user;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Автосервис', style: 'index' });
});

router.get('/auth', function(req, res, next) {
    res.send(req.body.login+' '+req.body.password);
});

module.exports = router;
