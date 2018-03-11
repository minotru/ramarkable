const router = require("express").Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.use("/auth", require("./auth"));
router.use("/notes", require("./notes"));

module.exports = router;