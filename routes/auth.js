const passport = require("passport");
const router = require("express").Router();

// router.get("/google", passport.authenticate('google', {scope:["profile"]}));

// router.get("/google/callback", passport.authenticate("google", () => {console.log("after callback")}))

router.post("/register", 
    passport.authenticate("local-register"), 
    (req, res) => {
        if (req.isAuthenticated())
            res.sendStatus(200);
        else
            res.sendStatus(401);
        }
);

router.post('/login',
    passport.authenticate("local-login"), 
    (req, res) => {
        console.log(req.user);
        if (req.isAuthenticated())
            res.sendStatus(200);
        else
            res.sendStatus(401);
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;