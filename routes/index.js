var express = require('express');
var router = express.Router();
require('./log-in')

router.get('/', function(req,res){
    res.redirect('/log-in');
})

module.exports = router;