


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: String,
    password: {  
        type: String,
        required: true
    },
    profileImage:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    role: String,

    followers:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"

    }
    ],

    following :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);

