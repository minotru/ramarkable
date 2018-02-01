const User = require("../models/User");
const fs = require("fs");


module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        const html = fs.readFileSync("./index.html", "utf8");
        res.send(html);
    });

    app.get("/notes", function(req, res) {
        res.send(`<p>logged in</p>`)
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/notes",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.post('/signin', 
        passport.authenticate("local-signin", {
            failureRedirect: "/signin",
            successRedirect: "/notes"}
        )
    );

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
}