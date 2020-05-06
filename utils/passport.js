const session = require('express-session')
const cookieparser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  app.use(cookieparser());
  app.use(session({
    secret : process.env.secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'kong',
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000
    }
  }));

  app.use(flash());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
  });

  passport.use(new LocalStrategy((username, password, done) => {
    const errorMsg = 'invalid username or password';

    User.findOne({username:username})
    .then((user) => {
      if (!user){
        return done(null, false, {message:errorMsg})
      }

      isValid = bcrypt.compare(password, user.password, (err,res) => {
        if (res){
          return done(null, user);
        }
        else{
          return done(null, false, {msg: errorMsg})
        }
      })
    })
    .catch(done);
  }))

  app.use(passport.initialize());
  app.use(passport.session());
}