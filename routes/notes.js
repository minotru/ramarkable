const Note = require("../models/Note")
const router = require("express").Router();

router.get("/", (req, res, next) => {
    console.log("in notes/");
    Note.findById(req.user.folderId)
        .then(note => {
            res.json(note);
        })
        .catch(err => next(err));
});

router.get("/:noteId", (req, res) => {
    const noteId = req.param("noteId");
    Note.findById(noteId)
        .then(note => {
            if (note === null)
                res.status(404).json({error: "note not found"});
            else if (note.authorId.toString() !== req.user.id)
                res.status(403).json({error: "you don't have access"});
            else
                res.send(note.toJSON());
        })
        .catch(err => res.status(500).json(err));
});

router.get("/")

router.post("/create", (req, res) => {
    const params = {
        authorId: req.user.id,
        type: req.query.type,
        name: req.query.name,
        parentFolderId: req.query.parentFolderId || req.user.folderId,
        author: req.user.id,
        content: req.query.content || ""
    };

    Note.create(params)
        .then(note => res.json(note))
        .catch(err => {console.log(err); res.status(500).json(err)});
});

module.exports = router;