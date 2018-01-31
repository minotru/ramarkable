const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fs = require("fs");

router.get('/', function (req, res) {
    const html = fs.readFileSync("./index.html", "utf8");
    res.send(html);
  });

router.post("/register", function(req, res) {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    User.create(userData).then((user) => console.log(user));
    
});

module.exports = router;