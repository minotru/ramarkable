const router = require("express").Router();

router.get("/notes", function (req, res) {
    res.send(`<p>logged in</p>`)
});

router.use("/auth", require("./auth"));

module.exports = router;