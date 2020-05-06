require('dotenv').config();

const express = require('express');

const User = require('./models/User');
const Message = require('./models/Message')
const morgan = require('morgan');
const path = require('path');
const loginRouter = require('./routes/log-in');
const signUpRouter = require('./routes/sign-up');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
require('./utils/passport.js')(app);

const mongoose = require('mongoose')
const mongoDb = process.env.db; 
mongoose.connect(mongoDb, {useUnifiedTopology:true, useNewUrlParser:true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use('/', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-out', require('./routes/log-out'))

app.listen(3000, () => console.log("app listening on port 3000!"));