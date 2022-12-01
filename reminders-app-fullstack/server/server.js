console.log("<>=<>=<>=<>= This project was developed by Jr. Dev Teasley, and Sr. Dev Biggs =<>=<>=<>=<>");


const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();


require('./config/reminders.config');

// app.use(express.json(), express.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))


app.use(cookieParser(process.env.SECRET_KEY))

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport.config")(passport)

//LOGOUT STUFF??
app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
});



const Routes = require('./routes/reminders.routes');

Routes(app);


const port = 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));

