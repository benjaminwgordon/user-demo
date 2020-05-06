var express = require('express');
const passport = require('passport')
const User = require('../models/User')
var router = express.Router();


router.get('/', function(req,res) {
    res.render('log-in', {
      user:req.user
    });
});

router.post("/submit", passport.authenticate(
  "local",
  {
    failureRedirect: "/sign-up",
    successRedirect: "/"
  }), (req,res, next) => {
    req.session.user = req.user;
  }
);

module.exports = router;


