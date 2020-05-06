var express = require('express');
const passport = require('passport')
const User = require('../models/User')
var router = express.Router();


router.get('/log-in', function(req,res) {
    res.render('log-in', {
      user:req.user
    });
});

router.get('/sign-up', function(req,res){
    res.redirect('/sign-up');
})


router.post("/submit", passport.authenticate(
  "local",
  {
    failureRedirect: "/sign-up",
    successRedirect: "/"
  }), (req,res, next) => {
    req.session.user = req.user;
  }
);

router.get("/logout", function(req, res, next){
  if (err) {next(err)};
  req.logout();
});


module.exports = router;


