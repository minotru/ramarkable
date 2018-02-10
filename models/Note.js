const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    content: String,
    type: { type: String, required: true, },
    author: { type: mongoose.SchemaTypes.ObjectId },
    name: String,
    children: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Note" }]
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);