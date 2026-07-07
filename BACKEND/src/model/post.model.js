const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    video: {
        type: String
    },

    audio: {
        type: String
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("post", postSchema);