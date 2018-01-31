const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;


app.use(session({
    secret: "super-puper-secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const routes = require("./routes/router");
app.use("/", routes);
 
const server = app.listen(3000);
