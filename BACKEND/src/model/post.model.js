const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    media: {
        type: String,
        required: true
    },

    mediaType: {
        type: String,
        enum: ["image", "video", "audio"],
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("post", postSchema);