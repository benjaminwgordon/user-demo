var express = require('express');
var router = express.Router();
const {check, validationResult} = require ('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get("/", (req, res) => res.render("sign-up-form", {errors:null}));
router.post("/", [
  check('username').trim().isLength({min:1}).withMessage("username is required").isAlphanumeric().withMessage("username must only include alpha-numeric characters"),
  check('fullName').trim().isLength({min:1}).withMessage("full name is required").isAlphanumeric().withMessage("name must only include alpha-numeric characters")
  ], (req,res) => {
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()){
      res.render('sign-up-form', {errors:errors.array()});
      return;
    }

    else{
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err){
          console.log(err);
          next(err);
        }
        const user = new User({
          username: req.body.username,
          password: hashedPassword, 
          membership:false, 
          fullName: req.body.fullName
        }).save(err => {
          if (err) { 
            return next(err);
          };
          res.redirect("/");
          return;
        });
      });
    }
});

module.exports = router;