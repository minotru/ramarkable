const User = require("../models/User");
const fs = require("fs");
const router = require("express").Router();
const passport = require("passport");


router.get('/', function (req, res) {
    const html = fs.readFileSync("./index.html", "utf8");
    res.send(html);
});

router.get("/notes", function(req, res) {
    res.send(`<p>logged in</p>`)
});

router.post("/signup", (req, res, next) => {
    User.register(new User({email: req.body.email}), req.body.password, (err) => {
        if (err) {
            console.log("registration failed");
            next(err);
        }
        res.redirect("/notes");
    })
});

router.post('/signin', 
    passport.authenticate("local", {
        failureRedirect: "/signin",
        successRedirect: "/notes"}
    )
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;