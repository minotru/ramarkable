const Note = require("../models/Note")
const router = require("express").Router();

router.get("/", (req, res, next) => {
    Note.findById(req.user.folderId)
        .then(note => {
            res.json(note);
        })
        .catch(err => next(err));
});

module.exports = router;