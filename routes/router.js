const User = require("../models/User");
const fs = require("fs");
const router = require("express").Router();
const passport = require("passport");


router.get('/', function (req, res) {
    const html = fs.readFileSync("./public/index.html", "utf8");
    res.send(html);
});

router.get("/notes", function (req, res) {
    res.send(`<p>logged in</p>`)
});

router.post("/register", passport.authenticate("local-register"));

router.post('/login',
    passport.authenticate("local-login", {
        failureRedirect: "/",
        successRedirect: "/notes"
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;