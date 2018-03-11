const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    parentFolderId: mongoose.SchemaTypes.ObjectId,
    content: String,
    type: { type: String, required: true, },
    authorId: { type: mongoose.SchemaTypes.ObjectId },
    name: String,
    children: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Note" }]
}, { timestamps: true });

noteSchema.set("toJSON", {
    transform: function(doc,ret, options) {
        ret.id = ret._id;
        delete ret._id;
        return ret;     
    }
});

module.exports = mongoose.model("Note", noteSchema);