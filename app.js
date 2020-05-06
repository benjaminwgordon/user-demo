require('dotenv').config();

const express = require('express');

const User = require('./models/User');
const Message = require('./models/Message')
const morgan = require('morgan');

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

// app.use('/', require('./routes/index'));
// app.use('/log-in', require('./routes/log-in'));
// app.use('/sign-up', require('./routes/sign-up'));

const routes = require('./routes');
app.use(routes);

app.listen(3000, () => console.log("app listening on port 3000!"));