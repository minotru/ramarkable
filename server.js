const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const app = express();

const configDB = require("./config/database");
mongoose.connect(configDB.url);
const db = mongoose.connection;

require("./config/passport")(passport);

app.use(session({
    secret: "super-puper-secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

app.use("/", require("./routes/router"));

const server = app.listen(3000);
