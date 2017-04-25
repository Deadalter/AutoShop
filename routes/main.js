/**
 * Created by deadalter on 12.04.2017.
 */
var express = require('express');
var router = express.Router();

router.get('/main', function(req, res, next) {
    res.render('main', { title: 'Автосервис', style: 'main' });
});

module.exports = router;