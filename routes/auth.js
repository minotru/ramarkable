const passport = require("passport");
const router = require("express").Router();

router.get("/google", passport.authenticate('google', {scope:["profile"]}));

router.get("/google/callback", passport.authenticate("google", () => {console.log("after callback")}))

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